import styles from './LoadingSkeleton.module.css';

interface LoadingSkeletonProps {
    variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
    width?: string | number;
    height?: string | number;
    count?: number;
    className?: string;
}

/**
 * Loading Skeleton Component
 * Displays animated placeholder while content is loading
 */
export function LoadingSkeleton({
    variant = 'text',
    width,
    height,
    count = 1,
    className = '',
}: LoadingSkeletonProps) {
    const skeletonStyle: React.CSSProperties = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
    };

    const skeletons = Array.from({ length: count }, (_, index) => (
        <div
            key={index}
            className={`${styles.skeleton} ${styles[variant]} ${className}`}
            style={skeletonStyle}
        />
    ));

    return <>{skeletons}</>;
}
