<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import { settings } from '../utils/settings';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);
const { t, locale } = useI18n();

const handleClose = () => {
  emit('close');
};

// Sync settings.language with i18n locale
watch(() => settings.language, (newLang) => {
  locale.value = newLang;
});

// Local reactive copies for the settings
// These are directly bound to the reactive settings object
// Changes will auto-save via the watch in settings.ts
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="settings-overlay" @click.self="handleClose">
      <div class="settings-container">
        <!-- Header -->
        <div class="settings-header">
          <div class="settings-title">
            <Icon icon="mdi:cog" class="settings-icon" />
            <span>{{ t('settings.title') }}</span>
          </div>
          <button class="btn-close" @click="handleClose" :title="t('common.close')">
            <Icon icon="mdi:close" />
          </button>
        </div>

        <!-- Body -->
        <div class="settings-body">
          <!-- Section 1: Text Formatting -->
          <div class="settings-section">
            <h3 class="section-title">
              <Icon icon="mdi:format-text" />
              {{ t('settings.sections.textFormat') }}
            </h3>
            
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">{{ t('settings.items.convertUnderscore') }}</label>
                <p class="setting-desc">{{ t('settings.items.convertUnderscoreDesc') }}</p>
              </div>
              <label class="switch">
                <input type="checkbox" v-model="settings.convertUnderscoreToSpace">
                <span class="slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">{{ t('settings.items.escapeBrackets') }}</label>
                <p class="setting-desc">{{ t('settings.items.escapeBracketsDesc') }}</p>
              </div>
              <label class="switch">
                <input type="checkbox" v-model="settings.escapeBrackets">
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <!-- Section 2: Autocomplete & Search -->
          <div class="settings-section">
            <h3 class="section-title">
              <Icon icon="mdi:magnify" />
              {{ t('settings.sections.autocomplete') }}
            </h3>
            
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">{{ t('settings.items.useAliasSearch') }}</label>
                <p class="setting-desc">{{ t('settings.items.useAliasSearchDesc') }}</p>
              </div>
              <label class="switch">
                <input type="checkbox" v-model="settings.useAliasesInSearch">
                <span class="slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">{{ t('settings.items.useAliasAutocomplete') }}</label>
                <p class="setting-desc">{{ t('settings.items.useAliasAutocompleteDesc') }}</p>
              </div>
              <label class="switch">
                <input type="checkbox" v-model="settings.useAliasesInAutocomplete">
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <!-- Section 3: Editing Behavior -->
          <div class="settings-section">
            <h3 class="section-title">
              <Icon icon="mdi:pencil" />
              {{ t('settings.sections.editing') }}
            </h3>
            
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">{{ t('settings.items.smartBackspace') }}</label>
                <p class="setting-desc">{{ t('settings.items.smartBackspaceDesc') }}</p>
              </div>
              <label class="switch">
                <input type="checkbox" v-model="settings.smartBackspace">
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <!-- Section 4: Interface -->
          <div class="settings-section">
            <h3 class="section-title">
              <Icon icon="mdi:translate" />
              {{ t('settings.sections.interface') }}
            </h3>
            
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">{{ t('settings.items.language') }}</label>
                <p class="setting-desc">{{ t('settings.items.languageDesc') }}</p>
              </div>
              <select v-model="settings.language" class="language-select">
                <option value="en">English</option>
                <option value="zh-CN">简体中文</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="settings-footer">
          <div class="footer-info">
            <Icon icon="mdi:information-outline" />
            {{ t('settings.autoSave') }}
          </div>
          <button class="btn-primary" @click="handleClose">{{ t('common.done') }}</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', Inter, system-ui, sans-serif;
  color: #e0e0e0;
}

.settings-container {
  width: 90%;
  max-width: 700px;
  max-height: 85vh;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #333;
}

/* Header */
.settings-header {
  height: 56px;
  background-color: #252526;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  flex-shrink: 0;
}

.settings-title {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.settings-icon {
  font-size: 24px;
  color: #0075db;
}

.btn-close {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-close:hover {
  background-color: #c42b1c;
  color: white;
}

/* Body */
.settings-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #1e1e1e;
}

.settings-section {
  margin-bottom: 28px;
}

.settings-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #0075db;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #333;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #2a2a2a;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info {
  flex: 1;
  margin-right: 20px;
}

.setting-label {
  font-size: 14px;
  font-weight: 500;
  color: #e0e0e0;
  display: block;
  margin-bottom: 4px;
  cursor: default;
}

.setting-desc {
  font-size: 12px;
  color: #888;
  margin: 0;
  line-height: 1.4;
}

/* Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  flex-shrink: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #444;
  transition: 0.3s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #0075db;
}

input:checked + .slider:before {
  transform: translateX(24px);
}

input:focus + .slider {
  box-shadow: 0 0 1px #0075db;
}

/* Language Select */
.language-select {
  padding: 6px 12px;
  background-color: #333;
  color: #e0e0e0;
  border: 1px solid #444;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
}

.language-select:hover {
  background-color: #3a3a3a;
  border-color: #555;
}

.language-select:focus {
  border-color: #0075db;
  box-shadow: 0 0 0 2px rgba(0, 117, 219, 0.2);
}

/* Footer */
.settings-footer {
  height: 60px;
  background-color: #252526;
  border-top: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  flex-shrink: 0;
}

.footer-info {
  font-size: 12px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-primary {
  padding: 8px 24px;
  background-color: #0075db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #0060b5;
}

.btn-primary:active {
  background-color: #004a8f;
}

/* Scrollbar styling */
.settings-body::-webkit-scrollbar {
  width: 10px;
}

.settings-body::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.settings-body::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 5px;
}

.settings-body::-webkit-scrollbar-thumb:hover {
  background: #444;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
