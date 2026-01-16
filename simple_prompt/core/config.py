"""
路径配置模块
集中管理所有数据文件路径
"""

import os

# 获取项目根目录（ComfyUI-Simple-Prompt）
# 路径: simple_prompt/core/config.py -> simple_prompt/core -> simple_prompt -> ComfyUI-Simple-Prompt
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# 数据目录
DATA_DIR = os.path.join(BASE_DIR, "data")
CUSTOM_DATA_DIR = os.path.join(DATA_DIR, "custom")

# 确保自定义数据目录存在
os.makedirs(CUSTOM_DATA_DIR, exist_ok=True)

# --------------------------------------------------------------------------------
# Primary Data Sources (按优先级排序)
# --------------------------------------------------------------------------------

# Priority 1: 用户点赞的标签
LIKED_TAGS_PATH = os.path.join(CUSTOM_DATA_DIR, "liked_tags.parquet")

# Priority 2: 用户自定义标签
USER_TAGS_PATH = os.path.join(CUSTOM_DATA_DIR, "user_tags.parquet")

# Priority 3: 默认标签
DEFAULT_TAGS_PATH = os.path.join(DATA_DIR, "default_tags.parquet")

# Priority 4: 主仓库标签（Danbooru）
TAGS_PARQUET_PATH = os.path.join(DATA_DIR, "tags.parquet")

# --------------------------------------------------------------------------------
# Category & Meta Data Paths
# --------------------------------------------------------------------------------

# 默认分类配置
DEFAULT_CATEGORY_PATH = os.path.join(DATA_DIR, "default_category.json")

# 用户自定义分类配置
CUSTOM_CATEGORY_PATH = os.path.join(CUSTOM_DATA_DIR, "custom_category.json")

# 默认预设配置
DEFAULT_PRESETS_PATH = os.path.join(DATA_DIR, "default_presets.json")

# 用户自定义预设配置
CUSTOM_PRESETS_PATH = os.path.join(CUSTOM_DATA_DIR, "custom_presets.json")

# --------------------------------------------------------------------------------
# Tags Schema
# --------------------------------------------------------------------------------

TAGS_SCHEMA = "name VARCHAR, category BIGINT, post_count BIGINT, alias VARCHAR[]"
