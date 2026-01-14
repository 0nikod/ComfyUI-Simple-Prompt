# ComfyUI Simple Prompt 节点功能设计文档

## 1. 产品概述 (Overview)
**ComfyUI Simple Prompt** 是一个专注于提高提示词（Prompt）编写效率的自定义节点。它提供了一个简洁的节点界面和一个功能强大的模态（Modal）编辑窗口，旨在解决原生 ComfyUI 输入框在长文本编辑、权重调整和结构可视化方面的痛点。

## 2. 核心功能 (Core Features)

### 2.1 节点形态 (Node Interface)
在 ComfyUI 的工作流画布中，该节点保持最小化设计，避免干扰视觉。

*   **输入类型 (Input Types)**:
    *   遵循 ComfyUI 标准 `INPUT_TYPES` 定义。
    *   **必需 (Required)**: `prompt_text` (`STRING`, `multiline=True`, `dynamicPrompts=True`).
*   **组件 (Widget)**:
    *   **文本组件**: 标准文本组件，用于显示当前 Prompt。
    *   **自定义按钮**: "Edit Prompt" 按钮，通过前端扩展 (Frontend Extension) 注入。
*   **输出类型 (Output Types)**:
    *   `STRING`: 处理后的 Prompt 字符串。

### 2.2 进阶提示词编辑器 (Advanced Prompt Editor Modal)
点击编辑按钮后打开的全屏/大尺寸弹窗。

#### 2.2.1 界面布局 (UI Layout)
*   **容器**: 全屏覆盖 (Overlay)，`z-index: 1000+`。
*   **主题**: 暗色模式 (Dark Mode)，背景色 `#1e1e1e` 或跟随 ComfyUI 主题色。
*   **顶部 (Header)**: 
    *   **标题**: "Simple Prompt Editor"
    *   **设置图标**: 齿轮图标，点击弹出下拉菜单。
    *   **关闭**: "X" 按钮。
*   **中部 (Body)**: 分栏视图 (Split View，默认 50/50，可调整大小)。
    *   **左侧**: 原始内容 (`<textarea>`)，使用等宽字体。
    *   **右侧**: 可视化标签 (Flex wrap container)。
    *   **侧边栏** (右侧或浮动): 搜索面板，宽度 ~300px。

#### 2.2.2 交互逻辑与数据

1.  **标签数据结构 (Data Schema)**
    ```typescript
    interface TagItem {
        id: string;         // 唯一 ID
        text: string;       // 标签文本，如 "1girl"
        weight: number;     // 权重，默认 1.0
        enabled: boolean;   // 是否启用
        category?: 'aesthetic' | 'general' | 'character'; // 分类
    }
    ```

2.  **双向同步 (Two-way Binding)**
    *   **输入 -> 可视化**: 解析器正则:
        ```javascript
        // 匹配 (text:weight) 格式或普通逗号分隔文本
        /\(([^:]+?):([0-9.]+)\)|([^,()]+)/g
        ```
    *   **可视化 -> 输入**: 重构字符串 `(text:weight), text`。

3.  **标签补全与搜索 (Autocomplete & Search)**
    *   **数据源**: `data/tags.parquet` (默认存放于插件根目录下的 `data` 文件夹)。
    *   **引擎**: 前端 WASM (使用 `@duckdb/duckdb-wasm`)。
        *   **理由**: 快速、压缩效率高、无需 Python 后端处理（零延迟搜索打字体验）。
    *   **数据模型 (Schema)**:
        | 列名 (Column) | 类型 (Type) | 描述 (Description) |
        | :--- | :--- | :--- |
        | `id` | `int64` | 唯一 ID |
        | `name` | `string` | 标签名称 (例如 "hatsune miku") |
        | `category`| `int64` | Danbooru 分类枚举 (见下表) |
        | `post_count` | `int64` | 使用次数 (热度) |
        | `alias` | `list[string]` | 别名列表 |
        | `is_deprecated` | `bool` | 是否已弃用 |
    
    *   **分类枚举 (Category Enum - Danbooru 标准)**:
        | 值 | 名称 | 颜色 |
        | :--- | :--- | :--- |
        | `0` | general (一般) | 蓝色 `#0075db` |
        | `1` | artist (艺术家) | 红色 `#c00004` |
        | `3` | copyright (系列) | 紫色 `#c000c0` |
        | `4` | character (角色) | 绿色 `#00aa00` |
        | `5` | meta (元数据) | 橙色 `#fd9200` |

    *   **UI 显示**:
        *   行: `[颜色点] [标签名]  [使用次数 (右对齐)]`
        *   如果是别名匹配: 显示 `标签名 (matches: "alias")`。

#### 2.2.3 补全逻辑详解 (Completion Logic Detail)

1.  **触发机制**
    *   **自动触发**: 当光标前的单词长度 >= 2 个字符时自动弹出。
    *   **手动触发**: 快捷键 `Ctrl + Space` 强制弹出。
    *   **边界**: 光标位于单词中间或末尾时触发，位于单词开头时不触发。

