# ComfyUI Simple Prompt

**ComfyUI Simple Prompt** 是一个专为 ComfyUI 设计的高级提示词编辑器。它提供了一个全屏工作区，帮助您轻松地编写、管理和可视化提示词。

![预览](doc/img.png)

## ✨ 功能特性

### 🚀 极速自动补全
- **智能搜索**: 瞬间检索成千上万个标签。
- **别名支持**: 即使输入的是近义词或部分名称，也能精准找到标签。
- **热度排序**: 常用标签优先显示，助您更快速地找到所需内容。

### 🎨 视觉编辑器
- **标签云**: 将提示词以视觉“胶囊”形式展现，清晰直观。
- **轻松权重管理**: 通过双击或滚动鼠标滑轮，轻松调整标签权重 `(tag:weight)`。
- **自动分类上色**: 标签根据类别（角色、风格等）自动上色，大幅提升可读性。

### 🛠️ 用户友好
- **分屏视图**: 一侧编辑原始文本，另一侧实时查看组织好的标签。
- **智能编辑**: 具有“智能退格”等功能，在删除标签时自动清理多余的逗号和空格。
- **多语言支持**: 完美支持中文和英文。

## 📦 安装说明

### 方法 1: 使用 ComfyUI Manager
1. 在管理器中搜索 `Simple Prompt`。
2. 点击 **Install** 并重启 ComfyUI。

### 方法 2: 手动安装
```bash
git clone https://github.com/jtydhr88/comfyui_simple_prompt
cd comfyui_simple_prompt
# 安装 Python 依赖
pip install -r requirements.txt
# 编译前端
npm install && npm run build
```

## ⌨️ 快捷键

- `Ctrl + Space`: 开启自动补全
- `Up / Down`: 选择标签
- `Enter / Tab`: 确认标签
- `Ctrl + S`: 保存并关闭
- `Esc`: 取消

## 📄 许可协议
MIT
