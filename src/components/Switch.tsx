'use client';

import { motion } from 'framer-motion';
import styles from './Switch.module.css';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
}

export default function Switch({
    checked,
    onChange,
    label,
    disabled = false,
    size = 'medium',
}: SwitchProps) {
    return (
        <label className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className={styles.input}
            />
            <div className={`${styles.switch} ${styles[size]} ${checked ? styles.checked : ''}`}>
                <motion.div
                    className={styles.thumb}
                    layout
                    transition={{
                        type: 'spring',
                        stiffness: 700,
                        damping: 30,
                    }}
                />
            </div>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    );
}
