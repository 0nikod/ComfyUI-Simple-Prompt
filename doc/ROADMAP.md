# ComfyUI Simple Prompt 开发路线图 (Roadmap)

基于 `doc/FUNCTIONAL_SPEC.md` 设计文档与当前项目状态制定。

## 阶段 1: 基础架构搭建 (Phase 1: Infrastructure Initialization)
**目标**: 确保项目骨架完整，Python 节点与前端构建流程打通。

- [ ] **Python 节点实现**
  - [ ] 重命名/重构 `ComfyUIFEExampleVueBasic.py` 为 `SimplePrompt.py`（或类似）。
  - [ ] 实现 `SimplePrompt` 类，定义 `INPUT_TYPES` (含 `prompt_text`) 和基本 `run` 方法。
  - [ ] 确保节点在 ComfyUI 中正确注册并可见。
- [ ] **前端工程化**
  - [ ] 创建前端入口文件 `src/main.ts` (当前缺失)。
  - [ ] 验证 `vite.config.mts` 构建配置，确保输出 `js/main.js` 能被 ComfyUI 加载。
  - [ ] 实现 `app.registerExtension` 逻辑，在 `SimplePrompt` 节点上添加 "Edit Prompt" 按钮。

## 阶段 1.5: 独立开发环境 (Phase 1.5: Standalone Dev Environment)
**目标**: 允许在不启动 ComfyUI 的情况下开发和调试前端界面。

- [ ] **独立入口配置**
  - [ ] 创建 `index.html` 作为开发服务器入口。
  - [ ] 创建 `src/dev.ts` 用于模拟 ComfyUI 环境（Mock Node/App 对象）。
  - [ ] 配置 `vite.config.mts` 支持开发服务器模式 (`npm run dev`)。


## 阶段 2: 核心界面开发 (Phase 2: Core UI Development)
**目标**: 实现模态窗口编辑器框架，完成基本的布局。

- [ ] **模态窗口组件 (Modal Wrapper)**
  - [ ] 创建全屏覆盖的 Vue 组件。
  - [ ] 实现打开/关闭逻辑。
  - [ ] 基础布局：Header (标题, 设置, 关闭), Body (Split View), Footer (如果有)。
- [ ] **文本编辑器 (Text Editor)**
  - [ ] 左侧 `<textarea>` 或代码编辑器组件（支持语法高亮为佳）。
  - [ ] 实现与节点 widget 值的双向绑定。
- [ ] **可视化标签区 (Visual Tag Area)**
  - [ ] 右侧 Flex 容器布局。
  - [ ] `TagItem` 组件开发 (显示文本、权重、颜色分类)。

## 阶段 3: 数据集成与 DuckDB (Phase 3: Data & Logic)
**目标**: 集成 DuckDB-WASM 并加载 `tags_processed.parquet` 数据。

- [ ] **DuckDB-WASM 集成**
  - [ ] 安装 `@duckdb/duckdb-wasm`, `duckdb-async` 等依赖。
  - [ ] 编写 DuckDB 服务层 (Service Layer)，处理初始化与查询。
  - [ ] 配置 Vite 以正确处理 WASM 文件资源路径。
- [ ] **数据加载**
  - [ ] 确保 `tags_processed.parquet` 可被前端访问 (配置 web server 路由至 `data/` 目录)。
  - [ ] 实现数据加载与缓存策略。


## 阶段 4: 解析器与双向绑定 (Phase 4: Parser & Logic)
**目标**: 实现 Prompt 文本与 Tag 对象之间的无缝转换。

- [ ] **解析器 (Parser)**
  - [ ] 实现 `textToTags(text)`: 正则解析 `(tag:1.2)` 格式。
  - [ ] 实现 `tagsToText(tags)`: 序列化回字符串。
- [ ] **交互同步**
  - [ ] 文本编辑时实时更新 Tag 视图。
  - [ ] 操作 Tag (删除、权重调整) 时实时更新文本。

## 阶段 5: 高级功能 (Phase 5: Advanced Features)
**目标**: 实现补全、设置与国际化。

- [ ] **自动补全 (Autocomplete)**
  - [ ] 基于 DuckDB 的模糊查询与排序算法。
  - [ ] 补全 UI 下拉菜单。
  - [ ] 键盘导航支持 (`Tab`, `Enter`, `Up`, `Down`).
- [ ] **用户设置**
  - [ ] 实现设置面板。
  - [ ] `localStorage` 持久化 (下划线替换、转义括号等选项)。
- [ ] **国际化 (i18n)**
  - [ ] 配置 `vue-i18n`。
  - [ ] 完善中英文翻译资源。
- [ ] **数据管理增强 (Data Management)**
  - [ ] 实现 `tags.parquet` 自动更新逻辑 (Python 端)。
  - [ ] 支持自定义数据文件加载 (`data/custom/*.parquet`)。


## 阶段 6: 测试与优化 (Phase 6: Polish)
**目标**: 修复 Bug，优化性能，准备发布。

- [ ] **性能优化**: 确保大文件加载不卡顿 (Web Worker)。
- [ ] **样式微调**: 适配 ComfyUI 暗色主题。
- [ ] **文档完善**: 更新 README.md。
