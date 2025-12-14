'use client';

import { motion } from 'framer-motion';
import styles from './PricingSection.module.css';

interface PricingPlan {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular?: boolean;
    cta: string;
}

const plans: PricingPlan[] = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for individuals getting started',
        features: [
            'Upload up to 5 reports/month',
            'Basic AI insights',
            'Health timeline view',
            'Mobile app access',
            'Email support',
        ],
        cta: 'Get Started',
    },
    {
        name: 'Pro',
        price: '$12',
        period: 'per month',
        description: 'For health-conscious individuals',
        features: [
            'Unlimited report uploads',
            'Advanced AI analysis',
            'Trend detection & alerts',
            'Family profiles (up to 5)',
            'Emergency snapshot',
            'Priority support',
            'Export to PDF',
        ],
        popular: true,
        cta: 'Start Free Trial',
    },
    {
        name: 'Family',
        price: '$29',
        period: 'per month',
        description: 'For families and caregivers',
        features: [
            'Everything in Pro',
            'Unlimited family members',
            'Shared health insights',
            'Medication tracking',
            'Appointment reminders',
            'Dedicated account manager',
            'Custom integrations',
        ],
        cta: 'Contact Sales',
    },
];

export default function PricingSection() {
    return (
        <section className={styles.pricingSection}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Simple, Transparent Pricing
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Choose the plan that's right for you
                    </motion.p>
                </div>

                <div className={styles.pricingGrid}>
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            className={`${styles.pricingCard} ${plan.popular ? styles.popularCard : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8, boxShadow: 'var(--shadow-2xl)' }}
                        >
                            {plan.popular && (
                                <div className={styles.popularBadge}>Most Popular</div>
                            )}

                            <div className={styles.planHeader}>
                                <h3 className={styles.planName}>{plan.name}</h3>
                                <div className={styles.planPrice}>
                                    <span className={styles.price}>{plan.price}</span>
                                    <span className={styles.period}>/{plan.period}</span>
                                </div>
                                <p className={styles.planDescription}>{plan.description}</p>
                            </div>

                            <ul className={styles.featureList}>
                                {plan.features.map((feature, i) => (
                                    <li key={i} className={styles.feature}>
                                        <span className={styles.checkIcon}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <motion.button
                                className={`${styles.ctaButton} ${plan.popular ? styles.ctaButtonPrimary : ''}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {plan.cta}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    className={styles.pricingNote}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    All plans include 14-day free trial. No credit card required.
                </motion.p>
            </div>
        </section>
    );
}
