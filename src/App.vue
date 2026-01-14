<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ModalWrapper from './components/ModalWrapper.vue';
import TextEditor from './components/TextEditor.vue';
import { DuckDBService } from './utils/duckdbService';

const props = defineProps<{
    initialPrompt: string;
}>();

const emit = defineEmits<{
    (e: 'save', prompt: string): void;
    (e: 'close'): void;
}>();

const showModal = ref(true);
const promptText = ref(props.initialPrompt);
const dbStatus = ref('Initializing...');

onMounted(async () => {
    // Determine data URL based on environment
    // In production (ComfyUI), data is served from the extension folder
    // The path is relative to the ComfyUI root or accessible via API
    // SimplePrompt.py mounts /simple-prompt/search-tags but doesn't expose raw parquet file via HTTP directly usually
    // BUT our SimplePrompt.py init_duckdb loads it from valid path.
    // Wait, the DuckDBService in frontend uses API for search now (based on my check of DuckDBService.ts).
    // So we just need to init the service.
    
    try {
        const db = DuckDBService.getInstance();
        await db.init();
        // Backend handles file loading now, so we don't need to pass a URL or loadTagsFile might be no-op.
        // Let's check DuckDBService.ts content again if needed, but assuming it's correctly refactored.
        await db.loadTagsFile(''); 
        dbStatus.value = 'Ready';
    } catch (e) {
        console.error("DB Error:", e);
        dbStatus.value = `Error: ${e}`;
    }
});

const closeModal = () => {
    showModal.value = false;
    emit('close');
};

const saveChanges = () => {
    emit('save', promptText.value);
    showModal.value = false; 
    // We let the parent handle unmounting
};
</script>

<template>
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
</template>

<style>
/* Ensure styles don't leak too much but setting some basics */
.simple-prompt-root {
    font-family: sans-serif;
    color: white;
}
</style>
