'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import NotificationBell from './NotificationBell';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, isAuthenticated, signOut } = useAuth();
    const profileRef = useRef<HTMLDivElement>(null);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        if (isProfileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileOpen]);

    // Memoized handlers
    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const toggleProfile = useCallback(() => {
        setIsProfileOpen(prev => !prev);
    }, []);

    const handleSignOut = useCallback(() => {
        setIsProfileOpen(false);
        signOut();
    }, [signOut]);


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
                        {isAuthenticated && (
                            <>
                                <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
                                <Link href="/upload" className={styles.navLink}>Upload</Link>
                            </>
                        )}
                    </nav>

                    {/* CTA Buttons / User Profile */}
                    <div className={styles.actions}>
                        {isAuthenticated ? (
                            <>
                                <NotificationBell />
                                <div className={styles.userProfile} ref={profileRef}>
                                    <button
                                        className={styles.profileButton}
                                        onClick={toggleProfile}
                                    >
                                        {user?.image ? (
                                            <img src={user.image} alt={user.name || 'User'} className={styles.avatar} />
                                        ) : (
                                            <div className={styles.avatarPlaceholder}>
                                                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                        <span className={styles.userName}>{user?.name || user?.email}</span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.chevron}>
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    {isProfileOpen && (
                                        <div className={styles.profileDropdown}>
                                            <Link href="/dashboard" className={styles.dropdownItem}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M6 6H10M6 10H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                                Dashboard
                                            </Link>
                                            <Link href="/timeline" className={styles.dropdownItem}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M8 2V14M4 6L8 2L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Timeline
                                            </Link>
                                            <div className={styles.dropdownDivider}></div>
                                            <button onClick={handleSignOut} className={styles.dropdownItem}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6M11 11L14 8M14 8L11 5M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="btn btn-secondary">Log In</Link>
                                <Link href="/signup" className="btn btn-primary">Get Started</Link>
                            </>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className={styles.menuButton}
                            onClick={toggleMenu}
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
                            {isAuthenticated && (
                                <>
                                    <Link href="/dashboard" className={styles.mobileLink}>Dashboard</Link>
                                    <Link href="/upload" className={styles.mobileLink}>Upload</Link>
                                    <Link href="/timeline" className={styles.mobileLink}>Timeline</Link>
                                </>
                            )}
                            <div className={styles.mobileDivider}></div>
                            {isAuthenticated ? (
                                <>
                                    <div className={styles.mobileUserInfo}>
                                        {user?.image ? (
                                            <img src={user.image} alt={user.name || 'User'} className={styles.mobileAvatar} />
                                        ) : (
                                            <div className={styles.mobileAvatarPlaceholder}>
                                                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                        <span>{user?.name || user?.email}</span>
                                    </div>
                                    <button onClick={handleSignOut} className={styles.mobileLink} style={{ width: '100%', textAlign: 'left' }}>
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className={styles.mobileLink}>Log In</Link>
                                    <Link href="/signup" className="btn btn-primary" style={{ width: '100%' }}>Get Started</Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
