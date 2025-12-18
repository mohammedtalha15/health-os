'use client';

import { motion } from 'framer-motion';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
    icon?: string;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    illustration?: React.ReactNode;
}

export default function EmptyState({
    icon = '📭',
    title,
    description,
    action,
    illustration,
}: EmptyStateProps) {
    return (
        <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {illustration ? (
                <div className={styles.illustration}>{illustration}</div>
            ) : (
                <div className={styles.icon}>{icon}</div>
            )}
            <h3 className={styles.title}>{title}</h3>
            {description && <p className={styles.description}>{description}</p>}
            {action && (
                <motion.button
                    className={styles.action}
                    onClick={action.onClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {action.label}
                </motion.button>
            )}
        </motion.div>
    );
}
