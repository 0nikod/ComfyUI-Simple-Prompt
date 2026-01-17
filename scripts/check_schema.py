import duckdb
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TAGS_PATH = os.path.join(BASE_DIR, "data", "tags.parquet")

try:
    conn = duckdb.connect(":memory:")
    print(f"Inspecting {TAGS_PATH}")
    if os.path.exists(TAGS_PATH):
        print(conn.execute(f"DESCRIBE SELECT * FROM read_parquet('{TAGS_PATH.replace(os.sep, '/')}')").fetchall())
    else:
        print("tags.parquet not found")

    USER_TAGS_PATH = os.path.join(BASE_DIR, "data", "custom", "user_tags.parquet")
    print(f"Inspecting {USER_TAGS_PATH}")
    if os.path.exists(USER_TAGS_PATH):
        print(conn.execute(f"DESCRIBE SELECT * FROM read_parquet('{USER_TAGS_PATH.replace(os.sep, '/')}')").fetchall())

except Exception as e:
    print(e)
