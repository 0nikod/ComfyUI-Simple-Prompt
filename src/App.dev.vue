<script setup lang="ts">
import { ref, watch } from 'vue';
import ModalWrapper from './components/ModalWrapper.vue';
import TextEditor from './components/TextEditor.vue';
import VisualTagArea from './components/VisualTagArea.vue';
import { textToTags, tagsToText } from './utils/promptParser';
import type { TagItem } from './utils/types';

const showModal = ref(false);
const promptText = ref('1girl, solo, (masterpiece:1.2), best quality');
const tags = ref<TagItem[]>([]);

// Initialize tags from promptText
tags.value = textToTags(promptText.value);

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const saveChanges = () => {
    console.log("Saved prompt:", promptText.value);
    closeModal();
};

// Watch promptText changes -> update tags
watch(promptText, (newText) => {
    tags.value = textToTags(newText);
});

// Watch tags changes -> update promptText
watch(tags, (newTags) => {
    const newText = tagsToText(newTags);
    if (newText !== promptText.value) {
        promptText.value = newText;
    }
}, { deep: true });
</script>

<template>
  <div style="text-align: center;">
    <h1>Simple Prompt Dev Environment</h1>
    <p>Click below to test the Modal</p>
    <button @click="openModal" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
        Edit Prompt
    </button>

    <ModalWrapper 
        :visible="showModal" 
        @close="closeModal"
        @save="saveChanges"
    >
        <template #content>
            <div style="display: flex; height: 100%;">
                <!-- Left Pane: Text Editor -->
                <div style="flex: 1; border-right: 1px solid #333; min-width: 300px;">
                    <TextEditor v-model="promptText" />
                </div>
                
                <!-- Right Pane: Visual Tag Area -->
                <div style="flex: 1; min-width: 300px;">
                    <VisualTagArea :tags="tags" @update:tags="tags = $event" />
                </div>
            </div>
        </template>
    </ModalWrapper>
  </div>
</template>

<style>
body {
    font-family: sans-serif;
}
</style>
