'use client';

import { motion } from 'framer-motion';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
    text?: string;
}

export default function LoadingSpinner({
    size = 'medium',
    color = 'var(--color-primary)',
    text
}: LoadingSpinnerProps) {
    const sizeMap = {
        small: 24,
        medium: 40,
        large: 60,
    };

    const spinnerSize = sizeMap[size];

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.spinner}
                style={{
                    width: spinnerSize,
                    height: spinnerSize,
                    borderColor: `${color}20`,
                    borderTopColor: color,
                }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            {text && <p className={styles.text}>{text}</p>}
        </div>
    );
}
