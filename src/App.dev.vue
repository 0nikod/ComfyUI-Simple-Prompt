<script setup lang="ts">
import { ref } from 'vue';
import ModalWrapper from './components/ModalWrapper.vue';
import TextEditor from './components/TextEditor.vue';

const showModal = ref(false);
const promptText = ref('1girl, solo, masterpiece, best quality');

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const saveChanges = () => {
    console.log("Save requested");
    closeModal();
};
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
                
                <!-- Right Pane: Placeholder for Visual Tags -->
                <div style="flex: 1; padding: 20px; color: #888;">
                    <h3>Visual Tag Area (Coming Soon)</h3>
                    <p>Current Prompt: {{ promptText }}</p>
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
