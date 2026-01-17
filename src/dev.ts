/**
 * Development Environment Mock
 * 
 * This file mocks the ComfyUI environment (app, api, nodes) to allow
 * standalone development of the editor modal.
 */

import { createApp, h } from 'vue';
import i18n from './i18n';
import AppDev from './App.dev.vue';
// import SimplePromptEditor from './components/SimplePromptEditor.vue';

console.log("[Dev] Initializing Standalone Development Environment");

// Mock Global Variables commonly found in ComfyUI
(window as any).app = {
    ui: {
        settings: {
            getSettingValue: (key: string, def: any) => {
                console.log(`[Dev] getSettingValue: ${key}`, def);
                // Return mock settings from localStorage or default
                return JSON.parse(localStorage.getItem(key) || JSON.stringify(def));
            },
            setSettingValue: (key: string, val: any) => {
                console.log(`[Dev] setSettingValue: ${key}`, val);
                localStorage.setItem(key, JSON.stringify(val));
            }
        }
    }
};

(window as any).api = {
    apiURL: '/api' // Proxy to backend if needed
};

// Mock Node Object
const mockNode = {
    id: 1,
    type: 'SimplePrompt',
    widgets: [
        {
            name: 'prompt_text',
            value: '1girl, smiling, (long hair:1.2), masterpiece',
            callback: (v: string) => { console.log("[Dev] Widget Value Changed:", v); }
        }
    ],
    addWidget: (type: string, name: string, value: any, callback: any) => {
        console.log(`[Dev] addWidget: ${type}, ${name}`);
        if (type === 'button') {
            // Simulate button click to open editor immediately for debugging
            const btn = document.createElement('button');
            btn.innerText = name;
            btn.style.position = 'fixed';
            btn.style.top = '20px';
            btn.style.left = '20px';
            btn.style.padding = '10px 20px';
            btn.style.zIndex = '9999';
            btn.onclick = callback;
            document.body.appendChild(btn);

            // Auto-click for faster dev loop
            // callback(); 
        }
    }
};

// Simulate Extension Initialization
async function initDev() {
    // Temporarily just show a placeholder
    const appContainer = document.getElementById('app');
    if (appContainer) {
        // appContainer.innerHTML = '<h2>Check console. Click "Edit Prompt" button (top-left) to simulate.</h2>';
        const app = createApp(AppDev);
        app.use(i18n);
        app.mount('#app');
    }

    // Import main logic to trigger registration (but we need to mock app.registerExtension)
    const mockApp = {
        registerExtension: (ext: any) => {
            console.log(`[Dev] Registered Extension: ${ext.name}`);
            // Simulate node creation
            ext.nodeCreated(mockNode, mockApp);
        }
    };

    // We need to dynamically import main.ts or extract the logic
    // For now, let's just expose the mockNode globally so we can test components directly
    (window as any).mockNode = mockNode;
}

initDev();
