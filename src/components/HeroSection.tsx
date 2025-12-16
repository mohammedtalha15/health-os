'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import styles from './HeroSection.module.css';

export default function HeroSection() {
    return (
        <section className={styles.hero}>
            <ParticleBackground />

            <div className={styles.fluidBackground}>
                <div className={styles.orb1}></div>
                <div className={styles.orb2}></div>
                <div className={styles.orb3}></div>
            </div>

            <div className="container">
                <div className={styles.heroContent}>
                    <motion.div
                        className={styles.badge}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className={styles.badgeDot}></span>
                        Your Health Clarity Engine
                    </motion.div>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Understand Your
                        <br />
                        <span className={styles.titleGradient}>Health Data</span>
                        <br />
                        Like Never Before
                    </motion.h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Transform complex medical reports into clear, actionable insights with AI.
                        <br className={styles.desktopBreak} />
                        Upload any report and get instant explanations in plain language.
                    </motion.p>

                    <motion.div
                        className={styles.cta}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Link href="/signup" className="btn btn-primary btn-large">
                            <span>Get Started Free</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link href="/#how-it-works" className="btn btn-secondary btn-large">
                            <span>See How It Works</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        className={styles.stats}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <div className={styles.stat}>
                            <div className={styles.statValue}>10K+</div>
                            <div className={styles.statLabel}>Reports Analyzed</div>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <div className={styles.statValue}>98%</div>
                            <div className={styles.statLabel}>Accuracy Rate</div>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <div className={styles.statValue}>5K+</div>
                            <div className={styles.statLabel}>Happy Users</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
            >
                <div className={styles.mouse}>
                    <div className={styles.wheel}></div>
                </div>
                <span>Scroll to explore</span>
            </motion.div>
        </section>
    );
}
