"""
Tag data update service.

This module owns downloading, validating, and refreshing tag data files.
"""

import hashlib
import logging
import os
from typing import Any, Dict, Optional
from urllib.parse import urlparse

from . import config
from .database import DB_WRITE_LOCK, ensure_parquet_exists, get_db_connection, reinit_duckdb

logger = logging.getLogger("SimplePrompt")

DEFAULT_RELEASE_URL = "https://api.github.com/repos/0nikod/danbooru_tag_process/releases/latest"
ALLOWED_RELEASE_HOSTS = {"api.github.com"}
ALLOWED_ASSET_HOSTS = {"github.com", "objects.githubusercontent.com"}
ALLOWED_ASSET_HOST_SUFFIXES = (".githubusercontent.com",)
MAX_TAG_DOWNLOAD_BYTES = 512 * 1024 * 1024
DOWNLOAD_CHUNK_SIZE = 1024 * 1024
TAG_ASSET_NAMES = ["tags_processed.parquet", "tags.parquet"]


async def check_update() -> Dict[str, Any]:
    import aiohttp

    local_sha256 = _calculate_local_sha256(config.TAGS_PARQUET_PATH)

    timeout = aiohttp.ClientTimeout(total=30)
    async with aiohttp.ClientSession(timeout=timeout) as session:
        release_info = await _fetch_release_info(session, DEFAULT_RELEASE_URL)
        target_asset = _find_tag_asset(release_info)

        if not target_asset:
            raise RuntimeError("Tag data file not found")

        remote_sha256 = _extract_remote_sha256(target_asset)

        return {
            "update_available": local_sha256 != remote_sha256,
            "local_sha256": local_sha256,
            "remote_sha256": remote_sha256,
            "version": release_info.get("tag_name", "unknown"),
            "name": release_info.get("name", ""),
        }


async def update_tags(url: Optional[str] = None) -> Dict[str, str]:
    import aiohttp

    release_url = _validate_release_url(url or DEFAULT_RELEASE_URL)
    timeout = aiohttp.ClientTimeout(total=300)

    async with aiohttp.ClientSession(timeout=timeout) as session:
        release_info = await _fetch_release_info(session, release_url)
        target_asset = _find_tag_asset(release_info)
        download_url = target_asset.get("browser_download_url") if target_asset else None

        if not download_url:
            raise RuntimeError("Tag data file not found")

        remote_sha256 = _extract_remote_sha256(target_asset)
        temp_path = config.TAGS_PARQUET_PATH + ".tmp"
        download_url = _validate_asset_url(download_url)

        try:
            actual_sha256 = await _download_tag_asset(session, download_url, temp_path)

            if remote_sha256 and actual_sha256 != remote_sha256:
                raise RuntimeError("Downloaded tag data checksum mismatch")

            _validate_parquet_file(temp_path)

            with DB_WRITE_LOCK:
                os.replace(temp_path, config.TAGS_PARQUET_PATH)
                reinit_duckdb()
        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)

    return {"status": "success", "message": "Tags updated successfully"}


async def update_data(action: str) -> Dict[str, str]:
    conn = get_db_connection()
    if not conn:
        raise RuntimeError("Database unavailable")

    if action == "update_liked":
        target_path = config.LIKED_TAGS_PATH
    elif action == "update_user":
        target_path = config.USER_TAGS_PATH
    else:
        raise ValueError("Unknown action")

    ensure_parquet_exists(target_path, config.TAGS_SCHEMA)
    target_path_sql = target_path.replace("\\", "/")

    with DB_WRITE_LOCK:
        conn.execute("DROP TABLE IF EXISTS temp_target")
        conn.execute(f"CREATE TABLE temp_target AS SELECT * FROM read_parquet('{target_path_sql}')")

        other_sources = _build_update_sources(action)
        if other_sources:
            union_q = " UNION ALL ".join(other_sources)
            conn.execute(f"CREATE OR REPLACE VIEW others_raw AS {union_q}")
            conn.execute("""
                CREATE OR REPLACE VIEW others_best AS
                SELECT * EXCLUDE (rn) FROM (
                    SELECT *, ROW_NUMBER() OVER (PARTITION BY name ORDER BY p ASC) as rn FROM others_raw
                ) WHERE rn = 1
            """)

            conn.execute("""
                UPDATE temp_target
                SET category = others_best.category,
                    post_count = others_best.post_count,
                    alias = others_best.alias
                FROM others_best
                WHERE temp_target.name = others_best.name
            """)

            conn.execute("DROP VIEW others_best")
            conn.execute("DROP VIEW others_raw")

        conn.execute(f"COPY temp_target TO '{target_path_sql}' (FORMAT PARQUET)")
        conn.execute("DROP TABLE temp_target")

        reinit_duckdb()

    if action == "update_liked":
        return {"status": "success", "message": "Liked tags data updated from main DB."}
    return {"status": "success", "message": "User tags data updated."}


