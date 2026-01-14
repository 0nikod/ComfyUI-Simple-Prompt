import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import duckdb_wasm_next from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';

const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
    mvp: {
        mainModule: duckdb_wasm,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js', import.meta.url).toString(),
    },
    eh: {
        mainModule: duckdb_wasm_next,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js', import.meta.url).toString(),
    },
};

export class DuckDBService {
    private static instance: DuckDBService;
    private db: duckdb.AsyncDuckDB | null = null;
    private conn: duckdb.AsyncDuckDBConnection | null = null;
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

        console.log("[DuckDB] Initializing...");
        try {
            // Select bundle
            const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);

            // Instantiate worker
            const worker = new Worker(bundle.mainWorker!);
            const logger = new duckdb.ConsoleLogger();

            this.db = new duckdb.AsyncDuckDB(logger, worker);
            await this.db.instantiate(bundle.mainModule, bundle.pthreadWorker);

            this.conn = await this.db.connect();
            this.isInitialized = true;
            console.log("[DuckDB] Initialized successfully");
        } catch (error) {
            console.error("[DuckDB] Initialization failed:", error);
            throw error;
        }
    }

    public async loadTagsFile(url: string): Promise<void> {
        if (!this.db || !this.conn) throw new Error("DuckDB not initialized");

        console.log(`[DuckDB] Loading tags file from: ${url}`);
        try {
            // Register file URL
            await this.db.registerFileURL('tags.parquet', url, duckdb.DuckDBDataProtocol.HTTP, false);

            // Create table/view
            // We use CREATE OR REPLACE VIEW to avoid errors if reloaded
            await this.conn.query(`
                CREATE OR REPLACE VIEW tags AS 
                SELECT * FROM read_parquet('tags.parquet');
            `);

            // Verify count
            const result = await this.conn.query("SELECT count(*) as count FROM tags");
            console.log(`[DuckDB] Loaded ${result.toArray()[0]['count']} tags`);

        } catch (error) {
            console.error("[DuckDB] Error loading parquet file:", error);
            throw error; // Re-throw to handle in UI
        }
    }

    public async searchTags(query: string, limit: number = 20): Promise<any[]> {
        if (!this.conn) return [];

        // Sanitize query to prevent basic injection (though this is WASM client-side)
        const safeQuery = query.replace(/'/g, "''");

        const sql = `
            SELECT * FROM tags
            WHERE name ILIKE '%${safeQuery}%'
            ORDER BY
              CASE 
                WHEN name = '${safeQuery}' THEN 3 
                WHEN name ILIKE '${safeQuery}%' THEN 2 
                ELSE 1 
              END DESC,
              post_count DESC
            LIMIT ${limit}
        `;

        try {
            const table = await this.conn.query(sql);
            return table.toArray().map(row => row.toJSON());
        } catch (error) {
            console.error("[DuckDB] Search failed:", error);
            return [];
        }
    }
}
