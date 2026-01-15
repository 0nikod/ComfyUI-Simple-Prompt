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
        // matches \ followed by anything.
        // We usually only care about \( and \) but let's be safe.
        // If we see \, check next char.
        if (char === '\\' && i + 1 < text.length) {
            const nextChar = text[i + 1];
            if (nextChar === '(' || nextChar === ')') {
                // It is an escaped parenthesis.
                // We want to treat it as part of the tag name (literal).
                // "star \(sky\)" -> tag text: "star (sky)"
                currentTag += nextChar;
                i += 2;
                continue;
            } else {
                // Backslash followed by other char (e.g. \n or just \a)
                // Treat backslash as literal? Or ignore? 
                // Mostly safe to treat as literal if not special.
                // But for safety let's just add the char and skip backslash?
                // Or add both? "C:\\path" -> "C:\path"
                // Let's stick to strict behavior: Only escape parens.
                // If not parens, treat \ as literal char.
                currentTag += char;
                i++;
                continue;
            }
        }

        // Handle weighted tags: (text:weight)
        if (char === '(' && !inWeight) {
            // ... (rest is same)
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

        // Handle comma or newline separator
        if (char === ',' || char === '\n') {
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
    const enabledTags = tags.filter(tag => tag.enabled);
    if (enabledTags.length === 0) return '';

    return enabledTags
        .map(tag => {
            // Escape parens in the text itself to avoid parser confusion
            const escapedText = tag.text.replace(/\(/g, '\\(').replace(/\)/g, '\\)');

            if (tag.weight !== 1.0) {
                // If it has weight, we wrap it. Inner text is already escaped.
                // e.g. star \(sky\) -> (star \(sky\):1.2)
                return `(${escapedText}:${tag.weight.toFixed(1)})`;
            }
            return escapedText;
        })
        .join(', ') + ',';
}
