'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from './NotificationBell.module.css';

interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'info' | 'warning' | 'success';
}

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: 1, title: 'New Report Ready', message: 'Your blood test results are available', time: '5m ago', read: false, type: 'success' },
        { id: 2, title: 'Appointment Reminder', message: 'Dr. Smith tomorrow at 10 AM', time: '1h ago', read: false, type: 'info' },
        { id: 3, title: 'Health Alert', message: 'Blood pressure slightly elevated', time: '3h ago', read: true, type: 'warning' },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    return (
        <div className={styles.container}>
            <motion.button
                className={styles.bellButton}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                🔔
                {unreadCount > 0 && (
                    <motion.span
                        className={styles.badge}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        {unreadCount}
                    </motion.span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.dropdown}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={styles.header}>
                            <h3>Notifications</h3>
                            <button className={styles.markAllRead}>Mark all read</button>
                        </div>

                        <div className={styles.list}>
                            {notifications.map((notif) => (
                                <motion.div
                                    key={notif.id}
                                    className={`${styles.notification} ${!notif.read ? styles.unread : ''}`}
                                    onClick={() => markAsRead(notif.id)}
                                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                >
                                    <div className={`${styles.indicator} ${styles[notif.type]}`} />
                                    <div className={styles.content}>
                                        <h4>{notif.title}</h4>
                                        <p>{notif.message}</p>
                                        <span className={styles.time}>{notif.time}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className={styles.footer}>
                            <button className={styles.viewAll}>View All Notifications</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
