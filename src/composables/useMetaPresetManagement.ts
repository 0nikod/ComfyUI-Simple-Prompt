import { ref } from 'vue';
import { metaService } from '../utils/metaService';
import type { PresetRecord } from '../api/types';

type Translate = (key: string) => string;

export function useMetaPresetManagement(t: Translate) {
    const presetName = ref('');
    const presetTags = ref('');
    const editingPresetId = ref<string | null>(null);

    const fetchPresets = () => {
        return metaService.fetchPresets();
    };

    const resetPresetForm = () => {
        presetName.value = '';
        presetTags.value = '';
        editingPresetId.value = null;
    };

    const handleSavePreset = () => {
        if (!presetName.value || !presetTags.value) {
            alert(t('category.nameRequired'));
            return;
        }

        const tags = presetTags.value
            .split(/[,\n]/)
            .map((tag) => tag.trim())
            .filter(Boolean);

        if (editingPresetId.value) {
            const index = metaService.customPresets.value.findIndex((preset) => preset.id === editingPresetId.value);
            if (index !== -1) {
                metaService.customPresets.value[index] = {
                    ...metaService.customPresets.value[index],
                    name: presetName.value,
                    tags,
                };
            }
        } else {
            const newPreset: PresetRecord = {
                id: `custom_${Date.now()}`,
                name: presetName.value,
                tags,
            };
            metaService.customPresets.value.push(newPreset);
        }

        void metaService.saveCustomPresets(metaService.customPresets.value).then(() => {
            resetPresetForm();
        });
    };

    const handleEditPreset = (preset: PresetRecord) => {
        editingPresetId.value = preset.id;
        presetName.value = preset.name;
        presetTags.value = preset.tags.join(', ');
    };

    const handleDeletePreset = (id: string) => {
        if (!confirm(t('common.confirm') || 'Are you sure?')) return;

        const newCustoms = metaService.customPresets.value.filter((preset) => preset.id !== id);
        metaService.customPresets.value = newCustoms;
        void metaService.saveCustomPresets(newCustoms);
    };

    return {
        presetName,
        presetTags,
        editingPresetId,
        fetchPresets,
        resetPresetForm,
        handleSavePreset,
        handleEditPreset,
        handleDeletePreset,
    };
}
