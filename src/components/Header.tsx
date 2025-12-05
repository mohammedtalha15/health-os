'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerContent}>
                    {/* Logo */}
                    <Link href="/" className={styles.logo}>
                        <div className={styles.logoIcon}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" fill="url(#logo-gradient)" />
                                <path d="M16 10V22M10 16H22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="logo-gradient" x1="4" y1="2" x2="28" y2="30">
                                        <stop offset="0%" stopColor="#2563eb" />
                                        <stop offset="100%" stopColor="#7c3aed" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <span className={styles.logoText}>Health OS</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className={styles.nav}>
                        <Link href="/#features" className={styles.navLink}>Features</Link>
                        <Link href="/#how-it-works" className={styles.navLink}>How It Works</Link>
                        <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
                        <Link href="/upload" className={styles.navLink}>Upload</Link>
                    </nav>

                    {/* CTA Buttons */}
                    <div className={styles.actions}>
                        <Link href="/login" className={styles.loginBtn}>Log In</Link>
                        <Link href="/signup" className="btn btn-primary">Get Started</Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={styles.menuToggle}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={isMenuOpen ? styles.menuIconOpen : ''}></span>
                        <span className={isMenuOpen ? styles.menuIconOpen : ''}></span>
                        <span className={isMenuOpen ? styles.menuIconOpen : ''}></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className={styles.mobileMenu}>
                        <Link href="/#features" className={styles.mobileLink}>Features</Link>
                        <Link href="/#how-it-works" className={styles.mobileLink}>How It Works</Link>
                        <Link href="/dashboard" className={styles.mobileLink}>Dashboard</Link>
                        <Link href="/upload" className={styles.mobileLink}>Upload</Link>
                        <div className={styles.mobileDivider}></div>
                        <Link href="/login" className={styles.mobileLink}>Log In</Link>
                        <Link href="/signup" className="btn btn-primary" style={{ width: '100%' }}>Get Started</Link>
                    </div>
                )}
            </div>
        </header>
    );
}
