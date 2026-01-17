"""
通用工具模块
包含 JSON 读写等通用功能
"""

import json
import logging
import os
from typing import Any

logger = logging.getLogger("SimplePrompt")


def load_json(path: str, default: Any = None) -> Any:
    """
    加载 JSON 文件

    Args:
        path: 文件路径
        default: 文件不存在或加载失败时返回的默认值

    Returns:
        解析后的 JSON 数据，或默认值
    """
    if not os.path.exists(path):
        return default
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Failed to load JSON {path}: {e}")
        return default


def save_json(path: str, data: Any) -> None:
    """
    保存数据到 JSON 文件

    Args:
        path: 文件路径
        data: 要保存的数据

    Raises:
        Exception: 保存失败时抛出异常
    """
    try:
        # 确保目录存在
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
    except Exception as e:
        logger.error(f"Failed to save JSON {path}: {e}")
        raise e


def get_sql_path(path: str) -> str | None:
    """
    获取用于 SQL 查询的文件路径（将反斜杠转换为正斜杠）

    Args:
        path: 文件路径

    Returns:
        格式化后的路径，如果文件不存在则返回 None
    """
    if os.path.exists(path):
        return path.replace("\\", "/")
    return None
