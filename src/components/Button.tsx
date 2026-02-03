'use client';

import { motion } from 'framer-motion';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

/**
 * Button component for user interactions.
 * Supports multiple variants, sizes, and states (loading, disabled).
 *
 * @param children - Button content
 * @param variant - Visual style variant
 * @param size - Size of the button
 * @param fullWidth - Whether the button should take full width
 * @param disabled - Whether the button is disabled
 * @param loading - Whether to show a loading spinner
 * @param onClick - Click handler
 * @param type - Button type attribute
 */
export default function Button({
    children,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
}: ButtonProps) {
    return (
        <motion.button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''}`}
            onClick={onClick}
            disabled={disabled || loading}
            type={type}
            whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        >
            {loading ? (
                <span className={styles.loader}></span>
            ) : (
                children
            )}
        </motion.button>
    );
}
