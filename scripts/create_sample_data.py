import duckdb
import os

# Define paths
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_dir = os.path.join(base_dir, "data")
custom_dir = os.path.join(data_dir, "custom")

os.makedirs(custom_dir, exist_ok=True)

# Connect to in-memory db
con = duckdb.connect()

# Create scheme for user tags
# name: VARCHAR, category: BIGINT, post_count: BIGINT, alias: VARCHAR[]

# 1. Create user_tags.parquet
# Contains a custom tag "my_custom_tag"
con.execute("""
    CREATE TABLE user_tags (
        name VARCHAR, 
        category BIGINT, 
        post_count BIGINT, 
        alias VARCHAR[]
    )
""")
con.execute("""
    INSERT INTO user_tags VALUES 
    ('my_custom_tag', 0, 100, ['custom_alias']),
    ('1girl', 4, 9999999, ['override_girl'])
""")
user_tags_path = os.path.join(custom_dir, "user_tags.parquet")
con.execute(f"COPY user_tags TO '{user_tags_path}' (FORMAT PARQUET)")
print(f"Created {user_tags_path}")

# 2. Create liked_tags.parquet
# Contains "masterpiece" as a liked tag (will override others if priority logic works)
con.execute("""
    CREATE TABLE liked_tags (
        name VARCHAR, 
        category BIGINT, 
        post_count BIGINT, 
        alias VARCHAR[]
    )
""")
con.execute("""
    INSERT INTO liked_tags VALUES 
    ('masterpiece', 5, 5000000, ['best quality']),
    ('simple background', 0, 200000, [])
""")
liked_tags_path = os.path.join(custom_dir, "liked_tags.parquet")
con.execute(f"COPY liked_tags TO '{liked_tags_path}' (FORMAT PARQUET)")
print(f"Created {liked_tags_path}")

# 3. Create default_tags.parquet (optional but good for testing priority)
# Contains "1girl" with lower count than user_tags to test override if user_tags < default_tags (but plan says User > Default)
con.execute("""
    CREATE TABLE default_tags (
        name VARCHAR, 
        category BIGINT, 
        post_count BIGINT, 
        alias VARCHAR[]
    )
""")
con.execute("""
    INSERT INTO default_tags VALUES 
    ('1girl', 4, 500, ['girl']),
    ('solo', 0, 300, [])
""")
default_tags_path = os.path.join(data_dir, "default_tags.parquet")
con.execute(f"COPY default_tags TO '{default_tags_path}' (FORMAT PARQUET)")
print(f"Created {default_tags_path}")

print("Done creating sample data.")
