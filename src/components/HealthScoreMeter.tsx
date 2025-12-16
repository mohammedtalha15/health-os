'use client';

import { motion } from 'framer-motion';
import styles from './HealthScoreMeter.module.css';
import { useEffect, useState } from 'react';

interface HealthScoreMeterProps {
    score: number; // 0-100
    label?: string;
    size?: number;
}

export default function HealthScoreMeter({ score, label = 'Health Score', size = 200 }: HealthScoreMeterProps) {
    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayScore(score);
        }, 100);
        return () => clearTimeout(timer);
    }, [score]);

    const circumference = 2 * Math.PI * 85;
    const offset = circumference - (displayScore / 100) * circumference;

    const getScoreColor = () => {
        if (score >= 80) return '#10b981'; // Green
        if (score >= 60) return '#f59e0b'; // Orange
        if (score >= 40) return '#f97316'; // Deep orange
        return '#ef4444'; // Red
    };

    const getScoreLabel = () => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Needs Attention';
    };

    return (
        <div className={styles.meterContainer}>
            <svg width={size} height={size} className={styles.meter}>
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r="85"
                    fill="none"
                    stroke="var(--color-gray-200)"
                    strokeWidth="12"
                />

                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r="85"
                    fill="none"
                    stroke={getScoreColor()}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    className={styles.progressCircle}
                />

                {/* Center content */}
                <text
                    x={size / 2}
                    y={size / 2 - 10}
                    textAnchor="middle"
                    className={styles.scoreText}
                    fill={getScoreColor()}
                >
                    <motion.tspan
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {Math.round(displayScore)}
                    </motion.tspan>
                </text>

                <text
                    x={size / 2}
                    y={size / 2 + 25}
                    textAnchor="middle"
                    className={styles.statusText}
                    fill="var(--color-gray-600)"
                >
                    {getScoreLabel()}
                </text>
            </svg>

            <div className={styles.label}>{label}</div>
        </div>
    );
}
