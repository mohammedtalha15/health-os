/**
 * URL Utility Functions
 */

/**
 * Parse query string to object
 */
export function parseQueryString(queryString: string): Record<string, string> {
    const params: Record<string, string> = {};
    const searchParams = new URLSearchParams(queryString);

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
}

/**
 * Build query string from object
 */
export function buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            searchParams.append(key, String(value));
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
}

/**
 * Add query parameters to URL
 */
export function addQueryParams(
    url: string,
    params: Record<string, any>
): string {
    const [baseUrl, existingQuery] = url.split('?');
    const existingParams = existingQuery ? parseQueryString(existingQuery) : {};
    const mergedParams = { ...existingParams, ...params };
    const queryString = buildQueryString(mergedParams);

    return baseUrl + queryString;
}

/**
 * Get query parameter value
 */
export function getQueryParam(
    url: string,
    param: string
): string | null {
    const [, queryString] = url.split('?');
    if (!queryString) return null;

    const params = parseQueryString(queryString);
    return params[param] || null;
}

/**
 * Check if URL is absolute
 */
export function isAbsoluteUrl(url: string): boolean {
    return /^https?:\/\//i.test(url);
}

/**
 * Check if URL is valid
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Get domain from URL
 */
export function getDomain(url: string): string | null {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch {
        return null;
    }
}

/**
 * Join URL paths
 */
export function joinPaths(...paths: string[]): string {
    return paths
        .map((path, index) => {
            // Remove leading slash from all but first path
            if (index > 0) {
                path = path.replace(/^\/+/, '');
            }
            // Remove trailing slash from all but last path
            if (index < paths.length - 1) {
                path = path.replace(/\/+$/, '');
            }
            return path;
        })
        .join('/');
}

/**
 * Sanitize URL to prevent XSS attacks
 */
export function sanitizeUrl(url: string): string {
    // Remove javascript: and data: protocols
    const dangerous = /^(javascript|data|vbscript):/i;
    if (dangerous.test(url)) {
        return '';
    }
    return url;
}
