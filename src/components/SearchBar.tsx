'use client';

import { motion } from 'framer-motion';
import styles from './SearchBar.module.css';
import { useState, useEffect } from 'react';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
}

export default function SearchBar({ placeholder = 'Search...', onSearch }: SearchBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd+K or Ctrl+K to open search
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            // Escape to close
            if (e.key === 'Escape') {
                setIsOpen(false);
                setQuery('');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <>
            {/* Search trigger button */}
            <motion.button
                className={styles.searchTrigger}
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className={styles.searchIcon}>🔍</span>
                <span className={styles.searchText}>Search</span>
                <span className={styles.shortcut}>⌘K</span>
            </motion.button>

            {/* Search modal */}
            {isOpen && (
                <motion.div
                    className={styles.searchOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        className={styles.searchModal}
                        initial={{ scale: 0.9, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form onSubmit={handleSearch} className={styles.searchForm}>
                            <span className={styles.searchIconLarge}>🔍</span>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={placeholder}
                                className={styles.searchInput}
                                autoFocus
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    className={styles.clearButton}
                                >
                                    ✕
                                </button>
                            )}
                        </form>

                        <div className={styles.searchHints}>
                            <div className={styles.hint}>
                                <kbd>↑</kbd> <kbd>↓</kbd> to navigate
                            </div>
                            <div className={styles.hint}>
                                <kbd>↵</kbd> to select
                            </div>
                            <div className={styles.hint}>
                                <kbd>esc</kbd> to close
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
