import os
import logging
import json
import asyncio
import hashlib
from typing import List, Dict, Any, Optional
from server import PromptServer
from aiohttp import web

# Configure logging
logger = logging.getLogger("SimplePrompt")

# Lazy import duckdb
try:
    import duckdb
except ImportError:
    logger.error("Error: 'duckdb' package not found in this Python environment.")
    logger.error("Please install it using: pip install duckdb")
    duckdb = None

# --------------------------------------------------------------------------------
# Constants & Paths
# --------------------------------------------------------------------------------
BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "data")
CUSTOM_DATA_DIR = os.path.join(DATA_DIR, "custom")

# Primary Data Sources
TAGS_PARQUET_PATH = os.path.join(DATA_DIR, "tags.parquet")  # Priority 4
DEFAULT_TAGS_PATH = os.path.join(DATA_DIR, "default_tags.parquet")  # Priority 3
USER_TAGS_PATH = os.path.join(CUSTOM_DATA_DIR, "user_tags.parquet")  # Priority 2
LIKED_TAGS_PATH = os.path.join(CUSTOM_DATA_DIR, "liked_tags.parquet")  # Priority 1

# Category & Meta Data Paths
DEFAULT_CATEGORY_PATH = os.path.join(DATA_DIR, "default_category.json")
CUSTOM_CATEGORY_PATH = os.path.join(CUSTOM_DATA_DIR, "custom_category.json")
DEFAULT_PRESETS_PATH = os.path.join(DATA_DIR, "default_presets.json")
CUSTOM_PRESETS_PATH = os.path.join(CUSTOM_DATA_DIR, "custom_presets.json")

# Ensure custom directory exists
os.makedirs(CUSTOM_DATA_DIR, exist_ok=True)

# Global DuckDB Connection
db_conn = None


# --------------------------------------------------------------------------------
# Database Management
# --------------------------------------------------------------------------------


def get_db_connection():
    global db_conn
    if db_conn:
        return db_conn

    if not duckdb:
        return None

    try:
        db_conn = duckdb.connect(database=":memory:")
        return db_conn
    except Exception as e:
        logger.error(f"Could not create DuckDB connection: {e}")
        return None


def init_duckdb():
    conn = get_db_connection()
    if not conn:
        return

    logger.info("Initializing SimplePrompt Database...")

    # Helper to check file existence and formatted path for SQL
    def get_sql_path(path):
        if os.path.exists(path):
            return path.replace("\\", "/")
        return None

    sources = []

    # Priority 1: Liked Tags
    path = get_sql_path(LIKED_TAGS_PATH)
    if path:
        sources.append(f"SELECT name, category, post_count, alias, 1 as priority FROM read_parquet('{path}')")

    # Priority 2: User Tags
    path = get_sql_path(USER_TAGS_PATH)
    if path:
        sources.append(f"SELECT name, category, post_count, alias, 2 as priority FROM read_parquet('{path}')")

    # Priority 3: Default Tags
    path = get_sql_path(DEFAULT_TAGS_PATH)
    if path:
        sources.append(f"SELECT name, category, post_count, alias, 3 as priority FROM read_parquet('{path}')")

    # Priority 4: Repo Tags (Main)
    path = get_sql_path(TAGS_PARQUET_PATH)
    if path:
        sources.append(f"SELECT name, category, post_count, alias, 4 as priority FROM read_parquet('{path}')")
    else:
        logger.warning(f"Main tags.parquet not found at {TAGS_PARQUET_PATH}")

    if not sources:
        logger.warning("No tag data sources found.")
        return

    # Create Unified View
    try:
        union_query = " UNION ALL ".join(sources)

        # 1. Create Raw View containing all duplicates
        conn.execute(f"CREATE OR REPLACE VIEW all_tags_raw AS {union_query}")

        # 2. Create Deduplicated View (High priority wins)
        conn.execute("""
            CREATE OR REPLACE VIEW tags AS
            SELECT * EXCLUDE (rn) FROM (
                SELECT *, 
                    ROW_NUMBER() OVER (PARTITION BY name ORDER BY priority ASC) as rn
                FROM all_tags_raw
            ) WHERE rn = 1
        """)

        # 3. Create Fast View (Excluding Repo Tags - Priority 4)
        conn.execute("""
            CREATE OR REPLACE VIEW tags_fast AS
            SELECT * EXCLUDE (rn) FROM (
                SELECT *, 
                    ROW_NUMBER() OVER (PARTITION BY name ORDER BY priority ASC) as rn
                FROM all_tags_raw
                WHERE priority < 4
            ) WHERE rn = 1
        """)

        logger.info("DuckDB initialized with multi-source views (including fast view).")

    except Exception as e:
        logger.error(f"DuckDB initialization failed: {e}")


