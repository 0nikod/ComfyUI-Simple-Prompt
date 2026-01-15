<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import { categoryService } from '../utils/categoryService';
import { TagCategory } from '../utils/types';

const props = defineProps<{
  visible: boolean;
  editMode?: boolean;
  initialData?: any;
  targetSource?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save'): void;
}>();

const { t } = useI18n();

// Form State
const form = ref({
  name: '',
  category: 0, // General default
  post_count: 0,
  alias: ''
});

const isSubmitting = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

// Fetch categories on mount/visible?
// Used in template: categoryService.categories

const resetForm = () => {
  form.value = {
    name: '',
    category: 0,
    post_count: 0,
    alias: ''
  };
  errorMsg.value = '';
  successMsg.value = '';
};

watch(() => props.visible, (newVal) => {
  if (newVal) {
    if (props.editMode && props.initialData) {
        form.value = {
            name: props.initialData.name,
            category: props.initialData.category || TagCategory.GENERAL,
            post_count: props.initialData.post_count || 0,
            alias: Array.isArray(props.initialData.alias) ? props.initialData.alias.join(', ') : (props.initialData.alias || '')
        };
    } else {
        resetForm();
    }
  }
});

const handleClose = () => {
  emit('close');
};

const handleSave = async () => {
  if (!form.value.name.trim()) {
    errorMsg.value = t('customTag.errorNameRequired');
    return;
  }

  isSubmitting.value = true;
  errorMsg.value = '';
  successMsg.value = '';

  try {
    const aliasArray = form.value.alias.split(',').map(s => s.trim()).filter(s => s);
    
    // Prepare payload
    const payload = {
        name: form.value.name.trim(),
        category: form.value.category,
        post_count: Number(form.value.post_count),
        alias: aliasArray,
        source: props.targetSource || 'user'
    };

    const response = await fetch('/simple-prompt/add-custom-tag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || response.statusText);
    }

    successMsg.value = props.editMode ? t('customTag.successEdited') || 'Tag updated!' : t('customTag.successAdded');
    setTimeout(() => {
        emit('save');
        handleClose();
    }, 1000);

  } catch (error: any) {
    console.error('Add tag error:', error);
    errorMsg.value = error.message || t('customTag.errorGeneric');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="modal-overlay" @click.self="handleClose">
      <div class="modal-container">
        <!-- Header -->
        <div class="modal-header">
          <div class="modal-title">
            <Icon :icon="editMode ? 'mdi:pencil' : 'mdi:tag-plus'" class="title-icon" />
            <span>{{ editMode ? (t('customTag.titleEdit') || 'Edit Tag') : t('customTag.title') }}</span>
          </div>
          <button class="close-btn" @click="handleClose" :title="t('common.close')">
            <Icon icon="mdi:close" />
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body">
            
          <!-- Name Input -->
          <div class="form-group">
            <label>{{ t('customTag.nameLabel') }} <span class="required">*</span></label>
            <input 
                v-model="form.name" 
                type="text" 
                :placeholder="t('customTag.namePlaceholder')"
                class="sp-input"
                autofocus
                :disabled="editMode" 
            >
          </div>

          <!-- Category Select -->
          <div class="form-group">
            <label>{{ t('customTag.categoryLabel') }}</label>
            <div class="category-select-wrapper">
                <select v-model="form.category" class="sp-select">
                    <option v-for="cat in categoryService.categories.value" :key="cat.id" :value="cat.id">
                        {{ cat.name }}
                    </option>
                </select>
                <!-- Show color preview -->
                <div class="color-preview" :style="{ backgroundColor: categoryService.getCategoryColor(form.category) }"></div>
            </div>
          </div>

          <!-- Post Count -->
          <div class="form-group">
            <label>{{ t('customTag.countLabel') }}</label>
            <input 
                v-model="form.post_count" 
                type="number" 
                min="0"
                class="sp-input"
            >
            <p class="hint">{{ t('customTag.countHint') }}</p>
          </div>

          <!-- Aliases -->
          <div class="form-group">
            <label>{{ t('customTag.aliasLabel') }}</label>
            <input 
                v-model="form.alias" 
                type="text" 
                :placeholder="t('customTag.aliasPlaceholder')"
                class="sp-input"
            >
            <p class="hint">{{ t('customTag.aliasHint') }}</p>
          </div>

          <!-- Messages -->
          <div v-if="errorMsg" class="message error">
            <Icon icon="mdi:alert-circle" /> {{ errorMsg }}
          </div>
          <div v-if="successMsg" class="message success">
            <Icon icon="mdi:check-circle" /> {{ successMsg }}
          </div>

        </div>

        <!-- Footer -->
        <div class="modal-footer">
            <button class="btn-cancel" @click="handleClose">{{ t('common.cancel') }}</button>
            <button class="btn-save" @click="handleSave" :disabled="isSubmitting">
                <Icon v-if="isSubmitting" icon="mdi:loading" class="spin" />
                <span>{{ t('common.save') }}</span>
            </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
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
}

.modal-container {
  width: 90%;
  max-width: 500px;
  background-color: #1e1e1e;
  border-radius: 8px;
  border: 1px solid #444;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  height: 50px;
  background-color: #252526;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.modal-title {
  font-size: 16px;
  font-weight: 600;
  color: #e0e0e0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-icon {
  color: #0075db;
  font-size: 20px;
}

.close-btn {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  display: flex;
}

.close-btn:hover {
  background-color: #c42b1c;
  color: white;
}

.modal-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  color: #ccc;
  font-weight: 500;
}

.required {
  color: #f44336;
}

.sp-input {
  background-color: #2a2a2a;
  border: 1px solid #444;
  color: #e0e0e0;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.sp-input:focus {
  border-color: #0075db;
}

.category-select-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
}

.sp-select {
    flex: 1;
    background-color: #2a2a2a;
    border: 1px solid #444;
    color: #e0e0e0;
    padding: 10px;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
}

.sp-select:focus {
    border-color: #0075db;
}

.color-preview {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid #444;
}

.hint {
    font-size: 12px;
    color: #666;
    margin: 0;
}

.modal-footer {
  height: 60px;
  background-color: #252526;
  border-top: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  gap: 12px;
}

.btn-cancel {
    padding: 8px 16px;
    background: transparent;
    border: 1px solid #444;
    color: #ccc;
    border-radius: 4px;
    cursor: pointer;
}

.btn-cancel:hover {
    background-color: #333;
    color: white;
}

.btn-save {
    padding: 8px 24px;
    background-color: #0075db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-save:hover:not(:disabled) {
    background-color: #0060b5;
}

.btn-save:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.message {
    padding: 10px;
    border-radius: 4px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.message.error {
    background-color: rgba(244, 67, 54, 0.1);
    color: #f44336;
    border: 1px solid rgba(244, 67, 54, 0.2);
}

.message.success {
    background-color: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
    border: 1px solid rgba(76, 175, 80, 0.2);
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
