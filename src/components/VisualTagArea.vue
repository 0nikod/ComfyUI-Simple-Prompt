<script setup lang="ts">
import { computed } from 'vue';
import TagItem from './TagItem.vue';
import type { TagItem as TagItemType } from '../utils/types';

const props = defineProps<{
  tags: TagItemType[];
}>();

const emit = defineEmits<{
  'update:tags': [tags: TagItemType[]];
}>();

const handleRemoveTag = (id: string) => {
  const newTags = props.tags.filter(tag => tag.id !== id);
  emit('update:tags', newTags);
};

const handleUpdateWeight = (id: string, weight: number) => {
  const newTags = props.tags.map(tag => 
    tag.id === id ? { ...tag, weight } : tag
  );
  emit('update:tags', newTags);
};

const handleToggleEnabled = (id: string) => {
  const newTags = props.tags.map(tag => 
    tag.id === id ? { ...tag, enabled: !tag.enabled } : tag
  );
  emit('update:tags', newTags);
};
</script>

<template>
  <div class="visual-tag-area">
    <div v-if="tags.length === 0" class="empty-state">
      <p>No tags yet. Start typing in the editor...</p>
    </div>
    <div v-else class="tags-container">
      <TagItem
        v-for="tag in tags"
        :key="tag.id"
        :tag="tag"
        @remove="handleRemoveTag"
        @update:weight="handleUpdateWeight"
        @toggle:enabled="handleToggleEnabled"
      />
    </div>
  </div>
</template>

<style scoped>
.visual-tag-area {
  width: 100%;
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  background-color: #1a1a1a;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 14px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-content: flex-start;
}

/* Scrollbar styling */
.visual-tag-area::-webkit-scrollbar {
  width: 10px;
}

.visual-tag-area::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.visual-tag-area::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 5px;
}

.visual-tag-area::-webkit-scrollbar-thumb:hover {
  background: #444;
}
</style>
