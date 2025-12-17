'use client';

import { motion } from 'framer-motion';
import styles from './Dropdown.module.css';
import { useState, useRef, useEffect } from 'react';

interface DropdownOption {
    value: string;
    label: string;
    icon?: string;
}

interface DropdownProps {
    options: DropdownOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function Dropdown({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    disabled = false,
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                className={`${styles.trigger} ${disabled ? styles.disabled : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <span className={styles.value}>
                    {selectedOption?.icon && <span className={styles.icon}>{selectedOption.icon}</span>}
                    {selectedOption?.label || placeholder}
                </span>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                >
                    <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {isOpen && (
                <motion.div
                    className={styles.menu}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                >
                    {options.map((option) => (
                        <button
                            key={option.value}
                            className={`${styles.option} ${option.value === value ? styles.selected : ''}`}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.icon && <span className={styles.icon}>{option.icon}</span>}
                            {option.label}
                            {option.value === value && <span className={styles.checkmark}>✓</span>}
                        </button>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
