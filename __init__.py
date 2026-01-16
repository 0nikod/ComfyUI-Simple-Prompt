"""
Simple Prompt - ComfyUI Custom Node
一个带有高级可视化标签编辑器的提示词构建节点

架构说明：
- simple_prompt/core/   - 核心业务逻辑（与平台无关）
- simple_prompt/api/    - API 处理器层
- simple_prompt/comfyui/ - ComfyUI 特定适配

热重载：设置环境变量 SIMPLE_PROMPT_DEV=1 启用开发模式
"""

import os
import sys

# 将当前目录添加到 sys.path，以便能导入 simple_prompt 包
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)

# 初始化核心模块
from simple_prompt.core.database import init_duckdb

init_duckdb()

# 注册 API 路由（副作用导入）
from simple_prompt.comfyui import server  # noqa: F401

# 导出节点定义
from simple_prompt.comfyui.nodes import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

# 前端扩展目录
WEB_DIRECTORY = "./js"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
