import { TagCategory, CATEGORY_COLORS } from './types';
import { reactive } from 'vue';
import { simplePromptApi } from '../api/client';

export interface CategoryData {
    value: number;
    label: string;
    color: string;
}

/**
 * Category Item used by UI components
 */
export interface CategoryItem {
    id: number;
    name: string;
    color: string;
}

export class CategoryService {
    private static instance: CategoryService;
    private _categories = reactive(new Map<number, CategoryData>());
    private isInitialized = false;

    private constructor() {
        // Initialize with defaults
        this.addDefaultCategories();
    }

    public static getInstance(): CategoryService {
        if (!CategoryService.instance) {
            CategoryService.instance = new CategoryService();
        }
        return CategoryService.instance;
    }

    private addDefaultCategories() {
        // Add standard Danbooru categories as baseline
        this._categories.set(TagCategory.GENERAL, { value: TagCategory.GENERAL, label: 'General', color: CATEGORY_COLORS[TagCategory.GENERAL] });
        this._categories.set(TagCategory.ARTIST, { value: TagCategory.ARTIST, label: 'Artist', color: CATEGORY_COLORS[TagCategory.ARTIST] });
        this._categories.set(TagCategory.COPYRIGHT, { value: TagCategory.COPYRIGHT, label: 'Copyright', color: CATEGORY_COLORS[TagCategory.COPYRIGHT] });
        this._categories.set(TagCategory.CHARACTER, { value: TagCategory.CHARACTER, label: 'Character', color: CATEGORY_COLORS[TagCategory.CHARACTER] });
        this._categories.set(TagCategory.META, { value: TagCategory.META, label: 'Meta', color: CATEGORY_COLORS[TagCategory.META] });
        this._categories.set(TagCategory.SPECIAL, { value: TagCategory.SPECIAL, label: 'Special', color: CATEGORY_COLORS[TagCategory.SPECIAL] });
        this._categories.set(TagCategory.RATING, { value: TagCategory.RATING, label: 'Rating', color: CATEGORY_COLORS[TagCategory.RATING] });
    }

    public async init(): Promise<void> {
        if (this.isInitialized) return;
        await this.fetchCategories();
    }

    public async fetchCategories(): Promise<void> {
        try {
            const data = await simplePromptApi.listCategories();

            if (Array.isArray(data)) {
                // Clear custom ones if any, but keep defaults if fetch fails next time? 
                // Better to just update the map.
                data.forEach((cat) => {
                    this._categories.set(cat.id, {
                        value: cat.id,
                        label: cat.name,
                        color: cat.color
                    });
                });
            }
        } catch (error) {
            console.error("[CategoryService] Failed to fetch categories:", error);
        } finally {
            this.isInitialized = true;
        }
    }

    public async saveCustomCategories(categories: CategoryItem[]): Promise<void> {
        try {
            await simplePromptApi.saveCategories(categories);
            // Refresh local state after save
            await this.fetchCategories();
        } catch (error) {
            console.error("[CategoryService] Error saving categories:", error);
            throw error;
        }
    }

    public getCategory(id: number): CategoryData {
        return this._categories.get(id) || {
            value: id,
            label: 'Unknown',
            color: '#888888'
        };
    }

    public getColor(id: number): string {
        return this.getCategory(id).color;
    }

    public getName(id: number): string {
        return this.getCategory(id).label;
    }

    public getAll(): CategoryData[] {
        return Array.from(this._categories.values()).sort((a, b) => a.value - b.value);
    }

    // Getter for template usage - returns array format expected by CustomTagModal
    public get categoriesArray(): CategoryItem[] {
        return this.getAll().map(cat => ({
            id: cat.value,
            name: cat.label,
            color: cat.color
        }));
    }

    public getCategoryColor(id: number): string {
        return this.getColor(id);
    }
}

// Legacy compatibility export for components using `categoryService` instance
export const categoryService = {
    get categories() {
        return {
            get value() {
                return CategoryService.getInstance().categoriesArray;
            }
        };
    },
    getCategoryColor(id: number): string {
        return CategoryService.getInstance().getColor(id);
    },
    getCategoryName(id: number): string {
        return CategoryService.getInstance().getName(id);
    },
    async init() {
        return CategoryService.getInstance().init();
    },
    async fetchCategories() {
        return CategoryService.getInstance().fetchCategories();
    },
    async saveCustomCategories(categories: CategoryItem[]) {
        return CategoryService.getInstance().saveCustomCategories(categories);
    }
};
