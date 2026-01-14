import { reactive, watch } from 'vue';

export interface UserSettings {
    convertUnderscoreToSpace: boolean;
    escapeBrackets: boolean;
    useAliasesInSearch: boolean;
    useAliasesInAutocomplete: boolean;
    smartBackspace: boolean;
    language: 'en' | 'zh-CN';
    allowEditDefaultTags: boolean;
}

const STORAGE_KEY = 'simplePrompt.settings';

const defaultSettings: UserSettings = {
    convertUnderscoreToSpace: true,
    escapeBrackets: false,
    useAliasesInSearch: true,
    useAliasesInAutocomplete: false, // Default false as per new spec
    smartBackspace: false, // Default false - user must opt-in
    language: 'en', // Default fallback
    allowEditDefaultTags: false,
};

export const settings = reactive<UserSettings>({ ...defaultSettings });

// Load from localStorage
export function loadSettings() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            Object.assign(settings, { ...defaultSettings, ...parsed });
        } else {
            // Detect language if not stored
            const browserLang = navigator.language;
            if (browserLang.startsWith('zh')) {
                settings.language = 'zh-CN';
            }
        }
    } catch (e) {
        console.error("Failed to load settings:", e);
    }
}

// Save to localStorage when changed
watch(settings, (newSettings) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {
        console.error("Failed to save settings:", e);
    }
}, { deep: true });

// Initialize immediately
loadSettings();
