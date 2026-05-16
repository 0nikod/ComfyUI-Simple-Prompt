<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ModalWrapper from './components/ModalWrapper.vue';
import TextEditor from './components/TextEditor.vue';
import { DuckDBService } from './utils/duckdbService';
import { CategoryService } from './utils/categoryService';
import { settings } from './utils/settings';
import { metaService } from './utils/metaService';
import { textToTags, applyAutoMeta } from './utils/promptParser';
import { normalizeTagForRecognition } from './utils/tagRecognition';
import { simplePromptApi } from './api/client';

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
    try {
        const db = DuckDBService.getInstance();
        await db.init();
        await CategoryService.getInstance().init();
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

  // Auto Meta Logic (Minimal Invasive)
  if (settings.autoMetaEnabled) {
      if (metaService.presets.value.length === 0) {
          await metaService.fetchPresets();
      }
      
      const metas = metaService.getActiveTags();
      if (metas.length > 0) {
          // Get all tag names from prompt to identify ratings
          const tags = textToTags(finalPrompt);
          const tagNames = tags.map(t => t.text);
          const recognitionTagNames = tagNames.map((name) =>
              normalizeTagForRecognition(name, settings.ignoreAtPrefixForRecognition)
          );
          
          // Fetch categories to identify rating tags
          let ratingTagNames: string[] = [];
          
          try {
              const categoriesMap = await simplePromptApi.getTagsDetails(recognitionTagNames, true);
              
              // Extract rating tag names (category 7)
              ratingTagNames = tagNames.filter((name, index) =>
                  categoriesMap[recognitionTagNames[index].toLowerCase()] === 7
              );
          } catch (e) {
              console.error("Failed to fetch tag categories:", e);
          }
          
          // Apply auto meta with minimal changes
          finalPrompt = applyAutoMeta(finalPrompt, metas, ratingTagNames, {
              ignoreAtPrefixForRecognition: settings.ignoreAtPrefixForRecognition,
          });
      }
  }

    emit('save', finalPrompt);
    showModal.value = false; 
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
