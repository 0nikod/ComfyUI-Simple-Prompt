import os
import logging
from typing import List, Dict, Any, Optional
from server import PromptServer
from aiohttp import web

# Configure logging
logger = logging.getLogger("SimplePrompt")

# Lazy import duckdb to avoid crash if not installed
try:
    import duckdb
except ImportError:
    logger.error("Error: 'duckdb' package not found in this Python environment.")
    logger.error("Please install it using: pip install duckdb")
    duckdb = None

# Get the path to the parquet file
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
PARQUET_PATH = os.path.join(DATA_DIR, "tags.parquet")

# Initialize DuckDB connection
db_conn = None


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

    if not os.path.exists(PARQUET_PATH):
        logger.warning(f"Parquet file not found at: {PARQUET_PATH}")
        return

    try:
        # Use absolute path and replace backslashes for DuckDB
        abs_path = os.path.abspath(PARQUET_PATH).replace("\\", "/")
        # Use parameterized query for view creation isn't strictly necessary for safe paths,
        # but manual string building is okay here as path is internal.
        conn.execute(f"CREATE OR REPLACE VIEW tags AS SELECT * FROM read_parquet('{abs_path}')")
        logger.info(f"DuckDB initialized with {abs_path}")
    except Exception as e:
        logger.error(f"DuckDB initialization failed: {e}")


# Initialize on module load
if duckdb:
    init_duckdb()


def search_tags(
    conn, query: str, limit: int = 20, use_aliases: bool = False, categories: Optional[List[int]] = None
) -> List[Dict[str, Any]]:
    """
    Search for tags in the DuckDB database.

    Args:
        conn: DuckDB connection object.
        query: Search query string.
        limit: Maximum number of results to return.
        use_aliases: Whether to search in aliases as well.
        categories: List of category IDs to filter by.

    Returns:
        List of dictionaries representing the found tags.
    """
    if not conn:
        logger.error("Database connection is not available")
        return []

    # Prepare specific parts of the query
    alias_clause = ""
    # We use parameterized queries for the main search term, but for structural logic
    # like "OR EXISTS (...)" we still construct the string carefully.
    # HOWEVER, the sensitive part (the user input) is passed as a parameter.

    # DuckDB python client supports parameters.
    # We will construct the SQL with placeholders (?)

    params = []
    # Using '%' around query for LIKE usually requires concatenating inside SQL or passing the full string as param.
    # DuckDB standard: ILIKE ?
    # And we pass f"%{query}%" as the parameter.

    search_term = f"%{query}%"
    params.append(search_term)

    if use_aliases:
        # For aliases, we also want to search securely.
        # "name ILIKE ? OR EXISTS (SELECT 1 FROM unnest(alias) AS a(alias_value) WHERE alias_value ILIKE ?)"
        alias_clause = "OR EXISTS (SELECT 1 FROM unnest(alias) AS a(alias_value) WHERE alias_value ILIKE ?)"
        params.append(search_term)

    category_clause = ""
    if categories:
        # DuckDB: AND category IN (?, ?, ?) is standard.
        placeholders = ",".join(["?"] * len(categories))
        category_clause = f"AND category IN ({placeholders})"
        params.extend(categories)

    # LIMIT also as a parameter for total safety, though usually it's an int.
    # params.append(limit) -> LIMIT ?

    sql = f"""
        SELECT * FROM tags
        WHERE (name ILIKE ? {alias_clause})
        {category_clause}
        LIMIT ?
    """
    params.append(limit)

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
    except Exception as e:
        logger.error(f"Search failed: {e}")
        return []


# API Routes
@PromptServer.instance.routes.get("/simple-prompt/health")
async def health_check_api(request):
    conn = get_db_connection()
    return web.json_response({"status": "ok", "duckdb": "loaded" if conn else "failed", "parquet": os.path.exists(PARQUET_PATH)})


@PromptServer.instance.routes.get("/simple-prompt/search-tags")
async def search_tags_api(request):
    conn = get_db_connection()
    if not conn:
        return web.json_response({"error": "DuckDB not initialized"}, status=500)

    query = request.query.get("q", "")
    limit_val = int(request.query.get("limit", 20))
    use_aliases = request.query.get("use_aliases", "false").lower() == "true"
    categories_str = request.query.get("categories", "")

    categories = []
    if categories_str:
        try:
            categories = [int(c) for c in categories_str.split(",") if c.strip()]
        except ValueError:
            pass  # Ignore invalid categories

    try:
        results = search_tags(conn, query, limit_val, use_aliases, categories)
        return web.json_response(results)
    except Exception as e:
        logger.error(f"Search API error: {e}")
        return web.json_response([], status=500)


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
