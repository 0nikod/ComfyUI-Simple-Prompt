<script setup lang="ts">
import { ref, watch, nextTick, computed, onMounted, onUnmounted } from 'vue';
import { DuckDBService } from '../utils/duckdbService';
import { settings } from '../utils/settings';
import { getCaretCoordinates } from '../utils/caret';
import AutocompleteList from './AutocompleteList.vue';
import VisualTagArea from './VisualTagArea.vue';
import OtherFunctions from './OtherFunctions.vue';
import TagSearchModal from './TagSearchModal.vue';
import { textToTags, tagsToText } from '../utils/promptParser';
import type { TagItem } from '../utils/types';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'cursor-move']);

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);
const localValue = ref(props.modelValue);
const tags = ref<TagItem[]>([]);

// Layout State
// Percentage of height taken by the Text Editor (top part)
// Default to 60%
const splitPercentage = ref(60); 
const isResizing = ref(false);

// Initialize tags
tags.value = textToTags(localValue.value);

// Autocomplete State
const showAutocomplete = ref(false);
const searchResults = ref<any[]>([]);
const selectedIndex = ref(0);
const menuPosition = ref({ top: 0, left: 0 });
const currentQuery = ref('');
const queryStartPos = ref(0);
const loading = ref(false);

// Search Modal State
const showSearchModal = ref(false);

// Sync prop to local value (one-way from parent)
watch(() => props.modelValue, (newValue) => {
    if (newValue !== localValue.value) {
        localValue.value = newValue;
        tags.value = textToTags(newValue);
    }
});

// Sync local value to parent & Update tags
const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    localValue.value = target.value;
    emit('update:modelValue', target.value);
    
    // Update tags from text
    tags.value = textToTags(target.value);

    // Trigger autocomplete logic
    checkAutocomplete(target);
};

// Handle updates from VisualTagArea
const handleTagsUpdate = (newTags: TagItem[]) => {
    tags.value = newTags;
    const newText = tagsToText(newTags);
    if (newText !== localValue.value) {
        localValue.value = newText;
        emit('update:modelValue', newText);
    }
};

// Copy functionality
const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(localValue.value);
        console.log('Copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

// Splitter Resize Logic
const startResize = (e: MouseEvent) => {
    isResizing.value = true;
    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
};

const doResize = (e: MouseEvent) => {
    if (!isResizing.value || !containerRef.value) return;

    // Calculate new percentage based on mouse Y relative to container
    const containerRect = containerRef.value.getBoundingClientRect();
    const relativeY = e.clientY - containerRect.top;
    
    // Account for toolbar and footer fixed heights roughly (optional, but cleaner if precise)
    // Or just use straight percentage of container. 
    // Let's stick to percentage of the *flexible area* (container height - toolbar - footer)
    // but the container includes toolbar and footer. 
    // Easier approach: Just use direct percentage of container height for simplicity first, 
    // clamping to avoid breaking things.
    
    let newPercent = (relativeY / containerRect.height) * 100;
    
    // Clamp between 20% and 80%
    if (newPercent < 20) newPercent = 20;
    if (newPercent > 80) newPercent = 80;
    
    splitPercentage.value = newPercent;
};

const stopResize = () => {
    isResizing.value = false;
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
    document.body.style.userSelect = '';
};

// Clean up event listeners just in case
onUnmounted(() => {
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
});


// Check if we should show autocomplete
const checkAutocomplete = async (el: HTMLTextAreaElement) => {
    const cursor = el.selectionEnd;
    const textBefore = el.value.substring(0, cursor);
    
    // Regex to find the word being typed (alphanumeric + count > 2)
    // We look for the last word boundary
    const match = /([a-zA-Z0-9_\u4e00-\u9fa5]{2,})$/.exec(textBefore);
    
    if (match) {
        const query = match[1];
        currentQuery.value = query;
        queryStartPos.value = match.index;
        
        // Calculate position
        const coords = getCaretCoordinates(el, cursor);
        menuPosition.value = {
            top: coords.top + coords.height + 5, // 5px padding
            left: coords.left
        };
        
        // Perform search
        loading.value = true;
        showAutocomplete.value = true;
        
        try {
            console.log(`[Autocomplete] Searching for: "${query}"`);
            const db = DuckDBService.getInstance();
            const results = await db.searchTags(query, 20, settings.useAliasesInAutocomplete);
            
            searchResults.value = results;
            selectedIndex.value = 0;
            
             // Option: Close if no results
             // if (results.length === 0) showAutocomplete.value = false;
             
        } catch (e) {
            console.error("Autocomplete search error:", e);
        } finally {
            loading.value = false;
        }
    } else {
        showAutocomplete.value = false;
    }
};

// Handle Keyboard Navigation
const handleKeydown = (e: KeyboardEvent) => {
    if (showAutocomplete.value && searchResults.value.length > 0) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex.value = (selectedIndex.value - 1 + searchResults.value.length) % searchResults.value.length;
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex.value = (selectedIndex.value + 1) % searchResults.value.length;
            return;
        }
        if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault();
            selectItem(searchResults.value[selectedIndex.value]);
            return;
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            showAutocomplete.value = false;
            return;
        }
    }
};

