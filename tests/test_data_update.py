import hashlib

import pytest

from simple_prompt.core import data_update


def test_validate_release_url_allows_only_expected_github_release_path():
    valid_url = "https://api.github.com/repos/0nikod/danbooru_tag_process/releases/latest"
    assert data_update._validate_release_url(valid_url) == valid_url

    with pytest.raises(ValueError, match="Unsupported release URL"):
        data_update._validate_release_url("https://api.github.com/repos/other/repo/releases/latest")

    with pytest.raises(ValueError, match="Unsupported release URL"):
        data_update._validate_release_url("http://api.github.com/repos/0nikod/danbooru_tag_process/releases/latest")


def test_validate_asset_url_allows_only_github_asset_hosts():
    valid_url = "https://github.com/0nikod/danbooru_tag_process/releases/download/v1/tags.parquet"
    assert data_update._validate_asset_url(valid_url) == valid_url

    redirected_url = "https://release-assets.githubusercontent.com/github-production-release-asset/test/tags.parquet"
    assert data_update._validate_asset_url(redirected_url) == redirected_url

    with pytest.raises(ValueError, match="Unsupported asset URL"):
        data_update._validate_asset_url("https://example.com/tags.parquet")


def test_find_tag_asset_prefers_processed_asset_name():
    release_info = {
        "assets": [
            {"name": "tags.parquet", "browser_download_url": "plain"},
            {"name": "tags_processed.parquet", "browser_download_url": "processed"},
        ]
    }

    assert data_update._find_tag_asset(release_info) == {"name": "tags_processed.parquet", "browser_download_url": "processed"}


def test_extract_remote_sha256_and_local_sha256(tmp_path):
    assert data_update._extract_remote_sha256({"digest": "sha256:abc123"}) == "abc123"
    assert data_update._extract_remote_sha256({"digest": "abc123"}) == "abc123"

    target = tmp_path / "tags.parquet"
    target.write_bytes(b"tag-bytes")
    assert data_update._calculate_local_sha256(str(target)) == hashlib.sha256(b"tag-bytes").hexdigest()
    assert data_update._calculate_local_sha256(str(tmp_path / "missing.parquet")) == ""
