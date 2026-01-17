import duckdb
import os
import shutil

# Setup paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
CUSTOM_DATA_DIR = os.path.join(DATA_DIR, "custom")
TEST_USER_TAGS = os.path.join(CUSTOM_DATA_DIR, "test_user_tags.parquet")

os.makedirs(CUSTOM_DATA_DIR, exist_ok=True)

conn = duckdb.connect(":memory:")


def setup_data():
    # Create sample parquet
    conn.execute("CREATE OR REPLACE TABLE tags (name VARCHAR, category BIGINT, post_count BIGINT, alias VARCHAR[])")
    conn.execute("INSERT INTO tags VALUES ('tag1', 0, 10, []), ('tag2', 1, 20, ['alias2']), ('tag3', 0, 5, [])")
    conn.execute(f"COPY tags TO '{TEST_USER_TAGS.replace(os.sep, '/')}' (FORMAT PARQUET)")
    print("Test data created.")


def test_list():
    print("\n--- Testing LIST ---")
    path_sql = TEST_USER_TAGS.replace(os.sep, "/")
    res = conn.execute(f"SELECT * FROM read_parquet('{path_sql}') ORDER BY post_count DESC, name ASC").fetchall()
    print("All tags:", res)
    assert len(res) == 3
    assert res[0][0] == "tag2"  # highest post_count


def test_delete():
    print("\n--- Testing DELETE 'tag2' ---")
    path_sql = TEST_USER_TAGS.replace(os.sep, "/")

    conn.execute("DROP TABLE IF EXISTS temp_del_tags")
    conn.execute(f"CREATE TABLE temp_del_tags AS SELECT * FROM read_parquet('{path_sql}')")
    conn.execute("DELETE FROM temp_del_tags WHERE name = 'tag2'")
    conn.execute(f"COPY temp_del_tags TO '{path_sql}' (FORMAT PARQUET)")

    # Verify
    res = conn.execute(f"SELECT * FROM read_parquet('{path_sql}')").fetchall()
    print("Remaining tags:", res)
    assert len(res) == 2
    names = [r[0] for r in res]
    assert "tag2" not in names
    assert "tag1" in names


try:
    setup_data()
    test_list()
    test_delete()
    print("\nSUCCESS: All backend logic tests passed.")
finally:
    # Cleanup
    if os.path.exists(TEST_USER_TAGS):
        os.remove(TEST_USER_TAGS)
