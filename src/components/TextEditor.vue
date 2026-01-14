<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'cursor-move']);

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const localValue = ref(props.modelValue);

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
    
    // Also emit cursor position for autocomplete later
    handleCursorMove(e);
};

const handleCursorMove = (e: Event | KeyboardEvent | MouseEvent) => {
    if (!textareaRef.value) return;
    
    emit('cursor-move', {
        value: localValue.value,
        selectionStart: textareaRef.value.selectionStart,
        selectionEnd: textareaRef.value.selectionEnd
    });
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
        @keydown="handleCursorMove"
        @click="handleCursorMove"
        @keyup="handleCursorMove"
        placeholder="Enter positive prompt here..."
        spellcheck="false"
    ></textarea>
  </div>
</template>

<style scoped>
.sp-editor-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
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
</style>
