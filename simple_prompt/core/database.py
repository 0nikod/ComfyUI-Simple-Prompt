"""
DuckDB 数据库管理模块
处理数据库连接和初始化
"""

import logging
import os
from typing import Optional, Any

from . import config
from .utils import get_sql_path

logger = logging.getLogger("SimplePrompt")

# Lazy import duckdb
try:
    import duckdb
except ImportError:
    logger.error("Error: 'duckdb' package not found in this Python environment.")
    logger.error("Please install it using: pip install duckdb")
    duckdb = None

# 全局数据库连接
_db_conn: Optional[Any] = None


def get_db_connection() -> Optional[Any]:
    """
    获取 DuckDB 连接（单例模式）

    Returns:
        DuckDB 连接对象，或 None（如果 duckdb 未安装）
    """
    global _db_conn
    if _db_conn:
        return _db_conn

    if not duckdb:
        return None

    try:
        _db_conn = duckdb.connect(database=":memory:")
        return _db_conn
    except Exception as e:
        logger.error(f"Could not create DuckDB connection: {e}")
        return None


def reset_db_connection() -> None:
    """
    重置数据库连接（用于热重载或重新初始化）
    """
    global _db_conn
    if _db_conn:
        try:
            _db_conn.close()
        except Exception:
            pass
    _db_conn = None


def init_duckdb() -> None:
    """
    初始化 DuckDB 数据库
    创建统一视图来合并多个数据源
    """
    conn = get_db_connection()
    if not conn:
        return

    logger.info("Initializing SimplePrompt Database...")

    sources = []

    # Priority 1: Liked Tags
    path = get_sql_path(config.LIKED_TAGS_PATH)
    if path:
        sources.append(f"SELECT name, category, post_count, alias, 1 as priority FROM read_parquet('{path}')")

    # Priority 2: User Tags
    path = get_sql_path(config.USER_TAGS_PATH)
    if path:
        sources.append(f"SELECT name, category, post_count, alias, 2 as priority FROM read_parquet('{path}')")

    # Priority 3: Default Tags
    path = get_sql_path(config.DEFAULT_TAGS_PATH)
    if path:
        sources.append(f"SELECT name, category, post_count, alias, 3 as priority FROM read_parquet('{path}')")

    # Priority 4: Repo Tags (Main)
    path = get_sql_path(config.TAGS_PARQUET_PATH)
    if path:
        sources.append(f"SELECT name, category, post_count, alias, 4 as priority FROM read_parquet('{path}')")
    else:
        logger.warning(f"Main tags.parquet not found at {config.TAGS_PARQUET_PATH}")

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


def reinit_duckdb() -> None:
    """
    重新初始化数据库（用于数据更新后刷新视图）
    """
    init_duckdb()


def ensure_parquet_exists(path: str, schema_sql: str) -> None:
    """
    确保 Parquet 文件存在，如果不存在则创建空文件

    Args:
        path: Parquet 文件路径
        schema_sql: 表结构的 SQL 定义
    """
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
        save_path = path.replace("\\", "/")
        conn.execute(f"COPY {temp_name} TO '{save_path}' (FORMAT PARQUET)")
        conn.execute(f"DROP TABLE {temp_name}")
        logger.info(f"Created empty parquet file: {path}")
    except Exception as e:
        logger.error(f"Failed to create parquet {path}: {e}")