# Initialize on module load
if duckdb:
    init_duckdb()


# --------------------------------------------------------------------------------
# Core Logic
# --------------------------------------------------------------------------------


def search_tags(
    conn, query: str, limit: int = 100, use_aliases: bool = False, categories: Optional[List[int]] = None
) -> List[Dict[str, Any]]:
    if not conn:
        return []

    params = []
    search_term = f"%{query}%"
    params.append(search_term)

    alias_clause = ""
    if use_aliases:
        # Searching inside the list of aliases
        alias_clause = "OR EXISTS (SELECT 1 FROM unnest(alias) AS a(alias_value) WHERE alias_value ILIKE ?)"
        params.append(search_term)

    category_clause = ""
    if categories:
        placeholders = ",".join(["?"] * len(categories))
        category_clause = f"AND category IN ({placeholders})"
        params.extend(categories)

    # Add limit to params
    params.append(limit)

    sql = f"""
        SELECT * FROM tags
        WHERE (name ILIKE ? {alias_clause})
        {category_clause}
        ORDER BY priority ASC, post_count DESC
        LIMIT ?
    """

    try:
        res = conn.execute(sql, params)
        cols = [desc[0] for desc in res.description]
        results = []
        for row in res.fetchall():
            row_dict = {}
            for i, val in enumerate(row):
                row_dict[cols[i]] = val
            results.append(row_dict)
        return results
        return results
    except Exception as e:
        logger.error(f"Search failed: {e}")
        return []


def get_tags_details(conn, names: List[str], fast: bool = False) -> Dict[str, int]:
    """
    Get category for a list of tag names.
    Returns a dict {name: category}

    Handles both space and underscore formats:
    - Input "blue hair" will match database "blue_hair"
    - Input "blue_hair" will also work
    """
    if not conn or not names:
        return {}

    table_name = "tags_fast" if fast else "tags"

    # Cleanup names
    clean_names = [n.strip() for n in names if n.strip()]
    if not clean_names:
        return {}

    # Create a mapping of normalized names (underscore) to original names
    # This allows us to return results mapped to the original input format
    normalized_to_original: Dict[str, str] = {}
    all_variants = set()

    for name in clean_names:
        lower_name = name.lower()
        # Add both space and underscore variants
        space_variant = lower_name.replace("_", " ")
        underscore_variant = lower_name.replace(" ", "_")

        all_variants.add(space_variant)
        all_variants.add(underscore_variant)

        # Map both variants to the original name
        normalized_to_original[space_variant] = lower_name
        normalized_to_original[underscore_variant] = lower_name

    variant_list = list(all_variants)
    placeholders = ",".join(["?"] * len(variant_list))

    sql = f"""
        SELECT name, category 
        FROM {table_name}
        WHERE name COLLATE NOCASE IN ({placeholders})
    """

    try:
        res = conn.execute(sql, variant_list).fetchall()

        result_map = {}
        for row in res:
            db_name = row[0].lower()
            category = row[1]

            # Map back to all original input names that could match this
            original_name = normalized_to_original.get(db_name)
            if original_name:
                result_map[original_name] = category

            # Also add the db name itself for direct lookups
            result_map[db_name] = category

            # Add the other variant too (space <-> underscore)
            space_variant = db_name.replace("_", " ")
            underscore_variant = db_name.replace(" ", "_")
            result_map[space_variant] = category
            result_map[underscore_variant] = category

        return result_map
    except Exception as e:
        logger.error(f"Get tags details failed: {e}")
        return {}


