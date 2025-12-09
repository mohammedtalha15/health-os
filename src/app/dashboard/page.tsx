'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import HealthMetricCard from '@/components/HealthMetricCard';
import ProfileSwitcher from '@/components/ProfileSwitcher';
import EmergencySnapshot from '@/components/EmergencySnapshot';
import StatsCard from '@/components/StatsCard';
import ActivityFeed from '@/components/ActivityFeed';
import ProgressRing from '@/components/ProgressRing';
import styles from './dashboard.module.css';
import { animationPresets } from '@/lib/motion';

// Mock data - replace with actual API calls
const mockProfiles = [
    { id: 1, name: 'John Doe', age: 35, gender: 'Male', relation: 'Self' },
    { id: 2, name: 'Jane Doe', age: 32, gender: 'Female', relation: 'Spouse' },
    { id: 3, name: 'Tommy Doe', age: 8, gender: 'Male', relation: 'Son' },
];

const mockMetrics = [
    {
        metric: 'Hemoglobin',
        value: 14.2,
        unit: 'g/dL',
        refLow: 13,
        refHigh: 17,
        severity: 'green' as const,
        trend: 'up' as const,
        trendPercent: 5,
        date: '2024-12-01'
    },
    {
        metric: 'Blood Glucose',
        value: 105,
        unit: 'mg/dL',
        refLow: 70,
        refHigh: 100,
        severity: 'yellow' as const,
        trend: 'up' as const,
        trendPercent: 8,
        date: '2024-12-01'
    },
    {
        metric: 'Total Cholesterol',
        value: 185,
        unit: 'mg/dL',
        refLow: 125,
        refHigh: 200,
        severity: 'green' as const,
        trend: 'down' as const,
        trendPercent: 3,
        date: '2024-12-01'
    },
    {
        metric: 'TSH',
        value: 2.1,
        unit: 'mIU/L',
        refLow: 0.4,
        refHigh: 4.0,
        severity: 'green' as const,
        trend: 'stable' as const,
        date: '2024-12-01'
    },
];

const mockEmergencyData = {
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    bloodType: 'O+',
    allergies: [
        { name: 'Penicillin', severity: 'severe' as const },
        { name: 'Peanuts', severity: 'moderate' as const },
    ],
    medications: [
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
    ],
    criticalFlags: [
        { metric: 'Blood Glucose', value: 105, severity: 'red' as const },
    ],
    lastVitals: {
        heartRate: 72,
        bloodPressure: '120/80',
        temperature: 98.6,
    },
    emergencyContacts: [
        { name: 'Jane Doe', relation: 'Spouse', phone: '+1-555-0123' },
        { name: 'Dr. Smith', relation: 'Primary Care', phone: '+1-555-0456' },
    ],
};

const mockStats = [
    { title: 'Total Reports', value: '24', change: 12, icon: '📄', color: 'blue' as const },
    { title: 'Health Score', value: '87', change: 5, icon: '❤️', color: 'green' as const },
    { title: 'Appointments', value: '3', change: -2, icon: '📅', color: 'purple' as const },
    { title: 'Medications', value: '5', icon: '💊', color: 'orange' as const },
];

const mockActivities = [
    { id: 1, type: 'upload' as const, title: 'New Report Uploaded', description: 'Complete Blood Count report processed', time: '2 hours ago', icon: '📤' },
    { id: 2, type: 'alert' as const, title: 'Health Alert', description: 'Blood glucose slightly elevated', time: '5 hours ago', icon: '⚠️' },
    { id: 3, type: 'appointment' as const, title: 'Upcoming Appointment', description: 'Dr. Smith - Annual checkup', time: 'Tomorrow at 10:00 AM', icon: '🏥' },
    { id: 4, type: 'medication' as const, title: 'Medication Reminder', description: 'Take Metformin 500mg', time: '1 day ago', icon: '💊' },
];

export default function DashboardPage() {
    const [activeProfileId, setActiveProfileId] = useState(1);
    const [showEmergency, setShowEmergency] = useState(false);

    return (
        <>
            <Header />
            <main className={styles.dashboard}>
                <div className="container">
                    {/* Dashboard Header */}
                    <motion.div
                        className={styles.dashboardHeader}
                        initial="initial"
                        animate="animate"
                        variants={animationPresets.fadeInUp}
                    >
                        <div>
                            <h1>Your Health Dashboard</h1>
                            <p>Track your health metrics and reports in one place</p>
                        </div>
                        <div className={styles.headerActions}>
                            <motion.button
                                className={styles.emergencyBtn}
                                onClick={() => setShowEmergency(!showEmergency)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                ⚕️ Emergency Snapshot
                            </motion.button>
                            <Link href="/upload" className="btn btn-primary">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Upload Report
                            </Link>
                        </div>
                    </motion.div>

                    {/* Profile Switcher */}
                    <motion.div
                        className={styles.profileSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <ProfileSwitcher
                            profiles={mockProfiles}
                            activeProfileId={activeProfileId}
                            onSwitch={setActiveProfileId}
                            onAddProfile={() => alert('Add profile functionality')}
                        />
                    </motion.div>

                    {/* Emergency Snapshot Modal */}
                    {showEmergency && (
                        <motion.div
                            className={styles.emergencyModal}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowEmergency(false)}
                        >
                            <motion.div
                                className={styles.emergencyContent}
                                onClick={(e) => e.stopPropagation()}
                                initial={{ scale: 0.9, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                            >
                                <button
                                    className={styles.closeBtn}
                                    onClick={() => setShowEmergency(false)}
                                >
                                    ✕
                                </button>
                                <EmergencySnapshot
                                    data={mockEmergencyData}
                                    shareLink="https://healthos.app/emergency/abc123"
                                    expiresAt="2024-12-02T00:00:00Z"
                                />
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Health Metrics */}
                    <motion.div
                        className={styles.metricsSection}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2>Latest Metrics</h2>
                        <div className={styles.metricsGrid}>
                            {mockMetrics.map((metric, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                >
                                    <HealthMetricCard {...metric} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        className={styles.quickActions}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <h2>Quick Actions</h2>
                        <div className={styles.actionsGrid}>
                            <Link href="/timeline" className={styles.actionCard}>
                                <span className={styles.actionIcon}>📊</span>
                                <h3>View Timeline</h3>
                                <p>See your complete health history</p>
                            </Link>
                            <Link href="/upload" className={styles.actionCard}>
                                <span className={styles.actionIcon}>📤</span>
                                <h3>Upload Report</h3>
                                <p>Add a new medical report</p>
                            </Link>
                            <button
                                className={styles.actionCard}
                                onClick={() => setShowEmergency(true)}
                            >
                                <span className={styles.actionIcon}>⚕️</span>
                                <h3>Emergency Info</h3>
                                <p>Generate emergency snapshot</p>
                            </button>
                            <Link href="/reports" className={styles.actionCard}>
                                <span className={styles.actionIcon}>📄</span>
                                <h3>All Reports</h3>
                                <p>Browse all your reports</p>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
