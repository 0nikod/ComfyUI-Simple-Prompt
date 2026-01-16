# ComfyUI-Simple-Prompt 架构文档

本文档说明了 `ComfyUI-Simple-Prompt` 在 v0.1.0 重构后的架构设计。本次重构的主要目标是将核心业务逻辑与 ComfyUI 框架解耦，并支持开发模式下的热重载。

## 目录结构

```
ComfyUI-Simple-Prompt/
├── simple_prompt/
│   ├── __init__.py           # 包初始化
│   ├── core/                 # 核心业务逻辑（平台无关）
│   │   ├── config.py         # 路径配置
│   │   ├── database.py       # DuckDB 连接与初始化
│   │   ├── tags.py           # 标签搜索与管理逻辑
│   │   ├── categories.py     # 分类管理逻辑
│   │   ├── presets.py        # 预设管理逻辑
│   │   └── utils.py          # 通用工具函数
│   ├── api/                  # API 抽象层
│   │   └── handlers.py       # 纯函数式的请求处理器
│   └── comfyui/              # ComfyUI 适配层
│       ├── nodes.py          # 节点定义 (SimplePrompt)
│       └── server.py         # PromptServer 路由注册 & 热重载逻辑
├── tests/                    # 单元测试
├── js/                       # 前端编译产物
├── src/                      # 前端源代码
├── __init__.py               # ComfyUI 入口点
└── pyproject.toml            # Python 项目配置
```

## 核心设计

### 1. 分层架构
- **Core Layer (`simple_prompt/core`)**: 包含纯粹的 Python 逻辑，不依赖 `aiohttp` 或 `ComfyUI`。所有数据操作（DuckDB、JSON读写）都在此层完成。
- **API Layer (`simple_prompt/api`)**: `handlers.py` 充当中间层，接收参数并调用 Core 层函数，返回标准 Python 字典/列表。
- **Adapter Layer (`simple_prompt/comfyui`)**: 负责将 ComfyUI 的 `PromptServer` 请求转发给 API 层，并将结果封装为 `web.json_response`。

### 2. 数据管理
- 使用 **DuckDB** 作为主要查询引擎，通过视图（View）合并多个 Parquet 数据源（主仓库、用户自定义、点赞、默认）。
- 配置文件（分类、预设）使用 JSON 存储。
- 所有数据路径在 `simple_prompt/core/config.py` 中集中管理。

## 开发指南

### 热重载 (Hot Reload)

为了提高开发效率，后端支持修改代码后**无需重启 ComfyUI** 即可生效。

**启用方法：**
设置环境变量 `SIMPLE_PROMPT_DEV=1` 启动 ComfyUI。

**Windows (PowerShell):**
```powershell
$env:SIMPLE_PROMPT_DEV="1"
.\run_nvidia_gpu.bat  # 或你的启动脚本
```

**工作原理：**
- `simple_prompt/comfyui/server.py` 包含一个 `_maybe_reload()` 函数。
- 每次 API 请求（如搜索标签）到达时，如果是开发模式，该函数会使用 `importlib.reload` 重新加载 `simple_prompt.core` 和 `simple_prompt.api` 下的所有模块。
- **注意**：修改 `nodes.py`（节点定义）或 `server.py`（路由注册）本身后，**仍需重启** ComfyUI，因为这些是在启动时注册的。

### 运行测试

使用 `pytest` 运行单元测试：

```bash
uv run pytest tests/ -v
```

测试环境是独立的，不依赖 ComfyUI 运行环境。
