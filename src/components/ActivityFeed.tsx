'use client';

import { motion } from 'framer-motion';
import styles from './ActivityFeed.module.css';

interface Activity {
    id: number;
    type: 'upload' | 'alert' | 'appointment' | 'medication';
    title: string;
    description: string;
    time: string;
    icon: string;
}

interface ActivityFeedProps {
    activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
    const getActivityColor = (type: Activity['type']) => {
        const colors = {
            upload: '#2563eb',
            alert: '#ef4444',
            appointment: '#10b981',
            medication: '#7c3aed'
        };
        return colors[type];
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Recent Activity</h3>

            <div className={styles.feed}>
                {activities.map((activity, index) => (
                    <motion.div
                        key={activity.id}
                        className={styles.activityItem}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                    >
                        <div
                            className={styles.iconWrapper}
                            style={{ backgroundColor: `${getActivityColor(activity.type)}20` }}
                        >
                            <span style={{ color: getActivityColor(activity.type) }}>
                                {activity.icon}
                            </span>
                        </div>

                        <div className={styles.content}>
                            <h4>{activity.title}</h4>
                            <p>{activity.description}</p>
                            <span className={styles.time}>{activity.time}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
