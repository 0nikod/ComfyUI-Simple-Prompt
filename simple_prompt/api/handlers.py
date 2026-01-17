"""
API 处理器层
提供平台无关的请求处理函数
这些函数接收和返回纯 Python 数据结构，不依赖任何 Web 框架
"""

import hashlib
import logging
import os
from typing import Any, Dict, List, Optional

from simple_prompt.core import config
from simple_prompt.core.database import get_db_connection, reinit_duckdb
from simple_prompt.core import tags as tags_module
from simple_prompt.core import categories as categories_module
from simple_prompt.core import presets as presets_module

logger = logging.getLogger("SimplePrompt")


# --------------------------------------------------------------------------------
# Tags Handlers
# --------------------------------------------------------------------------------


async def handle_search_tags(
    query: str, limit: int = 50, use_aliases: bool = False, categories: Optional[List[int]] = None
) -> List[Dict[str, Any]]:
    """
    处理标签搜索请求

    Args:
        query: 搜索关键词
        limit: 返回结果数量限制
        use_aliases: 是否搜索别名
        categories: 限制搜索的分类列表

    Returns:
        匹配的标签列表

    Raises:
        RuntimeError: 数据库未初始化
    """
    conn = get_db_connection()
    if not conn:
        raise RuntimeError("DuckDB not initialized")
    return tags_module.search_tags(conn, query, limit, use_aliases, categories)


async def handle_get_tags_details(names: List[str], fast: bool = False) -> Dict[str, int]:
    """
    处理获取标签详情请求

    Args:
        names: 标签名称列表
        fast: 是否使用快速模式

    Returns:
        标签名到分类 ID 的映射

    Raises:
        RuntimeError: 数据库未初始化
    """
    conn = get_db_connection()
    if not conn:
        raise RuntimeError("DuckDB not initialized")
    return tags_module.get_tags_details(conn, names, fast)


async def handle_list_tags(source: str, limit: int = 50, offset: int = 0, query: str = "") -> Dict[str, Any]:
    """
    处理列出标签请求

    Args:
        source: 数据来源
        limit: 返回数量限制
        offset: 偏移量
        query: 搜索关键词

    Returns:
        包含 data 和 total 的字典

    Raises:
        RuntimeError: 数据库未初始化
    """
    conn = get_db_connection()
    if not conn:
        raise RuntimeError("DuckDB not initialized")
    return tags_module.list_tags(conn, source, limit, offset, query)


async def handle_delete_tag(name: str, source: str) -> Dict[str, str]:
    """
    处理删除标签请求

    Args:
        name: 标签名称
        source: 数据来源

    Returns:
        操作结果

    Raises:
        RuntimeError: 数据库未初始化
        ValueError: 参数无效
    """
    if not name or not source:
        raise ValueError("Name and source are required")

    conn = get_db_connection()
    if not conn:
        raise RuntimeError("Database unavailable")

    path = tags_module.get_source_path_by_name(source)
    if not path:
        raise ValueError("Invalid source")

    success = tags_module.delete_tag(conn, name, source)
    if success:
        return {"status": "success", "message": f"Tag '{name}' deleted from {source}."}
    else:
        raise RuntimeError("Delete operation failed")


async def handle_add_custom_tag(data: Dict[str, Any]) -> Dict[str, str]:
    """
    处理添加自定义标签请求

    Args:
        data: 包含标签信息的字典，支持单个或批量

    Returns:
        操作结果

    Raises:
        RuntimeError: 数据库未初始化
        ValueError: 参数无效
    """
    conn = get_db_connection()
    if not conn:
        raise RuntimeError("Database unavailable")

    # Detect Batch or Single
    if "tags" in data and isinstance(data["tags"], list):
        tags_to_process = data["tags"]
    else:
        tags_to_process = [data]

    if not tags_to_process:
        raise ValueError("No tag data provided")

    # Get source from first item
    source = tags_to_process[0].get("source", "user")

    count = tags_module.add_tags(conn, tags_to_process, source)
    return {"status": "success", "message": f"{count} tag(s) added/updated."}


