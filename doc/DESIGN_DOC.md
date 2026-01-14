# ComfyUI Simple Prompt 节点设计文档

## 1. 项目概述
**ComfyUI Simple Prompt** 是一个专为 ComfyUI 设计的提示词（Prompt）编辑器扩展。它通过一个可视化、可交互的编辑界面，解决了 ComfyUI 原生输入框在处理长文本、权重调整以及标签（Tag）自动补全方面的局限性。

### 核心价值
- **效率**：利用强大的标签补全和搜索功能快速构建 Prompt。
- **可视化**：将复杂的权重语法映射为直观的胶囊式标签。
- **精确性**：基于 Danbooru 等权威标签库，确保提示词的准确性。

## 2. 技术架构
本项目采用 **前后端分离** 的架构，充分利用 ComfyUI 的后端（Python/Aiohttp）和前端（Vue 3）扩展机制。

### 2.1 后端 (Backend)
- **语言**：Python
- **数据库引擎**：[DuckDB](https://duckdb.org/) (高效的分析型数据库)
- **核心逻辑**：
    - `SimplePrompt.py`：负责注入 API 路由，初始化 DuckDB 连接，并处理 Parquet 格式的标签数据。
    - **API 路由**：
        - `GET /simple-prompt/search-tags`：执行标签搜索和模糊匹配。
        - `GET /simple-prompt/health`：返回服务和数据状态。
- **数据存储**：使用 `data/tags.parquet` 作为本地静态数据源。

### 2.2 架构决策 (Architectural Decisions)
*   **选择 V1 架构**：鉴于目前 ComfyUI 生态中 V1 架构最为稳定且文档详尽，本项目目前维持 V1 架构。
*   **DuckDB 后端化**：将数据库引擎从前端 WASM 迁移至后端 Python，显着提升了冷启动速度，并降低了浏览器的内存压力。

### 2.2 前端 (Frontend)
- **框架**：Vue 3
- **构建工具**：Vite
- **通信**：通过标准的浏览器 `fetch` 与 ComfyUI 后端 API 通信。
- **扩展注入**：利用 ComfyUI 的 `app.registerExtension` API，在 `SimplePrompt` 节点上动态添加 "Edit Prompt" 按钮。
- **主要组件**：
    - `TextEditor.vue`：核心编辑器，包含文本解析和标签可视化逻辑。
    - `TagSearchModal.vue`：独立的标签搜索和筛选窗口。
    - `AutocompleteList.vue`：智能提示下拉列表。

## 3. 功能特性

### 3.1 智能补全与搜索
- **实时匹配**：在编辑器中输入时，实时从后台过滤并返回匹配的标签。
- **别名支持**：支持通过别名（Alias）搜索（例如输入 "shojo" 可匹配到 "girl" 类标签）。
- **分类高亮**：根据 Danbooru 分类（Character, Copyright, Artist 等）为标签应用不同的配色方案。

### 3.2 可视化编辑
- **双向绑定**：源码模式（文本）与可视化模式（胶囊标签）实时同步。
- **权重调整**：支持通过点击或快捷操作调整标签权重，自动生成 `(tag:weight)` 语法。

### 3.3 设置与持久化
- **用户偏好**：支持下划线转空格、自动括号转义、智能退格等功能。
- **持久化**：设置项存储于浏览器的 `localStorage` 中。

### 3.4 安全性设计 (Security Design)
*   **参数化查询**：所有基于用户输入的 SQL 定制均通过 DuckDB 的 `execute(sql, params)` 实现，确保 100% 免疫 SQL 注入攻击。
*   **API 隔离**：后端 API 仅暴露受控的查询接口，不提供通用的 SQL 执行入口。

## 4. 数据模型 (Data Schema)
后端 DuckDB 使用的 `tags` 视图结构：

| 列名 | 类型 | 描述 |
| :--- | :--- | :--- |
| `id` | BIGINT | 唯一标识符 |
| `name` | VARCHAR | 标签标准名称 |
| `category` | BIGINT | 分类 ID (0:General, 1:Artist, 3:Copyright, 4:Character, 5:Meta) |
| `post_count` | BIGINT | 使用频率 |
| `alias` | VARCHAR[] | 别名数组 |

## 5. 开发说明
- **开发模式**：提供独立的 `npm run dev` 环境，通过 Mock 层模拟 ComfyUI 环境，实现极速界面开发。
- **国际化**：内置 `vue-i18n`，目前支持中英文切换。

---
*本文档旨在作为项目的核心设计蓝图，随着功能的演进将持续更新。*
