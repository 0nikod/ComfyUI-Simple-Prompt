import { app as e } from "../../../scripts/app.js";
//#region src/main.ts
e.registerExtension({
	name: "SimplePrompt.Editor",
	async init(e) {
		console.log("[SimplePrompt] Extension initialized");
		let t = document.createElement("link");
		t.rel = "stylesheet", t.type = "text/css", t.href = new URL("./assets/main.css", "" + import.meta.url).href, document.head.appendChild(t);
	},
	async nodeCreated(e, t) {
		if (e.comfyClass === "SimplePrompt") try {
			this.setupSimplePromptNode(e, t);
		} catch (e) {
			console.error("[SimplePrompt] Error setting up node:", e);
		}
	},
	setupSimplePromptNode(e, t) {
		e.addWidget("button", "Edit Prompt", null, () => {
			this.openEditorModal(e);
		}), e.widgets.find((e) => e.name === "prompt_text") || console.warn("[SimplePrompt] prompt_text widget not found!");
	},
	openEditorModal(e) {
		console.log("[SimplePrompt] Opening editor for node:", e.id);
		let t = e.widgets.find((e) => e.name === "prompt_text"), n = t ? t.value : "", r = document.createElement("div");
		document.body.appendChild(r), import("./vue.runtime.esm-bundler-DCog0BBo.mjs").then((e) => e.t).then(({ createApp: e }) => {
			import("./App-iFp3p8eF.mjs").then((i) => {
				let a = i.default, o = e(a, {
					initialPrompt: n,
					onSave: (e) => {
						t && (t.value = e), o.unmount(), document.body.removeChild(r);
					},
					onClose: () => {
						o.unmount(), document.body.removeChild(r);
					}
				});
				import("./i18n-BZPBmgxF.mjs").then((e) => {
					let t = e.default;
					o.use(t), o.mount(r);
				});
			});
		});
	}
});
//#endregion
