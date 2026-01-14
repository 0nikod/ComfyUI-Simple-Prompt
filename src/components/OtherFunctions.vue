<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  tagCount?: number;
}>();

const emit = defineEmits<{
  'open-search': [];
}>();

const { t } = useI18n();

const openSearch = () => {
  emit('open-search');
};
</script>

<template>
  <div class="toolbar">
    <!-- Search Button -->
    <button class="toolbar-btn" @click="openSearch">
      <Icon icon="mdi:magnify" />
      <span>{{ t('editor.searchBtn') }}</span>
    </button>

    <div class="separator"></div>

    <!-- Tag Count -->
    <div class="tag-count">
      <Icon icon="mdi:tag-multiple" />
      <span>{{ t('editor.tagCount') }}{{ tagCount || 0 }}</span>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: #333;
  color: #e0e0e0;
  border: 1px solid #444;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
  white-space: nowrap;
}

.toolbar-btn:hover {
  background-color: #444;
  border-color: #555;
}

.toolbar-btn:active {
  background-color: #2a2a2a;
}

.separator {
  width: 1px;
  height: 20px;
  background-color: #444;
}

.tag-count {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #aaa;
  margin-left: auto;
}

.tag-count svg {
  font-size: 16px;
}
</style>
