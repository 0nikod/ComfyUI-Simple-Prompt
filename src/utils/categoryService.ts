import { ref } from 'vue';

export interface CategoryItem {
    id: number;
    name: string;
    color: string;
}

class CategoryService {
    private static instance: CategoryService;
    public categories = ref<CategoryItem[]>([]);
    public loading = ref(false);

    private constructor() {}

    public static getInstance(): CategoryService {
        if (!CategoryService.instance) {
            CategoryService.instance = new CategoryService();
        }
        return CategoryService.instance;
    }

    public async fetchCategories() {
        this.loading.value = true;
        try {
            const response = await fetch('/simple-prompt/categories/list');
            if (response.ok) {
                const data = await response.json();
                this.categories.value = data;
            } else {
                console.error("Failed to fetch categories");
            }
        } catch (e) {
            console.error("Error fetching categories:", e);
        } finally {
            this.loading.value = false;
        }
    }

    public async saveCustomCategories(customs: CategoryItem[]) {
        try {
            const response = await fetch('/simple-prompt/categories/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categories: customs })
            });
            if (!response.ok) {
                throw new Error("Failed to save categories");
            }
            // Refresh
            await this.fetchCategories();
        } catch (e) {
            console.error("Error saving categories:", e);
            throw e;
        }
    }

    public getCategoryColor(id: number): string {
        const cat = this.categories.value.find(c => c.id === id);
        return cat ? cat.color : '#aaaaaa';
    }

    public getCategoryName(id: number): string {
        const cat = this.categories.value.find(c => c.id === id);
        return cat ? cat.name : 'Unknown';
    }
}

export const categoryService = CategoryService.getInstance();
