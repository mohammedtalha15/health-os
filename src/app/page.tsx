import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import PricingSection from '@/components/PricingSection';
import FAQAccordion from '@/components/FAQAccordion';
import NewsletterSignup from '@/components/NewsletterSignup';
import styles from './page.module.css';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />

                {/* Features Section */}
                <section id="features" className={styles.features}>
                    <div className="container">
                        <div className={styles.sectionHeader}>
                            <h2 className="fade-in">Powerful Features for Your Health</h2>
                            <p className="fade-in">Everything you need to understand and track your health journey</p>
                        </div>

                        <div className="grid grid-3">
                            <FeatureCard
                                icon="📤"
                                title="Upload Any Medical File"
                                description="Lab reports, prescriptions, discharge summaries, or even photos of reports. We handle it all."
                                gradient="var(--gradient-primary)"
                                delay={0}
                            />
                            <FeatureCard
                                icon="🤖"
                                title="AI-Powered Insights"
                                description="Get clear explanations of your results in plain language, not medical jargon."
                                gradient="var(--gradient-purple)"
                                delay={0.1}
                            />
                            <FeatureCard
                                icon="📊"
                                title="Trend Detection"
                                description="Track your health metrics over time and get early warnings for potential issues."
                                gradient="var(--gradient-secondary)"
                                delay={0.2}
                            />
                            <FeatureCard
                                icon="📅"
                                title="Health Timeline"
                                description="Visualize your complete health history in one beautiful, organized timeline."
                                gradient="var(--gradient-success)"
                                delay={0.3}
                            />
                            <FeatureCard
                                icon="🚨"
                                title="Critical Alerts"
                                description="Get instant notifications for values that need immediate medical attention."
                                gradient="var(--gradient-danger)"
                                delay={0.4}
                            />
                            <FeatureCard
                                icon="🔒"
                                title="Safe & Transparent"
                                description="No diagnosis, no speculation. Only factual insights based on your actual data."
                                gradient="var(--gradient-ocean)"
                                delay={0.5}
                            />
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className={styles.howItWorks}>
                    <div className="container">
                        <div className={styles.sectionHeader}>
                            <h2 className="fade-in">How It Works</h2>
                            <p className="fade-in">Three simple steps to health clarity</p>
                        </div>

                        <div className={styles.steps}>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>01</div>
                                <div className={styles.stepContent}>
                                    <h3>Upload Your Report</h3>
                                    <p>Drag and drop any medical file - PDF, image, or document. Our AI handles the rest.</p>
                                </div>
                            </div>

                            <div className={styles.stepArrow}>→</div>

                            <div className={styles.step}>
                                <div className={styles.stepNumber}>02</div>
                                <div className={styles.stepContent}>
                                    <h3>AI Analysis</h3>
                                    <p>We extract values, validate against medical rules, and generate clear explanations.</p>
                                </div>
                            </div>

                            <div className={styles.stepArrow}>→</div>

                            <div className={styles.step}>
                                <div className={styles.stepNumber}>03</div>
                                <div className={styles.stepContent}>
                                    <h3>Get Insights</h3>
                                    <p>View your results, trends, and personalized health insights in seconds.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className={styles.testimonialsSection}>
                    <div className="container">
                        <div className={styles.sectionHeader}>
                            <h2>What Our Users Say</h2>
                            <p>Join thousands of satisfied users who trust Health OS</p>
                        </div>
                        <TestimonialCarousel />
                    </div>
                </section>

                {/* Pricing */}
                <PricingSection />

                {/* FAQ */}
                <FAQAccordion />

                {/* Newsletter */}
                <NewsletterSignup />

                {/* CTA Section */}
                <section className={styles.ctaSection}>
                    <div className="container">
                        <div className={styles.ctaCard}>
                            <h2>Ready to understand your health?</h2>
                            <p>Join thousands of users who have gained clarity about their health data.</p>
                            <a href="/signup" className="btn btn-primary btn-large">
                                Get Started for Free
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <div className="container">
                    <div className={styles.footerContent}>
                        <div className={styles.footerBrand}>
                            <div className={styles.footerLogo}>Health OS</div>
                            <p>Your personal health clarity engine</p>
                        </div>

                        <div className={styles.footerLinks}>
                            <div>
                                <h4>Product</h4>
                                <a href="/features">Features</a>
                                <a href="/pricing">Pricing</a>
                                <a href="/faq">FAQ</a>
                            </div>
                            <div>
                                <h4>Company</h4>
                                <a href="/about">About</a>
                                <a href="/blog">Blog</a>
                                <a href="/contact">Contact</a>
                            </div>
                            <div>
                                <h4>Legal</h4>
                                <a href="/privacy">Privacy</a>
                                <a href="/terms">Terms</a>
                                <a href="/security">Security</a>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footerBottom}>
                        <p>&copy; 2024 Health OS. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
                        <h2 className="fade-in">Powerful Features for Your Health</h2>
                        <p className="fade-in">Everything you need to understand and track your health journey</p>
                    </div >

        <div className="grid grid-3">
            <div className="card fade-in">
                <div className={styles.featureIcon}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="12" fill="url(#icon-gradient-1)" />
                        <path d="M20 12V28M12 20H28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        <defs>
                            <linearGradient id="icon-gradient-1" x1="0" y1="0" x2="40" y2="40">
                                <stop offset="0%" stopColor="#2563eb" />
                                <stop offset="100%" stopColor="#7c3aed" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h3>Upload Any Medical File</h3>
                <p>Lab reports, prescriptions, discharge summaries, or even photos of reports. We handle it all.</p>
            </div>

            <div className="card fade-in">
                <div className={styles.featureIcon}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="12" fill="url(#icon-gradient-2)" />
                        <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="2.5" />
                        <path d="M20 12V20L26 23" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        <defs>
                            <linearGradient id="icon-gradient-2" x1="0" y1="0" x2="40" y2="40">
                                <stop offset="0%" stopColor="#7c3aed" />
                                <stop offset="100%" stopColor="#f59e0b" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h3>AI-Powered Insights</h3>
                <p>Get clear explanations of your results in plain language, not medical jargon.</p>
            </div>

            <div className="card fade-in">
                <div className={styles.featureIcon}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="12" fill="url(#icon-gradient-3)" />
                        <path d="M12 28L16 20L22 24L28 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="icon-gradient-3" x1="0" y1="0" x2="40" y2="40">
                                <stop offset="0%" stopColor="#f59e0b" />
                                <stop offset="100%" stopColor="#f97316" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h3>Trend Detection</h3>
                <p>Track your health metrics over time and get early warnings for potential issues.</p>
            </div>

            <div className="card fade-in">
                <div className={styles.featureIcon}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="12" fill="url(#icon-gradient-4)" />
                        <rect x="12" y="16" width="16" height="12" rx="2" stroke="white" strokeWidth="2.5" />
                        <path d="M16 16V14C16 12.8954 16.8954 12 18 12H22C23.1046 12 24 12.8954 24 14V16" stroke="white" strokeWidth="2.5" />
                        <defs>
                            <linearGradient id="icon-gradient-4" x1="0" y1="0" x2="40" y2="40">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#059669" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h3>Health Timeline</h3>
                <p>Visualize your complete health history in one beautiful, organized timeline.</p>
            </div>

            <div className="card fade-in">
                <div className={styles.featureIcon}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="12" fill="url(#icon-gradient-5)" />
                        <path d="M20 28C24.4183 28 28 24.4183 28 20C28 15.5817 24.4183 12 20 12C15.5817 12 12 15.5817 12 20C12 24.4183 15.5817 28 20 28Z" stroke="white" strokeWidth="2.5" />
                        <path d="M20 16V20L23 23" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        <defs>
                            <linearGradient id="icon-gradient-5" x1="0" y1="0" x2="40" y2="40">
                                <stop offset="0%" stopColor="#ef4444" />
                                <stop offset="100%" stopColor="#dc2626" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h3>Critical Alerts</h3>
                <p>Get instant notifications for values that need immediate medical attention.</p>
            </div>

            <div className="card fade-in">
                <div className={styles.featureIcon}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="12" fill="url(#icon-gradient-6)" />
                        <path d="M20 12V20M20 24V28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="2.5" />
                        <defs>
                            <linearGradient id="icon-gradient-6" x1="0" y1="0" x2="40" y2="40">
                                <stop offset="0%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#4f46e5" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h3>Safe & Transparent</h3>
                <p>No diagnosis, no speculation. Only factual insights based on your actual data.</p>
            </div>
        </div>
                </div >
            </section >

        {/* How It Works Section */ }
        < section id = "how-it-works" className = { styles.howItWorks } >
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className="fade-in">How It Works</h2>
                    <p className="fade-in">Three simple steps to health clarity</p>
                </div>

                <div className={styles.steps}>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>01</div>
                        <div className={styles.stepContent}>
                            <h3>Upload Your Report</h3>
                            <p>Drag and drop any medical file - PDF, image, or document. Our AI handles the rest.</p>
                        </div>
                    </div>

                    <div className={styles.stepArrow}>→</div>

                    <div className={styles.step}>
                        <div className={styles.stepNumber}>02</div>
                        <div className={styles.stepContent}>
                            <h3>AI Analysis</h3>
                            <p>We extract values, validate against medical rules, and generate clear explanations.</p>
                        </div>
                    </div>

                    <div className={styles.stepArrow}>→</div>

                    <div className={styles.step}>
                        <div className={styles.stepNumber}>03</div>
                        <div className={styles.stepContent}>
                            <h3>Get Insights</h3>
                            <p>View your results, trends, and personalized health insights in seconds.</p>
                        </div>
                    </div>
                </div>
            </div>
            </section >

        {/* CTA Section */ }
        < section className = { styles.ctaSection } >
            <div className="container">
                <div className={styles.ctaCard}>
                    <h2>Ready to understand your health?</h2>
                    <p>Join thousands of users who have gained clarity about their health data.</p>
                    <a href="/signup" className="btn btn-primary btn-large">
                        Get Started for Free
                    </a>
                </div>
            </div>
            </section >
        </main >

        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.footerBrand}>
                        <div className={styles.footerLogo}>Health OS</div>
                        <p>Your personal health clarity engine</p>
                    </div>

                    <div className={styles.footerLinks}>
                        <div>
                            <h4>Product</h4>
                            <a href="/features">Features</a>
                            <a href="/pricing">Pricing</a>
                            <a href="/faq">FAQ</a>
                        </div>
                        <div>
                            <h4>Company</h4>
                            <a href="/about">About</a>
                            <a href="/blog">Blog</a>
                            <a href="/contact">Contact</a>
                        </div>
                        <div>
                            <h4>Legal</h4>
                            <a href="/privacy">Privacy</a>
                            <a href="/terms">Terms</a>
                            <a href="/security">Security</a>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>&copy; 2024 Health OS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </>
);
}