const selectItem = (item: any) => {
    if (!textareaRef.value) return;
    
    const el = textareaRef.value;
    const cursor = el.selectionEnd;
    const text = localValue.value;
    
    // Get tag name and apply settings
    let tagName = item.name;
    
    // Apply text formatting settings
    if (settings.convertUnderscoreToSpace) {
        tagName = tagName.replace(/_/g, ' ');
    }
    
    if (settings.escapeBrackets) {
        tagName = tagName.replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    }
    
    // Replace the query with the selected tag name
    const prefix = text.substring(0, queryStartPos.value);
    const suffix = text.substring(cursor);
    
    // Auto-append comma
    let newSuffix = suffix;
    if (!suffix.trim().startsWith(',') && !suffix.trim().startsWith(')')) {
        newSuffix = ', ' + suffix;
    }
    
    const newText = prefix + tagName + newSuffix;
    
    localValue.value = newText;
    emit('update:modelValue', newText);
    
    // Update tags
    tags.value = textToTags(newText);
    
    showAutocomplete.value = false;
    
    nextTick(() => {
        const newCursorPos = prefix.length + tagName.length + (newSuffix.startsWith(', ') ? 2 : 0);
        el.setSelectionRange(newCursorPos, newCursorPos);
        el.focus();
    });
};

const handleBlur = () => {
    setTimeout(() => {
        showAutocomplete.value = false;
    }, 200);
};

// Handle search modal
const openSearchModal = () => {
    showSearchModal.value = true;
};

const closeSearchModal = () => {
    showSearchModal.value = false;
};

// Add tag from search
const handleAddTag = (tagName: string, category: number) => {
    // Apply text formatting settings
    let formattedTagName = tagName;
    
    if (settings.convertUnderscoreToSpace) {
        formattedTagName = formattedTagName.replace(/_/g, ' ');
    }
    
    if (settings.escapeBrackets) {
        formattedTagName = formattedTagName.replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    }
    
    // Create a new tag and add it to the list
    const newTag: TagItem = {
        id: `tag-${Date.now()}-${Math.random()}`,
        text: formattedTagName,
        weight: 1.0,
        enabled: true,
        category: category
    };
    
    const newTags = [...tags.value, newTag];
    tags.value = newTags;
    
    // Update text
    const newText = tagsToText(newTags);
    localValue.value = newText;
    emit('update:modelValue', newText);
};

// Expose focus method
const focus = () => {
    textareaRef.value?.focus();
};

defineExpose({ focus });
</script>

