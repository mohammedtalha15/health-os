'use client';

import { motion } from 'framer-motion';
import styles from './Tabs.module.css';
import { useState } from 'react';

interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
    icon?: string;
}

interface TabsProps {
    tabs: Tab[];
    defaultTab?: string;
    variant?: 'default' | 'pills' | 'underline';
}

export default function Tabs({ tabs, defaultTab, variant = 'default' }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

    return (
        <div className={styles.container}>
            <div className={`${styles.tabList} ${styles[variant]}`}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon && <span className={styles.icon}>{tab.icon}</span>}
                        {tab.label}
                        {activeTab === tab.id && variant === 'underline' && (
                            <motion.div
                                className={styles.activeIndicator}
                                layoutId="activeTab"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>
            <motion.div
                key={activeTab}
                className={styles.tabContent}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                {activeTabContent}
            </motion.div>
        </div>
    );
}
