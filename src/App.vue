<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ModalWrapper from './components/ModalWrapper.vue';
import TextEditor from './components/TextEditor.vue';
import { DuckDBService } from './utils/duckdbService';
import { settings } from './utils/settings';
import { metaService } from './utils/metaService';
import { textToTags, tagsToText } from './utils/promptParser';
import type { TagItem } from './utils/types';

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

const saveChanges = async () => {
  let finalPrompt = promptText.value;

  // Auto Meta Logic
  if (settings.autoMetaEnabled) {
      if (metaService.presets.value.length === 0) {
          await metaService.fetchPresets();
      }
      
      const metas = metaService.getActiveTags();
      if (metas.length > 0) {
          const tags = textToTags(finalPrompt);
          const tagNames = tags.map(t => t.text);
          
          // Identify rating tags dynamically via API (fast=true to skip repo tags)
          let ratingTags: TagItem[] = [];
          let otherTags: TagItem[] = [];
          
          try {
              const resp = await fetch('/simple-prompt/get-tags-details', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ names: tagNames, fast: true })
              });
              const categoriesMap = await resp.json(); // { name: categoryId }
              
              ratingTags = tags.filter(t => categoriesMap[t.text.toLowerCase()] === 7);
              otherTags = tags.filter(t => categoriesMap[t.text.toLowerCase()] !== 7);
          } catch (e) {
              console.error("Failed to fetch rating info, falling back to all:", e);
              otherTags = tags;
          }

          const existingTexts = new Set(tags.map(t => t.text));
          const metaTagsToAdd = metas.filter(m => !existingTexts.has(m));
          
          if (metaTagsToAdd.length > 0) {
               const newMetaItems: TagItem[] = metaTagsToAdd.map(m => ({ 
                   text: m, 
                   weight: 1.0, 
                   enabled: true 
               }));
               
               // others + newMetas + ratings
               const combined = [...otherTags, ...newMetaItems, ...ratingTags];
               finalPrompt = tagsToText(combined);
          }
      }
  }

    emit('save', finalPrompt);
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
        <template #content="{ openCustomTag }">
            <div style="width: 100%; height: 100%;">
                <TextEditor 
                    v-model="promptText" 
                    @open-custom-tag="openCustomTag"
                />
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
