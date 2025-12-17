'use client';

import { motion } from 'framer-motion';
import styles from './Input.module.css';
import { useState } from 'react';

interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    icon?: React.ReactNode;
    suffix?: React.ReactNode;
}

export default function Input({
    type = 'text',
    value,
    onChange,
    placeholder,
    label,
    error,
    disabled = false,
    required = false,
    icon,
    suffix,
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={styles.container}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <div className={`${styles.inputWrapper} ${error ? styles.error : ''} ${isFocused ? styles.focused : ''}`}>
                {icon && <div className={styles.icon}>{icon}</div>}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={styles.input}
                />
                {suffix && <div className={styles.suffix}>{suffix}</div>}
            </div>
            {error && (
                <motion.p
                    className={styles.errorMessage}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
