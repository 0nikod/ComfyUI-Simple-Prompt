<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { CategoryService } from '../utils/categoryService';
import { Icon } from '@iconify/vue';

const props = defineProps<{
  items: any[];
  selectedIndex: number;
  loading?: boolean;
}>();

const emit = defineEmits<{
  select: [item: any];
}>();

const { t } = useI18n();

const handleSelect = (item: any) => {
  emit('select', item);
};

const getCategoryColor = (category: number) => {
  return CategoryService.getInstance().getColor(category);
};

const formatCount = (count: number | bigint) => {
  const num = Number(count);
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
};
</script>

<template>
  <div class="autocomplete-list">
    <div v-if="loading" class="loading-item">
      <Icon icon="mdi:loading" class="spin" /> {{ t('editor.loading') }}
    </div>
    
    <div v-else-if="items.length === 0" class="no-results">
      {{ t('editor.noMatches') }}
    </div>

    <template v-else>
      <div 
        v-for="(item, index) in items" 
        :key="item.name"
        class="menu-item"
        :class="{ selected: index === selectedIndex }"
        @click="handleSelect(item)"
        @mousedown.prevent 
      >
        <!-- @mousedown.prevent prevents blur event on TextEditor -->
        
        <div class="item-left">
          <div 
            class="category-dot"
            :style="{ backgroundColor: getCategoryColor(item.category) }"
          ></div>
          <span class="item-name">{{ item.name }}</span>
          <span v-if="item.alias_match" class="item-alias">({{ item.alias_match }})</span>
        </div>
        
        <div class="item-right">
          <span class="item-count">{{ formatCount(item.post_count) }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.autocomplete-list {
  position: absolute; /* Positioned relative to parent container */
  width: 300px;
  max-height: 250px;
  overflow-y: auto;
  background-color: #252526;
  border: 1px solid #444;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  z-index: 10000;
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 13px;
  color: #ccc;
  border-left: 3px solid transparent;
}

.menu-item:hover, .menu-item.selected {
  background-color: #37373d;
  color: #fff;
  border-left-color: #0075db;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  flex: 1;
}

.category-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.item-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}

.item-alias {
  color: #888;
  font-size: 12px;
  margin-left: 4px;
  white-space: nowrap;
}

.item-right {
  margin-left: 10px;
}

.item-count {
  font-size: 11px;
  color: #666;
  font-family: monospace;
}

.loading-item, .no-results {
  padding: 10px;
  color: #888;
  font-size: 13px;
  text-align: center;
}

.spin {
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 4px;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Scrollbar */
.autocomplete-list::-webkit-scrollbar {
  width: 8px;
}
.autocomplete-list::-webkit-scrollbar-track {
  background: #252526;
}
.autocomplete-list::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}
</style>
