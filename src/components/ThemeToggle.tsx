'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    if (!mounted) {
        return null; // Avoid hydration mismatch
    }

    return (
        <motion.button
            className={styles.themeToggle}
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <motion.div
                className={styles.toggleTrack}
                animate={{
                    backgroundColor: theme === 'dark' ? '#1a2035' : '#e5e7eb',
                }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className={styles.toggleThumb}
                    animate={{
                        x: theme === 'dark' ? 28 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                    {theme === 'light' ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="4" fill="#f59e0b" />
                            <path
                                d="M8 1V3M8 13V15M15 8H13M3 8H1M12.95 12.95L11.54 11.54M4.46 4.46L3.05 3.05M12.95 3.05L11.54 4.46M4.46 11.54L3.05 12.95"
                                stroke="#f59e0b"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M14 8.5C13.3 10.9 11 12.5 8.5 12.5C5.5 12.5 3 10 3 7C3 4.5 4.6 2.2 7 1.5C6.5 1.4 6 1.5 5.5 1.5C2.5 1.5 0 4 0 7C0 10 2.5 12.5 5.5 12.5C8.5 12.5 11 10 11 7C11 6.5 11 6 10.9 5.5C11.6 6.2 12 7.3 12 8.5"
                                fill="#60a5fa"
                            />
                        </svg>
                    )}
                </motion.div>
            </motion.div>
        </motion.button>
    );
}
