import duckdb
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
DEFAULT_TAGS_PATH = os.path.join(DATA_DIR, "default_tags.parquet")

os.makedirs(DATA_DIR, exist_ok=True)

print(f"Creating empty default_tags.parquet at {DEFAULT_TAGS_PATH}")

try:
    conn = duckdb.connect(":memory:")

    # Schema matching SimplePrompt.py TAGS_SCHEMA
    # name VARCHAR, category BIGINT, post_count BIGINT, alias VARCHAR[]
    conn.execute("CREATE TABLE tags (name VARCHAR, category BIGINT, post_count BIGINT, alias VARCHAR[])")

    # Write to parquet (OVERWRITE)
    save_path = DEFAULT_TAGS_PATH.replace(os.sep, "/")
    conn.execute(f"COPY tags TO '{save_path}' (FORMAT PARQUET)")
    print("Successfully created empty default_tags.parquet")

except Exception as e:
    print(f"Error: {e}")
