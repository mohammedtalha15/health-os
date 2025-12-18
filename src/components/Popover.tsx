'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styles from './Popover.module.css';
import { useState, useRef, useEffect } from 'react';

interface PopoverProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    closeOnClick?: boolean;
}

export default function Popover({
    trigger,
    content,
    position = 'bottom',
    closeOnClick = true,
}: PopoverProps) {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={styles.popover} ref={popoverRef}>
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`${styles.content} ${styles[position]}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => closeOnClick && setIsOpen(false)}
                    >
                        {content}
                        <div className={styles.arrow} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