def ensure_parquet_exists(path: str, schema_sql: str):
    """Ensures a parquet file exists with the given schema."""
    if os.path.exists(path):
        return

    conn = get_db_connection()
    if not conn:
        return

    try:
        # Create an empty table with the correct schema and write to parquet
        temp_name = f"temp_init_{os.path.basename(path).replace('.', '_')}"
        conn.execute(f"CREATE TABLE {temp_name} ({schema_sql})")
        # Write empty table
        # We need to format path for DuckDB
        save_path = path.replace("\\", "/")
        conn.execute(f"COPY {temp_name} TO '{save_path}' (FORMAT PARQUET)")
        conn.execute(f"DROP TABLE {temp_name}")
        logger.info(f"Created empty parquet file: {path}")
    except Exception as e:
        logger.error(f"Failed to create parquet {path}: {e}")


# Schema for all tag files
TAGS_SCHEMA = "name VARCHAR, category BIGINT, post_count BIGINT, alias VARCHAR[]"


# --------------------------------------------------------------------------------
# API Handlers
# --------------------------------------------------------------------------------


# Helper to get path by source name
def get_source_path_by_name(source: str):
    if source == "user":
        return USER_TAGS_PATH
    elif source == "liked":
        return LIKED_TAGS_PATH
    elif source == "default":
        return DEFAULT_TAGS_PATH
    return None


@PromptServer.instance.routes.get("/simple-prompt/tags/list")
async def tags_list_api(request):
    conn = get_db_connection()
    if not conn:
        return web.json_response({"error": "DuckDB not initialized"}, status=500)

    try:
        source = request.query.get("source", "user")
        limit = int(request.query.get("limit", 50))
        offset = int(request.query.get("offset", 0))
        query = request.query.get("q", "")

        path = get_source_path_by_name(source)
        if not path or not os.path.exists(path):
            return web.json_response({"data": [], "total": 0})

        path_sql = path.replace("\\", "/")

        where_clause = ""
        params = []
        if query:
            where_clause = "WHERE name ILIKE ? OR EXISTS (SELECT 1 FROM unnest(alias) AS a(alias_value) WHERE alias_value ILIKE ?)"
            params = [f"%{query}%", f"%{query}%"]

        # Get Total Count
        count_sql = f"SELECT COUNT(*) FROM read_parquet('{path_sql}') {where_clause}"
        total = conn.execute(count_sql, params).fetchone()[0]

        # Get Data
        sql = f"""
            SELECT * FROM read_parquet('{path_sql}') 
            {where_clause}
            ORDER BY post_count DESC, name ASC
            LIMIT {limit} OFFSET {offset}
        """

        # Execute query
        if params:
            res = conn.execute(sql, params)
        else:
            res = conn.execute(sql)

        cols = [desc[0] for desc in res.description]
        data = [dict(zip(cols, row)) for row in res.fetchall()]

        return web.json_response({"data": data, "total": total})

    except Exception as e:
        logger.error(f"Tags list error: {e}")
        return web.json_response({"error": str(e)}, status=500)


@PromptServer.instance.routes.delete("/simple-prompt/tags/delete")
async def tags_delete_api(request):
    conn = get_db_connection()
    if not conn:
        return web.json_response({"error": "Database unavailable"}, status=500)

    try:
        data = await request.json()
        name = data.get("name")
        source = data.get("source")

        if not name or not source:
            return web.json_response({"error": "Name and source are required"}, status=400)

        path = get_source_path_by_name(source)
        if not path:
            return web.json_response({"error": "Invalid source"}, status=400)

        ensure_parquet_exists(path, TAGS_SCHEMA)
        path_sql = path.replace("\\", "/")

        # Delete using temp table
        conn.execute("DROP TABLE IF EXISTS temp_del_tags")
        conn.execute(f"CREATE TABLE temp_del_tags AS SELECT * FROM read_parquet('{path_sql}')")

        conn.execute("DELETE FROM temp_del_tags WHERE name = ?", [name])

        conn.execute(f"COPY temp_del_tags TO '{path_sql}' (FORMAT PARQUET)")
        conn.execute("DROP TABLE temp_del_tags")

        init_duckdb()  # Refresh view

        return web.json_response({"status": "success", "message": f"Tag '{name}' deleted from {source}."})

    except Exception as e:
        logger.error(f"Delete tag failed: {e}")
        return web.json_response({"error": str(e)}, status=500)