2.  **查询构建**
    *   **SQL 模板**:
        ```sql
        SELECT * FROM tags.parquet
        WHERE (name ILIKE '%{query}%' {OR_ALIAS_CLAUSE})
        ORDER BY
          CASE WHEN name = '{query}' THEN 3          -- 完全匹配名称优先
          WHEN list_contains(alias, '{query}') THEN 2 -- 完全匹配别名次之
          WHEN name ILIKE '{query}%' THEN 1          -- 前缀匹配再次
          ELSE 0 END DESC,
          post_count DESC                            -- 最后按热度排序
        LIMIT 20
        ```
    *   **别名子句 (Alias Clause)**: 取决于设置 `Use Aliases in Autocomplete`。若为 True，则添加 `OR list_contains(alias, '{query}')` (伪代码，具体取决于 DuckDB 列表查询语法)。

3.  **交互行为**
    *   **导航**: `Up` / `Down` 键切换高亮项。
    *   **选择**: `Tab` 或 `Enter` 键确认选择。
    *   **取消**: `Esc` 或点击外部区域关闭。

4.  **插入后处理**
    *   **替换**: 将当前正在输入的“半截单词”替换为完整的标签名称。
    *   **自动逗号**: 如果标签后没有逗号，自动追加 `, `。
    *   **格式保持**: 
        *   若在 `( )` 内部触发，仅插入标签名，保持括号和权重不变。
        *   若标签本身包含特殊字符（如括号），根据“转义括号 (Escape Brackets)”设置决定是否转义。
    *   **分类颜色**: 参见 2.2.2 节的分类枚举表。

5.  **设置功能 (Settings & Formatting)**
    *   **下划线转空格 (Convert `_` to Space)**:
        *   动作: `text.replace(/_/g, ' ')`.
    *   **转义括号 (Escape Brackets)**:
        *   动作: `text.replace(/\(/g, '\\(').replace(/\)/g, '\\)')`.
        *   在设置菜单中切换。
    *   **别名设置 (Alias Settings)**:
        *   **在搜索中使用别名**: 切换开关 (默认: True)。若为 False，搜索仅匹配主标签名。
        *   **在补全中使用别名**: 切换开关 (默认: True)。若为 False，补全列表仅显示主标签名。

## 3. 技术规格 (Technical Specifications)

### 3.1 Python 节点定义
符合 `llms.txt` 中隐含的 Registry/User 规范及 ComfyUI 标准：

```python
class SimplePrompt:
    """A simple prompt node with an advanced visual tag editor."""
    
    DESCRIPTION = "A prompt builder node with an advanced visual editor for tag management, weight adjustment, and autocomplete."
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "prompt_text": ("STRING", {"multiline": True, "dynamicPrompts": True}),
            },
            # "hidden": {"unique_id": "UNIQUE_ID"}, # 如果需要事件标识
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "run"
    CATEGORY = "SimplePrompt"
    OUTPUT_NODE = False  # 非终端节点

    def run(self, prompt_text):
        return (prompt_text,)
```

### 3.2 前端扩展 (Frontend Extension) - `js/simple_prompt.js`
*   **注册 (Registration)**:
    ```javascript
    app.registerExtension({
        name: "SimplePrompt.Editor",  // 使用项目前缀命名空间
        async nodeCreated(node, app) {
            if (node.comfyClass === "SimplePrompt") {
                // 组件注入逻辑 (Widget Injection Logic)
                const btn = node.addWidget("button", "Edit Prompt", null, () => {
                     // 打开模态窗口逻辑 (Open Modal Logic)
                });
            }
        }
    });
    ```
*   **通信**: 纯前端逻辑，除了初始标签库加载（可静态打包）外，无需 Python 交互。

### 3.3 设置持久化 (Settings Persistence)
*   **存储方式**: 使用 `localStorage` 保存用户偏好设置。
*   **存储键**: `simplePrompt.settings`
*   **存储内容**:
    ```typescript
    interface UserSettings {
        convertUnderscoreToSpace: boolean;  // 默认: true
        escapeBrackets: boolean;            // 默认: false
        useAliasesInSearch: boolean;        // 默认: true
        useAliasesInAutocomplete: boolean;  // 默认: true
        language: 'en' | 'zh-CN';           // 默认: 跟随浏览器
    }
    ```
*   **加载时机**: 模态窗口首次打开时从 `localStorage` 读取。
*   **保存时机**: 设置变更时立即保存。

### 3.4 错误处理 (Error Handling)
| 场景 | 处理方式 |
| :--- | :--- |
| `tags.parquet` 加载失败 | 显示 Toast 提示，禁用补全功能，允许手动输入 |
| DuckDB-WASM 初始化失败 | 回退到简单前缀匹配（内存中小型缓存） |
| 无效权重值 (负数/NaN) | 自动修正为 `1.0` 并显示警告 |
| 解析错误 (畸形括号) | 保留原始文本，标记为"未解析"标签 |

