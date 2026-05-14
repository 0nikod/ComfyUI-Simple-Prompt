import { ref } from 'vue';
import { simplePromptApi } from '../api/client';

export type DataUpdateAction = 'update_github' | 'update_liked' | 'update_user';

type Translate = (key: string) => string;

export function useDataUpdateActions(t: Translate) {
    const updateStatus = ref('');
    const isUpdating = ref(false);
    const isChecking = ref(false);
    const latestVersion = ref('');

    const resetUpdateStatus = () => {
        updateStatus.value = '';
        latestVersion.value = '';
    };

    const handleDataUpdate = async (action: DataUpdateAction) => {
        if (isUpdating.value || isChecking.value) return;

        isUpdating.value = true;
        updateStatus.value = '';

        try {
            if (action === 'update_github') {
                isChecking.value = true;
                updateStatus.value = t('settings.items.checkingUpdate');

                try {
                    const checkResult = await simplePromptApi.checkUpdate();

                    latestVersion.value = checkResult.version;
                    isChecking.value = false;

                    if (!checkResult.update_available) {
                        updateStatus.value = t('settings.items.upToDate') + latestVersion.value;
                        return;
                    }

                    updateStatus.value = t('settings.items.updating');
                    const updateResult = await simplePromptApi.updateTags();

                    if (updateResult.status === 'success') {
                        updateStatus.value = t('settings.items.updateSuccess');
                    } else {
                        throw new Error(updateResult.message || 'Update failed');
                    }
                } finally {
                    isChecking.value = false;
                }
            } else {
                updateStatus.value = t('settings.items.updating');
                const result = await simplePromptApi.updateData(action);

                if (result.status === 'success') {
                    updateStatus.value = result.message || t('settings.items.updateSuccess');
                } else {
                    throw new Error(result.message || 'Update failed');
                }
            }
        } catch (error: unknown) {
            console.error('Update action error:', error);
            const message = error instanceof Error ? error.message : String(error);
            updateStatus.value = t('settings.items.updateError') + message;
        } finally {
            isUpdating.value = false;
        }
    };

    return {
        updateStatus,
        isUpdating,
        isChecking,
        latestVersion,
        resetUpdateStatus,
        handleDataUpdate,
    };
}
