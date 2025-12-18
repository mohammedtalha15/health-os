'use client';

import { motion } from 'framer-motion';
import styles from './Slider.module.css';
import { useState } from 'react';

interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    showValue?: boolean;
    disabled?: boolean;
    marks?: { value: number; label: string }[];
}

export default function Slider({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    showValue = true,
    disabled = false,
    marks,
}: SliderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className={styles.container}>
            {label && (
                <div className={styles.labelRow}>
                    <label className={styles.label}>{label}</label>
                    {showValue && <span className={styles.value}>{value}</span>}
                </div>
            )}
            <div className={styles.sliderWrapper}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    disabled={disabled}
                    className={styles.input}
                />
                <div className={styles.track}>
                    <motion.div
                        className={styles.fill}
                        style={{ width: `${percentage}%` }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                    <motion.div
                        className={`${styles.thumb} ${isDragging ? styles.thumbActive : ''}`}
                        style={{ left: `${percentage}%` }}
                        animate={{ left: `${percentage}%`, scale: isDragging ? 1.2 : 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                </div>
                {marks && (
                    <div className={styles.marks}>
                        {marks.map((mark) => {
                            const markPercentage = ((mark.value - min) / (max - min)) * 100;
                            return (
                                <div
                                    key={mark.value}
                                    className={styles.mark}
                                    style={{ left: `${markPercentage}%` }}
                                >
                                    <div className={styles.markDot} />
                                    <div className={styles.markLabel}>{mark.label}</div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
