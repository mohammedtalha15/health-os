'use client';

import styles from './Sparkline.module.css';

interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
    fillColor?: string;
    showDots?: boolean;
}

export default function Sparkline({
    data,
    width = 120,
    height = 40,
    color = '#3b82f6',
    fillColor = 'rgba(59, 130, 246, 0.1)',
    showDots = false,
}: SparklineProps) {
    if (!data || data.length === 0) return null;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    // Generate SVG path
    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return { x, y };
    });

    const pathD = points.reduce((path, point, index) => {
        if (index === 0) {
            return `M ${point.x},${point.y}`;
        }
        return `${path} L ${point.x},${point.y}`;
    }, '');

    const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

    return (
        <svg
            width={width}
            height={height}
            className={styles.sparkline}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
        >
            {/* Fill area */}
            <path d={areaD} fill={fillColor} />

            {/* Line */}
            <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Dots */}
            {showDots &&
                points.map((point, index) => (
                    <circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r="2"
                        fill={color}
                        className={styles.dot}
                    />
                ))}
        </svg>
    );
}
