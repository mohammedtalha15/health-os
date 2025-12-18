'use client';

import { motion } from 'framer-motion';
import styles from './Accordion.module.css';
import { useState } from 'react';

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
    icon?: string;
}

interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    defaultOpen?: string[];
}

export default function Accordion({ items, allowMultiple = false, defaultOpen = [] }: AccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

    const toggleItem = (id: string) => {
        if (allowMultiple) {
            setOpenItems((prev) =>
                prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
            );
        } else {
            setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
        }
    };

    return (
        <div className={styles.accordion}>
            {items.map((item) => {
                const isOpen = openItems.includes(item.id);
                return (
                    <div key={item.id} className={styles.item}>
                        <button
                            className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
                            onClick={() => toggleItem(item.id)}
                        >
                            {item.icon && <span className={styles.icon}>{item.icon}</span>}
                            <span className={styles.title}>{item.title}</span>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                className={styles.chevron}
                            >
                                <path
                                    d="M5 7.5L10 12.5L15 7.5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <motion.div
                            className={styles.content}
                            initial={false}
                            animate={{
                                height: isOpen ? 'auto' : 0,
                                opacity: isOpen ? 1 : 0,
                            }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <div className={styles.contentInner}>{item.content}</div>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
}
