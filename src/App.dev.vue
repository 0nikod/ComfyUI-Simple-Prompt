<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import ModalWrapper from './components/ModalWrapper.vue';
import TextEditor from './components/TextEditor.vue';
import { textToTags, tagsToText } from './utils/promptParser';
import type { TagItem } from './utils/types';
import { DuckDBService } from './utils/duckdbService';

const showModal = ref(false);
const promptText = ref('1girl, solo, (masterpiece:1.2), best quality');
const dbStatus = ref('Initializing...');

onMounted(async () => {
    // Determine data URL based on environment
    // In Dev Mode (Vite), we might need to point to the file served by Vite
    // We configured Vite to allow serving from root, so '/data/tags.parquet' should work if referenced correctly.
    // However, since index.html is in root, 'data/tags.parquet' is relative to root.
    const dataUrl = '/data/tags.parquet';
    
    try {
        const db = DuckDBService.getInstance();
        await db.init();

        dbStatus.value = 'Ready';
        
        // Test search
        const results = await db.searchTags('shojo');
        console.log('[Dev] Test Search "shojo":', results);
        
    } catch (e) {
        console.error("DB Error:", e);
        dbStatus.value = `Error: ${e}`;
    }
});

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

const { locale } = DuckDBService.getInstance() as any; // Mock logic or use i18n
import { useI18n } from 'vue-i18n';
const { locale: i18nLocale } = useI18n();

const toggleLanguage = () => {
    i18nLocale.value = i18nLocale.value === 'en' ? 'zh-CN' : 'en';
};
</script>

<template>
  <div style="text-align: center; padding-top: 50px;">
    <h1>Simple Prompt Dev Environment</h1>
    <p>DB Status: <strong>{{ dbStatus }}</strong></p>
    <div style="margin-bottom: 20px;">
        <button @click="openModal" style="padding: 10px 20px; font-size: 16px; cursor: pointer; margin-right: 10px;">
            Edit Prompt
        </button>
        <button @click="toggleLanguage" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
            Switch Language ({{ i18nLocale }})
        </button>
    </div>

    <ModalWrapper 
        :visible="showModal" 
        @close="closeModal"
        @save="saveChanges"
    >
        <template #content>
            <div style="width: 100%; height: 100%;">
                <TextEditor v-model="promptText" />
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
