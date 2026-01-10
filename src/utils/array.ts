/**
 * Array Utility Functions
 */

/**
 * Remove duplicates from array
 */
export function unique<T>(array: T[]): T[] {
    return Array.from(new Set(array));
}

/**
 * Shuffle array randomly
 */
export function shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * Group array items by key
 */
export function groupBy<T>(
    array: T[],
    key: keyof T | ((item: T) => string | number)
): Record<string, T[]> {
    return array.reduce((result, item) => {
        const groupKey = typeof key === 'function' ? key(item) : String(item[key]);
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {} as Record<string, T[]>);
}

/**
 * Get random item from array
 */
export function randomItem<T>(array: T[]): T | undefined {
    if (array.length === 0) return undefined;
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get random items from array
 */
export function randomItems<T>(array: T[], count: number): T[] {
    const shuffled = shuffle(array);
    return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Sort array by key
 */
export function sortBy<T>(
    array: T[],
    key: keyof T | ((item: T) => any),
    order: 'asc' | 'desc' = 'asc'
): T[] {
    const sorted = [...array];
    sorted.sort((a, b) => {
        const aVal = typeof key === 'function' ? key(a) : a[key];
        const bVal = typeof key === 'function' ? key(b) : b[key];

        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;
        return 0;
    });
    return sorted;
}

/**
 * Check if array is empty
 */
export function isEmpty<T>(array: T[] | null | undefined): boolean {
    return !array || array.length === 0;
}

/**
 * Get first item from array
 */
export function first<T>(array: T[]): T | undefined {
    return array[0];
}

/**
 * Get last item from array
 */
export function last<T>(array: T[]): T | undefined {
    return array[array.length - 1];
}
