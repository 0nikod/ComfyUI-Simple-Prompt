import { app } from "../../../scripts/app.js";
import { api } from "../../../scripts/api.js";

/**
 * SimplePrompt Frontend Extension
 * 
 * This extension injects the "Edit Prompt" button into the SimplePrompt node.
 * It is designed to be lazily loaded and extensible.
 */
const ext = {
    name: "SimplePrompt.Editor",

    async init(app) {
        console.log("[SimplePrompt] Extension initialized");

        // Load CSS
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        // Convert to absolute URL based on where the script is running
        // import.meta.url points to js/main.js
        // css is in js/assets/main.css
        // relative path: ./assets/main.css
        link.href = new URL("./assets/main.css", import.meta.url).href;
        document.head.appendChild(link);
    },

    async nodeCreated(node, app) {
        // Only target the SimplePrompt node
        if (node.comfyClass === "SimplePrompt") {
            try {
                this.setupSimplePromptNode(node, app);
            } catch (error) {
                console.error("[SimplePrompt] Error setting up node:", error);
            }
        }
    },

    setupSimplePromptNode(node, app) {
        // Add "Edit Prompt" button
        // We use a custom widget name to identify it easily later
        const editWidget = node.addWidget("button", "Edit Prompt", null, () => {
            this.openEditorModal(node);
        });

        // Ensure prompt_text widget exists and is accessible
        const promptWidget = node.widgets.find(w => w.name === "prompt_text");
        if (!promptWidget) {
            console.warn("[SimplePrompt] prompt_text widget not found!");
        }
    },

    openEditorModal(node) {
        console.log("[SimplePrompt] Opening editor for node:", node.id);

        // Get current prompt text
        const promptWidget = node.widgets.find(w => w.name === "prompt_text");
        const currentPrompt = promptWidget ? promptWidget.value : "";

        // Create container
        const container = document.createElement("div");
        document.body.appendChild(container);

        // Import createApp directly (bundled)
        import("vue").then(({ createApp }) => {
            // Import App component
            import("./App.vue").then((appModule) => {
                const App = appModule.default;

                const appInstance = createApp(App, {
                    initialPrompt: currentPrompt,
                    onSave: (newPrompt) => {
                        if (promptWidget) {
                            promptWidget.value = newPrompt;
                        }
                        // Clean up
                        appInstance.unmount();
                        document.body.removeChild(container);
                    },
                    onClose: () => {
                        appInstance.unmount();
                        document.body.removeChild(container);
                    }
                });

                // Use i18n if needed, or other plugins
                import("./i18n").then((i18nModule) => {
                    const i18n = i18nModule.default;
                    appInstance.use(i18n);
                    appInstance.mount(container);
                });
            });
        });
    }
};

app.registerExtension(ext);
