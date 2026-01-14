import { createI18n } from 'vue-i18n';
import en from '../locales/en/main.json';
import zh from '../locales/zh/main.json';

// Get initial locale
const getInitialLocale = () => {
    // 1. Check localStorage (our app setting)
    const stored = localStorage.getItem('simplePrompt.settings');
    if (stored) {
        try {
            const { language } = JSON.parse(stored);
            if (language) return language;
        } catch (e) { }
    }

    // 2. Check ComfyUI Setting
    if ((window as any).app?.ui?.settings) {
        const comfyLang = (window as any).app.ui.settings.getSettingValue("Comfy.lang", "");
        if (comfyLang) {
            if (comfyLang.startsWith('zh')) return 'zh-CN';
            return 'en';
        }
    }

    // 3. Browser language
    const browserLang = navigator.language;
    if (browserLang.startsWith('zh')) return 'zh-CN';

    return 'en';
};

const i18n = createI18n({
    legacy: false,
    locale: getInitialLocale(),
    fallbackLocale: 'en',
    messages: {
        en: en,
        'zh-CN': zh
    }
});

export default i18n;
