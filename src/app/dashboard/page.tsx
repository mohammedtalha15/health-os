'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import styles from './dashboard.module.css';

// Mock data - replace with actual API calls
const mockMetrics = [
    { name: 'Hemoglobin', value: 14.2, unit: 'g/dL', refLow: 13, refHigh: 17, status: 'normal', trend: 'up' },
    { name: 'Blood Sugar', value: 105, unit: 'mg/dL', refLow: 70, refHigh: 100, status: 'high', trend: 'up' },
    { name: 'Cholesterol', value: 185, unit: 'mg/dL', refLow: 0, refHigh: 200, status: 'normal', trend: 'down' },
    { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', refLow: 0, refHigh: 0, status: 'normal', trend: 'stable' },
];

const mockReports = [
    { id: 1, name: 'Complete Blood Count', date: '2024-12-01', type: 'CBC', status: 'processed' },
    { id: 2, name: 'Lipid Panel', date: '2024-11-28', type: 'Lipid', status: 'processed' },
    { id: 3, name: 'Thyroid Function', date: '2024-11-20', type: 'TFT', status: 'processed' },
];

const mockAlerts = [
    { id: 1, message: 'Blood Sugar slightly elevated', severity: 'warning', date: '2024-12-01' },
    { id: 2, message: 'All other metrics within normal range', severity: 'success', date: '2024-12-01' },
];

export default function DashboardPage() {
    return (
        <>
            <Header />
            <main className={styles.dashboard}>
                <div className="container">
                    <div className={styles.dashboardHeader}>
                        <div>
                            <h1 className="fade-in">Your Health Dashboard</h1>
                            <p className="fade-in">Track your health metrics and reports in one place</p>
                        </div>
                        <Link href="/upload" className="btn btn-primary">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Upload New Report
                        </Link>
                    </div>

                    {/* Alerts */}
                    {mockAlerts.length > 0 && (
                        <div className={styles.alertsSection}>
                            {mockAlerts.map(alert => (
                                <div key={alert.id} className={`${styles.alert} ${styles[alert.severity]}`}>
                                    <div className={styles.alertIcon}>
                                        {alert.severity === 'warning' ? (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path
                                                    d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <div className={styles.alertContent}>
                                        <div className={styles.alertMessage}>{alert.message}</div>
                                        <div className={styles.alertDate}>{alert.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Metrics Grid */}
                    <div className={styles.metricsSection}>
                        <h2>Latest Metrics</h2>
                        <div className="grid grid-4">
                            {mockMetrics.map((metric, index) => (
                                <div key={index} className={`card ${styles.metricCard}`}>
                                    <div className={styles.metricHeader}>
                                        <span className={styles.metricName}>{metric.name}</span>
                                        <span className={`badge badge-${metric.status === 'normal' ? 'success' : metric.status === 'high' ? 'warning' : 'danger'}`}>
                                            {metric.status}
                                        </span>
                                    </div>

                                    <div className={styles.metricValue}>
                                        {metric.value}
                                        <span className={styles.metricUnit}>{metric.unit}</span>
                                    </div>

                                    {metric.refLow > 0 && (
                                        <div className={styles.metricRange}>
                                            Reference: {metric.refLow} - {metric.refHigh} {metric.unit}
                                        </div>
                                    )}

                                    <div className={styles.metricTrend}>
                                        {metric.trend === 'up' && (
                                            <span className={styles.trendUp}>
                                                ↑ Trending up
                                            </span>
                                        )}
                                        {metric.trend === 'down' && (
                                            <span className={styles.trendDown}>
                                                ↓ Trending down
                                            </span>
                                        )}
                                        {metric.trend === 'stable' && (
                                            <span className={styles.trendStable}>
                                                → Stable
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Reports */}
                    <div className={styles.reportsSection}>
                        <div className={styles.sectionHeader}>
                            <h2>Recent Reports</h2>
                            <Link href="/timeline" className={styles.viewAllLink}>
                                View All →
                            </Link>
                        </div>

                        <div className={styles.reportsList}>
                            {mockReports.map(report => (
                                <Link key={report.id} href={`/reports/${report.id}`} className={styles.reportItem}>
                                    <div className={styles.reportIcon}>
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
                                    <div className={styles.reportInfo}>
                                        <div className={styles.reportName}>{report.name}</div>
                                        <div className={styles.reportMeta}>
                                            <span className={styles.reportType}>{report.type}</span>
                                            <span className={styles.reportDate}>{report.date}</span>
                                        </div>
                                    </div>
                                    <div className={styles.reportStatus}>
                                        <span className="badge badge-success">Processed</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
