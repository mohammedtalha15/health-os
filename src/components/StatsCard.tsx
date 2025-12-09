'use client';

import { motion } from 'framer-motion';
import styles from './StatsCard.module.css';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon: string;
    color: 'blue' | 'green' | 'purple' | 'orange';
}

export default function StatsCard({ title, value, change, icon, color }: StatsCardProps) {
    const isPositive = change && change > 0;

    return (
        <motion.div
            className={styles.card}
            data-color={color}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.iconWrapper}>
                <span className={styles.icon}>{icon}</span>
            </div>

            <div className={styles.content}>
                <p className={styles.title}>{title}</p>
                <h3 className={styles.value}>{value}</h3>

                {change !== undefined && (
                    <div className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
                        <span>{isPositive ? '↑' : '↓'}</span>
                        <span>{Math.abs(change)}%</span>
                        <span className={styles.changeLabel}>vs last month</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
