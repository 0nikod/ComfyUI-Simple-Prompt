"""
ComfyUI PromptServer 适配层
所有 ComfyUI 特定的 API 路由注册都在这里

支持热重载：设置环境变量 SIMPLE_PROMPT_DEV=1 启用开发模式
"""

import logging
import os

from aiohttp import web

logger = logging.getLogger("SimplePrompt")

# 检测开发模式
DEV_MODE = os.environ.get("SIMPLE_PROMPT_DEV", "").lower() in ("1", "true", "yes")

if DEV_MODE:
    logger.info("[SimplePrompt] Development mode enabled - hot reload active")


def _maybe_reload():
    """
    开发模式下重新加载核心模块
    这使得修改代码后不需要重启 ComfyUI
    """
    if not DEV_MODE:
        return

    import importlib

    try:
        # 重新加载核心模块
        from simple_prompt.core import config, utils, database, tags, categories, presets
        from simple_prompt import core
        from simple_prompt.api import handlers
        from simple_prompt import api

        importlib.reload(config)
        importlib.reload(utils)
        importlib.reload(database)
        importlib.reload(tags)
        importlib.reload(categories)
        importlib.reload(presets)
        importlib.reload(core)
        importlib.reload(handlers)
        importlib.reload(api)

        logger.debug("[DEV] Core modules reloaded")
    except Exception as e:
        logger.error(f"[DEV] Failed to reload modules: {e}")


def _get_handlers():
    """
    获取处理器模块（开发模式下会先重载）
    """
    _maybe_reload()
    from simple_prompt.api import handlers

    return handlers


# --------------------------------------------------------------------------------
# 路由注册
# --------------------------------------------------------------------------------

