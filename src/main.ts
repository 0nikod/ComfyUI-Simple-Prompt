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

        // TODO: Implement Modal opening logic here
        // This will be connected to the Vue application in Phase 2
        alert("Simple Prompt Editor will be available in Phase 2!");
    }
};

app.registerExtension(ext);
