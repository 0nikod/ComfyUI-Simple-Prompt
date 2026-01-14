<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';
import CustomTagModal from './CustomTagModal.vue';
import { settings } from '../utils/settings';
import { TagCategory, CATEGORY_COLORS } from '../utils/types';

const { t } = useI18n();

// Tabs
const activeTab = ref('user');
const tabs = computed(() => [
    { id: 'user', label: t('settings.items.updateUserTags') || 'User Tags' }, 
    { id: 'liked', label: t('settings.items.updateLikedTags') || 'Liked Tags' },
    { id: 'default', label: 'Default Tags' }
]);

// Data
const tags = ref<any[]>([]);
const totalTags = ref(0);
const loading = ref(false);
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = 20;

// Edit Modal
const showEditModal = ref(false);
const editingTag = ref<any>(null);

// Fetch Tags
const fetchTags = async () => {
    loading.value = true;
    try {
        const offset = (currentPage.value - 1) * pageSize;
        const params = new URLSearchParams({
            source: activeTab.value,
            limit: pageSize.toString(),
            offset: offset.toString(),
            q: searchQuery.value
        });
        
        const response = await fetch(`/simple-prompt/tags/list?${params.toString()}`);
        const result = await response.json();
        
        if (response.ok) {
            tags.value = result.data || [];
            totalTags.value = result.total || 0;
        } else {
            console.error('Fetch tags failed:', result.error);
        }
    } catch (e) {
        console.error('Fetch tags error:', e);
    } finally {
        loading.value = false;
    }
};

// Actions
const handleDelete = async (tag: any) => {
    if (!confirm(t('common.confirm') + ` Delete '${tag.name}'?`)) return;
    
    try {
        const response = await fetch('/simple-prompt/tags/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: tag.name, source: activeTab.value })
        });
        
        if (response.ok) {
            fetchTags();
        } else {
            const res = await response.json();
            alert('Delete failed: ' + res.error);
        }
    } catch (e: any) {
        alert('Delete failed: ' + e.message);
    }
};

const handleEdit = (tag: any) => {
    editingTag.value = tag;
    showEditModal.value = true;
};

const handleModalSave = () => {
    fetchTags(); // Refresh after edit
};

// Access Control
const canEdit = computed(() => {
    if (activeTab.value === 'default') {
        return settings.allowEditDefaultTags;
    }
    return true; // User and Liked always editable
});

// Watchers
watch([activeTab, searchQuery], () => {
    currentPage.value = 1;
    fetchTags();
});

watch(currentPage, () => {
    fetchTags();
});

onMounted(() => {
    fetchTags();
});

// Helpers
const getCategoryLabel = (catId: number) => {
    // Simple mapping or use i18n if available mapping exists
    const map: Record<number, string> = {
        0: 'General', 1: 'Artist', 3: 'Copyright', 4: 'Character', 5: 'Meta'
    };
    return map[catId] || 'Unknown';
};

const getCategoryColor = (catId: number) => {
    return CATEGORY_COLORS[catId as TagCategory] || '#aaa';
}
</script>

