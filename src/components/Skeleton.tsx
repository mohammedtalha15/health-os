'use client';

import styles from './Skeleton.module.css';

interface SkeletonProps {
    variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
    width?: string | number;
    height?: string | number;
    className?: string;
}

export default function Skeleton({
    variant = 'text',
    width,
    height,
    className = ''
}: SkeletonProps) {
    const style: React.CSSProperties = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
    };

    return (
        <div
            className={`${styles.skeleton} ${styles[variant]} ${className}`}
            style={style}
            aria-busy="true"
            aria-live="polite"
        />
    );
}

// Preset skeleton components
export function SkeletonCard() {
    return (
        <div className={styles.skeletonCard}>
            <Skeleton variant="rectangular" height={200} />
            <div className={styles.skeletonContent}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="80%" height={16} />
                <Skeleton variant="text" width="40%" height={16} />
            </div>
        </div>
    );
}

export function SkeletonMetricCard() {
    return (
        <div className={styles.skeletonMetricCard}>
            <div className={styles.skeletonHeader}>
                <Skeleton variant="text" width="50%" height={20} />
                <Skeleton variant="circular" width={40} height={40} />
            </div>
            <Skeleton variant="text" width="70%" height={32} />
            <Skeleton variant="text" width="90%" height={16} />
        </div>
    );
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
    return <Skeleton variant="circular" width={size} height={size} />;
}
