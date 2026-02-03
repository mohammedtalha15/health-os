'use client';

import { motion } from 'framer-motion';
import styles from './Chip.module.css';

interface ChipProps {
    label: string;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    size?: 'small' | 'medium' | 'large';
    onDelete?: () => void;
    onClick?: () => void;
    icon?: React.ReactNode;
}

/**
 * Chip component for concise data representation or actions.
 * Supports deletion and click interactions.
 *
 * @param label - Text label
 * @param variant - Visual style variant
 * @param size - Size of the chip
 * @param onDelete - Optional deletion handler
 * @param onClick - Optional click handler
 * @param icon - Optional icon element
 */
export default function Chip({
    label,
    variant = 'default',
    size = 'medium',
    onDelete,
    onClick,
    icon,
}: ChipProps) {
    const isClickable = !!onClick;

    return (
        <motion.div
            className={`${styles.chip} ${styles[variant]} ${styles[size]} ${isClickable ? styles.clickable : ''}`}
            onClick={onClick}
            whileHover={isClickable ? { scale: 1.05 } : {}}
            whileTap={isClickable ? { scale: 0.95 } : {}}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.label}>{label}</span>
            {onDelete && (
                <button
                    className={styles.deleteButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    aria-label="Delete"
                >
                    ✕
                </button>
            )}
        </motion.div>
    );
}
