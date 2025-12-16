'use client';

import { motion } from 'framer-motion';
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'glass' | 'elevated' | 'bordered';
    padding?: 'none' | 'small' | 'medium' | 'large';
    hover?: boolean;
    onClick?: () => void;
}

export default function Card({
    children,
    variant = 'default',
    padding = 'medium',
    hover = true,
    onClick,
}: CardProps) {
    return (
        <motion.div
            className={`${styles.card} ${styles[variant]} ${styles[`padding-${padding}`]}`}
            onClick={onClick}
            whileHover={hover ? { y: -4, boxShadow: 'var(--shadow-xl)' } : {}}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
}
