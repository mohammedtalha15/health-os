'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './HealthTimeline.module.css';
import { animationPresets } from '@/lib/motion';

interface TimelineEntry {
    id: number;
    type: 'report' | 'alert' | 'prescription' | 'vital';
    date: string;
    title: string;
    summary?: string;
    severity?: 'green' | 'yellow' | 'red';
    data?: any;
}

interface HealthTimelineProps {
    entries: TimelineEntry[];
    onEntryClick?: (entry: TimelineEntry) => void;
}

export default function HealthTimeline({ entries, onEntryClick }: HealthTimelineProps) {
    const [filter, setFilter] = useState<string>('all');
    const [zoomLevel, setZoomLevel] = useState(1);

    const filteredEntries = entries.filter(entry =>
        filter === 'all' || entry.type === filter
    );

    const typeIcons = {
        report: '📄',
        alert: '⚠️',
        prescription: '💊',
        vital: '❤️'
    };

    const typeColors = {
        report: '#2563eb',
        alert: '#f59e0b',
        prescription: '#8b5cf6',
        vital: '#10b981'
    };

    return (
        <div className={styles.container}>
            {/* Controls */}
            <div className={styles.controls}>
                <div className={styles.filters}>
                    {['all', 'report', 'alert', 'prescription', 'vital'].map(type => (
                        <motion.button
                            key={type}
                            className={`${styles.filterBtn} ${filter === type ? styles.active : ''}`}
                            onClick={() => setFilter(type)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {type === 'all' ? 'All' : typeIcons[type as keyof typeof typeIcons]} {type.charAt(0).toUpperCase() + type.slice(1)}
                        </motion.button>
                    ))}
                </div>

                <div className={styles.zoomControls}>
                    <motion.button
                        className={styles.zoomBtn}
                        onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        −
                    </motion.button>
                    <span>{Math.round(zoomLevel * 100)}%</span>
                    <motion.button
                        className={styles.zoomBtn}
                        onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        +
                    </motion.button>
                </div>
            </div>

            {/* Timeline */}
            <motion.div
                className={styles.timeline}
                style={{ transform: `scale(${zoomLevel})` }}
            >
                <div className={styles.timelineLine} />

                {filteredEntries.map((entry, index) => (
                    <motion.div
                        key={entry.id}
                        className={styles.timelineEntry}
                        data-type={entry.type}
                        initial={animationPresets.listItem.initial}
                        animate={animationPresets.listItem.animate}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onEntryClick?.(entry)}
                        whileHover={{ scale: 1.02, x: 10 }}
                    >
                        <motion.div
                            className={styles.timelineDot}
                            style={{ backgroundColor: typeColors[entry.type] }}
                            whileHover={{ scale: 1.3 }}
                        >
                            {typeIcons[entry.type]}
                        </motion.div>

                        <div className={styles.timelineContent}>
                            <div className={styles.timelineDate}>
                                {new Date(entry.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </div>

                            <div className={styles.timelineCard}>
                                <h3>{entry.title}</h3>
                                {entry.summary && <p>{entry.summary}</p>}

                                {entry.severity && (
                                    <motion.div
                                        className={styles.severityBadge}
                                        data-severity={entry.severity}
                                        animate={entry.severity === 'red' ? {
                                            boxShadow: [
                                                '0 0 10px rgba(239, 68, 68, 0.3)',
                                                '0 0 20px rgba(239, 68, 68, 0.6)',
                                                '0 0 10px rgba(239, 68, 68, 0.3)',
                                            ]
                                        } : {}}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {entry.severity}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
