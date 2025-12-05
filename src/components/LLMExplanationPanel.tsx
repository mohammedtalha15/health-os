'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from './LLMExplanationPanel.module.css';

type ExplanationStyle = 'basic' | 'normal' | 'doctor';

interface LLMExplanationPanelProps {
    explanations: {
        basic: string;
        normal: string;
        doctor: string;
    };
    provenance?: Array<{ rule_id: string; confidence: number }>;
    llmVersion?: string;
}

export default function LLMExplanationPanel({
    explanations,
    provenance,
    llmVersion
}: LLMExplanationPanelProps) {
    const [activeStyle, setActiveStyle] = useState<ExplanationStyle>('normal');

    const tabs: Array<{ key: ExplanationStyle; label: string; icon: string }> = [
        { key: 'basic', label: 'Simple', icon: '👤' },
        { key: 'normal', label: 'Normal', icon: '📖' },
        { key: 'doctor', label: 'Technical', icon: '⚕️' }
    ];

    return (
        <div className={styles.container}>
            {/* Tab Navigation */}
            <div className={styles.tabs}>
                {tabs.map((tab) => (
                    <motion.button
                        key={tab.key}
                        className={`${styles.tab} ${activeStyle === tab.key ? styles.active : ''}`}
                        onClick={() => setActiveStyle(tab.key)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className={styles.tabIcon}>{tab.icon}</span>
                        {tab.label}
                    </motion.button>
                ))}
            </div>

            {/* Explanation Content */}
            <div className={styles.content}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStyle}
                        className={styles.explanation}
                        initial={{ opacity: 0, rotateY: -10, x: -20 }}
                        animate={{ opacity: 1, rotateY: 0, x: 0 }}
                        exit={{ opacity: 0, rotateY: 10, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.explanationText}>
                            {explanations[activeStyle]}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Provenance Panel */}
            {provenance && provenance.length > 0 && (
                <motion.div
                    className={styles.provenance}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h4>📊 Source Information</h4>
                    <div className={styles.provenanceList}>
                        {provenance.map((item, index) => (
                            <div key={index} className={styles.provenanceItem}>
                                <span className={styles.ruleId}>Rule: {item.rule_id}</span>
                                <div className={styles.confidenceBar}>
                                    <motion.div
                                        className={styles.confidenceFill}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.confidence}%` }}
                                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                    />
                                </div>
                                <span className={styles.confidenceText}>{item.confidence}%</span>
                            </div>
                        ))}
                    </div>
                    {llmVersion && (
                        <div className={styles.versionInfo}>
                            Model: {llmVersion}
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}
