<script setup lang="ts">
import { ref, watch } from 'vue';
import TagItem from './TagItem.vue';
import type { TagItem as TagItemType } from '../utils/types';

const props = defineProps<{
  tags: TagItemType[];
}>();

const emit = defineEmits<{
  'update:tags': [tags: TagItemType[]];
}>();

const localTags = ref<TagItemType[]>([]);
const draggedIndex = ref<number | null>(null);

// Sync props to local state
watch(() => props.tags, (newTags) => {
    // Only update if we are not currently dragging to avoid conflicts
    if (draggedIndex.value === null) {
        localTags.value = [...newTags];
    }
}, { immediate: true });

const handleRemoveTag = (id: string) => {
  const newTags = localTags.value.filter(tag => tag.id !== id);
  localTags.value = newTags;
  emit('update:tags', newTags);
};

const handleUpdateWeight = (id: string, weight: number) => {
  const newTags = localTags.value.map(tag => 
    tag.id === id ? { ...tag, weight } : tag
  );
  localTags.value = newTags;
  emit('update:tags', newTags);
};

const handleToggleEnabled = (id: string) => {
  const newTags = localTags.value.map(tag => 
    tag.id === id ? { ...tag, enabled: !tag.enabled } : tag
  );
  localTags.value = newTags;
  emit('update:tags', newTags);
};

// Drag and Drop Logic
const onDragStart = (e: DragEvent, index: number) => {
    draggedIndex.value = index;
    if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        // Use a dummy image or defaults
    }
};

const onDragOver = (e: DragEvent) => {
    e.preventDefault(); 
    if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
    }
};

// Real-time reordering happens here
const onDragEnter = (index: number) => {
    if (draggedIndex.value !== null && draggedIndex.value !== index) {
        const fromIndex = draggedIndex.value;
        const toIndex = index;
        
        // Swap in local state
        const item = localTags.value[fromIndex];
        // Remove from old pos
        const newTags = [...localTags.value];
        newTags.splice(fromIndex, 1);
        // Insert at new pos
        newTags.splice(toIndex, 0, item);
        
        localTags.value = newTags;
        draggedIndex.value = toIndex;
    }
};

const onDragEnd = () => {
    if (draggedIndex.value !== null) {
        // Emit final order
        emit('update:tags', localTags.value);
        draggedIndex.value = null;
    }
};
</script>

<template>
  <div class="visual-tag-area">
    <div v-if="localTags.length === 0" class="empty-state">
      <p>No tags yet. Start typing in the editor...</p>
    </div>
    <div v-else class="tags-scroller">
        <TransitionGroup 
            name="tag-list" 
            tag="div" 
            class="tags-container"
        >
          <div 
            v-for="(tag, index) in localTags" 
            :key="tag.id"
            class="tag-wrapper"
            draggable="true"
            @dragstart="onDragStart($event, index)"
            @dragover="onDragOver"
            @dragenter="onDragEnter(index)"
            @dragend="onDragEnd"
          >
              <TagItem
                :tag="tag"
                @remove="handleRemoveTag"
                @update:weight="handleUpdateWeight"
                @toggle:enabled="handleToggleEnabled"
              />
          </div>
        </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.visual-tag-area {
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  overflow: hidden; /* Scroll handled by inner container */
  position: relative;
}

.tags-scroller {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 16px;
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

.tag-wrapper {
    cursor: move;
}

/* Animations */
.tag-list-move,
.tag-list-enter-active,
.tag-list-leave-active {
  transition: all 0.3s ease;
}

/* Ensure moving items don't trigger drag events to prevent flickering loops */
.tag-list-move {
    pointer-events: none;
}

/* Ensure removed items are taken out of flow for smooth move */
.tag-list-leave-active {
  position: absolute;
}

/* Scrollbar styling */
.tags-scroller::-webkit-scrollbar {
  width: 10px;
}

.tags-scroller::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.tags-scroller::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 5px;
}

.tags-scroller::-webkit-scrollbar-thumb:hover {
  background: #444;
}
</style>