<template>
  <div class="sp-editor-container" ref="containerRef">
    <!-- 1. Toolbar -->
    <div class="sp-toolbar">
        <button class="sp-btn" @click="copyToClipboard" title="Copy to Clipboard">
            <span class="icon">📋</span> Copy
        </button>
        <!-- Add more buttons here as needed -->
    </div>

    <!-- 2. Text Editor -->
    <!-- We adjust height using splitPercentage. 
         Note: We subtract toolbar height roughly or rely on flex if we set flex-basis.
         But percentage of container is easiest if we treat toolbar as part of the % or separate.
         Let's try: Editor gets splitPercentage%, Visual gets rest. 
         But toolbar breaks pure %. 
         Better: Editor gets `height: calc( ${splitPercentage}% - 45px )` ? No.
         
         Let's try flex-grow based on percentage? No.
         Let's just apply height in % to editor, and flex:1 to visual.
    -->
    <div class="sp-editor-area" :style="{ height: `calc(${splitPercentage}% - 40px)` }">
        <textarea
            ref="textareaRef"
            class="sp-textarea"
            v-model="localValue"
            @input="handleInput"
            @keydown="handleKeydown"
            @blur="handleBlur"
            placeholder="Enter positive prompt here..."
            spellcheck="false"
        ></textarea>
        
        <!-- Autocomplete Menu -->
        <div v-if="showAutocomplete" class="autocomplete-wrapper" :style="{ top: menuPosition.top + 'px', left: menuPosition.left + 'px' }">
            <AutocompleteList
                :items="searchResults"
                :selected-index="selectedIndex"
                :loading="loading"
                @select="selectItem"
            />
        </div>
    </div>

    <!-- Splitter -->
    <div class="sp-splitter" @mousedown="startResize">
        <div class="sp-splitter-handle"></div>
    </div>

    <!-- 3. Visual Editor -->
    <div class="sp-visual-area">
        <VisualTagArea 
          :tags="tags" 
          @update:tags="handleTagsUpdate" 
        />
    </div>

    <!-- 4. Other Functions (Footer) -->
    <div class="sp-footer">
        <OtherFunctions 
          :tag-count="tags.length"
          @open-search="openSearchModal"
        />
    </div>

    <!-- Tag Search Modal -->
    <TagSearchModal 
      :visible="showSearchModal"
      @close="closeSearchModal"
      @add-tag="handleAddTag"
    />
  </div>
</template>

<style scoped>
.sp-editor-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #1e1e1e;
    color: #e0e0e0;
    overflow: hidden; /* Prevent container scroll, inner areas scroll */
}

/* 1. Toolbar */
.sp-toolbar {
    padding: 8px;
    background-color: #252526;
    border-bottom: 1px solid #333;
    display: flex;
    gap: 8px;
    flex-shrink: 0; /* Keep toolbar fixed size */
}

.sp-btn {
    background-color: #333;
    color: #eee;
    border: 1px solid #444;
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.sp-btn:hover {
    background-color: #444;
}

.sp-btn:active {
    background-color: #2a2a2a;
}

/* 2. Editor Area */
.sp-editor-area {
    /* Height is set dynamically by splitPercentage */
    min-height: 50px;
    position: relative; /* Context for autocomplete */
    display: flex;
}

.sp-textarea {
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: #1e1e1e;
    color: #e0e0e0;
    border: none;
    padding: 16px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    resize: none;
    outline: none;
}

/* Splitter */
.sp-splitter {
    height: 6px;
    background-color: #252526;
    cursor: row-resize;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
    flex-shrink: 0;
    z-index: 10;
}

.sp-splitter:hover {
    background-color: #007fd4; /* Highlight on hover */
}

.sp-splitter-handle {
    width: 30px;
    height: 2px;
    background-color: #555;
    border-radius: 1px;
}

/* 3. Visual Area */
.sp-visual-area {
    flex: 1; /* Fills remaining space */
    min-height: 50px;
    background-color: #1a1a1a;
    overflow: hidden; /* inner component handles scroll */
    position: relative; /* In case we need overlapping */
}

/* 4. Footer */
.sp-footer {
    padding: 8px;
    background-color: #252526;
    border-top: 1px solid #333;
    font-size: 12px;
    color: #888;
    flex-shrink: 0;
}

.sp-textarea::placeholder {
    color: #555;
}

/* Scrollbar styling */
.sp-textarea::-webkit-scrollbar {
    width: 10px;
}

.sp-textarea::-webkit-scrollbar-track {
    background: #1e1e1e;
}

.sp-textarea::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 5px;
}

.sp-textarea::-webkit-scrollbar-thumb:hover {
    background: #444;
}

.autocomplete-wrapper {
    position: absolute;
    z-index: 20000;
}
</style>
