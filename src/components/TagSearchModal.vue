<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import { DuckDBService } from '../utils/duckdbService';
import { TagCategory, CATEGORY_COLORS } from '../utils/types';

const props = defineProps<{
  visible: boolean;
}>();

const { t } = useI18n();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'add-tag', name: string, category: number): void;
}>();

const searchQuery = ref('');
const searchResults = ref<any[]>([]);
const loading = ref(false);
const selectedCategories = ref<number[]>([]);

// Category options
const categoryOptions = computed(() => [
  { value: TagCategory.GENERAL, label: t('search.categories.general'), color: CATEGORY_COLORS[TagCategory.GENERAL] },
  { value: TagCategory.ARTIST, label: t('search.categories.artist'), color: CATEGORY_COLORS[TagCategory.ARTIST] },
  { value: TagCategory.CHARACTER, label: t('search.categories.character'), color: CATEGORY_COLORS[TagCategory.CHARACTER] },
  { value: TagCategory.COPYRIGHT, label: t('search.categories.copyright'), color: CATEGORY_COLORS[TagCategory.COPYRIGHT] },
  { value: TagCategory.META, label: t('search.categories.meta'), color: CATEGORY_COLORS[TagCategory.META] },
]);

// Toggle category filter
const toggleCategory = (category: number) => {
  const index = selectedCategories.value.indexOf(category);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(category);
  }
  // Re-trigger search if there's a query
  if (searchQuery.value.trim()) {
    performSearch();
  }
};

const isCategorySelected = (category: number) => {
  return selectedCategories.value.includes(category);
};

// Perform search
const performSearch = async () => {
  const query = searchQuery.value.trim();
  if (!query || query.length < 2) {
    searchResults.value = [];
    return;
  }

  loading.value = true;
  try {
    const db = DuckDBService.getInstance();
    // Use searchTags with alias support and category filter
    const results = await db.searchTags(query, 50, true, selectedCategories.value);
    
    searchResults.value = results;
  } catch (error) {
    console.error('Search error:', error);
    searchResults.value = [];
  } finally {
    loading.value = false;
  }
};

// Debounced search
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
const handleSearchInput = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    performSearch();
  }, 300);
};

// Add tag to prompt
const addTag = (tag: any) => {
  emit('add-tag', tag.name, tag.category);
};

// Close modal
const close = () => {
  emit('close');
};

// Reset on visibility change
watch(() => props.visible, (newVal) => {
  if (!newVal) {
    searchQuery.value = '';
    searchResults.value = [];
    selectedCategories.value = [];
  }
});

// Get category label
const getCategoryLabel = (category: number) => {
  const option = categoryOptions.value.find(opt => opt.value === category);
  return option ? option.label : t('search.categories.unknown');
};

// Get category color
const getCategoryColor = (category: number) => {
  return CATEGORY_COLORS[category] || '#888';
};

// Format post count (cached to avoid repeated toLocaleString calls)
const formatPostCount = (count: number | undefined) => {
  return count?.toLocaleString() || '0';
};

// Highlight matched text with bold
const highlightMatch = (text: string, query: string): string => {
  if (!query || !text) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<strong class="match-bold">$1</strong>');
};

// --- Like Functionality ---
const isLiked = (tag: any) => {
    return tag.priority === 1; // 1 = Liked source
};

