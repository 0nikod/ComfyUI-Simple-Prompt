"""
分类管理模块
处理标签分类的加载和保存
"""

import logging
from typing import Any, Dict, List

from . import config
from .utils import load_json, save_json

logger = logging.getLogger("SimplePrompt")

# 默认分类（硬编码备份）
DEFAULT_CATEGORIES = [
    {"id": 0, "name": "General", "color": "#0075db"},
    {"id": 1, "name": "Artist", "color": "#c00004"},
    {"id": 3, "name": "Copyright", "color": "#c000c0"},
    {"id": 4, "name": "Character", "color": "#00aa00"},
    {"id": 5, "name": "Meta", "color": "#fd9200"},
    {"id": 6, "name": "Special", "color": "#ffd700"},  # Gold
    {"id": 7, "name": "Rating", "color": "#ff69b4"},  # HotPink
]


def get_categories() -> List[Dict[str, Any]]:
    """
    获取合并后的分类列表（默认 + 自定义）

    Returns:
        分类列表，按 ID 排序
    """
    defaults = load_json(config.DEFAULT_CATEGORY_PATH, [])
    customs = load_json(config.CUSTOM_CATEGORY_PATH, [])

    # If default is empty (first run?), create it based on hardcoded defaults
    if not defaults:
        defaults = DEFAULT_CATEGORIES.copy()
        try:
            save_json(config.DEFAULT_CATEGORY_PATH, defaults)
        except Exception:
            pass

    # Merge: Custom overrides Default if same ID
    cat_map: Dict[int, Dict[str, Any]] = {c["id"]: c for c in defaults}
    for c in customs:
        cat_map[c["id"]] = c

    # Return as list, sorted by ID
    return sorted(cat_map.values(), key=lambda x: x["id"])


def save_custom_categories(categories: List[Dict[str, Any]]) -> None:
    """
    保存自定义分类

    Args:
        categories: 分类列表

    Raises:
        Exception: 保存失败时抛出异常
    """
    save_json(config.CUSTOM_CATEGORY_PATH, categories)


def get_category_by_id(category_id: int) -> Dict[str, Any]:
    """
    根据 ID 获取分类信息

    Args:
        category_id: 分类 ID

    Returns:
        分类信息字典，如果不存在则返回默认值
    """
    categories = get_categories()
    for cat in categories:
        if cat["id"] == category_id:
            return cat
    return {"id": category_id, "name": "Unknown", "color": "#888888"}


def get_category_color(category_id: int) -> str:
    """
    获取分类颜色

    Args:
        category_id: 分类 ID

    Returns:
        颜色值（十六进制）
    """
    return get_category_by_id(category_id).get("color", "#888888")


def get_category_name(category_id: int) -> str:
    """
    获取分类名称

    Args:
        category_id: 分类 ID

    Returns:
        分类名称
    """
    return get_category_by_id(category_id).get("name", "Unknown")
