'use client';

import { motion } from 'framer-motion';
import styles from './Alert.module.css';

interface AlertProps {
    variant?: 'info' | 'success' | 'warning' | 'danger';
    title?: string;
    children: React.ReactNode;
    onClose?: () => void;
    icon?: string;
}

/**
 * Alert component for displaying feedback messages to the user.
 * Supports different variants like info, success, warning, and danger.
 *
 * @param variant - Type of alert (info, success, warning, danger)
 * @param title - Optional title for the alert
 * @param children - Content of the alert
 * @param onClose - Optional callback to close the alert
 * @param icon - Optional custom icon
 */
export default function Alert({
    variant = 'info',
    title,
    children,
    onClose,
    icon,
}: AlertProps) {
    const defaultIcons = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        danger: '🚨',
    };

    return (
        <motion.div
            className={`${styles.alert} ${styles[variant]}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
            <div className={styles.iconWrapper}>
                <span className={styles.icon}>{icon || defaultIcons[variant]}</span>
            </div>
            <div className={styles.content}>
                {title && <div className={styles.title}>{title}</div>}
                <div className={styles.message}>{children}</div>
            </div>
            {onClose && (
                <button className={styles.closeButton} onClick={onClose} aria-label="Close alert">
                    ✕
                </button>
            )}
        </motion.div>
    );
}
