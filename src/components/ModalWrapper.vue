<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import SettingsModal from './SettingsModal.vue';

// Define events
const emit = defineEmits(['close', 'save']);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const { t } = useI18n();

// Settings modal state
const showSettings = ref(false);

const openSettings = () => {
  showSettings.value = true;
};

const closeSettings = () => {
  showSettings.value = false;
};

// Close handler
const handleClose = () => {
  emit('close');
};

// Save handler
const handleSave = () => {
  emit('save');
};

// Listen for Escape key to close
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.visible) {
    handleClose();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="sp-modal-overlay" @click.self="handleClose">
      <div class="sp-modal-container">
        <!-- Header -->
        <div class="sp-modal-header">
          <div class="sp-modal-title">
            <Icon icon="mdi:pencil-box-outline" class="sp-icon" />
            <span>{{ t('editor.subtitle') }}</span>
          </div>
          <div class="sp-modal-actions">
            <button class="sp-btn-icon" :title="t('settings.title')" @click="openSettings">
              <Icon icon="mdi:cog" />
            </button>
            <button class="sp-btn-icon sp-btn-close" @click="handleClose" :title="t('common.close')">
              <Icon icon="mdi:close" />
            </button>
          </div>
        </div>

        <!-- Body (Split View) -->
        <div class="sp-modal-body">
            <slot name="content"></slot>
        </div>

        <!-- Footer -->
        <div class="sp-modal-footer">
            <div class="sp-footer-left">
                <!-- Status bar or hints could go here -->
                <span class="sp-hint">{{ t('editor.autocompleteHint') }}</span>
            </div>
            <div class="sp-footer-right">
                <button class="sp-btn sp-btn-secondary" @click="handleClose">{{ t('common.cancel') }}</button>
                <button class="sp-btn sp-btn-primary" @click="handleSave">{{ t('common.save') }}</button>
            </div>
        </div>
      </div>
      
      <!-- Settings Modal -->
      <SettingsModal 
        :visible="showSettings"
        @close="closeSettings"
      />
    </div>
  </Transition>
</template>

<style scoped>
/* Dark Mode Theme Variables specifically for this modal */
.sp-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', Inter, system-ui, sans-serif;
  color: #e0e0e0;
}

.sp-modal-container {
  width: 90vw;
  height: 90vh;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #333;
}

/* Header */
.sp-modal-header {
  height: 48px;
  background-color: #252526;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  flex-shrink: 0;
}

.sp-modal-title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sp-icon {
  font-size: 20px;
  color: #0075db;
}

.sp-modal-actions {
  display: flex;
  gap: 8px;
}

/* Body */
.sp-modal-body {
  flex: 1;
  overflow: hidden;
  position: relative;
  background-color: #1e1e1e;
}

/* Footer */
.sp-modal-footer {
  height: 52px;
  background-color: #252526;
  border-top: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  flex-shrink: 0;
}

.sp-hint {
    font-size: 12px;
    color: #888;
}

/* Buttons */
.sp-btn {
    padding: 6px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
    font-weight: 500;
}

.sp-btn-primary {
    background-color: #0075db;
    color: white;
}

.sp-btn-primary:hover {
    background-color: #0060b5;
}

.sp-btn-secondary {
    background-color: transparent;
    color: #ccc;
    border: 1px solid #444;
}

.sp-btn-secondary:hover {
    background-color: #333;
    color: white;
}

.sp-btn-icon {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sp-btn-icon:hover {
  background-color: #333;
  color: white;
}

.sp-btn-close:hover {
  background-color: #c42b1c;
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
