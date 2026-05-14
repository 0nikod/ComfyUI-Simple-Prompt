import type { Ref } from 'vue';
import { ref } from 'vue';
import { DuckDBService } from '../utils/duckdbService';
import type { TagItem } from '../utils/types';

const CATEGORY_FETCH_DEBOUNCE_MS = 1000;
const DEFAULT_CATEGORY = 0;

export function useTagCategoryEnrichment(tags: Ref<TagItem[]>) {
    const categoryCache = ref<Record<string, number>>({});
    const fetchQueue = new Set<string>();
    let fetchTimeout: ReturnType<typeof setTimeout> | null = null;

    const cacheTagCategory = (tagName: string, category?: number) => {
        if (category !== undefined) {
            categoryCache.value[tagName.toLowerCase()] = category;
        }
    };

    const applyCacheToTags = (targetTags: TagItem[]): TagItem[] => {
        return targetTags.map((tag) => {
            const category = categoryCache.value[tag.text.toLowerCase()];
            return category !== undefined ? { ...tag, category } : tag;
        });
    };

    const fetchCategories = async (names: string[]) => {
        if (names.length === 0) return;

        try {
            const db = DuckDBService.getInstance();
            const results = await db.getTagsDetails(names);

            Object.entries(results).forEach(([name, category]) => {
                categoryCache.value[name.toLowerCase()] = category;
            });

            names.forEach((name) => {
                const lower = name.toLowerCase();
                if (categoryCache.value[lower] === undefined) {
                    categoryCache.value[lower] = DEFAULT_CATEGORY;
                }
            });
        } catch (error) {
            console.error("Error fetching tag categories:", error);
        }
    };

    const flushQueue = async () => {
        const names = Array.from(fetchQueue);
        fetchQueue.clear();
        await fetchCategories(names);
        tags.value = applyCacheToTags(tags.value);
    };

    const scheduleFetch = () => {
        if (fetchTimeout) clearTimeout(fetchTimeout);

        fetchTimeout = setTimeout(() => {
            fetchTimeout = null;
            void flushQueue();
        }, CATEGORY_FETCH_DEBOUNCE_MS);
    };

    const enrichTags = (rawTags: TagItem[]): TagItem[] => {
        const enriched = rawTags.map((tag) => {
            const category = categoryCache.value[tag.text.toLowerCase()];
            if (category !== undefined) {
                return { ...tag, category };
            }

            fetchQueue.add(tag.text);
            return tag;
        });

        if (fetchQueue.size > 0) {
            scheduleFetch();
        }

        return enriched;
    };

    const enrichTagsNow = async (rawTags: TagItem[]): Promise<TagItem[]> => {
        const enriched = enrichTags(rawTags);

        if (fetchQueue.size === 0) {
            return enriched;
        }

        if (fetchTimeout) {
            clearTimeout(fetchTimeout);
            fetchTimeout = null;
        }

        const names = Array.from(fetchQueue);
        fetchQueue.clear();
        await fetchCategories(names);

        return applyCacheToTags(enriched);
    };

    const stop = () => {
        if (fetchTimeout) {
            clearTimeout(fetchTimeout);
            fetchTimeout = null;
        }
        fetchQueue.clear();
    };

    return {
        cacheTagCategory,
        enrichTags,
        enrichTagsNow,
        stop,
    };
}