async def handle_toggle_like_tag(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    处理切换点赞标签请求

    Args:
        data: 包含标签信息的字典

    Returns:
        操作结果

    Raises:
        RuntimeError: 数据库未初始化
        ValueError: 参数无效
    """
    conn = get_db_connection()
    if not conn:
        raise RuntimeError("Database unavailable")

    name = data.get("name")
    if not name:
        raise ValueError("Name is required")

    should_like = data.get("is_liked", True)
    category = data.get("category")
    post_count = data.get("post_count")
    alias = data.get("alias", [])

    success = tags_module.toggle_like_tag(conn, name, should_like, category, post_count, alias)

    if success:
        msg = f"Tag '{name}' {'liked' if should_like else 'unliked'}."
        return {"status": "success", "message": msg, "is_liked": should_like}
    else:
        raise RuntimeError("Toggle like operation failed")


# --------------------------------------------------------------------------------
# Categories Handlers
# --------------------------------------------------------------------------------


async def handle_list_categories() -> List[Dict[str, Any]]:
    """
    处理列出分类请求

    Returns:
        分类列表
    """
    return categories_module.get_categories()


async def handle_save_categories(categories: List[Dict[str, Any]]) -> Dict[str, str]:
    """
    处理保存分类请求

    Args:
        categories: 分类列表

    Returns:
        操作结果
    """
    categories_module.save_custom_categories(categories)
    return {"status": "success"}


# --------------------------------------------------------------------------------
# Presets Handlers
# --------------------------------------------------------------------------------


async def handle_list_presets() -> Dict[str, List[Dict[str, Any]]]:
    """
    处理列出预设请求

    Returns:
        包含 defaults 和 customs 的字典
    """
    return presets_module.get_presets()


async def handle_save_presets(presets: List[Dict[str, Any]]) -> Dict[str, str]:
    """
    处理保存预设请求

    Args:
        presets: 预设列表

    Returns:
        操作结果
    """
    presets_module.save_custom_presets(presets)
    return {"status": "success"}


# --------------------------------------------------------------------------------
# Health & Update Handlers
# --------------------------------------------------------------------------------


async def handle_health_check() -> Dict[str, Any]:
    """
    处理健康检查请求

    Returns:
        系统状态信息
    """
    conn = get_db_connection()
    return {
        "status": "ok",
        "duckdb": "loaded" if conn else "failed",
        "sources": {
            "main": os.path.exists(config.TAGS_PARQUET_PATH),
            "user": os.path.exists(config.USER_TAGS_PATH),
            "liked": os.path.exists(config.LIKED_TAGS_PATH),
        },
    }


async def handle_check_update() -> Dict[str, Any]:
    """
    处理检查更新请求

    Returns:
        更新信息
    """
    import aiohttp

    release_url = "https://api.github.com/repos/0nikod/danbooru_tag_process/releases/latest"

    local_sha256 = ""
    if os.path.exists(config.TAGS_PARQUET_PATH):
        try:
            sha256_hash = hashlib.sha256()
            with open(config.TAGS_PARQUET_PATH, "rb") as f:
                for byte_block in iter(lambda: f.read(4096), b""):
                    sha256_hash.update(byte_block)
            local_sha256 = sha256_hash.hexdigest()
        except Exception as e:
            logger.error(f"Error calculating local SHA256: {e}")

    async with aiohttp.ClientSession() as session:
        headers = {"User-Agent": "ComfyUI-Simple-Prompt"}
        async with session.get(release_url, headers=headers) as resp:
            if resp.status != 200:
                raise RuntimeError(f"Failed to fetch release info: {resp.status}")
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
            raise RuntimeError("Tag data file not found")

        remote_digest = target_asset.get("digest", "")
        if remote_digest.startswith("sha256:"):
            remote_sha256 = remote_digest[7:]
        else:
            remote_sha256 = remote_digest

        update_available = local_sha256 != remote_sha256

        return {
            "update_available": update_available,
            "local_sha256": local_sha256,
            "remote_sha256": remote_sha256,
            "version": release_info.get("tag_name", "unknown"),
            "name": release_info.get("name", ""),
        }


async def handle_update_tags(url: Optional[str] = None) -> Dict[str, str]:
    """
    处理更新标签数据请求

    Args:
        url: 可选的自定义下载 URL

    Returns:
        操作结果
    """
    import aiohttp

    release_url = url or "https://api.github.com/repos/0nikod/danbooru_tag_process/releases/latest"

    async with aiohttp.ClientSession() as session:
        headers = {"User-Agent": "ComfyUI-Simple-Prompt"}
        async with session.get(release_url, headers=headers) as resp:
            if resp.status != 200:
                raise RuntimeError(f"Failed to fetch release info: {resp.status}")
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
            raise RuntimeError("Tag data file not found")

        async with session.get(download_url) as resp:
            if resp.status != 200:
                raise RuntimeError(f"Failed to download: {resp.status}")

            content = await resp.read()
            os.makedirs(config.DATA_DIR, exist_ok=True)
            temp_path = config.TAGS_PARQUET_PATH + ".tmp"
            with open(temp_path, "wb") as f:
                f.write(content)

            if os.path.exists(config.TAGS_PARQUET_PATH):
                os.remove(config.TAGS_PARQUET_PATH)
            os.rename(temp_path, config.TAGS_PARQUET_PATH)

        reinit_duckdb()
        return {"status": "success", "message": "Tags updated successfully"}


async def handle_update_data(action: str) -> Dict[str, str]:
    """
    处理批量更新数据请求

    Args:
        action: 操作类型 ("update_liked", "update_user")

    Returns:
        操作结果
    """
    conn = get_db_connection()
    if not conn:
        raise RuntimeError("Database unavailable")

    if action == "update_liked":
        target_path = config.LIKED_TAGS_PATH
    elif action == "update_user":
        target_path = config.USER_TAGS_PATH
    else:
        raise ValueError("Unknown action")

    from simple_prompt.core.database import ensure_parquet_exists

    ensure_parquet_exists(target_path, config.TAGS_SCHEMA)
    target_path_sql = target_path.replace("\\", "/")

    conn.execute("DROP TABLE IF EXISTS temp_target")
    conn.execute(f"CREATE TABLE temp_target AS SELECT * FROM read_parquet('{target_path_sql}')")

    # Build source views
    other_sources = []
    if action == "update_liked":
        if os.path.exists(config.USER_TAGS_PATH):
            other_sources.append(
                f"SELECT name, category, post_count, alias, 2 as p FROM read_parquet('{config.USER_TAGS_PATH.replace(os.sep, '/')}')"
            )
    if os.path.exists(config.DEFAULT_TAGS_PATH):
        other_sources.append(
            f"SELECT name, category, post_count, alias, 3 as p FROM read_parquet('{config.DEFAULT_TAGS_PATH.replace(os.sep, '/')}')"
        )
    if os.path.exists(config.TAGS_PARQUET_PATH):
        other_sources.append(
            f"SELECT name, category, post_count, alias, 4 as p FROM read_parquet('{config.TAGS_PARQUET_PATH.replace(os.sep, '/')}')"
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

    reinit_duckdb()

    if action == "update_liked":
        return {"status": "success", "message": "Liked tags data updated from main DB."}
    else:
        return {"status": "success", "message": "User tags data updated."}
