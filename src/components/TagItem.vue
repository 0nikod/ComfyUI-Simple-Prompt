<script setup lang="ts">
import { computed } from 'vue';
import type { TagItem } from '../utils/types';
import { CATEGORY_COLORS, TagCategory } from '../utils/types';
import { Icon } from '@iconify/vue';

const props = defineProps<{
  tag: TagItem;
}>();

const emit = defineEmits<{
  remove: [id: string];
  'update:weight': [id: string, weight: number];
  'toggle:enabled': [id: string];
}>();

// Get category color
const categoryColor = computed(() => {
  return CATEGORY_COLORS[props.tag.category || TagCategory.GENERAL];
});

// Show weight badge
const showWeight = computed(() => {
  return props.tag.weight !== 1.0;
});

const handleRemove = () => {
  emit('remove', props.tag.id);
};

const handleToggle = () => {
  emit('toggle:enabled', props.tag.id);
};

const increaseWeight = () => {
  const newWeight = Math.min(props.tag.weight + 0.1, 2.0);
  emit('update:weight', props.tag.id, parseFloat(newWeight.toFixed(1)));
};

const decreaseWeight = () => {
  const newWeight = Math.max(props.tag.weight - 0.1, 0.1);
  emit('update:weight', props.tag.id, parseFloat(newWeight.toFixed(1)));
};
</script>

<template>
  <div 
    class="tag-item" 
    :class="{ disabled: !tag.enabled }"
    :style="{ '--category-color': categoryColor }"
  >
    <!-- Category indicator dot -->
    <div class="tag-dot"></div>
    
    <!-- Tag text -->
    <span class="tag-text" @click="handleToggle">{{ tag.text }}</span>
    
    <!-- Weight badge and controls -->
    <div v-if="showWeight" class="tag-weight">
      <button class="weight-btn" @click="decreaseWeight" title="Decrease weight">
        <Icon icon="mdi:minus" />
      </button>
      <span class="weight-value">{{ tag.weight.toFixed(1) }}</span>
      <button class="weight-btn" @click="increaseWeight" title="Increase weight">
        <Icon icon="mdi:plus" />
      </button>
    </div>
    
    <!-- Remove button -->
    <button class="tag-remove" @click="handleRemove" title="Remove tag">
      <Icon icon="mdi:close" />
    </button>
  </div>
</template>

<style scoped>
.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background-color: #2a2a2a;
  border-radius: 6px;
  border: 1px solid var(--category-color, #555);
  color: #e0e0e0;
  font-size: 13px;
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
}

.tag-item:hover {
  background-color: #333;
  border-color: var(--category-color);
  box-shadow: 0 0 8px rgba(var(--category-color-rgb, 85, 85, 85), 0.3);
}

.tag-item.disabled {
  opacity: 0.4;
  text-decoration: line-through;
}

.tag-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--category-color);
  flex-shrink: 0;
}

.tag-text {
  flex: 1;
  white-space: nowrap;
}

.tag-weight {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  background-color: #1a1a1a;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
  color: #ffa500;
}

.weight-btn {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 12px;
  transition: color 0.2s;
}

.weight-btn:hover {
  color: #ffa500;
}

.weight-value {
  min-width: 24px;
  text-align: center;
}

.tag-remove {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  font-size: 14px;
  transition: color 0.2s;
}

.tag-remove:hover {
  color: #c42b1c;
}
</style>
