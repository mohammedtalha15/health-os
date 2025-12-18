'use client';

import { motion } from 'framer-motion';
import styles from './Timeline.module.css';

interface TimelineItem {
    id: string;
    title: string;
    description: string;
    date: string;
    icon?: string;
    variant?: 'default' | 'success' | 'warning' | 'danger';
}

interface TimelineProps {
    items: TimelineItem[];
    orientation?: 'vertical' | 'horizontal';
}

export default function Timeline({ items, orientation = 'vertical' }: TimelineProps) {
    return (
        <div className={`${styles.timeline} ${styles[orientation]}`}>
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    className={styles.item}
                    initial={{ opacity: 0, x: orientation === 'vertical' ? -20 : 0, y: orientation === 'horizontal' ? 20 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className={`${styles.marker} ${item.variant ? styles[item.variant] : ''}`}>
                        {item.icon ? <span className={styles.icon}>{item.icon}</span> : <div className={styles.dot} />}
                    </div>
                    <div className={styles.content}>
                        <div className={styles.date}>{item.date}</div>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.description}>{item.description}</div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
