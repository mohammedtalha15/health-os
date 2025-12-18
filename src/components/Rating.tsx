'use client';

import { motion } from 'framer-motion';
import styles from './Rating.module.css';
import { useState } from 'react';

interface RatingProps {
    value: number;
    onChange?: (value: number) => void;
    max?: number;
    readonly?: boolean;
    size?: 'small' | 'medium' | 'large';
    color?: string;
}

export default function Rating({
    value,
    onChange,
    max = 5,
    readonly = false,
    size = 'medium',
    color = '#f59e0b',
}: RatingProps) {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const handleClick = (rating: number) => {
        if (!readonly && onChange) {
            onChange(rating);
        }
    };

    return (
        <div className={`${styles.rating} ${styles[size]}`}>
            {Array.from({ length: max }, (_, index) => {
                const rating = index + 1;
                const isFilled = rating <= (hoverValue ?? value);

                return (
                    <motion.button
                        key={index}
                        className={`${styles.star} ${isFilled ? styles.filled : ''} ${readonly ? styles.readonly : ''}`}
                        onClick={() => handleClick(rating)}
                        onMouseEnter={() => !readonly && setHoverValue(rating)}
                        onMouseLeave={() => !readonly && setHoverValue(null)}
                        whileHover={!readonly ? { scale: 1.2 } : {}}
                        whileTap={!readonly ? { scale: 0.9 } : {}}
                        disabled={readonly}
                        style={{ color: isFilled ? color : undefined }}
                    >
                        ★
                    </motion.button>
                );
            })}
        </div>
    );
}
