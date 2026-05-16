export function normalizeTagForRecognition(tagName: string, ignoreAtPrefix: boolean): string {
    const trimmed = tagName.trim();

    if (ignoreAtPrefix && trimmed.startsWith('@')) {
        return trimmed.slice(1).trimStart();
    }

    return trimmed;
}

export function normalizeTagsForRecognition(tagNames: string[], ignoreAtPrefix: boolean): string[] {
    return tagNames
        .map((name) => normalizeTagForRecognition(name, ignoreAtPrefix))
        .filter((name) => name.length > 0);
}
