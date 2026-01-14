'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

interface ToastProps {
    toast: ToastMessage;
    onClose: (id: string) => void;
}

function Toast({ toast, onClose }: ToastProps) {
    const [progress, setProgress] = useState(100);
    const [isPaused, setIsPaused] = useState(false);
    const duration = toast.duration || 5000;

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev - (100 / (duration / 100));
                if (newProgress <= 0) {
                    clearInterval(interval);
                    onClose(toast.id);
                    return 0;
                }
                return newProgress;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [toast.id, duration, onClose, isPaused]);

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
    };

    return (
        <motion.div
            className={`${styles.toast} ${styles[toast.type]}`}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className={styles.toastIcon}>
                {icons[toast.type]}
            </div>
            <div className={styles.toastContent}>
                <div className={styles.toastTitle}>{toast.title}</div>
                {toast.message && <div className={styles.toastMessage}>{toast.message}</div>}
            </div>
            <button
                className={styles.toastClose}
                onClick={() => onClose(toast.id)}
                aria-label="Close notification"
            >
                ✕
            </button>
            <div className={styles.toastProgress}>
                <div
                    className={styles.toastProgressBar}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </motion.div>
    );
}

interface ToastContainerProps {
    toasts: ToastMessage[];
    onClose: (id: string) => void;
}

export default function ToastContainer({ toasts, onClose }: ToastContainerProps) {
    return (
        <div className={styles.toastContainer}>
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <Toast key={toast.id} toast={toast} onClose={onClose} />
                ))}
            </AnimatePresence>
        </div>
    );
}

// Hook for managing toasts
export function useToast() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = (toast: Omit<ToastMessage, 'id'>) => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { ...toast, id }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const success = (title: string, message?: string) => {
        addToast({ type: 'success', title, message });
    };

    const error = (title: string, message?: string) => {
        addToast({ type: 'error', title, message });
    };

    const warning = (title: string, message?: string) => {
        addToast({ type: 'warning', title, message });
    };

    const info = (title: string, message?: string) => {
        addToast({ type: 'info', title, message });
    };

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
    };
}