async def health_check_api(request):
    conn = get_db_connection()
    return web.json_response(
        {
            "status": "ok",
            "duckdb": "loaded" if conn else "failed",
            "sources": {
                "main": os.path.exists(TAGS_PARQUET_PATH),
                "user": os.path.exists(USER_TAGS_PATH),
                "liked": os.path.exists(LIKED_TAGS_PATH),
            },
        }
    )


@PromptServer.instance.routes.get("/simple-prompt/search-tags")
async def search_tags_api(request):
    conn = get_db_connection()
    if not conn:
        return web.json_response({"error": "DuckDB not initialized"}, status=500)

    query = request.query.get("q", "")
    limit_val = int(request.query.get("limit", 50))
    use_aliases = request.query.get("use_aliases", "false").lower() == "true"
    categories_str = request.query.get("categories", "")

    categories = []
    if categories_str:
        try:
            categories = [int(c) for c in categories_str.split(",") if c.strip()]
        except ValueError:
            pass

    try:
        results = search_tags(conn, query, limit_val, use_aliases, categories)
        return web.json_response(results)
    except Exception as e:
        logger.error(f"Search API error: {e}")
        return web.json_response([], status=500)


@PromptServer.instance.routes.post("/simple-prompt/get-tags-details")
async def get_tags_details_api(request):
    conn = get_db_connection()
    if not conn:
        return web.json_response({"error": "DuckDB not initialized"}, status=500)

    try:
        data = await request.json()
        names = data.get("names", [])
        fast = data.get("fast", False)

        if not names:
            return web.json_response({})

        results = get_tags_details(conn, names, fast=fast)
        return web.json_response(results)
    except Exception as e:
        logger.error(f"Get tags details API error: {e}")
        return web.json_response({"error": str(e)}, status=500)


@PromptServer.instance.routes.post("/simple-prompt/add-custom-tag")
async def add_custom_tag_api(request):
    """
    Add or Edit one or multiple tags in user_tags.parquet (or default_tags.parquet)
    """
    conn = get_db_connection()
    if not conn:
        return web.json_response({"error": "Database unavailable"}, status=500)

    try:
        data = await request.json()

        # Detect Batch or Single
        tags_to_process = []
        if "tags" in data and isinstance(data["tags"], list):
            tags_to_process = data["tags"]
        else:
            # Single
            tags_to_process = [data]

        if not tags_to_process:
            return web.json_response({"error": "No tag data provided"}, status=400)

        # Validate source from first item (assuming all same source for batch)
        source = tags_to_process[0].get("source", "user")
        target_path = get_source_path_by_name(source)

        if not target_path:
            return web.json_response({"error": "Invalid source"}, status=400)

        # Ensure file exists
        ensure_parquet_exists(target_path, TAGS_SCHEMA)

        # Transaction-like update
        target_path_sql = target_path.replace("\\", "/")

        # 1. Create temp table from existing parquet
        conn.execute("DROP TABLE IF EXISTS temp_edit_tags")
        conn.execute(f"CREATE TABLE temp_edit_tags AS SELECT * FROM read_parquet('{target_path_sql}')")

        count_added = 0

        for item in tags_to_process:
            name = item.get("name")
            if not name:
                continue

            category = int(item.get("category", 0))
            post_count = int(item.get("post_count", 0))
            alias = item.get("alias", [])

            # 2. Delete existing if any (overwrite logic)
            conn.execute("DELETE FROM temp_edit_tags WHERE name = ?", [name])

            # 3. Insert new tag
            conn.execute("INSERT INTO temp_edit_tags VALUES (?, ?, ?, ?)", [name, category, post_count, alias])
            count_added += 1

        # 4. Write back to parquet
        conn.execute(f"COPY temp_edit_tags TO '{target_path_sql}' (FORMAT PARQUET)")
        conn.execute("DROP TABLE temp_edit_tags")

        # 5. Refresh Main View
        init_duckdb()

        return web.json_response({"status": "success", "message": f"{count_added} tag(s) added/updated."})

    except Exception as e:
        logger.error(f"Add custom tag failed: {e}")
        return web.json_response({"error": str(e)}, status=500)


