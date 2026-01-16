// Cache management utilities for optimizing performance
class CacheManager {
    private cache: Map<string, { data: any; timestamp: number; ttl: number }>;
    private maxSize: number;

    constructor(maxSize: number = 100) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }

    // Set item in cache with TTL (time to live in milliseconds)
    set(key: string, data: any, ttl: number = 5 * 60 * 1000): void {
        // Remove oldest item if cache is full
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey !== undefined) {
                this.cache.delete(firstKey);
            }
        }

        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl,
        });
    }

    // Get item from cache
    get<T>(key: string): T | null {
        const item = this.cache.get(key);

        if (!item) return null;

        // Check if item has expired
        if (Date.now() - item.timestamp > item.ttl) {
            this.cache.delete(key);
            return null;
        }

        return item.data as T;
    }

    // Check if key exists and is valid
    has(key: string): boolean {
        return this.get(key) !== null;
    }

    // Remove item from cache
    delete(key: string): boolean {
        return this.cache.delete(key);
    }

    // Clear all cache
    clear(): void {
        this.cache.clear();
    }

    // Get cache size
    size(): number {
        return this.cache.size;
    }

    // Clean expired items
    cleanExpired(): void {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now - item.timestamp > item.ttl) {
                this.cache.delete(key);
            }
        }
    }
}

// Global cache instance
export const cache = new CacheManager();

// Cache decorator for functions
export function cached(ttl: number = 5 * 60 * 1000) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const cacheKey = `${propertyKey}_${JSON.stringify(args)}`;

            // Check cache first
            const cachedResult = cache.get(cacheKey);
            if (cachedResult !== null) {
                return cachedResult;
            }

            // Execute original method
            const result = await originalMethod.apply(this, args);

            // Store in cache
            cache.set(cacheKey, result, ttl);

            return result;
        };

        return descriptor;
    };
}

// Memory cache for API responses
export class ApiCache {
    private static instance: ApiCache;
    private cache: CacheManager;

    private constructor() {
        this.cache = new CacheManager(200);

        // Clean expired items every 5 minutes
        setInterval(() => {
            this.cache.cleanExpired();
        }, 5 * 60 * 1000);
    }

    static getInstance(): ApiCache {
        if (!ApiCache.instance) {
            ApiCache.instance = new ApiCache();
        }
        return ApiCache.instance;
    }

    async fetch<T>(
        key: string,
        fetcher: () => Promise<T>,
        ttl: number = 5 * 60 * 1000
    ): Promise<T> {
        // Check cache
        const cached = this.cache.get<T>(key);
        if (cached !== null) {
            return cached;
        }

        // Fetch fresh data
        const data = await fetcher();

        // Store in cache
        this.cache.set(key, data, ttl);

        return data;
    }

    invalidate(key: string): void {
        this.cache.delete(key);
    }

    invalidatePattern(pattern: string): void {
        // Invalidate all keys matching pattern
        for (const key of Array.from(this.cache['cache'].keys())) {
            if (key.includes(pattern)) {
                this.cache.delete(key);
            }
        }
    }

    clear(): void {
        this.cache.clear();
    }
}

// LocalStorage cache with expiration
export class LocalStorageCache {
    private prefix: string;

    constructor(prefix: string = 'healthos_cache_') {
        this.prefix = prefix;
    }

    set(key: string, data: any, ttl: number = 24 * 60 * 60 * 1000): void {
        if (typeof window === 'undefined') return;

        const item = {
            data,
            timestamp: Date.now(),
            ttl,
        };

        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(item));
        } catch (error) {
            console.error('LocalStorage cache error:', error);
        }
    }

    get<T>(key: string): T | null {
        if (typeof window === 'undefined') return null;

        try {
            const itemStr = localStorage.getItem(this.prefix + key);
            if (!itemStr) return null;

            const item = JSON.parse(itemStr);

            // Check expiration
            if (Date.now() - item.timestamp > item.ttl) {
                this.delete(key);
                return null;
            }

            return item.data as T;
        } catch (error) {
            console.error('LocalStorage cache error:', error);
            return null;
        }
    }

    delete(key: string): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(this.prefix + key);
    }

    clear(): void {
        if (typeof window === 'undefined') return;

        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }
}

export const apiCache = ApiCache.getInstance();
export const localCache = new LocalStorageCache();

// Usage examples:
/*
// Simple cache
cache.set('user', userData, 10 * 60 * 1000); // 10 minutes
const user = cache.get('user');

// API cache
const reports = await apiCache.fetch(
  'reports_list',
  () => fetchReports(),
  5 * 60 * 1000
);

// Invalidate cache
apiCache.invalidate('reports_list');
apiCache.invalidatePattern('reports_');

// LocalStorage cache
localCache.set('preferences', userPreferences, 7 * 24 * 60 * 60 * 1000);
const prefs = localCache.get('preferences');
*/