try:
    from server import PromptServer

    # -------------------------
    # Tags API
    # -------------------------

    @PromptServer.instance.routes.get("/simple-prompt/search-tags")
    async def search_tags_api(request):
        """搜索标签"""
        handlers = _get_handlers()

        query = request.query.get("q", "")
        limit = int(request.query.get("limit", 50))
        use_aliases = request.query.get("use_aliases", "false").lower() == "true"
        categories_str = request.query.get("categories", "")

        categories = []
        if categories_str:
            try:
                categories = [int(c) for c in categories_str.split(",") if c.strip()]
            except ValueError:
                pass

        try:
            results = await handlers.handle_search_tags(query, limit, use_aliases, categories)
            return web.json_response(results)
        except Exception as e:
            logger.error(f"Search API error: {e}")
            return web.json_response({"error": str(e)}, status=500)

    @PromptServer.instance.routes.post("/simple-prompt/get-tags-details")
    async def get_tags_details_api(request):
        """获取标签详情"""
        handlers = _get_handlers()

        try:
            data = await request.json()
            names = data.get("names", [])
            fast = data.get("fast", False)

            if not names:
                return web.json_response({})

            results = await handlers.handle_get_tags_details(names, fast)
            return web.json_response(results)
        except Exception as e:
            logger.error(f"Get tags details API error: {e}")
            return web.json_response({"error": str(e)}, status=500)

    @PromptServer.instance.routes.get("/simple-prompt/tags/list")
    async def tags_list_api(request):
        """列出标签"""
        handlers = _get_handlers()

        try:
            source = request.query.get("source", "user")
            limit = int(request.query.get("limit", 50))
            offset = int(request.query.get("offset", 0))
            query = request.query.get("q", "")

            results = await handlers.handle_list_tags(source, limit, offset, query)
            return web.json_response(results)
        except Exception as e:
            logger.error(f"Tags list error: {e}")
            return web.json_response({"error": str(e)}, status=500)

    @PromptServer.instance.routes.delete("/simple-prompt/tags/delete")
    async def tags_delete_api(request):
        """删除标签"""
        handlers = _get_handlers()

        try:
            data = await request.json()
            name = data.get("name")
            source = data.get("source")

            result = await handlers.handle_delete_tag(name, source)
            return web.json_response(result)
        except ValueError as e:
            return web.json_response({"error": str(e)}, status=400)
        except Exception as e:
            logger.error(f"Delete tag failed: {e}")
            return web.json_response({"error": str(e)}, status=500)

    @PromptServer.instance.routes.post("/simple-prompt/add-custom-tag")
    async def add_custom_tag_api(request):
        """添加自定义标签"""
        handlers = _get_handlers()

        try:
            data = await request.json()
            result = await handlers.handle_add_custom_tag(data)
            return web.json_response(result)
        except ValueError as e:
            return web.json_response({"error": str(e)}, status=400)
        except Exception as e:
            logger.error(f"Add custom tag failed: {e}")
            return web.json_response({"error": str(e)}, status=500)

    @PromptServer.instance.routes.post("/simple-prompt/toggle-like-tag")
    async def toggle_like_tag_api(request):
        """切换点赞标签"""
        handlers = _get_handlers()

        try:
            data = await request.json()
            result = await handlers.handle_toggle_like_tag(data)
            return web.json_response(result)
        except ValueError as e:
            return web.json_response({"error": str(e)}, status=400)
        except Exception as e:
            logger.error(f"Toggle like failed: {e}")
            return web.json_response({"error": str(e)}, status=500)

    # -------------------------
    # Categories API
    # -------------------------

    @PromptServer.instance.routes.get("/simple-prompt/categories/list")
    async def list_categories_api(request):
        """列出分类"""
        handlers = _get_handlers()

        try:
            result = await handlers.handle_list_categories()
            return web.json_response(result)
        except Exception as e:
            logger.error(f"List categories error: {e}")
            return web.json_response({"error": str(e)}, status=500)

    @PromptServer.instance.routes.post("/simple-prompt/categories/save")
    async def save_categories_api(request):
        """保存分类"""
        handlers = _get_handlers()

        try:
            data = await request.json()
            categories = data.get("categories", [])
            result = await handlers.handle_save_categories(categories)
            return web.json_response(result)
        except Exception as e:
            logger.error(f"Save categories error: {e}")
            return web.json_response({"error": str(e)}, status=500)

    # -------------------------
    # Presets API
    # -------------------------

    @PromptServer.instance.routes.get("/simple-prompt/presets/list")
    async def list_presets_api(request):
        """列出预设"""
        handlers = _get_handlers()

        try:
            result = await handlers.handle_list_presets()
            return web.json_response(result)
        except Exception as e:
            logger.error(f"List presets error: {e}")
            return web.json_response({"error": str(e)}, status=500)

    @PromptServer.instance.routes.post("/simple-prompt/presets/save")
    async def save_presets_api(request):
        """保存预设"""
        handlers = _get_handlers()

        try:
            data = await request.json()
            presets = data.get("presets", [])
            result = await handlers.handle_save_presets(presets)
            return web.json_response(result)
        except Exception as e:
            logger.error(f"Save presets error: {e}")
            return web.json_response({"error": str(e)}, status=500)

    # -------------------------
    # Health & Update API
    # -------------------------

    @PromptServer.instance.routes.get("/simple-prompt/health")
    async def health_check_api(request):
        """健康检查"""
        handlers = _get_handlers()

        try:
            result = await handlers.handle_health_check()
            return web.json_response(result)
        except Exception as e:
            return web.json_response({"error": str(e)}, status=500)

    @PromptServer.instance.routes.get("/simple-prompt/check-update")
    async def check_update_api(request):
        """检查更新"""
        handlers = _get_handlers()

        try:
            result = await handlers.handle_check_update()
            return web.json_response(result)
        except Exception as e:
            logger.error(f"Check update error: {e}")
            return web.json_response({"error": str(e)}, status=500)

    @PromptServer.instance.routes.post("/simple-prompt/update-tags")
    async def update_tags_api(request):
        """更新标签数据"""
        handlers = _get_handlers()

        try:
            try:
                data = await request.json()
            except Exception:
                data = {}

            url = data.get("url")
            result = await handlers.handle_update_tags(url)
            return web.json_response(result)
        except Exception as e:
            logger.error(f"Update tags error: {e}")
            return web.json_response({"error": str(e)}, status=500)

    @PromptServer.instance.routes.post("/simple-prompt/update-data")
    async def update_data_api(request):
        """批量更新数据"""
        handlers = _get_handlers()

        try:
            data = await request.json()
            action = data.get("action")
            result = await handlers.handle_update_data(action)
            return web.json_response(result)
        except ValueError as e:
            return web.json_response({"error": str(e)}, status=400)
        except Exception as e:
            logger.error(f"Update data failed: {e}")
            return web.json_response({"error": str(e)}, status=500)

    logger.info("[SimplePrompt] API routes registered successfully")

except ImportError:
    logger.warning("[SimplePrompt] PromptServer not available - running outside ComfyUI")
