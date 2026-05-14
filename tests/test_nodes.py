import math
import unittest

from simple_prompt.comfyui.nodes import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS, SimplePrompt


class TestNodeRegistration(unittest.TestCase):
    """ComfyUI lifecycle: __init__.py must export NODE_CLASS_MAPPINGS."""

    def test_node_class_mappings_contains_simple_prompt(self):
        self.assertIn("SimplePrompt", NODE_CLASS_MAPPINGS)
        self.assertIs(NODE_CLASS_MAPPINGS["SimplePrompt"], SimplePrompt)

    def test_node_display_name_mappings_contains_simple_prompt(self):
        self.assertIn("SimplePrompt", NODE_DISPLAY_NAME_MAPPINGS)
        self.assertEqual(NODE_DISPLAY_NAME_MAPPINGS["SimplePrompt"], "Simple Prompt")


class TestNodeAttributes(unittest.TestCase):
    """Verify all required ComfyUI node class attributes are present and correct."""

    def test_category(self):
        self.assertEqual(SimplePrompt.CATEGORY, "SimplePrompt")

    def test_function(self):
        self.assertEqual(SimplePrompt.FUNCTION, "run")

    def test_return_types(self):
        self.assertEqual(SimplePrompt.RETURN_TYPES, ("STRING",))

    def test_return_names(self):
        self.assertEqual(SimplePrompt.RETURN_NAMES, ("prompt",))

    def test_output_node_is_false(self):
        self.assertFalse(SimplePrompt.OUTPUT_NODE)

    def test_has_description(self):
        self.assertIsInstance(SimplePrompt.DESCRIPTION, str)
        self.assertTrue(len(SimplePrompt.DESCRIPTION) > 0)


class TestInputTypes(unittest.TestCase):
    """INPUT_TYPES must return the structure expected by ComfyUI."""

    def test_returns_dict(self):
        result = SimplePrompt.INPUT_TYPES()
        self.assertIsInstance(result, dict)

    def test_has_required_key(self):
        result = SimplePrompt.INPUT_TYPES()
        self.assertIn("required", result)

    def test_prompt_text_input_exists(self):
        result = SimplePrompt.INPUT_TYPES()
        self.assertIn("prompt_text", result["required"])

    def test_prompt_text_type_is_string(self):
        result = SimplePrompt.INPUT_TYPES()
        prompt_def = result["required"]["prompt_text"]
        self.assertEqual(prompt_def[0], "STRING")

    def test_prompt_text_is_multiline(self):
        result = SimplePrompt.INPUT_TYPES()
        prompt_def = result["required"]["prompt_text"]
        self.assertTrue(prompt_def[1].get("multiline", False))

    def test_no_optional_inputs(self):
        result = SimplePrompt.INPUT_TYPES()
        self.assertNotIn("optional", result)


class TestNodeExecution(unittest.TestCase):
    """The run() function must return a tuple matching RETURN_TYPES."""

    def setUp(self):
        self.node = SimplePrompt()

    def test_run_returns_tuple(self):
        result = self.node.run("a beautiful cat")
        self.assertIsInstance(result, tuple)

    def test_run_passthrough(self):
        result = self.node.run("a beautiful cat")
        self.assertEqual(result, ("a beautiful cat",))

    def test_run_empty_string(self):
        result = self.node.run("")
        self.assertEqual(result, ("",))

    def test_run_with_special_characters(self):
        prompt = "1girl, blue_hair, (masterpiece:1.4)"
        result = self.node.run(prompt)
        self.assertEqual(result, (prompt,))


class TestIsChanged(unittest.TestCase):
    """IS_CHANGED must return NaN so the node always re-executes."""

    def test_returns_nan(self):
        result = SimplePrompt.IS_CHANGED("any prompt")
        self.assertTrue(math.isnan(result))


if __name__ == "__main__":
    unittest.main()
