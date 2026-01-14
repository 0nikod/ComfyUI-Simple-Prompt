/**
 * Tag Category Enum (Danbooru standard)
 */
export enum TagCategory {
    GENERAL = 0,
    ARTIST = 1,
    COPYRIGHT = 3,
    CHARACTER = 4,
    META = 5
}

/**
 * Category Colors (Danbooru standard)
 */
export const CATEGORY_COLORS: Record<TagCategory, string> = {
    [TagCategory.GENERAL]: '#0075db',    // Blue
    [TagCategory.ARTIST]: '#c00004',     // Red
    [TagCategory.COPYRIGHT]: '#c000c0',  // Purple
    [TagCategory.CHARACTER]: '#00aa00',  // Green
    [TagCategory.META]: '#fd9200'        // Orange
};

/**
 * Tag Item Data Structure
 */
export interface TagItem {
    id: string;          // Unique ID
    text: string;        // Tag text, e.g. "1girl"
    weight: number;      // Weight, default 1.0
    enabled: boolean;    // Is enabled
    category?: TagCategory; // Category
}
