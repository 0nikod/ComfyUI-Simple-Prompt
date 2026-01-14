import unittest
import duckdb
from SimplePrompt import search_tags


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


if __name__ == "__main__":
    unittest.main()
