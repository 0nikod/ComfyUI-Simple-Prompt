<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import { settings } from '../utils/settings';
import TagManager from './TagManager.vue';

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

// Categories for split view
const categories = [
  { id: 'textFormat', icon: 'mdi:format-text' },
  { id: 'autocomplete', icon: 'mdi:magnify' },
  { id: 'editing', icon: 'mdi:pencil' },
  { id: 'interface', icon: 'mdi:translate' },
  { id: 'data', icon: 'mdi:database' },
  { id: 'tagManager', icon: 'mdi:tag-multiple' }
];

const activeCategory = ref('textFormat');

// Update logic
const updateStatus = ref('');
const isUpdating = ref(false);
const isChecking = ref(false);
const latestVersion = ref('');

// Generic Data Update Handler
const handleDataUpdate = async (action: 'update_github' | 'update_liked' | 'update_user') => {
    if (isUpdating.value || isChecking.value) return;
    
    isUpdating.value = true;
    updateStatus.value = '';
    
    try {
        if (action === 'update_github') {
             // 1. Check for updates first
            isChecking.value = true;
            updateStatus.value = t('settings.checkingUpdate');
            
            try {
                const checkResponse = await fetch('/simple-prompt/check-update');
                const checkResult = await checkResponse.json();
                
                if (!checkResponse.ok) {
                    throw new Error(checkResult.error || checkResponse.statusText);
                }

                latestVersion.value = checkResult.version;
                isChecking.value = false;

                if (!checkResult.update_available) {
                    updateStatus.value = t('settings.upToDate') + latestVersion.value;
                    return;
                }

                // 2. Proceed to update if available
                updateStatus.value = t('settings.updating');
                
                const updateResponse = await fetch('/simple-prompt/update-tags', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({})
                });
                
                const updateResult = await updateResponse.json();
                
                if (updateResponse.ok && updateResult.status === 'success') {
                    updateStatus.value = t('settings.updateSuccess');
                } else {
                    throw new Error(updateResult.error || updateResponse.statusText);
                }
            } finally {
                isChecking.value = false; // ensure check flag cleared
            }
        } 
        else {
            // Local Data Update (Liked or User)
            updateStatus.value = t('settings.updating');
            const endpoint = '/simple-prompt/update-data';
            const payload = { action }; // 'update_liked' or 'update_user'
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            const result = await response.json();
            
            if (response.ok && result.status === 'success') {
                updateStatus.value = result.message || t('settings.updateSuccess');
            } else {
                throw new Error(result.error || response.statusText);
            }
        }

    } catch (error: any) {
        console.error('Update action error:', error);
        updateStatus.value = t('settings.updateError') + error.message;
    } finally {
        isUpdating.value = false;
    }
};

