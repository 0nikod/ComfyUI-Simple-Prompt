import type { TagItem } from './types';
import { TagCategory } from './types';

/**
 * Parse prompt text into TagItem array
 * Matches (text:weight) format or plain comma-separated text
 */
export function textToTags(text: string): TagItem[] {
    if (!text.trim()) return [];

    const tags: TagItem[] = [];
    // Regex: Match (text:weight) or plain text
    const regex = /\(([^:()]+):([0-9.]+)\)|([^,()]+)/g;
    let match;
    let idx = 0;

    while ((match = regex.exec(text)) !== null) {
        if (match[1] && match[2]) {
            // Weighted tag: (text:weight)
            tags.push({
                id: `tag-${idx++}`,
                text: match[1].trim(),
                weight: parseFloat(match[2]),
                enabled: true,
                category: TagCategory.GENERAL
            });
        } else if (match[3]) {
            // Plain tag
            const trimmed = match[3].trim();
            if (trimmed) {
                tags.push({
                    id: `tag-${idx++}`,
                    text: trimmed,
                    weight: 1.0,
                    enabled: true,
                    category: TagCategory.GENERAL
                });
            }
        }
    }

    return tags;
}

/**
 * Convert TagItem array back to prompt text
 */
export function tagsToText(tags: TagItem[]): string {
    return tags
        .filter(tag => tag.enabled)
        .map(tag => {
            if (tag.weight !== 1.0) {
                return `(${tag.text}:${tag.weight.toFixed(1)})`;
            }
            return tag.text;
        })
        .join(', ');
}
