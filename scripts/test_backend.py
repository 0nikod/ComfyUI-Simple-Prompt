import os
import duckdb
import logging

# Setup basic logging to see output
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SimplePrompt")

# Mocking the layout
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
CUSTOM_DATA_DIR = os.path.join(DATA_DIR, "custom")
TAGS_PARQUET_PATH = os.path.join(DATA_DIR, "tags.parquet")
DEFAULT_TAGS_PATH = os.path.join(DATA_DIR, "default_tags.parquet")
USER_TAGS_PATH = os.path.join(CUSTOM_DATA_DIR, "user_tags.parquet")
LIKED_TAGS_PATH = os.path.join(CUSTOM_DATA_DIR, "liked_tags.parquet")


def init_duckdb():
    try:
        conn = duckdb.connect(":memory:")

        def get_sql_path(path):
            if os.path.exists(path):
                return path.replace("\\", "/")
            return None

        sources = []

        path = get_sql_path(LIKED_TAGS_PATH)
        if path:
            sources.append(f"SELECT name, category, post_count, alias, 1 as priority FROM read_parquet('{path}')")

        path = get_sql_path(USER_TAGS_PATH)
        if path:
            sources.append(f"SELECT name, category, post_count, alias, 2 as priority FROM read_parquet('{path}')")

        path = get_sql_path(DEFAULT_TAGS_PATH)
        if path:
            sources.append(f"SELECT name, category, post_count, alias, 3 as priority FROM read_parquet('{path}')")

        path = get_sql_path(TAGS_PARQUET_PATH)
        if path:
            sources.append(f"SELECT name, category, post_count, alias, 4 as priority FROM read_parquet('{path}')")

        if not sources:
            print("No sources found!")
            return None

        union_query = " UNION ALL ".join(sources)
        print("Creating view...")
        conn.execute(f"CREATE OR REPLACE VIEW all_tags_raw AS {union_query}")

        print("Deduplicating...")
        conn.execute("""
            CREATE OR REPLACE VIEW tags AS
            SELECT * EXCLUDE (rn) FROM (
                SELECT *, 
                    ROW_NUMBER() OVER (PARTITION BY name ORDER BY priority ASC) as rn
                FROM all_tags_raw
            ) WHERE rn = 1
        """)

        print("DuckDB Initialized successfully.")
        return conn

    except Exception as e:
        print(f"Failed: {e}")
        return None


def test_search(conn):
    if not conn:
        return

    print("\nTesting Search 'girl'...")
    try:
        # Simple search
        res = conn.execute(
            "SELECT name, priority, post_count FROM tags WHERE name ILIKE '%girl%' ORDER BY priority ASC, post_count DESC"
        ).fetchall()
        for r in res:
            print(r)

        # Check custom tag
        print("\nTesting Custom Tag 'my_custom_tag'...")
        res = conn.execute("SELECT * FROM tags WHERE name = 'my_custom_tag'").fetchall()
        print(res)

    except Exception as e:
        print(f"Search failed: {e}")


conn = init_duckdb()
if conn:
    test_search(conn)
