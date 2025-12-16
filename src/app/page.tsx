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
}
