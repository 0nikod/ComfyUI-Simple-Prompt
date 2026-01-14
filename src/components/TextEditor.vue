<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { DuckDBService } from '../utils/duckdbService';
import { getCaretCoordinates } from '../utils/caret';
import AutocompleteList from './AutocompleteList.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'cursor-move']);

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const localValue = ref(props.modelValue);

// Autocomplete State
const showAutocomplete = ref(false);
const searchResults = ref<any[]>([]);
const selectedIndex = ref(0);
const menuPosition = ref({ top: 0, left: 0 });
const currentQuery = ref('');
const queryStartPos = ref(0);
const loading = ref(false);

// Sync prop to local value (one-way from parent)
watch(() => props.modelValue, (newValue) => {
    if (newValue !== localValue.value) {
        localValue.value = newValue;
    }
});

// Sync local value to parent
const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    localValue.value = target.value;
    emit('update:modelValue', target.value);
    
    // Trigger autocomplete logic
    checkAutocomplete(target);
};

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
            const results = await db.searchTags(query);
            console.log(`[Autocomplete] Results:`, results);
            
            searchResults.value = results;
            selectedIndex.value = 0;
            
            if (results.length === 0) {
                 // Option: Close if no results, or show "No results"
                 // showAutocomplete.value = false;
            }
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
    
    // Emit cursor move for other components if needed
    // emit('cursor-move', ...);
};

const selectItem = (item: any) => {
    if (!textareaRef.value) return;
    
    const el = textareaRef.value;
    const cursor = el.selectionEnd;
    const text = localValue.value;
    
    // Replace the query with the selected tag name
    const prefix = text.substring(0, queryStartPos.value);
    const suffix = text.substring(cursor);
    
    // Logic: If plain text, just insert name
    // Future: Handle escape brackets logic or formatting preferences
    const tagName = item.name; 
    
    // Auto-append comma if not present in suffix start
    let newSuffix = suffix;
    if (!suffix.trim().startsWith(',') && !suffix.trim().startsWith(')')) {
        newSuffix = ', ' + suffix;
    }
    
    const newText = prefix + tagName + newSuffix;
    
    localValue.value = newText;
    emit('update:modelValue', newText);
    showAutocomplete.value = false;
    
    // Restore cursor position (after inserted tag + comma)
    nextTick(() => {
        const newCursorPos = prefix.length + tagName.length + (newSuffix.startsWith(', ') ? 2 : 0);
        el.setSelectionRange(newCursorPos, newCursorPos);
        el.focus();
    });
};

const handleBlur = () => {
    // Delay hiding to allow click event on menu item to process
    setTimeout(() => {
        showAutocomplete.value = false;
    }, 200);
};

// Expose focus method
const focus = () => {
    textareaRef.value?.focus();
};

defineExpose({ focus });
</script>

<template>
  <div class="sp-editor-container">
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
</template>

<style scoped>
.sp-editor-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative; /* Context for absolute positioning */
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
