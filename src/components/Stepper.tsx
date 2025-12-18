'use client';

import { motion } from 'framer-motion';
import styles from './Stepper.module.css';

interface Step {
    label: string;
    description?: string;
    icon?: string;
}

interface StepperProps {
    steps: Step[];
    currentStep: number;
    orientation?: 'horizontal' | 'vertical';
}

export default function Stepper({ steps, currentStep, orientation = 'horizontal' }: StepperProps) {
    return (
        <div className={`${styles.stepper} ${styles[orientation]}`}>
            {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isUpcoming = index > currentStep;

                return (
                    <div key={index} className={styles.stepWrapper}>
                        <div className={styles.step}>
                            <motion.div
                                className={`${styles.circle} ${isCompleted ? styles.completed : isCurrent ? styles.current : styles.upcoming
                                    }`}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {isCompleted ? (
                                    <span className={styles.checkmark}>✓</span>
                                ) : step.icon ? (
                                    <span className={styles.icon}>{step.icon}</span>
                                ) : (
                                    <span className={styles.number}>{index + 1}</span>
                                )}
                            </motion.div>
                            <div className={styles.content}>
                                <div className={styles.label}>{step.label}</div>
                                {step.description && (
                                    <div className={styles.description}>{step.description}</div>
                                )}
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`${styles.connector} ${isCompleted ? styles.connectorCompleted : ''}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
