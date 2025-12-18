'use client';

import { motion } from 'framer-motion';
import styles from './RadioGroup.module.css';

interface RadioOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}

interface RadioGroupProps {
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    name: string;
    label?: string;
    orientation?: 'horizontal' | 'vertical';
}

export default function RadioGroup({
    options,
    value,
    onChange,
    name,
    label,
    orientation = 'vertical',
}: RadioGroupProps) {
    return (
        <div className={styles.container}>
            {label && <label className={styles.groupLabel}>{label}</label>}
            <div className={`${styles.radioGroup} ${styles[orientation]}`}>
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={`${styles.option} ${option.disabled ? styles.disabled : ''} ${value === option.value ? styles.selected : ''
                            }`}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={(e) => onChange(e.target.value)}
                            disabled={option.disabled}
                            className={styles.input}
                        />
                        <div className={styles.radio}>
                            {value === option.value && (
                                <motion.div
                                    className={styles.dot}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 500 }}
                                />
                            )}
                        </div>
                        <div className={styles.labelContent}>
                            <div className={styles.label}>{option.label}</div>
                            {option.description && (
                                <div className={styles.description}>{option.description}</div>
                            )}
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
}
