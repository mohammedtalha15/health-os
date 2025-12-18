'use client';

import { motion } from 'framer-motion';
import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showFirstLast?: boolean;
    maxVisible?: number;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = true,
    maxVisible = 7,
}: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= maxVisible) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - 1, 1);
        const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftRange = Array.from({ length: 5 }, (_, i) => i + 1);
            return [...leftRange, '...', totalPages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightRange = Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
            return [1, '...', ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = [leftSiblingIndex, currentPage, rightSiblingIndex];
            return [1, '...', ...middleRange, '...', totalPages];
        }

        return pages;
    };

    return (
        <nav className={styles.pagination} aria-label="Pagination">
            {showFirstLast && (
                <button
                    className={styles.button}
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    aria-label="First page"
                >
                    «
                </button>
            )}

            <button
                className={styles.button}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                ‹
            </button>

            {getPageNumbers().map((page, index) => (
                <div key={index}>
                    {page === '...' ? (
                        <span className={styles.dots}>...</span>
                    ) : (
                        <motion.button
                            className={`${styles.button} ${page === currentPage ? styles.active : ''}`}
                            onClick={() => onPageChange(page as number)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {page}
                        </motion.button>
                    )}
                </div>
            ))}

            <button
                className={styles.button}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                ›
            </button>

            {showFirstLast && (
                <button
                    className={styles.button}
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    aria-label="Last page"
                >
                    »
                </button>
            )}
        </nav>
    );
}
