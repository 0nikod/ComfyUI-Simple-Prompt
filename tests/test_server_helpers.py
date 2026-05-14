import unittest
from unittest.mock import MagicMock

from simple_prompt.comfyui.server import _parse_categories, _parse_int_query


def _make_request(params: dict[str, str]) -> MagicMock:
    """Create a mock aiohttp request with the given query parameters."""
    request = MagicMock()
    request.query = params
    return request


class TestParseIntQuery(unittest.TestCase):
    """Tests for the _parse_int_query helper used by route handlers."""

    def test_returns_default_when_param_missing(self):
        req = _make_request({})
        self.assertEqual(_parse_int_query(req, "limit", 50), 50)

    def test_parses_valid_integer(self):
        req = _make_request({"limit": "10"})
        self.assertEqual(_parse_int_query(req, "limit", 50), 10)

    def test_raises_on_non_integer(self):
        req = _make_request({"limit": "abc"})
        with self.assertRaises(ValueError):
            _parse_int_query(req, "limit", 50)

    def test_raises_on_empty_string(self):
        req = _make_request({"limit": ""})
        with self.assertRaises(ValueError):
            _parse_int_query(req, "limit", 50)

    def test_raises_below_minimum(self):
        req = _make_request({"limit": "0"})
        with self.assertRaises(ValueError):
            _parse_int_query(req, "limit", 50, minimum=1)

    def test_accepts_value_at_minimum(self):
        req = _make_request({"limit": "1"})
        self.assertEqual(_parse_int_query(req, "limit", 50, minimum=1), 1)

    def test_clamps_to_maximum(self):
        req = _make_request({"limit": "999"})
        self.assertEqual(_parse_int_query(req, "limit", 50, maximum=200), 200)

    def test_value_within_range(self):
        req = _make_request({"limit": "100"})
        self.assertEqual(_parse_int_query(req, "limit", 50, minimum=1, maximum=200), 100)

    def test_default_minimum_is_zero(self):
        req = _make_request({"offset": "-1"})
        with self.assertRaises(ValueError):
            _parse_int_query(req, "offset", 0)


class TestParseCategories(unittest.TestCase):
    """Tests for the _parse_categories helper used by route handlers."""

    def test_empty_string_returns_empty_list(self):
        self.assertEqual(_parse_categories(""), [])

    def test_single_category(self):
        self.assertEqual(_parse_categories("0"), [0])

    def test_multiple_categories(self):
        self.assertEqual(_parse_categories("0,1,4"), [0, 1, 4])

    def test_strips_whitespace(self):
        self.assertEqual(_parse_categories(" 0 , 1 , 4 "), [0, 1, 4])

    def test_raises_on_invalid(self):
        with self.assertRaises(ValueError):
            _parse_categories("abc")

    def test_raises_on_partial_invalid(self):
        with self.assertRaises(ValueError):
            _parse_categories("0,abc,4")


if __name__ == "__main__":
    unittest.main()
