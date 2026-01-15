<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';
import { metaService } from '../utils/metaService';

const props = defineProps<{
  tagCount?: number;
  autoMeta?: boolean;
}>();

const emit = defineEmits<{
  (e: 'open-search'): void;
  (e: 'format'): void;
  (e: 'organize'): void;
  (e: 'update:autoMeta', val: boolean): void;
  (e: 'insert-meta', meta: string): void;
}>();

const { t } = useI18n();

const showMetaMenu = ref(false);
const metaMenuRef = ref<HTMLElement | null>(null);
const metaSearchQuery = ref('');

const toggleMetaMenu = () => {
    showMetaMenu.value = !showMetaMenu.value;
    if (showMetaMenu.value) {
        metaService.fetchPresets();
        metaSearchQuery.value = ''; // Reset search
    }
};

const closeMetaMenu = (e: MouseEvent) => {
    if (metaMenuRef.value && !metaMenuRef.value.contains(e.target as Node)) {
        showMetaMenu.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', closeMetaMenu);
    // Init fetch
    metaService.fetchPresets();
});

onUnmounted(() => {
    document.removeEventListener('click', closeMetaMenu);
});

const filteredPresets = computed(() => {
    const q = metaSearchQuery.value.toLowerCase().trim();
    if (!q) return metaService.presets.value;
    return metaService.presets.value.filter(p => p.name.toLowerCase().includes(q));
});

const handlePresetSelect = (id: string) => {
    metaService.setActivePreset(id);
    // Don't close menu immediately? Or do? User might want to see it's selected.
    // User request: "Model B Meta (tick)".
    // So menu stays open or closes... usually selection closes menu. But ticks imply "Status".
    // Let's close for now, or keep open. "Popup up-menu".
    // Standard behavior: Select -> Close.
    showMetaMenu.value = false;
};
</script>

<template>
  <div class="toolbar">
    <!-- Format Button -->
    <button class="toolbar-btn" @click="$emit('format')" :title="t('editor.formatTitle') || 'Format Text'">
        <Icon icon="mdi:format-align-left" />
        <span>{{ t('editor.format') || 'Format' }}</span>
    </button>

    <!-- Organize Button -->
    <button class="toolbar-btn" @click="$emit('organize')" :title="t('editor.organizeTitle') || 'Organize Tags'">
        <Icon icon="mdi:sort" />
        <span>{{ t('editor.organize') || 'Organize' }}</span>
    </button>
    
    <div class="separator"></div>

    <!-- Auto Meta Switch -->
    <div class="switch-group">
        <label class="switch-label">{{ t('editor.autoMeta') || 'Auto Meta' }}</label>
        <label class="switch">
            <input type="checkbox" :checked="autoMeta" @change="$emit('update:autoMeta', ($event.target as HTMLInputElement).checked)">
            <span class="slider"></span>
        </label>
    </div>

    <!-- Meta Menu (Preset Selector) -->
    <div class="meta-menu-wrapper" ref="metaMenuRef">
        <!-- Optional: Show active preset name on button? No, just the up arrow/gear -->
        <button class="toolbar-btn icon-only" @click.stop="toggleMetaMenu" :title="t('editor.qualityWords') || 'Select Meta Preset'">
            <Icon icon="mdi:cog" /> <!-- Gear icon for settings/presets -->
        </button>
        
        <div v-if="showMetaMenu" class="meta-popup">
             <!-- Search Box -->
             <div class="meta-search-box">
                 <input v-model="metaSearchQuery" placeholder="Search..." class="meta-search-input" />
             </div>
             
             <!-- Preset List -->
             <div class="meta-list-scroll">
                <div 
                    v-for="p in filteredPresets" 
                    :key="p.id" 
                    class="meta-item"
                    :class="{ active: metaService.activePresetId.value === p.id }"
                    @click="handlePresetSelect(p.id)"
                >
                    <span class="meta-name">{{ p.name }}</span>
                    <Icon v-if="metaService.activePresetId.value === p.id" icon="mdi:check" />
                </div>
                <div v-if="filteredPresets.length === 0" class="meta-empty">
                    No presets found.
                </div>
            </div>
            
            <div class="meta-footer">
                <span class="meta-footer-hint">Edit in Settings > Meta</span>
            </div>
        </div>
    </div>

    <div class="separator"></div>

    <!-- Search Button -->
    <button class="toolbar-btn" @click="$emit('open-search')">
      <Icon icon="mdi:magnify" />
      <span>{{ t('editor.searchBtn') }}</span>
    </button>

    <div class="separator"></div>

    <!-- Tag Count -->
    <div class="tag-count">
      <Icon icon="mdi:tag-multiple" />
      <span>{{ t('editor.tagCount') }}{{ tagCount || 0 }}</span>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: #333;
  color: #e0e0e0;
  border: 1px solid #444;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
  white-space: nowrap;
}

.toolbar-btn:hover {
  background-color: #444;
  border-color: #555;
}

.toolbar-btn:active {
  background-color: #2a2a2a;
}

.separator {
  width: 1px;
  height: 20px;
  background-color: #444;
}

.tag-count {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #aaa;
  margin-left: auto;
}

.tag-count svg {
  font-size: 16px;
}

.switch-group {
    display: flex;
    align-items: center;
    gap: 8px;
}

.switch-label {
    font-size: 13px;
    color: #ccc;
    cursor: default;
}

/* Switch from Settings */
.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #444;
  transition: .3s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #0075db;
}

input:checked + .slider:before {
  transform: translateX(16px);
}

.meta-menu-wrapper {
    position: relative;
}

.icon-only {
    padding: 6px;
}

.meta-popup {
    position: absolute;
    bottom: 100%;
    left: 0;
    margin-bottom: 8px;
    background: #252526;
    border: 1px solid #444;
    border-radius: 4px;
    width: 200px;
    max-height: 300px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    z-index: 100;
}

.meta-search-box {
    padding: 8px;
    border-bottom: 1px solid #333;
}

.meta-search-input {
    width: 100%;
    background: #1e1e1e;
    border: 1px solid #444;
    color: white;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 12px;
}

.meta-list-scroll {
    overflow-y: auto;
    flex: 1;
}

.meta-item {
    padding: 8px 12px;
    color: #e0e0e0;
    cursor: pointer;
    font-size: 13px;
    transition: background 0.2s;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.meta-item:hover {
    background-color: #3e3e42;
}

.meta-item.active {
    background-color: #0075db;
    color: white;
}

.meta-empty {
    padding: 10px;
    color: #888;
    font-size: 12px;
    text-align: center;
}

.meta-footer {
    padding: 6px;
    border-top: 1px solid #333;
    font-size: 10px;
    color: #666;
    text-align: center;
}
</style>
