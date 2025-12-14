'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FAQAccordion.module.css';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqs: FAQItem[] = [
    {
        category: 'General',
        question: 'What is Health OS?',
        answer: 'Health OS is an AI-powered platform that helps you understand your medical reports. Upload any lab report, prescription, or medical document, and get clear explanations in plain language.',
    },
    {
        category: 'General',
        question: 'Is my health data secure?',
        answer: 'Absolutely. We use bank-level encryption (AES-256) to protect your data. Your information is never shared with third parties, and you have full control over your data.',
    },
    {
        category: 'Features',
        question: 'What types of reports can I upload?',
        answer: 'You can upload any medical document including lab reports, blood tests, prescriptions, discharge summaries, imaging reports, and even photos of paper reports. Our AI can extract and analyze data from various formats.',
    },
    {
        category: 'Features',
        question: 'How does the AI analysis work?',
        answer: 'Our AI uses advanced machine learning models trained on medical literature and guidelines. It extracts values from your reports, compares them to reference ranges, and provides explanations based on medical knowledge.',
    },
    {
        category: 'Pricing',
        question: 'Can I try Health OS for free?',
        answer: 'Yes! We offer a free plan that includes 5 report uploads per month. You can also start a 14-day free trial of our Pro plan with no credit card required.',
    },
    {
        category: 'Pricing',
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your data will remain accessible even after cancellation.',
    },
    {
        category: 'Technical',
        question: 'Do you have a mobile app?',
        answer: 'Yes! Health OS is available on iOS and Android. You can also access it from any web browser on desktop or mobile.',
    },
    {
        category: 'Technical',
        question: 'Can I share my reports with my doctor?',
        answer: 'Yes! You can generate a secure shareable link or export your reports as PDF. The emergency snapshot feature creates a QR code that medical professionals can scan for instant access.',
    },
];

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFAQs = faqs.filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className={styles.faqSection}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Everything you need to know about Health OS
                    </motion.p>
                </div>

                <motion.div
                    className={styles.searchBox}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <span className={styles.searchIcon}>🔍</span>
                </motion.div>

                <div className={styles.faqList}>
                    {filteredFAQs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className={styles.faqItem}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <button
                                className={`${styles.faqQuestion} ${openIndex === index ? styles.faqQuestionOpen : ''}`}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className={styles.questionText}>{faq.question}</span>
                                <span className={styles.faqIcon}>{openIndex === index ? '−' : '+'}</span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        className={styles.faqAnswer}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {filteredFAQs.length === 0 && (
                    <motion.p
                        className={styles.noResults}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        No questions found. Try a different search term.
                    </motion.p>
                )}
            </div>
        </section>
    );
}
