export interface TagRecord {
    name: string;
    category: number;
    post_count: number;
    alias: string[];
    priority?: number;
    matched_alias?: string;
}

export interface TagsListResponse {
    data: TagRecord[];
    total: number;
}

export interface ApiStatusResponse {
    status: string;
    message?: string;
}

export interface ToggleLikeResponse extends ApiStatusResponse {
    is_liked: boolean;
}

export interface CategoryRecord {
    id: number;
    name: string;
    color: string;
}

export interface PresetRecord {
    id: string;
    name: string;
    tags: string[];
}

export interface PresetsResponse {
    defaults: PresetRecord[];
    customs: PresetRecord[];
}

export interface UpdateCheckResponse {
    update_available: boolean;
    local_sha256: string;
    remote_sha256: string;
    version: string;
    name: string;
}

export interface AddTagsPayload {
    name: string;
    category: number;
    post_count: number;
    alias: string[];
    source?: string;
}
