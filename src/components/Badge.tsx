'use client';

import { motion } from 'framer-motion';
import styles from './Badge.module.css';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'primary';
    size?: 'small' | 'medium' | 'large';
    pulse?: boolean;
}

/**
 * Badge component for displaying status indicators or counts.
 * Supports various semantic variants and sizes.
 *
 * @param children - The content to display inside the badge
 * @param variant - Visual style variant (success, warning, etc.)
 * @param size - Size of the badge
 * @param pulse - Whether to enable a pulse animation effect
 */
export default function Badge({
    children,
    variant = 'primary',
    size = 'medium',
    pulse = false
}: BadgeProps) {
    return (
        <motion.span
            className={`${styles.badge} ${styles[variant]} ${styles[size]} ${pulse ? styles.pulse : ''}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.span>
    );
}
