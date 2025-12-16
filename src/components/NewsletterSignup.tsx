'use client';

import { motion } from 'framer-motion';
import styles from './NewsletterSignup.module.css';
import { useState } from 'react';

export default function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
    };

    return (
        <section className={styles.newsletterSection}>
            <div className="container">
                <motion.div
                    className={styles.newsletterCard}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.content}>
                        <h2 className={styles.title}>Stay Updated</h2>
                        <p className={styles.description}>
                            Get the latest health insights, tips, and product updates delivered to your inbox.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className={styles.input}
                                disabled={status === 'loading' || status === 'success'}
                            />
                            <motion.button
                                type="submit"
                                className={styles.submitButton}
                                disabled={status === 'loading' || status === 'success'}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Subscribe'}
                            </motion.button>
                        </div>

                        {status === 'success' && (
                            <motion.p
                                className={styles.successMessage}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                Thanks for subscribing! Check your inbox.
                            </motion.p>
                        )}
                    </form>

                    <p className={styles.privacy}>
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
