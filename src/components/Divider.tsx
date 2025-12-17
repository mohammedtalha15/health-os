'use client';

import { motion } from 'framer-motion';
import styles from './Divider.module.css';

interface DividerProps {
    orientation?: 'horizontal' | 'vertical';
    label?: string;
    variant?: 'solid' | 'dashed' | 'dotted';
}

export default function Divider({
    orientation = 'horizontal',
    label,
    variant = 'solid',
}: DividerProps) {
    if (label && orientation === 'horizontal') {
        return (
            <div className={styles.labeledDivider}>
                <div className={`${styles.line} ${styles[variant]}`} />
                <span className={styles.label}>{label}</span>
                <div className={`${styles.line} ${styles[variant]}`} />
            </div>
        );
    }

    return (
        <div
            className={`${styles.divider} ${styles[orientation]} ${styles[variant]}`}
            role="separator"
            aria-orientation={orientation}
        />
    );
}
