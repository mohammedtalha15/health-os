'use client';

import { motion } from 'framer-motion';
import styles from './Breadcrumb.module.css';
import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol className={styles.list}>
                {items.map((item, index) => (
                    <li key={index} className={styles.item}>
                        {item.href && index < items.length - 1 ? (
                            <Link href={item.href} className={styles.link}>
                                {item.label}
                            </Link>
                        ) : (
                            <span className={styles.current}>{item.label}</span>
                        )}
                        {index < items.length - 1 && (
                            <span className={styles.separator}>/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
