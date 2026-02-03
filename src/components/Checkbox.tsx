'use client';

import { motion } from 'framer-motion';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    indeterminate?: boolean;
}

/**
 * Checkbox component for boolean selection.
 * Supports indeterminate state and animations.
 *
 * @param checked - Whether the checkbox is checked
 * @param onChange - Callback when the state changes
 * @param label - Optional label text
 * @param disabled - Whether the checkbox is disabled
 * @param indeterminate - Whether the checkbox is in indeterminate state
 */
export default function Checkbox({
    checked,
    onChange,
    label,
    disabled = false,
    indeterminate = false,
}: CheckboxProps) {
    return (
        <label className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className={styles.input}
            />
            <div className={`${styles.checkbox} ${checked || indeterminate ? styles.checked : ''}`}>
                {checked && !indeterminate && (
                    <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                    >
                        <path
                            d="M3 8L6.5 11.5L13 5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </motion.svg>
                )}
                {indeterminate && (
                    <motion.div
                        className={styles.indeterminate}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                    />
                )}
            </div>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    );
}
