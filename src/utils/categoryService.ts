import { TagCategory, CATEGORY_COLORS } from './types';
import { reactive } from 'vue';

export interface CategoryData {
    value: number;
    label: string;
    color: string;
}

export class CategoryService {
    private static instance: CategoryService;
    private categories = reactive(new Map<number, CategoryData>());
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
        this.categories.set(TagCategory.GENERAL, { value: TagCategory.GENERAL, label: 'General', color: CATEGORY_COLORS[TagCategory.GENERAL] });
        this.categories.set(TagCategory.ARTIST, { value: TagCategory.ARTIST, label: 'Artist', color: CATEGORY_COLORS[TagCategory.ARTIST] });
        this.categories.set(TagCategory.COPYRIGHT, { value: TagCategory.COPYRIGHT, label: 'Copyright', color: CATEGORY_COLORS[TagCategory.COPYRIGHT] });
        this.categories.set(TagCategory.CHARACTER, { value: TagCategory.CHARACTER, label: 'Character', color: CATEGORY_COLORS[TagCategory.CHARACTER] });
        this.categories.set(TagCategory.META, { value: TagCategory.META, label: 'Meta', color: CATEGORY_COLORS[TagCategory.META] });
    }

    public async init(): Promise<void> {
        if (this.isInitialized) return;

        try {
            const response = await fetch('/simple-prompt/categories/list');
            if (response.ok) {
                const data = await response.json();

                if (Array.isArray(data)) {
                    data.forEach((cat: any) => {
                        this.categories.set(cat.id, {
                            value: cat.id,
                            label: cat.name,
                            color: cat.color
                        });
                    });
                }
            }
        } catch (error) {
            console.error("[CategoryService] Failed to fetch categories:", error);
        } finally {
            this.isInitialized = true;
        }
    }

    public getCategory(id: number): CategoryData {
        return this.categories.get(id) || {
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
        return Array.from(this.categories.values()).sort((a, b) => a.value - b.value);
    }

    // Getter for template usage - returns array format expected by CustomTagModal
    public get categoriesArray(): Array<{ id: number; name: string; color: string }> {
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
    async init() {
        return CategoryService.getInstance().init();
    }
};
