import type { TagItem } from './types';
import { TagCategory } from './types';

/**
 * Parse prompt text into TagItem array
 * Matches (text:weight) format or plain comma-separated text
 * Properly handles escaped parentheses \( and \)
 */
export function textToTags(text: string): TagItem[] {
    if (!text.trim()) return [];

    const tags: TagItem[] = [];
    let idx = 0;
    let i = 0;
    let currentTag = '';
    let inWeight = false;
    let weightText = '';
    let tagText = '';

    while (i < text.length) {
        const char = text[i];

        // Handle escape sequences
        if (char === '\\' && i + 1 < text.length) {
            const nextChar = text[i + 1];
            if (nextChar === '(' || nextChar === ')') {
                // Escaped parenthesis - treat as literal character
                currentTag += nextChar;
                i += 2; // Skip both \ and the parenthesis
                continue;
            }
        }

        // Handle weighted tags: (text:weight)
        if (char === '(' && !inWeight) {
            // Start of weighted tag
            // Save any accumulated plain text first
            if (currentTag.trim()) {
                tags.push({
                    id: `tag-${idx++}`,
                    text: currentTag.trim(),
                    weight: 1.0,
                    enabled: true,
                    category: TagCategory.GENERAL
                });
                currentTag = '';
            }

            // Find the closing parenthesis
            let depth = 1;
            let j = i + 1;
            let escaped = false;

            while (j < text.length && depth > 0) {
                if (text[j] === '\\' && j + 1 < text.length) {
                    escaped = true;
                    j += 2;
                    continue;
                }
                if (text[j] === '(') depth++;
                if (text[j] === ')') depth--;
                j++;
            }

            if (depth === 0) {
                // Found matching closing parenthesis
                const content = text.substring(i + 1, j - 1);
                const colonIndex = content.indexOf(':');

                if (colonIndex > 0) {
                    // Has weight format
                    tagText = content.substring(0, colonIndex).trim();
                    weightText = content.substring(colonIndex + 1).trim();
                    const weight = parseFloat(weightText);

                    if (!isNaN(weight) && tagText) {
                        tags.push({
                            id: `tag-${idx++}`,
                            text: tagText,
                            weight: weight,
                            enabled: true,
                            category: TagCategory.GENERAL
                        });
                    }
                } else {
                    // No colon, treat whole thing as plain text with parens
                    currentTag += text.substring(i, j);
                }

                i = j;
                continue;
            }
        }

        // Handle comma separator
        if (char === ',') {
            if (currentTag.trim()) {
                tags.push({
                    id: `tag-${idx++}`,
                    text: currentTag.trim(),
                    weight: 1.0,
                    enabled: true,
                    category: TagCategory.GENERAL
                });
                currentTag = '';
            }
            i++;
            continue;
        }

        // Regular character
        currentTag += char;
        i++;
    }

    // Don't forget the last tag
    if (currentTag.trim()) {
        tags.push({
            id: `tag-${idx++}`,
            text: currentTag.trim(),
            weight: 1.0,
            enabled: true,
            category: TagCategory.GENERAL
        });
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
