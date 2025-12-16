'use client';

import { motion } from 'framer-motion';
import Sparkline from './Sparkline';
import Badge from './Badge';
import styles from './HealthMetricCard.module.css';
import { animationPresets, severityAnimations } from '@/lib/motion';

interface HealthMetricCardProps {
    metric: string;
    value: number;
    unit: string;
    refLow: number;
    refHigh: number;
    severity: 'green' | 'yellow' | 'red';
    trend?: 'up' | 'down' | 'stable';
    trendPercent?: number;
    date: string;
    history?: number[];
}

export default function HealthMetricCard({
    metric,
    value,
    unit,
    refLow,
    refHigh,
    severity,
    trend,
    trendPercent,
    date
}: HealthMetricCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
    const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const severityConfig = {
        green: { color: '#10b981', label: 'Normal', icon: '✓' },
        yellow: { color: '#f59e0b', label: 'Attention', icon: '⚠' },
        red: { color: '#ef4444', label: 'Critical', icon: '!' }
    };

    const config = severityConfig[severity];

    return (
        <motion.div
            className={styles.card}
            data-severity={severity}
            variants={animationPresets.morphCard}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={severityAnimations[severity].animate}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsExpanded(!isExpanded)}
            layout
        >
            {/* Severity indicator glow */}
            <motion.div
                className={styles.glowRing}
                style={{
                    boxShadow: `0 0 40px ${config.color}40`,
                }}
                animate={{
                    opacity: severity === 'red' ? [0.3, 0.6, 0.3] : 0.3,
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.metricName}>
                    <span className={styles.icon} style={{ color: config.color }}>
                        {config.icon}
                    </span>
                    <h3>{metric}</h3>
                </div>
                <motion.div
                    className={styles.severityBadge}
                    style={{ backgroundColor: `${config.color}20`, color: config.color }}
                    whileHover={{ scale: 1.1 }}
                >
                    {config.label}
                </motion.div>
            </div>

            {/* Value Display */}
            <motion.div
                className={styles.valueDisplay}
                layout
            >
                <motion.div
                    className={styles.value}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                >
                    {value}
                    <span className={styles.unit}>{unit}</span>
                </motion.div>

                {trend && (
                    <motion.div
                        className={styles.trend}
                        data-trend={trend}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className={styles.trendIcon}>
                            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
                        </span>
                        {trendPercent && <span>{Math.abs(trendPercent)}%</span>}
                    </motion.div>
                )}
            </motion.div>

            {/* Reference Range */}
            {refLow !== undefined && refHigh !== undefined && (
                <motion.div
                    className={styles.referenceRange}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className={styles.rangeBar}>
                        <div className={styles.rangeTrack}>
                            <motion.div
                                className={styles.rangeIndicator}
                                style={{
                                    left: `${((value - refLow) / (refHigh - refLow)) * 100}%`,
                                    backgroundColor: config.color,
                                }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: 'spring' }}
                            />
                        </div>
                    </div>
                    <div className={styles.rangeLabels}>
                        <span>{refLow}</span>
                        <span className={styles.normalRange}>Normal Range</span>
                        <span>{refHigh}</span>
                    </div>
                </motion.div>
            )}

            {/* Expanded Details */}
            <motion.div
                className={styles.expandedContent}
                initial={false}
                animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <div className={styles.details}>
                    <div className={styles.detailRow}>
                        <span>Sample Date:</span>
                        <span>{date}</span>
                    </div>
                    <motion.button
                        className={styles.viewHistoryBtn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View History →
                    </motion.button>
                </div>
            </motion.div>

            {/* Date stamp */}
            <div className={styles.dateStamp}>{date}</div>
        </motion.div>
    );
}
