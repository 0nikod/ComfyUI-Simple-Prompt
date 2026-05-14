1. Use `pnpm` instead of `npm`.

2. Use `uv` for Python environments and checks.

3. Read official ComfyUI docs before ComfyUI-specific work.
    - <https://docs.comfy.org/llms.txt>
    - <https://docs.comfy.org/development/overview.md>

4. Follow ComfyUI custom node constraints from the official docs.
    - Export `WEB_DIRECTORY` when shipping frontend extensions.
    - Keep custom `PromptServer` routes as module-level functions, not class methods.
    - Keep `[tool.comfy].includes = ["js"]` because `.gitignore` excludes built frontend files.
    - Do not use `eval`/`exec`.
    - Do not install Python packages at runtime with subprocess/pip; declare dependencies in project metadata.

5. CI must run frontend build/typecheck and backend lint/tests before publish.
