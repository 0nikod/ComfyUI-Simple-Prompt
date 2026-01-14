# ComfyUI Simple Prompt

这是一个功能强大的 ComfyUI 提示词编辑/管理节点，结合了文本编辑和可视化标签管理的优势。

![Simple Prompt Interface](./doc/images/preview.png)

## ✨ 核心功能

*   **⚡ 高性能后端**: 基于 **DuckDB** 构建，轻松处理 70k+ Danbooru 标签，实现毫秒级的搜索和自动补全。
*   **🎨 可视化与文本双模式**:
    *   **可视化模式**: 胶囊式标签展示，支持拖拽排序、双击调整权重，不同类型的标签（角色、画师等）显示不同颜色。
    *   **文本模式**: 传统的文本输入体验，支持语法高亮和智能自动补全。
*   **🔍 高级搜索**:
    *   支持标签名称和**别名**搜索（例如搜 "miku" 可以找到 "hatsune_miku"）。
    *   支持按分类（画师、风格、角色等）筛选。
    *   支持按帖子数量排序，快速找到热门标签。
*   **❤️ 个性化与数据管理**:
    *   **收藏标签**: 星标你常用的标签，方便快速访问。
    *   **自定义标签**: 添加数据库中不存在的新标签。
    *   **在线更新**: 一键从云端更新 Danbooru 标签数据库。
*   **🛠️ 深度集成**: 作为标准节点无缝融入 ComfyUI 工作流。

## 🚀 安装指南

### 方法 1: 使用 ComfyUI Manager (推荐)
1.  打开 ComfyUI Manager。
2.  搜索 `Simple Prompt`。
3.  点击 **Install** 安装。

### 方法 2: 手动安装
1.  进入 ComfyUI 的 `custom_nodes` 目录：
    ```bash
    cd ComfyUI/custom_nodes/
    ```
2.  克隆本仓库：
    ```bash
    git clone https://github.com/0nikod/ComfyUI-Simple-Prompt.git
    cd comfyui_simple_prompt
    ```
3.  安装依赖 (必须安装 DuckDB)：
    ```bash
    pip install -r requirements.txt
    # 或者直接安装
    pip install duckdb
    ```
4.  重启 ComfyUI。

## 📖 使用说明

### 基本操作
*   **添加标签**: 在文本框输入，或点击“搜索”按钮查找标签。
*   **自动补全**: 在输入时会自动弹出建议，或按 `Ctrl + Space` 手动触发。
*   **调整权重**:
    *   **可视化调整**: 双击标签胶囊即可修改权重数值。
    *   **快捷键**: 选中标签后，按 `Ctrl + Up` / `Ctrl + Down` 增加或减少权重。

### 数据管理
*   **更新数据**: 点击设置图标 -> 数据管理 -> 点击 **立即更新** 即可获取最新的标签数据。
*   **自定义标签**: 在搜索弹窗中点击 "添加自定义标签"。

## ⚙️ 设置选项

点击编辑器右上角的 **设置** (齿轮图标) 进行配置：
*   **智能退格**: 删除标签时，自动清理多余的逗号和空格。
*   **下划线转换**: 添加标签时自动将 `_` 转换为 空格。
*   **语言**: 切换界面语言 (中文 / English)。

## 🏗️ 技术架构

*   **前端**: Vue 3 + Vite + PrimeVue
*   **后端**: Python + DuckDB + Parquet API
*   **通信**: ComfyUI API Routes

## 🤝 参与贡献

欢迎提交 PR 或 Issue！关于详细的架构设计，请参考 [设计文档 (中文)](./doc/DESIGN_DOC_ZH.md)。

## 📄 许可证

MIT License