### 3.5 性能考虑 (Performance Considerations)
*   **标签库加载**:
    *   首次加载预计时间: < 500ms (典型 ~5MB Parquet 文件)
    *   使用 Web Worker 避免阻塞主线程
    *   加载期间显示进度指示器
*   **搜索延迟**:
    *   输入防抖: 150ms
    *   查询超时: 500ms (超时则显示部分结果)
*   **缓存策略**:
    *   Parquet 文件通过 Service Worker 缓存 (Cache-First)
    *   热门查询结果内存缓存 (LRU, 100 条)

### 3.6 独立开发环境 (Development Environment)
为了提高前端开发效率，项目将包含一个独立的开发环境，允许在不运行 ComfyUI 的情况下开发和调试编辑器界面。

*   **入口 (Entry Point)**: `index.html` (仅用于开发)。
*   **模拟层 (Mock Layer)**: `src/dev.ts`
    *   **模拟 ComfyUI API**: 提供 `app`, `api` 等对象的 Mock 实现。
    *   **模拟节点交互**: 模拟 `node.addWidget` 和 Widget 值的读写。
*   **启动方式**: `npm run dev` (通过 Vite 开发服务器启动)。
*   **优势**:
    *   **热重载 (HMR)**: 毫秒级界面更新。
    *   **独立调试**: 使用浏览器标准 DevTools 调试 Vue 组件和 DuckDB-WASM，不受 ComfyUI 环境干扰。

### 3.7 数据管理策略 (Data Management Strategy)
*   **文件存放位置**: 
    *   核心数据库: `custom_nodes/comfyui_simple_prompt/data/tags.parquet`
    *   自定义数据: `custom_nodes/comfyui_simple_prompt/data/custom/*.parquet` (未来支持)
*   **自动更新 (Auto-Update)**:
    *   **机制**: 节点初始化时检查 GitHub Releases。
    *   **逻辑**: 对比本地文件的 Hash 或版本号，若发现新版本则自动下载/覆盖。
    *   **代理支持**: 考虑到网络环境，应支持配置 GitHub 代理/镜像地址。
*   **自定义数据 (Custom Data)**:
    *   允许用户在 `data/custom` 目录下放入格式兼容的 Parquet 文件，前端 DuckDB 加载时自动合并查询。


## 4. 技术栈 (Tech Stack)
*   **核心**: Vue 3 + Vite (构建输出至 `dist/style.css` & `dist/simple-prompt.js`)。
*   **加载器**: ComfyUI 加载构建后的 JS/CSS。
*   **图标**: Iconify (mdi)。
*   **国际化 (i18n)**: `vue-i18n` (Legacy API 模式以保持简单)。支持英文 (en) 和中文 (zh-CN)。

### 4.1 国际化 (Internationalization)
*   **ComfyUI 标准 (ComfyUI Standard)**:
    *   使用 `locales/en/nodeDefs.json` & `locales/zh/nodeDefs.json` 用于节点名称和组件标签翻译。
    *   遵循 ComfyUI 原生翻译规范。
*   **Simple Prompt 模态窗口**:
    *   Vue 应用内部使用 `vue-i18n`。
    *   **默认语言**: 从浏览器检测 (`api.getLanguage()` 如果可用，或 `navigator.language`)。
    *   **语言切换**: 在设置菜单内。
    *   **范围**: UI 标签（标题、按钮、设置）。标签内容保持原样。

## 5. 键盘快捷键一览 (Keyboard Shortcuts)

| 快捷键 | 功能 | 适用范围 |
| :--- | :--- | :--- |
| `Ctrl + Space` | 强制弹出补全菜单 | 文本编辑区 |
| `Up` / `Down` | 切换补全选项 | 补全下拉菜单 |
| `Tab` / `Enter` | 确认选择 | 补全下拉菜单 |
| `Esc` | 关闭补全菜单 / 关闭模态窗口 | 全局 |
| `Ctrl + S` | 保存并关闭 | 模态窗口 |
| `Ctrl + Z` | 撤销 | 文本编辑区 |
| `Ctrl + Shift + Z` | 重做 | 文本编辑区 |

## 6. 依赖与兼容性 (Dependencies & Compatibility)

### 6.1 ComfyUI 版本要求
*   **最低版本**: ComfyUI >= 0.2.0 (支持 Frontend Extension API)

### 6.2 NPM 依赖
```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "vue-i18n": "^9.0.0",
    "@duckdb/duckdb-wasm": "^1.28.0",
    "@iconify/vue": "^4.1.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "typescript": "^5.3.0"
  }
}
```

### 6.3 构建产物 (Build Artifacts)
```
dist/
├── simple-prompt.js      # 主入口 (ES Module)
├── simple-prompt.css     # 样式
└── chunks/
    └── duckdb-*.wasm     # DuckDB WASM 二进制
```

