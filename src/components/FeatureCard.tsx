'use client';

import { motion } from 'framer-motion';
import styles from './FeatureCard.module.css';

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    gradient: string;
    delay?: number;
}

export default function FeatureCard({ icon, title, description, gradient, delay = 0 }: FeatureCardProps) {
    return (
        <motion.div
            className={styles.featureCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.3 }
            }}
        >
            <motion.div
                className={styles.iconWrapper}
                style={{ background: gradient }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <span className={styles.icon}>{icon}</span>
            </motion.div>

            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>

            <motion.div
                className={styles.cardGlow}
                style={{ background: gradient }}
            />
        </motion.div>
    );
}
