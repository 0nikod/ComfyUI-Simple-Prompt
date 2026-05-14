import { simplePromptApi } from '../api/client';
import type { TagRecord } from '../api/types';

export class DuckDBService {
    private static instance: DuckDBService;
    private isInitialized = false;

    private constructor() { }

    public static getInstance(): DuckDBService {
        if (!DuckDBService.instance) {
            DuckDBService.instance = new DuckDBService();
        }
        return DuckDBService.instance;
    }

    public async init(): Promise<void> {
        if (this.isInitialized) return;
        console.log("[DuckDB] Backend initialization check (API-based)");
        // We could ping the backend here if needed
        this.isInitialized = true;
    }



    public async searchTags(query: string, limit: number = 20, useAliases: boolean = false, categories: number[] = []): Promise<TagRecord[]> {
        try {
            const results = await simplePromptApi.searchTags(query, limit, useAliases, categories);

            // Handle the same alias matching logic as before for UI highlighting
            if (useAliases && results.length > 0) {
                return results.map((row) => {
                    const nameMatches = row.name && row.name.toLowerCase().includes(query.toLowerCase());

                    // If name matches, it's a direct match
                    if (nameMatches) {
                        return row;
                    }

                    // Otherwise, check if an alias matched
                    const aliasArray = Array.isArray(row.alias) ? row.alias : [];
                    if (aliasArray.length > 0) {
                        const matchedAlias = aliasArray.find((a: string) =>
                            a && a.toLowerCase().includes(query.toLowerCase())
                        );

                        if (matchedAlias) {
                            return { ...row, matched_alias: matchedAlias };
                        }
                    }

                    return row;
                });
            }

            return results;
        } catch (error) {
            console.error("[DuckDB] Search failed via API:", error);
            return [];
        }
    }

    public async getTagsDetails(names: string[], fast = false): Promise<Record<string, number>> {
        if (names.length === 0) return {};

        try {
            return await simplePromptApi.getTagsDetails(names, fast);
        } catch (error) {
            console.error("[DuckDB] Get tags details failed:", error);
            return {};
        }
    }
}

