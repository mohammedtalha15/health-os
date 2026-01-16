'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './ProfileSwitcher.module.css';
import { animationPresets } from '@/lib/motion';

interface Profile {
    id: number;
    name: string;
    age: number;
    gender: string;
    relation: string;
    avatar?: string;
}

interface ProfileSwitcherProps {
    profiles: Profile[];
    activeProfileId: number;
    onSwitch: (profileId: number) => void;
    onAddProfile: () => void;
}

export default function ProfileSwitcher({
    profiles,
    activeProfileId,
    onSwitch,
    onAddProfile
}: ProfileSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false);

    const activeProfile = profiles.find(p => p.id === activeProfileId);

    return (
        <div className={styles.container}>
            <motion.button
                className={styles.activeProfile}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Switch profile"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <div className={styles.avatar}>
                    {activeProfile?.avatar ? (
                        <img src={activeProfile.avatar} alt={activeProfile.name} />
                    ) : (
                        <span>{activeProfile?.name.charAt(0)}</span>
                    )}
                </div>
                <div className={styles.profileInfo}>
                    <span className={styles.name}>{activeProfile?.name}</span>
                    <span className={styles.relation}>{activeProfile?.relation}</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.chevron}>
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.button>

            {isOpen && (
                <motion.div
                    className={styles.dropdown}
                    initial={animationPresets.scaleIn.initial}
                    animate={animationPresets.scaleIn.animate}
                    exit={animationPresets.scaleIn.exit}
                >
                    {profiles.map((profile, index) => (
                        <motion.button
                            key={profile.id}
                            className={`${styles.profileCard} ${profile.id === activeProfileId ? styles.active : ''}`}
                            onClick={() => {
                                onSwitch(profile.id);
                                setIsOpen(false);
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                        >
                            <div className={styles.avatar}>
                                {profile.avatar ? (
                                    <img src={profile.avatar} alt={profile.name} />
                                ) : (
                                    <span>{profile.name.charAt(0)}</span>
                                )}
                            </div>
                            <div className={styles.profileInfo}>
                                <span className={styles.name}>{profile.name}</span>
                                <span className={styles.details}>{profile.age} years • {profile.gender}</span>
                            </div>
                            {profile.id === activeProfileId && (
                                <span className={styles.checkmark}>✓</span>
                            )}
                        </motion.button>
                    ))}

                    <motion.button
                        className={styles.addProfile}
                        onClick={() => {
                            onAddProfile();
                            setIsOpen(false);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className={styles.addIcon}>+</span>
                        Add Family Member
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}
