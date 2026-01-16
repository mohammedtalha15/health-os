'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './EmergencySnapshot.module.css';
import { animationPresets } from '@/lib/motion';

interface EmergencySnapshotProps {
    data: {
        name: string;
        age: number;
        gender: string;
        bloodType?: string;
        allergies: Array<{ name: string; severity: 'mild' | 'moderate' | 'severe' }>;
        medications: Array<{ name: string; dosage: string; frequency: string }>;
        criticalFlags: Array<{ metric: string; value: number; severity: 'red' }>;
        lastVitals?: { heartRate?: number; bloodPressure?: string; temperature?: number };
        emergencyContacts: Array<{ name: string; relation: string; phone: string }>;
    };
    shareLink?: string;
    expiresAt?: string;
}

export default function EmergencySnapshot({ data, shareLink, expiresAt }: EmergencySnapshotProps) {
    const [showQR, setShowQR] = useState(false);

    const severityColors = {
        mild: '#10b981',
        moderate: '#f59e0b',
        severe: '#ef4444',
    };

    return (
        <motion.div
            className={styles.container}
            initial={animationPresets.fadeInUp.initial}
            animate={animationPresets.fadeInUp.animate}
        // exit prop omitted as not needed for static page
        >
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <motion.div
                        className={styles.emergencyBadge}
                        animate={{
                            boxShadow: [
                                '0 0 20px rgba(239, 68, 68, 0.3)',
                                '0 0 40px rgba(239, 68, 68, 0.6)',
                                '0 0 20px rgba(239, 68, 68, 0.3)',
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className={styles.emergencyIcon}>⚕</span>
                        EMERGENCY SNAPSHOT
                    </motion.div>
                    <h1>{data.name}</h1>
                    <div className={styles.basicInfo}>
                        <span>{data.age} years</span>
                        <span>•</span>
                        <span>{data.gender}</span>
                        {data.bloodType && (
                            <>
                                <span>•</span>
                                <span className={styles.bloodType}>{data.bloodType}</span>
                            </>
                        )}
                    </div>
                </div>

                {shareLink && (
                    <motion.button
                        className={styles.qrButton}
                        onClick={() => setShowQR(!showQR)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {showQR ? 'Hide QR' : 'Show QR Code'}
                    </motion.button>
                )}
            </div>

            {/* QR Code Modal */}
            <AnimatePresence>
                {showQR && shareLink && (
                    <motion.div
                        className={styles.qrModal}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div className={styles.qrContent}>
                            <h3>Scan to Access Emergency Info</h3>
                            <div className={styles.qrCode}>
                                <QRCodeSVG value={shareLink} size={200} level="H" />
                            </div>
                            <p className={styles.qrLink}>{shareLink}</p>
                            {expiresAt && (
                                <p className={styles.expiresText}>
                                    Expires: {new Date(expiresAt).toLocaleString()}
                                </p>
                            )}
                            <button onClick={() => setShowQR(false)} className={styles.closeQR}>
                                Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Critical Alerts */}
            {data.criticalFlags.length > 0 && (
                <motion.div
                    className={styles.criticalSection}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.criticalIcon}>!</span>
                        Critical Alerts
                    </h2>
                    <div className={styles.criticalGrid}>
                        {data.criticalFlags.map((flag, index) => (
                            <motion.div
                                key={index}
                                className={styles.criticalCard}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <span className={styles.criticalMetric}>{flag.metric}</span>
                                <span className={styles.criticalValue}>{flag.value}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Allergies */}
            {data.allergies.length > 0 && (
                <motion.div
                    className={styles.section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className={styles.sectionTitle}>⚠ Allergies</h2>
                    <div className={styles.allergyList}>
                        {data.allergies.map((allergy, index) => (
                            <motion.div
                                key={index}
                                className={styles.allergyItem}
                                style={{
                                    borderColor: severityColors[allergy.severity],
                                    backgroundColor: `${severityColors[allergy.severity]}20`,
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.05 }}
                            >
                                <span className={styles.allergyName}>{allergy.name}</span>
                                <span
                                    className={styles.allergySeverity}
                                    style={{ color: severityColors[allergy.severity] }}
                                >
                                    {allergy.severity}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Current Medications */}
            {data.medications.length > 0 && (
                <motion.div
                    className={styles.section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2 className={styles.sectionTitle}>💊 Current Medications</h2>
                    <div className={styles.medicationList}>
                        {data.medications.map((med, index) => (
                            <motion.div
                                key={index}
                                className={styles.medicationItem}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + index * 0.05 }}
                            >
                                <div className={styles.medName}>{med.name}</div>
                                <div className={styles.medDetails}>
                                    {med.dosage} • {med.frequency}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Last Vitals */}
            {data.lastVitals && Object.keys(data.lastVitals).length > 0 && (
                <motion.div
                    className={styles.section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <h2 className={styles.sectionTitle}>📊 Last Vitals</h2>
                    <div className={styles.vitalsGrid}>
                        {data.lastVitals.heartRate && (
                            <div className={styles.vitalCard}>
                                <span className={styles.vitalLabel}>Heart Rate</span>
                                <span className={styles.vitalValue}>{data.lastVitals.heartRate} bpm</span>
                            </div>
                        )}
                        {data.lastVitals.bloodPressure && (
                            <div className={styles.vitalCard}>
                                <span className={styles.vitalLabel}>Blood Pressure</span>
                                <span className={styles.vitalValue}>{data.lastVitals.bloodPressure}</span>
                            </div>
                        )}
                        {data.lastVitals.temperature && (
                            <div className={styles.vitalCard}>
                                <span className={styles.vitalLabel}>Temperature</span>
                                <span className={styles.vitalValue}>{data.lastVitals.temperature}°F</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Emergency Contacts */}
            <motion.div
                className={styles.section}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
            >
                <h2 className={styles.sectionTitle}>📞 Emergency Contacts</h2>
                <div className={styles.contactList}>
                    {data.emergencyContacts.map((contact, index) => (
                        <motion.div
                            key={index}
                            className={styles.contactItem}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 + index * 0.05 }}
                        >
                            <div className={styles.contactInfo}>
                                <span className={styles.contactName}>{contact.name}</span>
                                <span className={styles.contactRelation}>{contact.relation}</span>
                            </div>
                            <a href={`tel:${contact.phone}`} className={styles.contactPhone}>
                                {contact.phone}
                            </a>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Footer */}
            <div className={styles.footer}>
                <p>Generated by Health OS • For Emergency Use Only</p>
                {expiresAt && <p>Valid until: {new Date(expiresAt).toLocaleString()}</p>}
            </div>
        </motion.div>
    );
}
