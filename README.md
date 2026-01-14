# ComfyUI Simple Prompt

**ComfyUI Simple Prompt** is an advanced prompt editor for ComfyUI. It provides a full-screen workspace to help you write, managed, and visualize your prompts with ease.

![Preview](doc/img.png)

## ✨ Features

### 🚀 Instant Autocomplete
- **Fast & Smart**: Search through thousands of tags instantly. 
- **Alias Support**: Find tags even if you type a synonym or partial name.
- **Smart Ranking**: Popular tags appear first, helping you find what you need faster.

### 🎨 Visual Editor
- **Tag Cloud**: See your prompt as visual "capsules" instead of just flat text.
- **Easy Weighting**: Change tag weights `(tag:weight)` by double-clicking or scrolling.
- **Color Coding**: Tags are automatically colored by category (Characters, Styles, etc.) for better readability.

### 🛠️ User Friendly
- **Split View**: Edit raw text on one side and see organized tags on the other.
- **Smart Editing**: Features like "Smart Backspace" help clean up commas and spaces as you delete.
- **Multi-Language**: Full support for both English and Chinese.

## 📦 Installation

### Method 1: ComfyUI Manager
1. Search for `Simple Prompt` in the manager.
2. Click **Install** and restart ComfyUI.

### Method 2: Manual
```bash
git clone https://github.com/jtydhr88/comfyui_simple_prompt
cd comfyui_simple_prompt
# Install Python dependencies
pip install -r requirements.txt
# Build frontend
npm install && npm run build
```

## ⌨️ Shortcuts

- `Ctrl + Space`: Open autocomplete
- `Up / Down`: Select tag
- `Enter / Tab`: Confirm tag
- `Ctrl + S`: Save & Close
- `Esc`: Cancel

## 📄 License
MIT
