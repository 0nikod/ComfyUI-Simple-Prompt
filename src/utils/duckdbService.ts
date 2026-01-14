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

    public async loadTagsFile(_url: string): Promise<void> {
        // Backend handles loading, this is now a no-op to maintain API compatibility
        console.log("[DuckDB] loadTagsFile called (no-op in backend mode)");
    }

    public async searchTags(query: string, limit: number = 20, useAliases: boolean = false, categories: number[] = []): Promise<any[]> {
        const params = new URLSearchParams({
            q: query,
            limit: limit.toString(),
            use_aliases: useAliases.toString(),
            categories: categories.join(',')
        });

        try {
            const response = await fetch(`/simple-prompt/search-tags?${params.toString()}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const results = await response.json();

            // Handle the same alias matching logic as before for UI highlighting
            if (useAliases && results.length > 0) {
                return results.map((row: any) => {
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
}
