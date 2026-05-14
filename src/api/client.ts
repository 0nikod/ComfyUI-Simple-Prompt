import type {
    AddTagsPayload,
    ApiStatusResponse,
    CategoryRecord,
    PresetsResponse,
    PresetRecord,
    TagRecord,
    TagsListResponse,
    ToggleLikeResponse,
    UpdateCheckResponse,
} from './types';

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const message = typeof data?.error === 'string' ? data.error : response.statusText;
        throw new Error(message || `HTTP error ${response.status}`);
    }

    return data as T;
}

function jsonRequest(method: string, body?: unknown): RequestInit {
    return {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body === undefined ? undefined : JSON.stringify(body),
    };
}

export const simplePromptApi = {
    async searchTags(query: string, limit = 20, useAliases = false, categories: number[] = []): Promise<TagRecord[]> {
        const params = new URLSearchParams({
            q: query,
            limit: limit.toString(),
            use_aliases: useAliases.toString(),
            categories: categories.join(','),
        });

        return requestJson<TagRecord[]>(`/simple-prompt/search-tags?${params.toString()}`);
    },

    async getTagsDetails(names: string[], fast = false): Promise<Record<string, number>> {
        if (names.length === 0) return {};

        return requestJson<Record<string, number>>(
            '/simple-prompt/get-tags-details',
            jsonRequest('POST', { names, fast }),
        );
    },

    async listTags(source: string, limit: number, offset: number, query: string): Promise<TagsListResponse> {
        const params = new URLSearchParams({
            source,
            limit: limit.toString(),
            offset: offset.toString(),
            q: query,
        });

        return requestJson<TagsListResponse>(`/simple-prompt/tags/list?${params.toString()}`);
    },

    async deleteTag(name: string, source: string): Promise<ApiStatusResponse> {
        return requestJson<ApiStatusResponse>('/simple-prompt/tags/delete', jsonRequest('DELETE', { name, source }));
    },

    async addTag(payload: AddTagsPayload): Promise<ApiStatusResponse> {
        return requestJson<ApiStatusResponse>('/simple-prompt/add-custom-tag', jsonRequest('POST', payload));
    },

    async addTags(tags: AddTagsPayload[]): Promise<ApiStatusResponse> {
        return requestJson<ApiStatusResponse>('/simple-prompt/add-custom-tag', jsonRequest('POST', { tags }));
    },

    async toggleLikeTag(payload: {
        name: string;
        is_liked: boolean;
        category?: number;
        post_count?: number;
        alias?: string[];
    }): Promise<ToggleLikeResponse> {
        return requestJson<ToggleLikeResponse>('/simple-prompt/toggle-like-tag', jsonRequest('POST', payload));
    },

    async listCategories(): Promise<CategoryRecord[]> {
        return requestJson<CategoryRecord[]>('/simple-prompt/categories/list');
    },

    async saveCategories(categories: CategoryRecord[]): Promise<ApiStatusResponse> {
        return requestJson<ApiStatusResponse>('/simple-prompt/categories/save', jsonRequest('POST', { categories }));
    },

    async listPresets(): Promise<PresetsResponse> {
        return requestJson<PresetsResponse>('/simple-prompt/presets/list');
    },

    async savePresets(presets: PresetRecord[]): Promise<ApiStatusResponse> {
        return requestJson<ApiStatusResponse>('/simple-prompt/presets/save', jsonRequest('POST', { presets }));
    },

    async checkUpdate(): Promise<UpdateCheckResponse> {
        return requestJson<UpdateCheckResponse>('/simple-prompt/check-update');
    },

    async updateTags(): Promise<ApiStatusResponse> {
        return requestJson<ApiStatusResponse>('/simple-prompt/update-tags', jsonRequest('POST', {}));
    },

    async updateData(action: 'update_liked' | 'update_user'): Promise<ApiStatusResponse> {
        return requestJson<ApiStatusResponse>('/simple-prompt/update-data', jsonRequest('POST', { action }));
    },
};
