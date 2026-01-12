/**
 * Storage Utility Wrapper
 * Provides safe localStorage and sessionStorage access with error handling
 */

type StorageType = 'local' | 'session';

class StorageWrapper {
    private getStorage(type: StorageType): Storage | null {
        if (typeof window === 'undefined') return null;
        return type === 'local' ? localStorage : sessionStorage;
    }

    /**
     * Get item from storage
     */
    get<T = any>(key: string, type: StorageType = 'local'): T | null {
        try {
            const storage = this.getStorage(type);
            if (!storage) return null;

            const item = storage.getItem(key);
            if (!item) return null;

            return JSON.parse(item) as T;
        } catch (error) {
            console.error(`Error getting ${key} from ${type} storage:`, error);
            return null;
        }
    }

    /**
     * Set item in storage
     */
    set(key: string, value: any, type: StorageType = 'local'): boolean {
        try {
            const storage = this.getStorage(type);
            if (!storage) return false;

            storage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Error setting ${key} in ${type} storage:`, error);
            return false;
        }
    }

    /**
     * Remove item from storage
     */
    remove(key: string, type: StorageType = 'local'): boolean {
        try {
            const storage = this.getStorage(type);
            if (!storage) return false;

            storage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing ${key} from ${type} storage:`, error);
            return false;
        }
    }

    /**
     * Clear all items from storage
     */
    clear(type: StorageType = 'local'): boolean {
        try {
            const storage = this.getStorage(type);
            if (!storage) return false;

            storage.clear();
            return true;
        } catch (error) {
            console.error(`Error clearing ${type} storage:`, error);
            return false;
        }
    }

    /**
     * Check if key exists in storage
     */
    has(key: string, type: StorageType = 'local'): boolean {
        try {
            const storage = this.getStorage(type);
            if (!storage) return false;

            return storage.getItem(key) !== null;
        } catch (error) {
            console.error(`Error checking ${key} in ${type} storage:`, error);
            return false;
        }
    }

    /**
     * Get all keys from storage
     */
    keys(type: StorageType = 'local'): string[] {
        try {
            const storage = this.getStorage(type);
            if (!storage) return [];

            return Object.keys(storage);
        } catch (error) {
            console.error(`Error getting keys from ${type} storage:`, error);
            return [];
        }
    }

    /**
     * Get approximate storage size in bytes
     */
    getSize(type: StorageType = 'local'): number {
        try {
            const storage = this.getStorage(type);
            if (!storage) return 0;

            let size = 0;
            for (const key in storage) {
                if (storage.hasOwnProperty(key)) {
                    size += key.length + (storage.getItem(key)?.length || 0);
                }
            }
            return size;
        } catch (error) {
            console.error(`Error calculating ${type} storage size:`, error);
            return 0;
        }
    }
}

export const storage = new StorageWrapper();
