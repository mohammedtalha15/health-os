'use client';

import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
    return (
        <section className={styles.hero}>
            <div className={styles.fluidBackground}>
                <div className={styles.orb1}></div>
                <div className={styles.orb2}></div>
                <div className={styles.orb3}></div>
            </div>

            <div className="container">
                <div className={styles.heroContent}>
                    <div className={styles.badge}>
                        <span className={styles.badgeDot}></span>
                        Your Health Clarity Engine
                    </div>

                    <h1 className={styles.title}>
                        Transform complex
                        <br />
                        <span className={styles.titleGradient}>medical reports</span>
                        <br />
                        into clear insights
                    </h1>

                    <p className={styles.subtitle}>
                        Upload any medical file and get AI-powered explanations, trend detection,
                        <br className={styles.desktopBreak} />
                        and health timeline visualization. No medical jargon. Just clarity.
                    </p>

                    <div className={styles.cta}>
                        <Link href="/upload" className="btn btn-primary btn-large">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Upload Your First Report
                        </Link>
                        <Link href="/#how-it-works" className="btn btn-secondary btn-large">
                            See How It Works
                        </Link>
                    </div>

                    <div className={styles.stats}>
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
                    </div>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <div className={styles.mouse}>
                    <div className={styles.wheel}></div>
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
}
