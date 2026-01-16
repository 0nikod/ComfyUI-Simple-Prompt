"""
标签管理模块
处理标签的搜索、查询、添加、删除等操作
"""

import logging
import os
from typing import Any, Dict, List, Optional

from . import config
from .database import ensure_parquet_exists, get_db_connection, reinit_duckdb

logger = logging.getLogger("SimplePrompt")


def search_tags(
    conn: Any, query: str, limit: int = 100, use_aliases: bool = False, categories: Optional[List[int]] = None
) -> List[Dict[str, Any]]:
    """
    搜索标签

    Args:
        conn: DuckDB 连接
        query: 搜索关键词
        limit: 返回结果数量限制
        use_aliases: 是否同时搜索别名
        categories: 限制搜索的分类 ID 列表

    Returns:
        匹配的标签列表
    """
    if not conn:
        return []

    params: List[Any] = []
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
    except Exception as e:
        logger.error(f"Search failed: {e}")
        return []


def get_tags_details(conn: Any, names: List[str], fast: bool = False) -> Dict[str, int]:
    """
    获取标签详情（主要是分类信息）

    处理空格和下划线格式：
    - 输入 "blue hair" 会匹配数据库中的 "blue_hair"
    - 输入 "blue_hair" 也能正常工作

    Args:
        conn: DuckDB 连接
        names: 标签名称列表
        fast: 是否使用快速视图（排除主仓库标签）

    Returns:
        标签名到分类 ID 的映射字典
    """
    if not conn or not names:
        return {}

    table_name = "tags_fast" if fast else "tags"

    # Cleanup names
    clean_names = [n.strip() for n in names if n.strip()]
    if not clean_names:
        return {}

    # Create a mapping of normalized names (underscore) to original names
    normalized_to_original: Dict[str, str] = {}
    all_variants: set[str] = set()

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

        result_map: Dict[str, int] = {}
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


def get_source_path_by_name(source: str) -> Optional[str]:
    """
    根据来源名称获取对应的文件路径

    Args:
        source: 来源名称 ("user", "liked", "default")

    Returns:
        文件路径，如果来源无效则返回 None
    """
    if source == "user":
        return config.USER_TAGS_PATH
    elif source == "liked":
        return config.LIKED_TAGS_PATH
    elif source == "default":
        return config.DEFAULT_TAGS_PATH
    return None


def list_tags(conn: Any, source: str, limit: int = 50, offset: int = 0, query: str = "") -> Dict[str, Any]:
    """
    列出指定来源的标签

    Args:
        conn: DuckDB 连接
        source: 数据来源 ("user", "liked", "default")
        limit: 返回数量限制
        offset: 偏移量（分页）
        query: 搜索关键词

    Returns:
        包含 data 和 total 的字典
    """
    if not conn:
        return {"data": [], "total": 0}

    path = get_source_path_by_name(source)
    if not path or not os.path.exists(path):
        return {"data": [], "total": 0}

    path_sql = path.replace("\\", "/")

    where_clause = ""
    params: List[Any] = []
    if query:
        where_clause = "WHERE name ILIKE ? OR EXISTS (SELECT 1 FROM unnest(alias) AS a(alias_value) WHERE alias_value ILIKE ?)"
        params = [f"%{query}%", f"%{query}%"]

    try:
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

        if params:
            res = conn.execute(sql, params)
        else:
            res = conn.execute(sql)

        cols = [desc[0] for desc in res.description]
        data = [dict(zip(cols, row)) for row in res.fetchall()]

        return {"data": data, "total": total}
    except Exception as e:
        logger.error(f"List tags failed: {e}")
        return {"data": [], "total": 0}


def delete_tag(conn: Any, name: str, source: str) -> bool:
    """
    删除指定来源的标签

    Args:
        conn: DuckDB 连接
        name: 标签名称
        source: 数据来源

    Returns:
        是否成功
    """
    if not conn:
        return False

    path = get_source_path_by_name(source)
    if not path:
        return False

    ensure_parquet_exists(path, config.TAGS_SCHEMA)
    path_sql = path.replace("\\", "/")

    try:
        # Delete using temp table
        conn.execute("DROP TABLE IF EXISTS temp_del_tags")
        conn.execute(f"CREATE TABLE temp_del_tags AS SELECT * FROM read_parquet('{path_sql}')")
        conn.execute("DELETE FROM temp_del_tags WHERE name = ?", [name])
        conn.execute(f"COPY temp_del_tags TO '{path_sql}' (FORMAT PARQUET)")
        conn.execute("DROP TABLE temp_del_tags")

        reinit_duckdb()  # Refresh view
        return True
    except Exception as e:
        logger.error(f"Delete tag failed: {e}")
        return False