@PromptServer.instance.routes.post("/simple-prompt/toggle-like-tag")
async def toggle_like_tag_api(request):
    """
    Toggle a tag in liked_tags.parquet
    """
    conn = get_db_connection()
    if not conn:
        return web.json_response({"error": "Database unavailable"}, status=500)

    try:
        data = await request.json()
        name = data.get("name")
        # If is_liked is missing, we assume true (add it) UNLESS it's already there?
        # No, client should track state. But safer: if is_liked=None, treat as "Toggle" (if exists remove, else add).
        # But for now let's assume client sends explicit state or we default to True (Add).
        should_like = data.get("is_liked", True)

        if not name:
            return web.json_response({"error": "Name is required"}, status=400)

        ensure_parquet_exists(LIKED_TAGS_PATH, TAGS_SCHEMA)
        liked_path_sql = LIKED_TAGS_PATH.replace("\\", "/")

        conn.execute("DROP TABLE IF EXISTS temp_liked_tags")
        conn.execute(f"CREATE TABLE temp_liked_tags AS SELECT * FROM read_parquet('{liked_path_sql}')")

        # Always remove first to avoid duplicates
        conn.execute("DELETE FROM temp_liked_tags WHERE name = ?", [name])

        if should_like:
            # We need tag data.
            category = data.get("category")
            post_count = data.get("post_count")
            alias = data.get("alias", [])

            # If data is missing, try to find it in the main DB
            if category is None or post_count is None:
                # Check current 'tags' view. It creates circular dependency if we aren't careful?
                # 'tags' view depends on 'liked_tags'!
                # But 'tags' view is currently loaded in memory from *files*.
                # We are modifying the *file* for liked tags.
                # The 'tags' view in memory is still valid until we re-init.
                # So we can query 'tags' view to find info about this tag from other sources (User/Default/Repo).
                # Wait, if it was already in Liked, it was in 'tags' view coming from Liked.
                # If we just deleted it from temp_liked_tags (not the view), the view still has it.
                # Querying 'tags' view might return the Liked version if it was already liked.
                # We want the 'underlying' version.

                # Better approach: explicit query from low-priority sources.
                pass

            # Fallback query if data missing
            if category is None or post_count is None:
                # Try finding in User > Default > Main
                found = False
                for source_path in [USER_TAGS_PATH, DEFAULT_TAGS_PATH, TAGS_PARQUET_PATH]:
                    if os.path.exists(source_path):
                        src_sql = source_path.replace("\\", "/")
                        res = conn.execute(
                            f"SELECT category, post_count, alias FROM read_parquet('{src_sql}') WHERE name = ?", [name]
                        ).fetchone()
                        if res:
                            category = res[0]
                            post_count = res[1]
                            alias = res[2]
                            found = True
                            break

            # Default values if still missing
            if category is None:
                category = 0
            if post_count is None:
                post_count = 0
            if alias is None:
                alias = []

            conn.execute("INSERT INTO temp_liked_tags VALUES (?, ?, ?, ?)", [name, category, post_count, alias])
            msg = f"Tag '{name}' liked."
        else:
            msg = f"Tag '{name}' unliked."

        # Write back
        conn.execute(f"COPY temp_liked_tags TO '{liked_path_sql}' (FORMAT PARQUET)")
        conn.execute("DROP TABLE temp_liked_tags")

        # Refresh View
        init_duckdb()

        return web.json_response({"status": "success", "message": msg, "is_liked": should_like})

    except Exception as e:
        logger.error(f"Toggle like failed: {e}")
        return web.json_response({"error": str(e)}, status=500)


