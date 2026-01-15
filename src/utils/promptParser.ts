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

/**
 * Get sort order for a category
 */
export function getSortOrder(cat: number): number {
    // Row 0: Special(6)
    // Row 1: Character(4), Copyright(2,3)
    // Row 2: Artist(1)
    // Row 3: General(0)
    // Row 4: Meta(5), Rating(7)
    const rowMap: Record<number, number> = {
        6: 0,
        4: 1, 2: 1, 3: 1,
        1: 2,
        0: 3,
        5: 4, 7: 4
    };
    return rowMap[cat] !== undefined ? rowMap[cat] : 3; // Default to General
}

/**
 * Format tags into grouped multiline text
 */
export function formatGroupedTags(tagsList: TagItem[]): string {
    if (tagsList.length === 0) return '';

    // Group by row
    const rows: Record<number, TagItem[]> = { 0: [], 1: [], 2: [], 3: [], 4: [] };
    tagsList.forEach(tag => {
        const cat = tag.category !== undefined ? tag.category : 0;
        const rowIndex = getSortOrder(cat);
        rows[rowIndex].push(tag);
    });

    // Sort logic for Row 1 (Characters & Copyrights)
    // Preference: Character(4) > Copyright(3) > Copyright(2)
    // Using stable sort by category ID (descending)
    rows[1].sort((a, b) => {
        const catA = a.category !== undefined ? a.category : 0;
        const catB = b.category !== undefined ? b.category : 0;
        // Descending order: 4 (Character) > 3 (Copyright) > 2 (Copyright)
        return catB - catA;
    });

    // Convert rows to text
    const rowTexts = [0, 1, 2, 3, 4].map(idx => {
        const rowTags = rows[idx];
        if (rowTags.length === 0) return '';
        return tagsToText(rowTags).replace(/,$/, ''); // Remove trailing comma from tagsToText result if we want (but usually we want comma between groups?)
        // tagsToText adds a trailing comma.
        // If we join by newline, we might want that trailing comma.
        // Let's keep it.
    });

    // Build final output with specific blank line logic
    // Users request:
    // Row 0
    // Row 1
    // Row 2
    // (blank if General exists)
    // Row 3 (General)
    // (blank if Meta/Rating exists)
    // Row 4

    let result = '';
    // Rows 0, 1, 2
    const topPart = rowTexts.slice(0, 3).filter(t => t).join('\n');
    if (topPart) result += topPart;

    // Gap before General
    if (result && rowTexts[3]) result += '\n\n';

    if (rowTexts[3]) result += rowTexts[3];

    // Gap after General
    if (result && rowTexts[4]) result += '\n\n';

    if (rowTexts[4]) result += rowTexts[4];

    return result;
}

/**
 * Apply Auto Meta tags with minimal changes to the original text.
 * 
 * Logic:
 * 1. Find and remove existing occurrences of metaTags from the text
 * 2. Find where ratingTags start (if any)
 * 3. Insert meta block (in preset order) just before rating section (or at end)
 * 4. Preserve all other text including newlines
 * 
 * @param text Original prompt text
 * @param metaTags List of meta tag names to ensure are present
 * @param ratingTagNames List of known rating tag names (to identify where to insert)
 * @returns Modified text
 */