def _calculate_local_sha256(path: str) -> str:
    if not os.path.exists(path):
        return ""

    try:
        sha256_hash = hashlib.sha256()
        with open(path, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()
    except Exception as e:
        logger.error(f"Error calculating local SHA256: {e}")
        return ""


async def _fetch_release_info(session: Any, release_url: str) -> Dict[str, Any]:
    headers = {"User-Agent": "ComfyUI-Simple-Prompt"}
    async with session.get(release_url, headers=headers) as resp:
        if resp.status != 200:
            raise RuntimeError(f"Failed to fetch release info: {resp.status}")
        return await resp.json()


def _find_tag_asset(release_info: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    for name in TAG_ASSET_NAMES:
        for asset in release_info.get("assets", []):
            if asset.get("name") == name:
                return asset
    return None


def _extract_remote_sha256(asset: Dict[str, Any]) -> str:
    remote_digest = asset.get("digest", "")
    if remote_digest.startswith("sha256:"):
        return remote_digest[7:]
    return remote_digest


def _validate_release_url(url: str) -> str:
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.hostname not in ALLOWED_RELEASE_HOSTS:
        raise ValueError("Unsupported release URL")
    if not parsed.path.startswith("/repos/0nikod/danbooru_tag_process/releases/"):
        raise ValueError("Unsupported release URL")
    return url


def _validate_asset_url(url: str) -> str:
    parsed = urlparse(url)
    if parsed.scheme != "https" or not _is_allowed_asset_host(parsed.hostname):
        raise ValueError("Unsupported asset URL")
    return url


async def _download_tag_asset(session: Any, download_url: str, temp_path: str) -> str:
    os.makedirs(config.DATA_DIR, exist_ok=True)
    sha256_hash = hashlib.sha256()
    total_size = 0
    headers = {"User-Agent": "ComfyUI-Simple-Prompt"}

    async with session.get(download_url, headers=headers) as resp:
        if resp.status != 200:
            raise RuntimeError(f"Failed to download: {resp.status}")

        final_host = urlparse(str(resp.url)).hostname
        if not _is_allowed_asset_host(final_host):
            raise ValueError("Unsupported asset redirect URL")

        with open(temp_path, "wb") as f:
            async for chunk in resp.content.iter_chunked(DOWNLOAD_CHUNK_SIZE):
                total_size += len(chunk)
                if total_size > MAX_TAG_DOWNLOAD_BYTES:
                    raise RuntimeError("Downloaded tag data is too large")
                sha256_hash.update(chunk)
                f.write(chunk)

    return sha256_hash.hexdigest()


def _is_allowed_asset_host(hostname: Optional[str]) -> bool:
    if not hostname:
        return False

    if hostname in ALLOWED_ASSET_HOSTS:
        return True

    return any(hostname.endswith(suffix) for suffix in ALLOWED_ASSET_HOST_SUFFIXES)


def _validate_parquet_file(path: str) -> None:
    if os.path.getsize(path) < 8:
        raise RuntimeError("Downloaded tag data is not a valid parquet file")

    with open(path, "rb") as f:
        header = f.read(4)
        f.seek(-4, os.SEEK_END)
        footer = f.read(4)

    if header != b"PAR1" or footer != b"PAR1":
        raise RuntimeError("Downloaded tag data is not a valid parquet file")

    conn = get_db_connection()
    if not conn:
        raise RuntimeError("Database unavailable")

    path_sql = path.replace("\\", "/")
    conn.execute(f"SELECT name, category, post_count, alias FROM read_parquet('{path_sql}') LIMIT 0")


def _build_update_sources(action: str) -> list[str]:
    other_sources = []
    if action == "update_liked" and os.path.exists(config.USER_TAGS_PATH):
        other_sources.append(
            f"SELECT name, category, post_count, alias, 2 as p FROM read_parquet('{config.USER_TAGS_PATH.replace(os.sep, '/')}')"
        )
    if os.path.exists(config.DEFAULT_TAGS_PATH):
        other_sources.append(
            f"SELECT name, category, post_count, alias, 3 as p FROM read_parquet('{config.DEFAULT_TAGS_PATH.replace(os.sep, '/')}')"
        )
    if os.path.exists(config.TAGS_PARQUET_PATH):
        other_sources.append(
            f"SELECT name, category, post_count, alias, 4 as p FROM read_parquet('{config.TAGS_PARQUET_PATH.replace(os.sep, '/')}')"
        )
    return other_sources