@PromptServer.instance.routes.post("/simple-prompt/update-data")
async def update_data_api(request):
    """
    Bulk update liked_tags or user_tags
    """
    conn = get_db_connection()
    try:
        data = await request.json()
        action = data.get("action")  # 'update_liked', 'update_user'

        if action == "update_liked":
            target_path = LIKED_TAGS_PATH
            ensure_parquet_exists(target_path, TAGS_SCHEMA)
            target_path_sql = target_path.replace("\\", "/")

            # 1. Read Liked Tags
            conn.execute("DROP TABLE IF EXISTS temp_target")
            conn.execute(f"CREATE TABLE temp_target AS SELECT * FROM read_parquet('{target_path_sql}')")

            # 2. Update stats from lower priorities
            other_sources = []
            if os.path.exists(USER_TAGS_PATH):
                other_sources.append(
                    f"SELECT name, category, post_count, alias, 2 as p FROM read_parquet('{USER_TAGS_PATH.replace(os.sep, '/')}')"
                )
            if os.path.exists(DEFAULT_TAGS_PATH):
                other_sources.append(
                    f"SELECT name, category, post_count, alias, 3 as p FROM read_parquet('{DEFAULT_TAGS_PATH.replace(os.sep, '/')}')"
                )
            if os.path.exists(TAGS_PARQUET_PATH):
                other_sources.append(
                    f"SELECT name, category, post_count, alias, 4 as p FROM read_parquet('{TAGS_PARQUET_PATH.replace(os.sep, '/')}')"
                )

            if other_sources:
                union_q = " UNION ALL ".join(other_sources)
                conn.execute(f"CREATE OR REPLACE VIEW others_raw AS {union_q}")
                conn.execute("""
                    CREATE OR REPLACE VIEW others_best AS 
                    SELECT * EXCLUDE (rn) FROM (
                        SELECT *, ROW_NUMBER() OVER (PARTITION BY name ORDER BY p ASC) as rn FROM others_raw
                    ) WHERE rn = 1
                """)

                # Perform Update
                conn.execute("""
                    UPDATE temp_target
                    SET category = others_best.category,
                        post_count = others_best.post_count,
                        alias = others_best.alias
                    FROM others_best
                    WHERE temp_target.name = others_best.name
                """)

                conn.execute("DROP VIEW others_best")
                conn.execute("DROP VIEW others_raw")

            # Write back
            conn.execute(f"COPY temp_target TO '{target_path_sql}' (FORMAT PARQUET)")
            conn.execute("DROP TABLE temp_target")

            init_duckdb()
            return web.json_response({"status": "success", "message": "Liked tags data updated from main DB."})

        elif action == "update_user":
            target_path = USER_TAGS_PATH
            ensure_parquet_exists(target_path, TAGS_SCHEMA)
            target_path_sql = target_path.replace("\\", "/")

            conn.execute("DROP TABLE IF EXISTS temp_target")
            conn.execute(f"CREATE TABLE temp_target AS SELECT * FROM read_parquet('{target_path_sql}')")

            other_sources = []
            if os.path.exists(DEFAULT_TAGS_PATH):
                other_sources.append(
                    f"SELECT name, category, post_count, alias, 3 as p FROM read_parquet('{DEFAULT_TAGS_PATH.replace(os.sep, '/')}')"
                )
            if os.path.exists(TAGS_PARQUET_PATH):
                other_sources.append(
                    f"SELECT name, category, post_count, alias, 4 as p FROM read_parquet('{TAGS_PARQUET_PATH.replace(os.sep, '/')}')"
                )

            if other_sources:
                union_q = " UNION ALL ".join(other_sources)
                conn.execute(f"CREATE OR REPLACE VIEW others_raw AS {union_q}")
                conn.execute("""
                    CREATE OR REPLACE VIEW others_best AS 
                    SELECT * EXCLUDE (rn) FROM (
                        SELECT *, ROW_NUMBER() OVER (PARTITION BY name ORDER BY p ASC) as rn FROM others_raw
                    ) WHERE rn = 1
                """)

                conn.execute("""
                    UPDATE temp_target
                    SET category = others_best.category,
                        post_count = others_best.post_count,
                        alias = others_best.alias
                    FROM others_best
                    WHERE temp_target.name = others_best.name
                """)

                conn.execute("DROP VIEW others_best")
                conn.execute("DROP VIEW others_raw")

            conn.execute(f"COPY temp_target TO '{target_path_sql}' (FORMAT PARQUET)")
            conn.execute("DROP TABLE temp_target")

            init_duckdb()
            return web.json_response({"status": "success", "message": "User tags data updated."})

        else:
            return web.json_response({"error": "Unknown action"}, status=400)

    except Exception as e:
        logger.error(f"Update data failed: {e}")
        return web.json_response({"error": str(e)}, status=500)


