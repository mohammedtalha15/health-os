'use client';

import { motion } from 'framer-motion';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
    value: number; // 0-100
    max?: number;
    color?: string;
    height?: number;
    showLabel?: boolean;
    animated?: boolean;
}

export default function ProgressBar({
    value,
    max = 100,
    color = 'var(--color-primary)',
    height = 8,
    showLabel = false,
    animated = true,
}: ProgressBarProps) {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className={styles.container}>
            <div className={styles.track} style={{ height }}>
                <motion.div
                    className={styles.fill}
                    style={{
                        backgroundColor: color,
                        height: '100%',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{
                        duration: animated ? 0.8 : 0,
                        ease: 'easeOut',
                    }}
                />
            </div>
            {showLabel && (
                <span className={styles.label}>{Math.round(percentage)}%</span>
            )}
        </div>
    );
}
