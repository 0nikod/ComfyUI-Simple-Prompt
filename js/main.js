import { app as l } from "../../../scripts/app.js";
const a = {
  name: "SimplePrompt.Editor",
  async init(e) {
    console.log("[SimplePrompt] Extension initialized");
    const t = document.createElement("link");
    t.rel = "stylesheet", t.type = "text/css", t.href = new URL("./assets/main.css", import.meta.url).href, document.head.appendChild(t);
  },
  async nodeCreated(e, t) {
    if (e.comfyClass === "SimplePrompt")
      try {
        this.setupSimplePromptNode(e, t);
      } catch (n) {
        console.error("[SimplePrompt] Error setting up node:", n);
      }
  },
  setupSimplePromptNode(e, t) {
    e.addWidget("button", "Edit Prompt", null, () => {
      this.openEditorModal(e);
    }), e.widgets.find((o) => o.name === "prompt_text") || console.warn("[SimplePrompt] prompt_text widget not found!");
  },
  openEditorModal(e) {
    console.log("[SimplePrompt] Opening editor for node:", e.id);
    const t = e.widgets.find((p) => p.name === "prompt_text"), n = t ? t.value : "", o = document.createElement("div");
    document.body.appendChild(o), import("./vue.runtime.esm-bundler-DMW2pLBK.mjs").then(({ createApp: p }) => {
      import("./App-OZ05F6zf.mjs").then((m) => {
        const d = m.default, i = p(d, {
          initialPrompt: n,
          onSave: (r) => {
            t && (t.value = r), i.unmount(), document.body.removeChild(o);
          },
          onClose: () => {
            i.unmount(), document.body.removeChild(o);
          }
        });
        import("./i18n-vdOKag5w.mjs").then((r) => {
          const s = r.default;
          i.use(s), i.mount(o);
        });
      });
    });
  }
};
l.registerExtension(a);