@PromptServer.instance.routes.get("/simple-prompt/check-update")
async def check_update_api(request):
    import aiohttp

    release_url = "https://api.github.com/repos/0nikod/danbooru_tag_process/releases/latest"

    local_sha256 = ""
    if os.path.exists(TAGS_PARQUET_PATH):
        try:
            sha256_hash = hashlib.sha256()
            with open(TAGS_PARQUET_PATH, "rb") as f:
                for byte_block in iter(lambda: f.read(4096), b""):
                    sha256_hash.update(byte_block)
            local_sha256 = sha256_hash.hexdigest()
        except Exception as e:
            logger.error(f"Error calculating local SHA256: {e}")

    try:
        async with aiohttp.ClientSession() as session:
            headers = {"User-Agent": "ComfyUI-Simple-Prompt"}
            async with session.get(release_url, headers=headers) as resp:
                if resp.status != 200:
                    return web.json_response({"error": f"Failed to fetch release info: {resp.status}"}, status=500)
                release_info = await resp.json()

            target_asset = None
            asset_names = ["tags_processed.parquet", "tags.parquet"]
            for name in asset_names:
                for asset in release_info.get("assets", []):
                    if asset.get("name") == name:
                        target_asset = asset
                        break
                if target_asset:
                    break

            if not target_asset:
                return web.json_response({"error": "Tag data file not found"}, status=404)

            remote_digest = target_asset.get("digest", "")
            if remote_digest.startswith("sha256:"):
                remote_sha256 = remote_digest[7:]
            else:
                remote_sha256 = remote_digest

            update_available = local_sha256 != remote_sha256

            return web.json_response(
                {
                    "update_available": update_available,
                    "local_sha256": local_sha256,
                    "remote_sha256": remote_sha256,
                    "version": release_info.get("tag_name", "unknown"),
                    "name": release_info.get("name", ""),
                }
            )

    except Exception as e:
        logger.error(f"Check update error: {e}")
        return web.json_response({"error": str(e)}, status=500)


@PromptServer.instance.routes.post("/simple-prompt/update-tags")
async def update_tags_api(request):
    import aiohttp

    try:
        data = await request.json()
    except:
        data = {}

    release_url = data.get("url", "https://api.github.com/repos/0nikod/danbooru_tag_process/releases/latest")

    try:
        async with aiohttp.ClientSession() as session:
            headers = {"User-Agent": "ComfyUI-Simple-Prompt"}
            async with session.get(release_url, headers=headers) as resp:
                if resp.status != 200:
                    return web.json_response({"error": f"Failed to fetch release info: {resp.status}"}, status=500)
                release_info = await resp.json()

            download_url = None
            asset_names = ["tags_processed.parquet", "tags.parquet"]
            for name in asset_names:
                for asset in release_info.get("assets", []):
                    if asset.get("name") == name:
                        download_url = asset.get("browser_download_url")
                        break
                if download_url:
                    break

            if not download_url:
                return web.json_response({"error": "Tag data file not found"}, status=404)

            async with session.get(download_url) as resp:
                if resp.status != 200:
                    return web.json_response({"error": f"Failed to download: {resp.status}"}, status=500)

                content = await resp.read()
                os.makedirs(DATA_DIR, exist_ok=True)
                temp_path = TAGS_PARQUET_PATH + ".tmp"
                with open(temp_path, "wb") as f:
                    f.write(content)

                if os.path.exists(TAGS_PARQUET_PATH):
                    os.remove(TAGS_PARQUET_PATH)
                os.rename(temp_path, TAGS_PARQUET_PATH)

            init_duckdb()
            return web.json_response({"status": "success", "message": "Tags updated successfully"})

    except Exception as e:
        logger.error(f"Update tags error: {e}")
        return web.json_response({"error": str(e)}, status=500)


# --------------------------------------------------------------------------------
# JSON Management Helpers
# --------------------------------------------------------------------------------


def load_json(path: str, default: Any = None) -> Any:
    if not os.path.exists(path):
        return default
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Failed to load JSON {path}: {e}")
        return default