<template>
    <div class="tag-manager">
        <!-- Tabs -->
        <div class="tabs">
            <button 
                v-for="tab in tabs" 
                :key="tab.id"
                class="tab-btn"
                :class="{ active: activeTab === tab.id }"
                @click="activeTab = tab.id"
            >
                {{ tab.label }}
            </button>
        </div>

        <!-- Toolbar -->
        <div class="toolbar">
            <div class="search-box">
                <Icon icon="mdi:magnify" class="search-icon" />
                <input 
                    v-model="searchQuery" 
                    type="text" 
                    :placeholder="t('search.placeholder')" 
                    class="search-input"
                >
            </div>
            
            <div class="status-info">
                {{ totalTags }} tags
            </div>
        </div>

        <!-- Warning for Default Tags -->
        <div v-if="activeTab === 'default' && !canEdit" class="warning-banner">
            <Icon icon="mdi:lock" />
            <span>Editing default tags is disabled in settings.</span>
        </div>

        <!-- Table -->
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th width="30%">Name</th>
                        <th width="15%">Category</th>
                        <th width="15%">Post Count</th>
                        <th width="25%">Aliases</th>
                        <th width="15%" align="right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading" class="loading-row">
                        <td colspan="5">
                            <Icon icon="mdi:loading" class="spin" /> Loading...
                        </td>
                    </tr>
                    <tr v-else-if="tags.length === 0" class="empty-row">
                        <td colspan="5">{{ t('search.noResults') }}</td>
                    </tr>
                    <tr v-else v-for="tag in tags" :key="tag.name">
                        <td class="name-cell">{{ tag.name }}</td>
                        <td>
                            <span class="cat-badge" :style="{ '--c': getCategoryColor(tag.category) }">
                                {{ getCategoryLabel(tag.category) }}
                            </span>
                        </td>
                        <td>{{ tag.post_count }}</td>
                        <td class="alias-cell" :title="tag.alias ? tag.alias.join(', ') : ''">
                            {{ tag.alias ? tag.alias.join(', ') : '-' }}
                        </td>
                        <td align="right">
                            <div class="actions" v-if="canEdit">
                                <button class="action-btn edit" @click="handleEdit(tag)" title="Edit">
                                    <Icon icon="mdi:pencil" />
                                </button>
                                <button class="action-btn delete" @click="handleDelete(tag)" title="Delete">
                                    <Icon icon="mdi:delete" />
                                </button>
                            </div>
                            <div v-else class="actions-disabled">
                                <Icon icon="mdi:lock-outline" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="pagination">
            <button 
                :disabled="currentPage === 1" 
                @click="currentPage--"
                class="page-btn"
            >
                <Icon icon="mdi:chevron-left" />
            </button>
            <span class="page-info">Page {{ currentPage }}</span>
            <button 
                :disabled="tags.length < pageSize" 
                @click="currentPage++"
                class="page-btn"
            >
                <Icon icon="mdi:chevron-right" />
            </button>
        </div>

        <!-- Edit Modal -->
        <CustomTagModal 
            :visible="showEditModal"
            :edit-mode="true"
            :initial-data="editingTag"
            :target-source="activeTab"
            @close="showEditModal = false"
            @save="handleModalSave"
        />
    </div>
</template>

<style scoped>
.tag-manager {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #e0e0e0;
}

/* Tabs */
.tabs {
    display: flex;
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
    margin-bottom: 16px;
    gap: 8px;
}

.tab-btn {
    background: transparent;
    border: none;
    padding: 8px 16px;
    color: #888;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    transition: all 0.2s;
}

.tab-btn:hover {
    color: #ccc;
    background-color: #2a2a2a;
}

.tab-btn.active {
    color: #fff;
    background-color: #0075db;
}

/* Toolbar */
.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.search-box {
    position: relative;
    width: 300px;
}

.search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
}

.search-input {
    width: 100%;
    padding: 8px 10px 8px 36px;
    background-color: #252526;
    border: 1px solid #333;
    border-radius: 4px;
    color: #e0e0e0;
    outline: none;
}

.search-input:focus {
    border-color: #0075db;
}

.status-info {
    font-size: 13px;
    color: #888;
}

/* Warning Banner */
.warning-banner {
    background-color: rgba(255, 152, 0, 0.1);
    color: #ff9800;
    border: 1px solid rgba(255, 152, 0, 0.3);
    padding: 8px 12px;
    border-radius: 4px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
}

/* Table */
.table-container {
    flex: 1;
    overflow-y: auto;
    border: 1px solid #333;
    border-radius: 4px;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
}

.data-table th {
    text-align: left;
    padding: 10px;
    background-color: #252526;
    border-bottom: 1px solid #333;
    color: #aaa;
    font-weight: 500;
    position: sticky;
    top: 0;
}

.data-table td {
    padding: 10px;
    border-bottom: 1px solid #2a2a2a;
    vertical-align: middle;
}

.data-table tr:hover {
    background-color: #2a2a2a;
}

.name-cell {
    font-weight: 500;
    color: #e0e0e0;
}

.cat-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    background-color: transparent;
    border: 1px solid var(--c);
    color: var(--c);
    font-size: 11px;
}

.alias-cell {
    color: #888;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.actions {
    display: flex;
    gap: 6px;
    justify-content: flex-end;
}

.action-btn {
    background: transparent;
    border: none;
    color: #aaa;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s;
}

.action-btn:hover {
    background-color: #333;
    color: #fff;
}

.action-btn.delete:hover {
    color: #f44336;
}

.actions-disabled {
    color: #555;
    padding: 4px;
}

.loading-row td, .empty-row td {
    text-align: center;
    padding: 40px;
    color: #888;
}

.spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Pagination */
.pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 16px;
    gap: 12px;
}

.page-btn {
    background: #252526;
    border: 1px solid #333;
    color: #e0e0e0;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
}

.page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.page-btn:not(:disabled):hover {
    background-color: #333;
}

.page-info {
    font-size: 13px;
    color: #888;
}
</style>
