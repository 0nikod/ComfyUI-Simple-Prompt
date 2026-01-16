import unittest
import duckdb
import tempfile
import os
import json
from SimplePrompt import search_tags, get_tags_details, load_json, save_json


class TestSearchTags(unittest.TestCase):
    def setUp(self):
        self.conn = duckdb.connect(":memory:")
        self.conn.execute("""
            CREATE TABLE tags (
                id INTEGER,
                name VARCHAR,
                post_count INTEGER,
                category INTEGER,
                alias VARCHAR[]
            )
        """)
        self.conn.execute("""
            INSERT INTO tags VALUES
            (1, 'cat', 100, 0, ['kitty']),
            (2, 'dog', 80, 0, ['puppy']),
            (3, '1girl', 1000, 4, [])
        """)

    def test_search_basic(self):
        results = search_tags(self.conn, "cat")
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["name"], "cat")

    def test_search_alias(self):
        results = search_tags(self.conn, "kitty", use_aliases=True)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["name"], "cat")

    def test_search_alias_disabled(self):
        results = search_tags(self.conn, "kitty", use_aliases=False)
        self.assertEqual(len(results), 0)

    def test_search_case_insensitive(self):
        results = search_tags(self.conn, "CAT")
        self.assertEqual(len(results), 1)

    def test_category_filter(self):
        results = search_tags(self.conn, "cat", categories=[0])
        self.assertEqual(len(results), 1)

        results = search_tags(self.conn, "cat", categories=[1])
        self.assertEqual(len(results), 0)

    def test_search_injection_attempt(self):
        # This string would cause issues if not parameterized: ' OR '1'='1
        results = search_tags(self.conn, "' OR '1'='1")
        self.assertEqual(len(results), 0)


class TestGetTagsDetails(unittest.TestCase):
    """Tests for get_tags_details function."""

    def setUp(self):
        self.conn = duckdb.connect(":memory:")
        # Create tags table matching the expected schema
        self.conn.execute("""
            CREATE TABLE tags (
                name VARCHAR,
                category INTEGER,
                post_count INTEGER,
                alias VARCHAR[],
                priority INTEGER
            )
        """)
        self.conn.execute("""
            INSERT INTO tags VALUES
            ('blue_hair', 0, 500, [], 4),
            ('red_eyes', 0, 300, [], 4),
            ('hatsune_miku', 4, 10000, ['miku'], 4)
        """)
        # Create tags_fast view (same as tags for testing)
        self.conn.execute("CREATE VIEW tags_fast AS SELECT * FROM tags")

    def test_basic_lookup(self):
        """Test basic tag detail lookup."""
        result = get_tags_details(self.conn, ["blue_hair"])
        self.assertIn("blue_hair", result)
        self.assertEqual(result["blue_hair"], 0)

    def test_space_to_underscore_conversion(self):
        """Test that 'blue hair' matches 'blue_hair' in database."""
        result = get_tags_details(self.conn, ["blue hair"])
        # Should match and return category
        self.assertIn("blue hair", result)
        self.assertEqual(result["blue hair"], 0)

    def test_underscore_to_space_conversion(self):
        """Test that both formats are returned in result."""
        result = get_tags_details(self.conn, ["blue_hair"])
        # Both variants should be in result
        self.assertIn("blue_hair", result)
        self.assertIn("blue hair", result)

    def test_empty_input(self):
        """Test empty input returns empty dict."""
        result = get_tags_details(self.conn, [])
        self.assertEqual(result, {})

    def test_whitespace_only_input(self):
        """Test whitespace-only names are filtered."""
        result = get_tags_details(self.conn, ["  ", ""])
        self.assertEqual(result, {})

    def test_multiple_tags(self):
        """Test querying multiple tags at once."""
        result = get_tags_details(self.conn, ["blue_hair", "red_eyes", "hatsune_miku"])
        self.assertIn("blue_hair", result)
        self.assertIn("red_eyes", result)
        self.assertIn("hatsune_miku", result)

    def test_nonexistent_tag(self):
        """Test that nonexistent tags are not in result."""
        result = get_tags_details(self.conn, ["nonexistent_tag_xyz"])
        self.assertNotIn("nonexistent_tag_xyz", result)

    def test_fast_mode(self):
        """Test fast=True uses tags_fast view."""
        result = get_tags_details(self.conn, ["blue_hair"], fast=True)
        self.assertIn("blue_hair", result)

    def test_none_connection(self):
        """Test None connection returns empty dict."""
        result = get_tags_details(None, ["blue_hair"])
        self.assertEqual(result, {})


class TestJsonHelpers(unittest.TestCase):
    """Tests for load_json and save_json helper functions."""

    def setUp(self):
        self.temp_dir = tempfile.mkdtemp()

    def tearDown(self):
        # Cleanup temp files
        for f in os.listdir(self.temp_dir):
            os.remove(os.path.join(self.temp_dir, f))
        os.rmdir(self.temp_dir)

    def test_save_and_load_json(self):
        """Test saving and loading JSON data."""
        test_data = {"key": "value", "number": 42, "list": [1, 2, 3]}
        path = os.path.join(self.temp_dir, "test.json")

        save_json(path, test_data)
        loaded = load_json(path)

        self.assertEqual(loaded, test_data)

    def test_load_nonexistent_file(self):
        """Test loading nonexistent file returns default."""
        path = os.path.join(self.temp_dir, "nonexistent.json")
        result = load_json(path, default={"default": True})
        self.assertEqual(result, {"default": True})

    def test_load_default_none(self):
        """Test loading nonexistent file with None default."""
        path = os.path.join(self.temp_dir, "nonexistent.json")
        result = load_json(path)
        self.assertIsNone(result)


if __name__ == "__main__":
    unittest.main()
