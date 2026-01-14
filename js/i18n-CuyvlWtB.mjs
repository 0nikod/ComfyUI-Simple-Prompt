import { c } from "./vue-i18n-CDK56dMz.mjs";
const o = { cancel: "Cancel", save: "Save", close: "Close", done: "Done", confirm: "Confirm", update: "Update" }, r = { title: "Settings", sections: { textFormat: "Text Formatting", autocomplete: "Autocomplete & Search", editing: "Editing Behavior", interface: "Interface", data: "Data Management", tagManager: "Tag Manager" }, items: { convertUnderscore: "Convert Underscore to Space", convertUnderscoreDesc: "Automatically convert underscores to spaces", escapeBrackets: "Escape Brackets", escapeBracketsDesc: "Escape parentheses as \\(\\)", useAliasSearch: "Use Aliases in Search", useAliasSearchDesc: "Match tag aliases when searching", useAliasAutocomplete: "Use Aliases in Autocomplete", useAliasAutocompleteDesc: "Match aliases in autocomplete (may impact performance)", smartBackspace: "Smart Backspace", smartBackspaceDesc: "When deleting the last character of a tag, also remove preceding comma and space", language: "Language", languageDesc: "Interface language", allowEditDefaultTags: "Allow Editing Default Tags", allowEditDefaultTagsDesc: "Enable editing and deleting of default tags (Use with caution).", updateTags: "Update Tags Data", updateTagsDesc: "Download the latest tags.parquet from GitHub", updateLikedTags: "Update Liked Tags", updateLikedTagsDesc: "Sync liked tags data with main database.", updateUserTags: "Update User Tags", updateUserTagsDesc: "Sync custom user tags data with main database.", updateTagsStatus: "Update Status", updateNow: "Update Now", updating: "Updating...", updateSuccess: "Update successful!", updateError: "Update failed: ", currentVersion: "Current Version", checkingUpdate: "Checking for updates...", upToDate: "Latest version: ", updateAvailable: "Update available: ", unknown: "Unknown" }, autoSave: "Settings are saved automatically" }, n = { title: "Tag Search", placeholder: "Search tags (aliases supported)...", filterLabel: "Category Filters:", loading: "Searching...", noResults: "No matching tags found", hint: "Enter at least 2 characters to search", categories: { general: "General", artist: "Artist", character: "Character", copyright: "Copyright", meta: "Meta", unknown: "Unknown" }, addBtnTitle: "Add to prompt" }, i = { title: "Add Custom Tag", addBtnTitle: "Add New Tag", nameLabel: "Tag Name", namePlaceholder: "e.g., my_awesome_tag", categoryLabel: "Category", countLabel: "Post Count (Optional)", countHint: "Estimated usage frequency", aliasLabel: "Aliases (Optional)", aliasPlaceholder: "Comma-separated, e.g., tag1, tag2", aliasHint: "Alternative names to search for this tag", errorNameRequired: "Tag name is required", errorGeneric: "Failed to add tag", successAdded: "Tag added successfully!" }, l = { copy: "Copy", copyTitle: "Copy to Clipboard", placeholder: "Enter positive prompt here...", subtitle: "Simple Prompt Editor", tagCount: "Tags: ", autocompleteHint: "Ctrl+Space for autocomplete", searchBtn: "Search", loading: "Loading...", noMatches: "No matching tags", decreaseWeight: "Decrease weight", increaseWeight: "Increase weight", removeTag: "Remove tag" }, g = {
  common: o,
  settings: r,
  search: n,
  customTag: i,
  editor: l
}, d = { cancel: "取消", save: "保存", close: "关闭", done: "完成", confirm: "确认", update: "更新" }, u = { title: "设置", sections: { textFormat: "文本格式", autocomplete: "补全与搜索", editing: "编辑行为", interface: "界面", data: "数据管理", tagManager: "标签管理" }, items: { convertUnderscore: "下划线转空格", convertUnderscoreDesc: '自动将标签中的下划线 "_" 转换为空格', escapeBrackets: "转义括号", escapeBracketsDesc: '将括号 "()" 转义为 "\\(\\)"', useAliasSearch: "在搜索中使用别名", useAliasSearchDesc: "搜索时匹配标签别名", useAliasAutocomplete: "在自动补全中使用别名", useAliasAutocompleteDesc: "自动补全时匹配别名（可能影响性能）", smartBackspace: "智能退格", smartBackspaceDesc: "删除标签最后一个字符时，连同前面的逗号和空格一起删除", language: "语言", languageDesc: "界面语言", allowEditDefaultTags: "允许编辑默认标签", allowEditDefaultTagsDesc: "启用后可编辑和删除默认标签（请谨慎使用）。", updateTags: "更新标签数据", updateTagsDesc: "从 GitHub 下载最新的 tags.parquet", updateLikedTags: "更新喜爱标签数据", updateLikedTagsDesc: "同步喜爱标签的统计数据与主数据库。", updateUserTags: "更新自定义标签数据", updateUserTagsDesc: "同步自定义标签的统计数据与主数据库。", updateTagsStatus: "更新状态", updateNow: "立即更新", updating: "更新中...", updateSuccess: "更新成功！", updateError: "更新失败：", currentVersion: "当前版本", checkingUpdate: "正在检查更新...", upToDate: "已是最新：", updateAvailable: "有可用更新：", unknown: "未知" }, autoSave: "设置会自动保存" }, p = { title: "标签搜索", placeholder: "搜索标签（支持别名）...", filterLabel: "分类筛选:", loading: "搜索中...", noResults: "未找到匹配的标签", hint: "输入至少2个字符开始搜索", categories: { general: "通用", artist: "画师", character: "角色", copyright: "版权", meta: "元数据", unknown: "未知" }, addBtnTitle: "添加到prompt" }, m = { title: "添加自定义标签", addBtnTitle: "添加新标签", nameLabel: "标签名称", namePlaceholder: "例如: my_awesome_tag", categoryLabel: "分类", countLabel: "帖子计数 (可选)", countHint: "估计的使用频率", aliasLabel: "别名 (可选)", aliasPlaceholder: "逗号分隔，例如: tag1, tag2", aliasHint: "搜索此标签时可使用的替代名称", errorNameRequired: "标签名称必填", errorGeneric: "添加标签失败", successAdded: "标签添加成功！" }, h = { copy: "复制", copyTitle: "复制到剪贴板", placeholder: "在此处输入正向提示词...", subtitle: "Simple Prompt Editor", tagCount: "标签: ", autocompleteHint: "Ctrl+Space 触发自动补全", searchBtn: "搜索", loading: "加载中...", noMatches: "无匹配标签", decreaseWeight: "减小权重", increaseWeight: "增大权重", removeTag: "删除标签" }, T = {
  common: d,
  settings: u,
  search: p,
  customTag: m,
  editor: h
}, f = () => {
  var t, s;
  const a = localStorage.getItem("simplePrompt.settings");
  if (a)
    try {
      const { language: e } = JSON.parse(a);
      if (e) return e;
    } catch {
    }
  if ((s = (t = window.app) == null ? void 0 : t.ui) != null && s.settings) {
    const e = window.app.ui.settings.getSettingValue("Comfy.lang", "");
    if (e)
      return e.startsWith("zh") ? "zh-CN" : "en";
  }
  return navigator.language.startsWith("zh") ? "zh-CN" : "en";
}, w = c({
  legacy: !1,
  locale: f(),
  fallbackLocale: "en",
  messages: {
    en: g,
    "zh-CN": T
  }
});
export {
  w as default
};