watch(() => props.visible, (newVal) => {
  if (newVal) {
    updateStatus.value = '';
    latestVersion.value = '';
  }
});
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
          <!-- Sidebar -->
          <div class="settings-sidebar">
            <div 
              v-for="cat in categories" 
              :key="cat.id" 
              class="sidebar-item"
              :class="{ active: activeCategory === cat.id }"
              @click="activeCategory = cat.id"
            >
              <Icon :icon="cat.icon" class="item-icon" />
              <span>{{ t(`settings.sections.${cat.id}`) }}</span>
            </div>
          </div>

          <!-- Content Area -->
          <div class="settings-content">
            <!-- Section 1: Text Formatting -->
            <div v-if="activeCategory === 'textFormat'" class="settings-section">
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
            <div v-if="activeCategory === 'autocomplete'" class="settings-section">
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
            <div v-if="activeCategory === 'editing'" class="settings-section">
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
            <div v-if="activeCategory === 'interface'" class="settings-section">
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

            <!-- Section 5: Data Management -->
            <div v-if="activeCategory === 'data'" class="settings-section">
              <h3 class="section-title">
                <Icon icon="mdi:database" />
                {{ t('settings.sections.data') }}
              </h3>
              
              <div class="setting-item">
                <div class="setting-info">
                  <label class="setting-label">{{ t('settings.items.allowEditDefaultTags') || 'Allow Editing Default Tags' }}</label>
                  <p class="setting-desc">{{ t('settings.items.allowEditDefaultTagsDesc') || 'Enable editing and deleting of default tags (Use with caution).' }}</p>
                </div>
                <label class="switch">
                  <input type="checkbox" v-model="settings.allowEditDefaultTags">
                  <span class="slider"></span>
                </label>
              </div>

              <!-- Update from GitHub -->
              <div class="setting-item data-update-item">
                <div class="setting-info">
                  <label class="setting-label">{{ t('settings.items.updateTags') }}</label>
                  <p class="setting-desc">{{ t('settings.items.updateTagsDesc') }}</p>
                </div>
                <div class="update-actions">
                  <button 
                    class="btn-update primary" 
                    :disabled="isUpdating || isChecking"
                    @click="handleDataUpdate('update_github')"
                  >
                    <Icon v-if="isUpdating && activeCategory === 'data'" icon="mdi:loading" class="spin" />
                    <span>{{ t('settings.updateNow') }}</span>
                  </button>
                </div>
              </div>

               <!-- NEW: Update Liked Tags Data -->
              <div class="setting-item data-update-item">
                <div class="setting-info">
                  <label class="setting-label">{{ t('settings.items.updateLikedTags') || 'Update Liked Tags' }}</label>
                  <p class="setting-desc">{{ t('settings.items.updateLikedTagsDesc') || 'Sync liked tags data with main database.' }}</p>
                </div>
                <div class="update-actions">
                  <button 
                    class="btn-update secondary" 
                    :disabled="isUpdating"
                    @click="handleDataUpdate('update_liked')"
                  >
                    <Icon icon="mdi:heart" />
                    <span>{{ t('common.update') || 'Update' }}</span>
                  </button>
                </div>
              </div>

               <!-- NEW: Update User Tags Data -->
              <div class="setting-item data-update-item">
                <div class="setting-info">
                  <label class="setting-label">{{ t('settings.items.updateUserTags') || 'Update User Tags' }}</label>
                  <p class="setting-desc">{{ t('settings.items.updateUserTagsDesc') || 'Sync custom tags data with main database.' }}</p>
                </div>
                <div class="update-actions">
                  <button 
                    class="btn-update secondary" 
                    :disabled="isUpdating"
                    @click="handleDataUpdate('update_user')"
                  >
                    <Icon icon="mdi:account-tag" />
                    <span>{{ t('common.update') || 'Update' }}</span>
                  </button>
                </div>
              </div>

              <div v-if="updateStatus" class="update-status-box" :class="{ error: updateStatus.includes('failed') || updateStatus.toLowerCase().includes('error'), success: updateStatus.includes('success') || updateStatus.includes('upToDate') || updateStatus.includes('updated') }">
                <Icon :icon="updateStatus.includes('success') || updateStatus.includes('upToDate') || updateStatus.includes('updated') ? 'mdi:check-circle' : 'mdi:alert-circle'" />
                <span>{{ updateStatus }}</span>
              </div>
            </div>


          <!-- Section: Tag Manager -->
          <div v-if="activeCategory === 'tagManager'" class="settings-section full-width">
              <h3 class="section-title">
              <Icon icon="mdi:tag-multiple" />
              {{ t('settings.sections.tagManager') || 'Tag Manager' }}
            </h3>
            <TagManager />
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
  max-width: 800px;
  height: 85vh;
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

/* Body Split Layout */
.settings-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  background-color: #1e1e1e;
}

/* Sidebar */
.settings-sidebar {
  width: 220px;
  background-color: #252526;
  border-right: 1px solid #333;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
}

.sidebar-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  color: #aaa;
  position: relative;
}

.sidebar-item:hover {
  background-color: #2a2d2e;
  color: #e0e0e0;
}

.sidebar-item.active {
  background-color: #37373d;
  color: white;
  font-weight: 500;
}

.sidebar-item.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 3px;
  background-color: #0075db;
}

.item-icon {
  font-size: 18px;
}

/* Content Area */
.settings-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 30px;
}

.settings-section {
  max-width: 500px;
}

.settings-section.full-width {
  max-width: 100%;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #0075db;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid #333;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
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
  margin-bottom: 6px;
  cursor: default;
}

.setting-desc {
  font-size: 12px;
  color: #888;
  margin: 0;
  line-height: 1.5;
}

/* Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
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
  border-radius: 22px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
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
  transform: translateX(22px);
}

/* Update Button */
.update-actions {
  display: flex;
  gap: 10px;
}

.btn-update {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  background: transparent;
  border: 1px solid #555;
  color: #e0e0e0;
}

.btn-update.primary {
    background-color: #0075db;
    border-color: #0075db;
    color: white;
}

.btn-update.primary:hover:not(:disabled) {
  background-color: #0060b5;
  border-color: #0060b5;
}

.btn-update.secondary:hover:not(:disabled) {
    background-color: #333;
    border-color: #777;
    color: white;
}

.btn-update:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.update-status-box {
  margin-top: 20px;
  padding: 12px 16px;
  background-color: #252526;
  border-radius: 6px;
  border-left: 4px solid #0075db;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}

.update-status-box.error {
  border-left-color: #f44336;
}

.update-status-box.success {
    border-left-color: #4CAF50;
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
  min-width: 120px;
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

/* Scrollbar */
.settings-content::-webkit-scrollbar {
  width: 10px;
}

.settings-content::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.settings-content::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 5px;
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
