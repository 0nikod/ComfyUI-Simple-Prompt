# ComfyUI-Simple-Prompt Architecture Documentation

This document describes the architectural design of `ComfyUI-Simple-Prompt` after the v0.1.0 refactor. The main goal of this refactor was to decouple the core business logic from the ComfyUI framework and support hot reloading during development.

## Directory Structure

```
ComfyUI-Simple-Prompt/
├── simple_prompt/
│   ├── __init__.py           # Package initialization
│   ├── core/                 # Core business logic (platform-independent)
│   │   ├── config.py         # Path configurations
│   │   ├── database.py       # DuckDB connection and initialization
│   │   ├── tags.py           # Tag search and management logic
│   │   ├── categories.py     # Category management logic
│   │   ├── presets.py        # Preset management logic
│   │   └── utils.py          # General utility functions
│   ├── api/                  # API abstraction layer
│   │   └── handlers.py       # Pure functional request handlers
│   └── comfyui/              # ComfyUI adapter layer
│       ├── nodes.py          # Node definitions (SimplePrompt)
│       └── server.py         # PromptServer route registration & hot reload logic
├── tests/                    # Unit tests
├── js/                       # Frontend build artifacts
├── src/                      # Frontend source code
├── __init__.py               # ComfyUI entry point
└── pyproject.toml            # Python project configuration
```

## Core Design

### 1. Layered Architecture
- **Core Layer (`simple_prompt/core`)**: Contains pure Python logic, independent of `aiohttp` or `ComfyUI`. All data operations (DuckDB, JSON read/write) are handled in this layer.
- **API Layer (`simple_prompt/api`)**: `handlers.py` acts as an intermediate layer, receiving parameters, calling Core layer functions, and returning standard Python dictionaries/lists.
- **Adapter Layer (`simple_prompt/comfyui`)**: Responsible for forwarding `PromptServer` requests to the API layer and wrapping the results in `web.json_response`.

### 2. Data Management
- Uses **DuckDB** as the primary query engine, merging multiple Parquet data sources (Main repository, User custom, Liked, Default) through Views.
- Configuration files (categories, presets) are stored as JSON.
- All data paths are centrally managed in `simple_prompt/core/config.py`.

## Development Guide

### Hot Reload

To improve development efficiency, the backend supports modifying code **without restarting ComfyUI**.

**How to enable:**
Set the environment variable `SIMPLE_PROMPT_DEV=1` when starting ComfyUI.

**Windows (PowerShell):**
```powershell
$env:SIMPLE_PROMPT_DEV="1"
.\run_nvidia_gpu.bat  # Or your startup script
```

**How it works:**
- `simple_prompt/comfyui/server.py` contains a `_maybe_reload()` function.
- Every API request (e.g., tag search) triggers this function. If in development mode, it uses `importlib.reload` to reload all modules under `simple_prompt.core` and `simple_prompt.api`.
- **Note**: After modifying `nodes.py` (node definitions) or `server.py` (route registration), you **still need to restart** ComfyUI as these are registered at startup.

### Running Tests

Use `pytest` to run unit tests:

```bash
uv run pytest tests/ -v
```

The test environment is independent and does not rely on the ComfyUI runtime.
