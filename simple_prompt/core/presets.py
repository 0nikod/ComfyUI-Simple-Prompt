"""
预设管理模块
处理 Meta 预设的加载和保存
"""

import logging
import os
from typing import Any, Dict, List

from . import config
from .utils import load_json, save_json

logger = logging.getLogger("SimplePrompt")


def get_presets() -> Dict[str, List[Dict[str, Any]]]:
    """
    获取预设列表（默认 + 自定义）

    Returns:
        包含 defaults 和 customs 的字典
    """
    defaults = load_json(config.DEFAULT_PRESETS_PATH, [])
    customs = load_json(config.CUSTOM_PRESETS_PATH, [])

    # Ensure default file exists
    if not os.path.exists(config.DEFAULT_PRESETS_PATH):
        defaults = []
        try:
            save_json(config.DEFAULT_PRESETS_PATH, defaults)
        except Exception:
            pass

    return {"defaults": defaults, "customs": customs}


def save_custom_presets(presets: List[Dict[str, Any]]) -> None:
    """
    保存自定义预设

    Args:
        presets: 预设列表

    Raises:
        Exception: 保存失败时抛出异常
    """
    save_json(config.CUSTOM_PRESETS_PATH, presets)


def get_all_presets() -> List[Dict[str, Any]]:
    """
    获取所有预设（合并默认和自定义）

    Returns:
        预设列表
    """
    data = get_presets()
    return data["defaults"] + data["customs"]


def get_preset_by_id(preset_id: str) -> Dict[str, Any] | None:
    """
    根据 ID 获取预设

    Args:
        preset_id: 预设 ID

    Returns:
        预设信息，如果不存在则返回 None
    """
    for preset in get_all_presets():
        if preset.get("id") == preset_id:
            return preset
    return None
