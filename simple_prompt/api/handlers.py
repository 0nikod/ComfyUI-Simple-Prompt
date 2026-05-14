"""
API 处理器层
提供平台无关的请求处理函数
这些函数接收和返回纯 Python 数据结构，不依赖任何 Web 框架
"""

import logging
import os
from typing import Any, Dict, List, Optional

from simple_prompt.core import config
from simple_prompt.core.database import get_db_connection
from simple_prompt.core import tags as tags_module
from simple_prompt.core import categories as categories_module
from simple_prompt.core import presets as presets_module
from simple_prompt.core import data_update as data_update_module

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
    return await data_update_module.check_update()


async def handle_update_tags(url: Optional[str] = None) -> Dict[str, str]:
    """
    处理更新标签数据请求

    Args:
        url: 可选的自定义下载 URL

    Returns:
        操作结果
    """
    return await data_update_module.update_tags(url)


async def handle_update_data(action: str) -> Dict[str, str]:
    """
    处理批量更新数据请求

    Args:
        action: 操作类型 ("update_liked", "update_user")

    Returns:
        操作结果
    """
    return await data_update_module.update_data(action)