const toggleLike = async (tag: any, event: Event) => {
    event.stopPropagation();
    
    const currentlyLiked = isLiked(tag);
    // Optimistic update
    tag.priority = currentlyLiked ? 4 : 1; // Toggle between Liked (1) and default (4 or whatever)
    
    try {
        const payload = {
            name: tag.name,
            is_liked: !currentlyLiked,
            category: tag.category,
            post_count: tag.post_count,
            alias: tag.alias
        };
        
        await fetch('/simple-prompt/toggle-like-tag', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        // Success - no undo needed
        
        // Re-search to sort correctly if needed? 
        // Or just let it stay until next search.
        // If sorting by priority, the position should change, but changing locally won't re-sort unless we trigger it.
        // It's acceptable to keep it in place until re-search.
        
    } catch (e) {
        console.error("Toggle like failed", e);
        // Revert
        tag.priority = currentlyLiked ? 1 : 4;
    }
};

</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal-container">
        <!-- Header -->
        <div class="modal-header">
          <div class="modal-title">
            <Icon icon="mdi:database-search" class="title-icon" />
            <span>{{ t('search.title') }}</span>
          </div>
          <button class="close-btn" @click="close" :title="t('common.close')">
            <Icon icon="mdi:close" />
          </button>
        </div>

        <!-- Search Input -->
        <div class="search-section">
          <div class="search-box">
            <Icon icon="mdi:magnify" class="search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('search.placeholder')"
              class="search-input"
              @input="handleSearchInput"
              autofocus
            />
            <button
              v-if="searchQuery"
              class="clear-btn"
              @click="searchQuery = ''; searchResults = []"
              title="Clear"
            >
              <Icon icon="mdi:close-circle" />
            </button>
          </div>

          <!-- Category Filters -->
          <div class="category-filters">
            <span class="filter-label">{{ t('search.filterLabel') }}</span>
            <button
              v-for="cat in categoryOptions"
              :key="cat.value"
              class="category-chip"
              :class="{ active: isCategorySelected(cat.value) }"
              :style="{ '--category-color': cat.color }"
              @click="toggleCategory(cat.value)"
            >
              <span class="category-dot" :style="{ backgroundColor: cat.color }"></span>
              {{ cat.label }}
            </button>
          </div>
        </div>

        <!-- Results -->
        <div class="results-section">
          <div v-if="loading" class="loading-state">
            <Icon icon="mdi:loading" class="spin" />
            <span>{{ t('search.loading') }}</span>
          </div>

          <div v-else-if="searchResults.length === 0 && searchQuery.trim()" class="empty-state">
            <Icon icon="mdi:magnify-close" />
            <p>{{ t('search.noResults') }}</p>
          </div>

          <div v-else-if="searchResults.length > 0" class="results-list">
            <div
              v-for="tag in searchResults"
              :key="tag.name"
              class="result-item"
              :style="{ '--cat-color': getCategoryColor(tag.category) }"
              @click="addTag(tag)"
            >
              <div class="tag-info">
                <div class="tag-name-row">
                  <span class="category-indicator"></span>
                  <span class="tag-name">
                    <span v-if="!tag.matched_alias" v-html="highlightMatch(tag.name, searchQuery)"></span>
                    <template v-else>
                      <span v-html="highlightMatch(tag.name, searchQuery)"></span>
                      <span class="alias-indicator" v-html="highlightMatch(tag.matched_alias, searchQuery)"></span>
                    </template>
                  </span>
                </div>
                <div class="tag-meta">
                  <span class="category-label">{{ getCategoryLabel(tag.category) }}</span>
                  <span class="post-count">
                    <Icon icon="mdi:image-multiple" />
                    {{ formatPostCount(tag.post_count) }}
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <div class="actions">
                  <button class="action-btn like-btn" :class="{ liked: isLiked(tag) }" @click="toggleLike(tag, $event)" :title="isLiked(tag) ? 'Unlike' : 'Like'">
                      <Icon :icon="isLiked(tag) ? 'mdi:heart' : 'mdi:heart-outline'" />
                  </button>
                  <button class="action-btn add-btn" :title="t('search.addBtnTitle')">
                    <Icon icon="mdi:plus" />
                  </button>
              </div>
            </div>
          </div>

          <div v-else class="hint-state">
            <Icon icon="mdi:information-outline" />
            <p>{{ t('search.hint') }}</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Match text bold style */
.tag-name :deep(.match-bold) {
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: #0075db;
}

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
  max-width: 700px;
  height: 80vh;
  max-height: 600px;
  background-color: #1e1e1e;
  border-radius: 8px;
  border: 1px solid #444;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: #252526;
  border-bottom: 1px solid #444;
  flex-shrink: 0;
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #e0e0e0;
}

.title-icon {
  font-size: 20px;
  color: #0075db;
}

.close-btn {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  font-size: 20px;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-btn:hover {
  background-color: #c42b1c;
  color: white;
}

/* Search Section */
.search-section {
  padding: 16px 20px;
  background-color: #252526;
  border-bottom: 1px solid #444;
  flex-shrink: 0;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 18px;
  color: #888;
}

.search-input {
  flex: 1;
  padding: 10px 40px 10px 42px;
  background-color: #1e1e1e;
  border: 1px solid #444;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #0075db;
}

.search-input::placeholder {
  color: #666;
}

.clear-btn {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  font-size: 18px;
  border-radius: 4px;
  transition: all 0.2s;
}

.clear-btn:hover {
  background-color: #333;
  color: #e0e0e0;
}

/* Category Filters */
.category-filters {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 12px;
  color: #888;
  font-weight: 500;
}

.category-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 16px;
  color: #aaa;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.category-chip:hover {
  background-color: #333;
  border-color: #555;
}

.category-chip.active {
  background-color: var(--category-color);
  border-color: var(--category-color);
  color: white;
}

.category-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

/* Results Section */
.results-section {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  background-color: #1e1e1e;
}

.loading-state,
.empty-state,
.hint-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #888;
  gap: 12px;
}

.loading-state .spin,
.empty-state svg,
.hint-state svg {
  font-size: 48px;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Results List */
.results-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 6px;
  cursor: pointer;
  /* 只对需要动画的属性添加过渡,避免滚动时的性能损耗 */
  transition: background-color 0.15s, border-color 0.15s, transform 0.15s;
  /* GPU加速提示 */
  will-change: transform;
}

.result-item:hover {
  background-color: #333;
  border-color: #555;
  transform: translateX(4px);
}

.tag-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tag-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  /* 使用CSS变量代替内联样式,减少Vue的样式计算 */
  background-color: var(--cat-color, #888);
}

.tag-name {
  font-size: 14px;
  font-weight: 500;
  color: #e0e0e0;
}

.alias-indicator {
  color: #888;
  font-size: 12px;
  font-weight: 400;
  margin-left: 6px;
}

.tag-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #888;
}

.category-label {
  color: #aaa;
}

.post-count {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Actions */
.actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.action-btn {
  background: transparent;
  border: 1px solid #444;
  color: #ccc;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 18px;
  transition: all 0.2s;
}

.action-btn:hover {
    background-color: #333;
    color: white;
}

.add-btn {
  background-color: #0075db;
  border: none;
  color: white;
}

.add-btn:hover {
  background-color: #0060b5;
  transform: scale(1.1);
}

/* Like Button */
.like-btn {
}

.like-btn.liked {
    color: #e91e63;
    border-color: #e91e63;
    background-color: rgba(233, 30, 99, 0.1);
}

.like-btn:hover {
    color: #e91e63;
    border-color: #e91e63;
}


/* Scrollbar */
.results-section::-webkit-scrollbar {
  width: 8px;
}

.results-section::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.results-section::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}

.results-section::-webkit-scrollbar-thumb:hover {
  background: #555;
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
