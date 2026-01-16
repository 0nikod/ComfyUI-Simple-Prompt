"""
ComfyUI 节点定义
参考: https://docs.comfy.org/custom-nodes/backend/server_overview
"""


class SimplePrompt:
    """
    A simple prompt node with an advanced visual tag editor.
    提供一个带有高级可视化标签编辑器的简单提示词节点。
    """

    DESCRIPTION = "A prompt builder node with an advanced visual editor for tag management, weight adjustment, and autocomplete."

    # 节点分类（在 ComfyUI 菜单中的位置）
    CATEGORY = "SimplePrompt"

    # 执行函数名称
    FUNCTION = "run"

    # 返回类型
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)

    # 是否为输出节点（会在执行时被调用）
    OUTPUT_NODE = False

    @classmethod
    def INPUT_TYPES(cls):
        """
        定义节点输入
        """
        return {
            "required": {
                "prompt_text": ("STRING", {"multiline": True, "dynamicPrompts": True}),
            },
        }

    def run(self, prompt_text: str) -> tuple[str]:
        """
        节点执行函数

        Args:
            prompt_text: 提示词文本

        Returns:
            包含提示词的元组
        """
        return (prompt_text,)

    @classmethod
    def IS_CHANGED(cls, prompt_text: str) -> float:
        """
        判断节点是否需要重新执行
        返回 NaN 表示每次都执行
        """
        return float("NaN")


# --------------------------------------------------------------------------------
# 节点注册（符合 ComfyUI Lifecycle 规范）
# https://docs.comfy.org/custom-nodes/backend/lifecycle
# --------------------------------------------------------------------------------

NODE_CLASS_MAPPINGS = {"SimplePrompt": SimplePrompt}

NODE_DISPLAY_NAME_MAPPINGS = {"SimplePrompt": "Simple Prompt"}
