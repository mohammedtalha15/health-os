/**
 * String Utility Functions
 */

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert string to title case
 */
export function toTitleCase(str: string): string {
    if (!str) return '';
    return str
        .toLowerCase()
        .split(' ')
        .map(word => capitalize(word))
        .join(' ');
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
    if (!str || str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + '...';
}

/**
 * Convert string to kebab-case
 */
export function toKebabCase(str: string): string {
    if (!str) return '';
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}

/**
 * Convert string to camelCase
 */
export function toCamelCase(str: string): string {
    if (!str) return '';
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

/**
 * Remove all whitespace from string
 */
export function removeWhitespace(str: string): string {
    if (!str) return '';
    return str.replace(/\s+/g, '');
}

/**
 * Check if string is empty or only whitespace
 */
export function isBlank(str: string | null | undefined): boolean {
    return !str || str.trim().length === 0;
}

/**
 * Generate a random string
 */
export function randomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Extract initials from name
 */
export function getInitials(name: string, maxLength: number = 2): string {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    const initials = parts.map(part => part.charAt(0).toUpperCase());
    return initials.slice(0, maxLength).join('');
}
