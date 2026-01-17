
// Mock types
enum TagCategory {
    GENERAL = 0,
    ARTIST = 1,
    COPYRIGHT = 2,
    CHARACTER = 4,
    META = 5,
    SPECIAL = 6,
    RATING = 7
}

interface TagItem {
    id: string;
    text: string;
    weight: number;
    enabled: boolean;
    category: number;
}

// Paste original functions here for testing
function textToTags(text: string): TagItem[] {
    if (!text.trim()) return [];

    const tags: TagItem[] = [];
    let idx = 0;
    let i = 0;
    let currentTag = '';
    let inWeight = false;

    while (i < text.length) {
        const char = text[i];

        // Handle escape sequences
        if (char === '\\' && i + 1 < text.length) {
            const nextChar = text[i + 1];
            if (nextChar === '(' || nextChar === ')') {
                currentTag += nextChar;
                i += 2;
                continue;
            } else {
                currentTag += char;
                i++;
                continue;
            }
        }

        if (char === '(' && !inWeight) {
            if (currentTag.trim()) {
                tags.push({ id: `tag-${idx++}`, text: currentTag.trim(), weight: 1.0, enabled: true, category: TagCategory.GENERAL });
                currentTag = '';
            }

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
                const content = text.substring(i + 1, j - 1);
                const colonIndex = content.indexOf(':');

                if (colonIndex > 0) {
                    const tagText = content.substring(0, colonIndex).trim();
                    const weight = parseFloat(content.substring(colonIndex + 1).trim());
                    if (!isNaN(weight) && tagText) {
                        tags.push({ id: `tag-${idx++}`, text: tagText, weight: weight, enabled: true, category: TagCategory.GENERAL });
                    }
                } else {
                    currentTag += text.substring(i, j);
                }
                i = j;
                continue;
            }
        }

        if (char === ',' || char === '\n') {
            if (currentTag.trim()) {
                tags.push({ id: `tag-${idx++}`, text: currentTag.trim(), weight: 1.0, enabled: true, category: TagCategory.GENERAL });
                currentTag = '';
            }
            i++;
            continue;
        }

        currentTag += char;
        i++;
    }

    if (currentTag.trim()) {
        tags.push({ id: `tag-${idx++}`, text: currentTag.trim(), weight: 1.0, enabled: true, category: TagCategory.GENERAL });
    }

    return tags;
}

function tagsToText(tags: TagItem[]): string {
    const enabledTags = tags.filter(tag => tag.enabled);
    if (enabledTags.length === 0) return '';

    return enabledTags
        .map(tag => {
            const escapedText = tag.text.replace(/\(/g, '\\(').replace(/\)/g, '\\)');
            if (tag.weight !== 1.0) {
                return `(${escapedText}:${tag.weight.toFixed(1)})`;
            }
            return escapedText;
        })
        .join(', ') + ',';
}

// Test Case
const input = "aaa \\(bbb\\)";
console.log("Input:", input);
const tags = textToTags(input);
console.log("Parsed Tags:", JSON.stringify(tags, null, 2));

const output = tagsToText(tags);
console.log("Output:", output);

if (output.includes("\\\\")) {
    console.log("FAIL: Double escaping detected!");
} else if (output.trim().replace(/,$/, '') === input) {
    console.log("PASS: Output matches input.");
} else {
    console.log("DIFF: Output different from input.");
}
