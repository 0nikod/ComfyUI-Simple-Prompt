import folder_paths
import nodes
import os
import json
from server import PromptServer
from aiohttp import web

# Lazy import duckdb to avoid crash if not installed
try:
    import duckdb
except ImportError:
    print("!!! [SimplePrompt] Error: 'duckdb' package not found in this Python environment.")
    print("!!! [SimplePrompt] Please install it using: pip install duckdb")
    duckdb = None

# Get the path to the parquet file
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
PARQUET_PATH = os.path.join(DATA_DIR, "tags.parquet")

# Initialize DuckDB connection
db_conn = None
if duckdb:
    try:
        db_conn = duckdb.connect(database=':memory:')
    except Exception as e:
        print(f"!!! [SimplePrompt] Could not create DuckDB connection: {e}")

def init_duckdb():
    if not db_conn:
        return
    if not os.path.exists(PARQUET_PATH):
        print(f"!!! [SimplePrompt] Parquet file not found at: {PARQUET_PATH}")
        return
    
    try:
        # Use absolute path and replace backslashes for DuckDB
        abs_path = os.path.abspath(PARQUET_PATH).replace('\\', '/')
        db_conn.execute(f"CREATE OR REPLACE VIEW tags AS SELECT * FROM read_parquet('{abs_path}')")
        print(f"[SimplePrompt] DuckDB initialized with {abs_path}")
    except Exception as e:
        print(f"!!! [SimplePrompt] DuckDB initialization failed: {e}")

if db_conn:
    init_duckdb()

# API Routes
@PromptServer.instance.routes.get("/simple-prompt/health")
async def health_check_api(request):
    return web.json_response({
        "status": "ok",
        "duckdb": "loaded" if db_conn else "failed",
        "parquet": os.path.exists(PARQUET_PATH)
    })

@PromptServer.instance.routes.get("/simple-prompt/search-tags")
async def search_tags_api(request):
    if not db_conn:
        return web.json_response({"error": "DuckDB not initialized"}, status=500)
        
    query = request.query.get("q", "")
    limit_val = int(request.query.get("limit", 20))
    use_aliases = request.query.get("use_aliases", "false").lower() == "true"
    categories = request.query.get("categories", "")
    
    # Sanitize query
    safe_query = query.replace("'", "''")
    
    alias_clause = ""
    if use_aliases:
        alias_clause = f"OR EXISTS (SELECT 1 FROM unnest(alias) AS a(alias_value) WHERE alias_value ILIKE '%{safe_query}%')"
    
    category_clause = ""
    if categories:
        try:
            category_list = [int(c) for c in categories.split(",") if c.strip()]
            if category_list:
                category_clause = f"AND category IN ({','.join(map(str, category_list))})"
        except ValueError:
            pass

    sql = f"""
        SELECT * FROM tags
        WHERE (name ILIKE '%{safe_query}%' {alias_clause})
        {category_clause}
        LIMIT {limit_val}
    """
    
    try:
        res = db_conn.execute(sql)
        cols = [desc[0] for desc in res.description]
        
        results = []
        for row in res.fetchall():
            row_dict = {}
            for i, val in enumerate(row):
                row_dict[cols[i]] = val
            results.append(row_dict)
            
        return web.json_response(results)
    except Exception as e:
        print(f"!!! [SimplePrompt] Search failed: {e}")
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

    def run(self, prompt_text):
        return (prompt_text,)

    @classmethod
    def IS_CHANGED(s, prompt_text):
        return float("NaN")

# Node registration
NODE_CLASS_MAPPINGS = {
    "SimplePrompt": SimplePrompt
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "SimplePrompt": "Simple Prompt"
}