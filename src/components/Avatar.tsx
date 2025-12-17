'use client';

import { motion } from 'framer-motion';
import styles from './Avatar.module.css';

interface AvatarProps {
    src?: string;
    alt?: string;
    name?: string;
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    status?: 'online' | 'offline' | 'away' | 'busy';
    showStatus?: boolean;
}

export default function Avatar({
    src,
    alt,
    name,
    size = 'medium',
    status,
    showStatus = false,
}: AvatarProps) {
    const getInitials = (name?: string) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const statusColors = {
        online: '#10b981',
        offline: '#6b7280',
        away: '#f59e0b',
        busy: '#ef4444',
    };

    return (
        <div className={`${styles.avatar} ${styles[size]}`}>
            {src ? (
                <img src={src} alt={alt || name || 'Avatar'} className={styles.image} />
            ) : (
                <div className={styles.placeholder}>{getInitials(name)}</div>
            )}
            {showStatus && status && (
                <motion.div
                    className={styles.status}
                    style={{ backgroundColor: statusColors[status] }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                />
            )}
        </div>
    );
}
