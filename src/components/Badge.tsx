'use client';

import { motion } from 'framer-motion';
import styles from './Badge.module.css';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'primary';
    size?: 'small' | 'medium' | 'large';
    pulse?: boolean;
}

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
