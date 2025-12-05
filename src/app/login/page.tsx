'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);

        // Simulate login process (replace with actual API call)
        setTimeout(() => {
            setLoading(false);
            // Redirect to dashboard after successful login
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.fluidBackground}>
                <div className={styles.orb1}></div>
                <div className={styles.orb2}></div>
                <div className={styles.orb3}></div>
            </div>

            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <Link href="/" className={styles.backButton}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M15 10H5M5 10L10 15M5 10L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Home
                    </Link>

                    <div className={styles.header}>
                        <div className={styles.logo}>Health OS</div>
                        <h1>Welcome back</h1>
                        <p>Sign in to continue your health journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {error && (
                            <div className={styles.errorMessage}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
                                    <path d="M10 6V10M10 14V14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                disabled={loading}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                disabled={loading}
                            />
                            <Link href="/forgot-password" className={styles.forgotPassword}>
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className={styles.spinner}></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        <div className={styles.divider}>
                            <span>or continue with</span>
                        </div>

                        <div className={styles.socialButtons}>
                            <button type="button" className={styles.socialButton} disabled={loading}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M18.1713 8.36788H17.5V8.33329H10V11.6666H14.7096C14.0225 13.6071 12.1763 15 10 15C7.23875 15 5 12.7612 5 9.99996C5 7.23871 7.23875 4.99996 10 4.99996C11.2746 4.99996 12.4342 5.48079 13.3171 6.26621L15.6742 3.90913C14.1858 2.52204 12.195 1.66663 10 1.66663C5.39792 1.66663 1.66667 5.39788 1.66667 9.99996C1.66667 14.602 5.39792 18.3333 10 18.3333C14.6021 18.3333 18.3333 14.602 18.3333 9.99996C18.3333 9.44121 18.2758 8.89579 18.1713 8.36788Z" fill="#FFC107" />
                                    <path d="M2.6275 6.12121L5.36542 8.12913C6.10625 6.29496 7.90042 4.99996 10 4.99996C11.2746 4.99996 12.4342 5.48079 13.3171 6.26621L15.6742 3.90913C14.1858 2.52204 12.195 1.66663 10 1.66663C6.79917 1.66663 4.02334 3.47371 2.6275 6.12121Z" fill="#FF3D00" />
                                    <path d="M10 18.3333C12.1525 18.3333 14.1083 17.5095 15.5871 16.17L13.0079 13.9875C12.1431 14.6452 11.0864 15.0009 10 15C7.83255 15 5.99213 13.6179 5.29880 11.6891L2.58047 13.783C3.96047 16.4816 6.7613 18.3333 10 18.3333Z" fill="#4CAF50" />
                                    <path d="M18.1713 8.36796H17.5V8.33337H10V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.9879L13.0079 13.9871L15.5871 16.1696C15.4046 16.3355 18.3333 14.1667 18.3333 10C18.3333 9.44129 18.2758 8.89587 18.1713 8.36796Z" fill="#1976D2" />
                                </svg>
                                Google
                            </button>
                            <button type="button" className={styles.socialButton} disabled={loading}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 1.66663C5.40002 1.66663 1.66669 5.39996 1.66669 9.99996C1.66669 13.9 4.43335 17.2166 8.10002 18.1666V12.5H6.25002V9.99996H8.10002V8.12496C8.10002 6.29163 9.29169 5.20829 10.9584 5.20829C11.7584 5.20829 12.6 5.35413 12.6 5.35413V7.14996H11.6667C10.75 7.14996 10.4334 7.71663 10.4334 8.29996V9.99996H12.5084L12.15 12.5H10.4334V18.1666C14.1 17.2166 16.8667 13.9 16.8667 9.99996C16.8667 5.39996 13.1334 1.66663 10 1.66663Z" fill="#1877F2" />
                                </svg>
                                Facebook
                            </button>
                        </div>

                        <p className={styles.signupLink}>
                            Don't have an account? <Link href="/signup">Sign up</Link>
                        </p>
                    </form>
                </div>

                <div className={styles.features}>
                    <div className={styles.welcomeBack}>
                        <h2>Continue Your Health Journey</h2>
                        <p>Access your personalized health dashboard and track your progress over time.</p>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>✓</div>
                        <div>
                            <h3>Your Health Timeline</h3>
                            <p>All your medical reports in one place</p>
                        </div>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>✓</div>
                        <div>
                            <h3>AI Insights</h3>
                            <p>Understand your health data better</p>
                        </div>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>✓</div>
                        <div>
                            <h3>Trend Analysis</h3>
                            <p>Track changes in your health metrics</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
