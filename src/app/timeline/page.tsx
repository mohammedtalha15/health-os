'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import styles from './timeline.module.css';

// Mock timeline data
const mockTimelineEvents = [
    {
        id: 1,
        date: '2024-12-01',
        type: 'report',
        title: 'Complete Blood Count',
        reportType: 'CBC',
        summary: 'All values within normal range except slightly elevated blood sugar.',
        metrics: [
            { name: 'Hemoglobin', value: 14.2, status: 'normal' },
            { name: 'WBC Count', value: 7500, status: 'normal' },
            { name: 'Platelets', value: 250000, status: 'normal' },
        ],
    },
    {
        id: 2,
        date: '2024-11-28',
        type: 'report',
        title: 'Lipid Panel',
        reportType: 'Lipid',
        summary: 'Cholesterol levels are good. Continue healthy lifestyle.',
        metrics: [
            { name: 'Total Cholesterol', value: 185, status: 'normal' },
            { name: 'LDL', value: 110, status: 'normal' },
            { name: 'HDL', value: 55, status: 'normal' },
        ],
    },
    {
        id: 3,
        date: '2024-11-20',
        type: 'report',
        title: 'Thyroid Function Test',
        reportType: 'TFT',
        summary: 'Thyroid function is normal.',
        metrics: [
            { name: 'TSH', value: 2.5, status: 'normal' },
            { name: 'T3', value: 1.2, status: 'normal' },
            { name: 'T4', value: 8.5, status: 'normal' },
        ],
    },
];

export default function TimelinePage() {
    return (
        <>
            <Header />
            <main className={styles.timelinePage}>
                <div className="container container-narrow">
                    <div className={styles.timelineHeader}>
                        <h1 className="fade-in">Your Health Timeline</h1>
                        <p className="fade-in">
                            Track your complete health history in chronological order
                        </p>
                    </div>

                    <div className={styles.timelineFilters}>
                        <select className={styles.filterSelect}>
                            <option value="all">All Reports</option>
                            <option value="cbc">Blood Count (CBC)</option>
                            <option value="lipid">Lipid Panel</option>
                            <option value="tft">Thyroid Function</option>
                            <option value="kidney">Kidney Function</option>
                        </select>

                        <select className={styles.filterSelect}>
                            <option value="all">All Time</option>
                            <option value="week">Last Week</option>
                            <option value="month">Last Month</option>
                            <option value="3months">Last 3 Months</option>
                            <option value="year">Last Year</option>
                        </select>
                    </div>

                    <div className={styles.timeline}>
                        {mockTimelineEvents.map((event, index) => (
                            <div key={event.id} className={styles.timelineItem}>
                                <div className={styles.timelineDot}></div>
                                <div className={styles.timelineLine}></div>

                                <div className={styles.timelineCard}>
                                    <div className={styles.timelineDate}>{event.date}</div>

                                    <Link href={`/reports/${event.id}`} className={styles.timelineContent}>
                                        <div className={styles.timelineTitle}>
                                            <div className={styles.reportTypeIcon}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3>{event.title}</h3>
                                                <span className={styles.reportType}>{event.reportType}</span>
                                            </div>
                                        </div>

                                        <p className={styles.timelineSummary}>{event.summary}</p>

                                        <div className={styles.metricsPreview}>
                                            {event.metrics.map((metric, idx) => (
                                                <div key={idx} className={styles.metricChip}>
                                                    <span className={styles.metricName}>{metric.name}:</span>
                                                    <span className={styles.metricValue}>{metric.value}</span>
                                                    <span className={`${styles.metricStatus} ${styles[metric.status]}`}>●</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className={styles.viewDetails}>
                                            View Full Report →
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
