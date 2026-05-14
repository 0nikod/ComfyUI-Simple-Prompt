import { ref } from 'vue';
import { categoryService, type CategoryItem } from '../utils/categoryService';

const DEFAULT_CATEGORY_IDS = [0, 1, 3, 4, 5, 6, 7];

type Translate = (key: string) => string;

export function useCategoryManagement(t: Translate) {
    const newCatName = ref('');
    const newCatColor = ref('#aabbcc');

    const fetchCategories = () => {
        return categoryService.fetchCategories();
    };

    const handleAddCategory = () => {
        if (!newCatName.value) return;

        const cats = categoryService.categories.value;
        const maxId = cats.length > 0 ? Math.max(...cats.map((category) => category.id)) : 5;
        let nextId = Math.max(maxId + 1, 6);

        while (cats.some((category) => category.id === nextId)) {
            nextId++;
        }

        const newCategory: CategoryItem = {
            id: nextId,
            name: newCatName.value,
            color: newCatColor.value,
        };

        const customs = [...cats.filter((category) => !DEFAULT_CATEGORY_IDS.includes(category.id)), newCategory];

        void categoryService.saveCustomCategories(customs).then(() => {
            newCatName.value = '';
        });
    };

    const handleDeleteCategory = (id: number) => {
        if (!confirm(t('common.confirm') || 'Are you sure?')) return;

        if (DEFAULT_CATEGORY_IDS.includes(id)) {
            alert(t('category.cannotDeleteDefault'));
            return;
        }

        const cats = categoryService.categories.value;
        const customs = cats.filter((category) => !DEFAULT_CATEGORY_IDS.includes(category.id) && category.id !== id);
        void categoryService.saveCustomCategories(customs);
    };

    return {
        newCatName,
        newCatColor,
        fetchCategories,
        handleAddCategory,
        handleDeleteCategory,
    };
}
