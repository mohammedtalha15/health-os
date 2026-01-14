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
    gradient?: boolean;
    glow?: boolean;
}

export default function ProgressRing({
    progress,
    size = 120,
    strokeWidth = 8,
    color = '#2563eb',
    label,
    showPercentage = true,
    gradient = false,
    glow = false
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
                {/* Gradient definition */}
                {gradient && (
                    <defs>
                        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={color} stopOpacity="1" />
                            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
                        </linearGradient>
                        {glow && (
                            <filter id={`glow-${color}`}>
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        )}
                    </defs>
                )}

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
                    stroke={gradient ? `url(#gradient-${color})` : color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    filter={glow ? `url(#glow-${color})` : undefined}
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
