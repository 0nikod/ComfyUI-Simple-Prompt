import { ref } from 'vue';
import { simplePromptApi } from '../api/client';
import type { PresetRecord } from '../api/types';

class MetaService {
    private static instance: MetaService;
    // Preset support
    public presets = ref<PresetRecord[]>([]);
    public defaultPresets = ref<PresetRecord[]>([]);
    public customPresets = ref<PresetRecord[]>([]);
    public activePresetId = ref<string>('');

    public loading = ref(false);

    private constructor() { }

    public static getInstance(): MetaService {
        if (!MetaService.instance) {
            MetaService.instance = new MetaService();
        }
        return MetaService.instance;
    }


    // --- Preset API ---

    public async fetchPresets() {
        try {
            const data = await simplePromptApi.listPresets();
            this.defaultPresets.value = data.defaults || [];
            this.customPresets.value = data.customs || [];

            // Merge
            this.presets.value = [...this.defaultPresets.value, ...this.customPresets.value];

            // Restore active preset logic or default to first if none
            if (!this.activePresetId.value && this.presets.value.length > 0) {
                // Check storage?
                // For now default to first
                this.activePresetId.value = this.presets.value[0].id;
            }
        } catch (e) {
            console.error("Error fetching presets:", e);
        }
    }

    public async saveCustomPresets(customs: PresetRecord[]) {
        try {
            await simplePromptApi.savePresets(customs);
            await this.fetchPresets();
        } catch (e) {
            console.error("Error saving presets:", e);
            throw e;
        }
    }

    public getActiveTags(): string[] {
        // If we have an active preset, use it
        if (this.activePresetId.value) {
            const preset = this.presets.value.find(p => p.id === this.activePresetId.value);
            if (preset && preset.tags) return preset.tags;
        }
        // Fallback to old behavior (all meta tags)?
        // Or if no preset is active, use the 'metaTags' list?
        // User wants "Auto Meta" to use "Selected Meta Group".
        // Let's assume if Presets exist, we use them.
        // If user wants "All", they can make an "All" preset?
        // Or fallback to flat list if activePresetId is empty?
        return [];
    }

    public setActivePreset(id: string) {
        this.activePresetId.value = id;
    }
}

export const metaService = MetaService.getInstance();