def save_json(path: str, data: Any):
    try:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
    except Exception as e:
        logger.error(f"Failed to save JSON {path}: {e}")
        raise e


# --------------------------------------------------------------------------------
# Category & Meta API
# --------------------------------------------------------------------------------


@PromptServer.instance.routes.get("/simple-prompt/categories/list")
async def list_categories_api(request):
    """
    Returns merged categories (Default + Custom)
    """
    defaults = load_json(DEFAULT_CATEGORY_PATH, [])
    customs = load_json(CUSTOM_CATEGORY_PATH, [])

    # If default is empty (first run?), create it based on hardcoded defaults
    if not defaults:
        defaults = [
            {"id": 0, "name": "General", "color": "#0075db"},
            {"id": 1, "name": "Artist", "color": "#c00004"},
            {"id": 3, "name": "Copyright", "color": "#c000c0"},
            {"id": 4, "name": "Character", "color": "#00aa00"},
            {"id": 5, "name": "Meta", "color": "#fd9200"},
            {"id": 6, "name": "Special", "color": "#ffd700"},  # Gold
            {"id": 7, "name": "Rating", "color": "#ff69b4"},  # HotPink
        ]
        # Save it so user can see it
        try:
            save_json(DEFAULT_CATEGORY_PATH, defaults)
        except:
            pass

    # Merge: Custom overrides Default if same ID? Or just append?
    # Usually we just append. But let's check for ID collisions just in case.
    # Map by ID
    cat_map = {c["id"]: c for c in defaults}
    for c in customs:
        # Ensure we don't accidentally overwrite if ID conflicts, unless intended.
        # But if user created it, maybe they want to overwrite?
        # Let's trust the ID uniqueness is handled by creator.
        cat_map[c["id"]] = c

    # Return as list, sorted by ID
    result = sorted(cat_map.values(), key=lambda x: x["id"])
    return web.json_response(result)


@PromptServer.instance.routes.post("/simple-prompt/categories/save")
async def save_categories_api(request):
    """
    Saves Custom Categories.
    Expects a list of categories to be saved as 'custom'.
    """
    try:
        data = await request.json()
        categories = data.get("categories", [])
        save_json(CUSTOM_CATEGORY_PATH, categories)
        return web.json_response({"status": "success"})
    except Exception as e:
        return web.json_response({"error": str(e)}, status=500)


@PromptServer.instance.routes.get("/simple-prompt/presets/list")
async def list_presets_api(request):
    """
    Returns merged Meta Presets
    """
    defaults = load_json(DEFAULT_PRESETS_PATH, [])
    customs = load_json(CUSTOM_PRESETS_PATH, [])

    if not os.path.exists(DEFAULT_PRESETS_PATH):
        defaults = []
        try:
            save_json(DEFAULT_PRESETS_PATH, defaults)
        except:
            pass

    # Merge strategy: Join lists.
    # Note: IDs should be unique.
    return web.json_response({"defaults": defaults, "customs": customs})


@PromptServer.instance.routes.post("/simple-prompt/presets/save")
async def save_presets_api(request):
    try:
        data = await request.json()
        presets = data.get("presets", [])
        save_json(CUSTOM_PRESETS_PATH, presets)
        return web.json_response({"status": "success"})
    except Exception as e:
        return web.json_response({"error": str(e)}, status=500)


class SimplePrompt:
    """
    A simple prompt node with an advanced visual tag editor.
    """

    DESCRIPTION = "A prompt builder node with an advanced visual editor for tag management, weight adjustment, and autocomplete."

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "prompt_text": ("STRING", {"multiline": True, "dynamicPrompts": True}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "run"
    CATEGORY = "SimplePrompt"
    OUTPUT_NODE = False

    def run(self, prompt_text: str) -> tuple[str]:
        return (prompt_text,)

    @classmethod
    def IS_CHANGED(s, prompt_text: str) -> float:
        return float("NaN")


# Node registration
NODE_CLASS_MAPPINGS = {"SimplePrompt": SimplePrompt}

NODE_DISPLAY_NAME_MAPPINGS = {"SimplePrompt": "Simple Prompt"}
