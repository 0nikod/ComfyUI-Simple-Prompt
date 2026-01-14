import folder_paths
import nodes

class SimplePrompt:
    """
    A simple prompt node with an advanced visual tag editor.
    Designed to be extensible for future data management features.
    """
    
    DESCRIPTION = "A prompt builder node with an advanced visual editor for tag management, weight adjustment, and autocomplete."
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "prompt_text": ("STRING", {"multiline": True, "dynamicPrompts": True}),
            },
            # "hidden": {"unique_id": "UNIQUE_ID"}, # For future event handling if needed
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "run"
    CATEGORY = "SimplePrompt"
    OUTPUT_NODE = False

    def run(self, prompt_text):
        # Placeholder for future processing logic (e.g., dynamic prompt generation)
        return (prompt_text,)

    @classmethod
    def IS_CHANGED(s, prompt_text):
        # Always return the prompt text hash to ensure it updates if the text changes
        return float("NaN")

# Node registration
NODE_CLASS_MAPPINGS = {
    "SimplePrompt": SimplePrompt
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "SimplePrompt": "Simple Prompt"
}