export function applyAutoMeta(
    text: string,
    metaTags: string[],
    ratingTagNames: string[]
): string {
    if (!metaTags.length) return text;

    // Normalize for matching (lowercase)
    const metaLower = new Set(metaTags.map(t => t.toLowerCase()));
    const ratingLower = new Set(ratingTagNames.map(t => t.toLowerCase()));

    // Parse to find tag positions and existing weights
    // We need to track: { tagText, startIndex, endIndex, weight }
    interface TagMatch {
        text: string;
        fullMatch: string;
        start: number;
        end: number;
        weight: number;
    }

    const foundTags: TagMatch[] = [];

    // Regex patterns:
    // 1. Weighted tag: (text:weight)
    // 2. Plain tag: text between commas/newlines
    // We need to carefully find positions.

    // Split by delimiters but keep track of positions
    let i = 0;
    let currentStart = 0;
    let currentTag = '';

    const processTag = (tagStr: string, fullMatch: string, start: number, end: number) => {
        const trimmed = tagStr.trim();
        if (!trimmed) return;

        // Check for weight syntax: (text:weight)
        const weightMatch = trimmed.match(/^\((.+):(\d+\.?\d*)\)$/);
        let tagText = trimmed;
        let weight = 1.0;

        if (weightMatch) {
            tagText = weightMatch[1].trim();
            weight = parseFloat(weightMatch[2]);
        }

        // Unescape parentheses for matching
        const unescaped = tagText.replace(/\\([()])/g, '$1');

        foundTags.push({
            text: unescaped,
            fullMatch,
            start,
            end,
            weight
        });
    };

    while (i < text.length) {
        const char = text[i];

        // Handle weighted tag start
        if (char === '(' && currentTag.trim() === '') {
            // Find matching close
            let depth = 1;
            let j = i + 1;
            while (j < text.length && depth > 0) {
                if (text[j] === '\\' && j + 1 < text.length) {
                    j += 2;
                    continue;
                }
                if (text[j] === '(') depth++;
                if (text[j] === ')') depth--;
                j++;
            }

            if (depth === 0) {
                const fullMatch = text.substring(i, j);
                const content = text.substring(i + 1, j - 1);
                processTag(fullMatch, fullMatch, i, j);
                i = j;
                currentStart = j;
                currentTag = '';
                continue;
            }
        }

        // Handle escape
        if (char === '\\' && i + 1 < text.length) {
            currentTag += char + text[i + 1];
            i += 2;
            continue;
        }

        // Handle delimiter
        if (char === ',' || char === '\n') {
            if (currentTag.trim()) {
                processTag(currentTag.trim(), currentTag, currentStart, i);
            }
            i++;
            currentStart = i;
            currentTag = '';
            continue;
        }

        currentTag += char;
        i++;
    }

    // Last tag
    if (currentTag.trim()) {
        processTag(currentTag.trim(), currentTag, currentStart, i);
    }

    // Identify which tags are meta and which are rating
    const metaToRemove: TagMatch[] = [];
    const existingMetaWeights = new Map<string, number>();
    let ratingStartIndex = text.length;

    for (const tag of foundTags) {
        const lower = tag.text.toLowerCase();

        if (metaLower.has(lower)) {
            metaToRemove.push(tag);
            existingMetaWeights.set(lower, tag.weight);
        }

        if (ratingLower.has(lower)) {
            if (tag.start < ratingStartIndex) {
                ratingStartIndex = tag.start;
            }
        }
    }

    // Build result by removing meta tags
    // Sort removals by position descending to avoid index shifting
    const removals = [...metaToRemove].sort((a, b) => b.start - a.start);

    let result = text;
    for (const removal of removals) {
        // Find the actual range to remove (including surrounding comma/space)
        let removeStart = removal.start;
        let removeEnd = removal.end;

        // Look backward for comma/space
        while (removeStart > 0 && /[\s,]/.test(result[removeStart - 1])) {
            removeStart--;
        }

        // Look forward for comma/space (but not newlines - preserve structure)
        while (removeEnd < result.length && result[removeEnd] === ' ') {
            removeEnd++;
        }
        if (removeEnd < result.length && result[removeEnd] === ',') {
            removeEnd++;
            // Also consume trailing space after comma
            while (removeEnd < result.length && result[removeEnd] === ' ') {
                removeEnd++;
            }
        }

        // If we're removing from the start of a line, don't leave orphan comma
        // If there's content before and after, we need a comma
        const before = result.substring(0, removeStart);
        const after = result.substring(removeEnd);

        result = before + after;

        // Update ratingStartIndex if needed
        const removedLength = removeEnd - removeStart;
        if (ratingStartIndex > removal.start) {
            ratingStartIndex -= removedLength;
        }
    }

    // Clean up any double commas or trailing commas before newlines
    result = result.replace(/,\s*,/g, ',');
    result = result.replace(/,\s*\n/g, ',\n');
    result = result.replace(/\n\s*,/g, '\n');

    // Build meta block string
    const metaBlock = metaTags.map(m => {
        const weight = existingMetaWeights.get(m.toLowerCase()) || 1.0;
        // Escape parens
        const escaped = m.replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        if (weight !== 1.0) {
            return `(${escaped}:${weight.toFixed(1)})`;
        }
        return escaped;
    }).join(', ') + ',';

    // Find insertion point (before rating section, or at end)
    // We need to recalculate ratingStartIndex in the modified string
    // Simpler approach: find first rating tag in modified text

    const modifiedTags = textToTags(result);
    let insertIndex = result.length;

    for (let idx = 0; idx < modifiedTags.length; idx++) {
        const lower = modifiedTags[idx].text.toLowerCase();
        if (ratingLower.has(lower)) {
            // Find this tag's position in result
            // This is complex... let's use a simpler approach
            // Find the first occurrence of any rating tag
            for (const ratingName of ratingTagNames) {
                const escaped = ratingName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`(^|[,\\n\\s])${escaped}([,\\n]|$)`, 'i');
                const match = result.match(regex);
                if (match && match.index !== undefined) {
                    const pos = match.index + match[1].length;
                    if (pos < insertIndex) {
                        insertIndex = pos;
                    }
                }
            }
            break;
        }
    }

    // Find proper insertion point (before rating, after last content)
    // If there's content before insert point that doesn't end with newline, add newline
    let prefix = result.substring(0, insertIndex).trimEnd();
    let suffix = result.substring(insertIndex);

    // Ensure proper separation
    if (prefix && !prefix.endsWith(',') && !prefix.endsWith('\n')) {
        prefix += ',';
    }

    // Add newlines for separation if needed
    if (prefix && !prefix.endsWith('\n\n')) {
        if (prefix.endsWith('\n')) {
            prefix += '\n';
        } else {
            prefix += '\n\n';
        }
    }

    if (suffix.trim() && !suffix.startsWith('\n')) {
        suffix = '\n\n' + suffix.trimStart();
    }

    return prefix + metaBlock + suffix;
}