def add_tags(conn: Any, tags_data: List[Dict[str, Any]], source: str = "user") -> int:
    """
    添加或更新标签

    Args:
        conn: DuckDB 连接
        tags_data: 标签数据列表，每项包含 name, category, post_count, alias
        source: 目标数据来源

    Returns:
        成功添加的标签数量
    """
    if not conn or not tags_data:
        return 0

    target_path = get_source_path_by_name(source)
    if not target_path:
        return 0

    ensure_parquet_exists(target_path, config.TAGS_SCHEMA)
    target_path_sql = target_path.replace("\\", "/")

    try:
        # Create temp table from existing parquet
        conn.execute("DROP TABLE IF EXISTS temp_edit_tags")
        conn.execute(f"CREATE TABLE temp_edit_tags AS SELECT * FROM read_parquet('{target_path_sql}')")

        count_added = 0

        for item in tags_data:
            name = item.get("name")
            if not name:
                continue

            category = int(item.get("category", 0))
            post_count = int(item.get("post_count", 0))
            alias = item.get("alias", [])

            # Delete existing if any (overwrite logic)
            conn.execute("DELETE FROM temp_edit_tags WHERE name = ?", [name])

            # Insert new tag
            conn.execute("INSERT INTO temp_edit_tags VALUES (?, ?, ?, ?)", [name, category, post_count, alias])
            count_added += 1

        # Write back to parquet
        conn.execute(f"COPY temp_edit_tags TO '{target_path_sql}' (FORMAT PARQUET)")
        conn.execute("DROP TABLE temp_edit_tags")

        # Refresh Main View
        reinit_duckdb()

        return count_added
    except Exception as e:
        logger.error(f"Add tags failed: {e}")
        return 0


def toggle_like_tag(
    conn: Any,
    name: str,
    should_like: bool = True,
    category: Optional[int] = None,
    post_count: Optional[int] = None,
    alias: Optional[List[str]] = None,
) -> bool:
    """
    切换标签的点赞状态

    Args:
        conn: DuckDB 连接
        name: 标签名称
        should_like: True 为点赞，False 为取消点赞
        category: 标签分类（可选，会自动查找）
        post_count: 帖子数量（可选）
        alias: 别名列表（可选）

    Returns:
        是否成功
    """
    if not conn or not name:
        return False

    ensure_parquet_exists(config.LIKED_TAGS_PATH, config.TAGS_SCHEMA)
    liked_path_sql = config.LIKED_TAGS_PATH.replace("\\", "/")

    try:
        conn.execute("DROP TABLE IF EXISTS temp_liked_tags")
        conn.execute(f"CREATE TABLE temp_liked_tags AS SELECT * FROM read_parquet('{liked_path_sql}')")

        # Always remove first to avoid duplicates
        conn.execute("DELETE FROM temp_liked_tags WHERE name = ?", [name])

        if should_like:
            # If data is missing, try to find it in other sources
            if category is None or post_count is None:
                for source_path in [config.USER_TAGS_PATH, config.DEFAULT_TAGS_PATH, config.TAGS_PARQUET_PATH]:
                    if os.path.exists(source_path):
                        src_sql = source_path.replace("\\", "/")
                        res = conn.execute(
                            f"SELECT category, post_count, alias FROM read_parquet('{src_sql}') WHERE name = ?", [name]
                        ).fetchone()
                        if res:
                            category = res[0]
                            post_count = res[1]
                            alias = res[2]
                            break

            # Default values if still missing
            if category is None:
                category = 0
            if post_count is None:
                post_count = 0
            if alias is None:
                alias = []

            conn.execute("INSERT INTO temp_liked_tags VALUES (?, ?, ?, ?)", [name, category, post_count, alias])

        # Write back
        conn.execute(f"COPY temp_liked_tags TO '{liked_path_sql}' (FORMAT PARQUET)")
        conn.execute("DROP TABLE temp_liked_tags")

        # Refresh View
        reinit_duckdb()
        return True
    except Exception as e:
        logger.error(f"Toggle like failed: {e}")
        return False
