'use client';

import { motion } from 'framer-motion';
import styles from './Tooltip.module.css';
import { useState } from 'react';

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
}

export default function Tooltip({
    children,
    content,
    position = 'top',
    delay = 0
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className={styles.wrapper}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <motion.div
                    className={`${styles.tooltip} ${styles[position]}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15, delay }}
                >
                    {content}
                    <div className={styles.arrow} />
                </motion.div>
            )}
        </div>
    );
}
