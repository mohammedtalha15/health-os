'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './ProgressRing.module.css';

interface ProgressRingProps {
    progress: number; // 0-100
    size?: number;
    strokeWidth?: number;
    color?: string;
    label?: string;
    showPercentage?: boolean;
}

export default function ProgressRing({
    progress,
    size = 120,
    strokeWidth = 8,
    color = '#2563eb',
    label,
    showPercentage = true
}: ProgressRingProps) {
    const [animatedProgress, setAnimatedProgress] = useState(0);

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (animatedProgress / 100) * circumference;

    useEffect(() => {
        const timer = setTimeout(() => setAnimatedProgress(progress), 100);
        return () => clearTimeout(timer);
    }, [progress]);

    return (
        <div className={styles.container}>
            <svg width={size} height={size} className={styles.svg}>
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth={strokeWidth}
                />

                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </svg>

            <div className={styles.content}>
                {showPercentage && (
                    <span className={styles.percentage} style={{ color }}>
                        {Math.round(animatedProgress)}%
                    </span>
                )}
                {label && <span className={styles.label}>{label}</span>}
            </div>
        </div>
    );
}
