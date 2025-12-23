// Analytics and tracking utilities
type EventCategory = 'user' | 'report' | 'metric' | 'navigation' | 'error';

interface AnalyticsEvent {
    category: EventCategory;
    action: string;
    label?: string;
    value?: number;
    metadata?: Record<string, any>;
}

class Analytics {
    private isProduction = process.env.NODE_ENV === 'production';
    private isEnabled = typeof window !== 'undefined' && this.isProduction;

    // Initialize analytics
    init() {
        if (!this.isEnabled) return;

        // Initialize Google Analytics
        if (process.env.NEXT_PUBLIC_GA_ID) {
            this.initGA();
        }

        // Track page views on route change
        if (typeof window !== 'undefined') {
            this.trackPageView(window.location.pathname);
        }
    }

    private initGA() {
        const gaId = process.env.NEXT_PUBLIC_GA_ID;
        if (!gaId) return;

        // Load GA script
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        script.async = true;
        document.head.appendChild(script);

        // Initialize gtag
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) {
            (window as any).dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', gaId, {
            page_path: window.location.pathname,
        });
    }

    // Track page views
    trackPageView(url: string) {
        if (!this.isEnabled) {
            console.log('[Analytics] Page view:', url);
            return;
        }

        if (typeof (window as any).gtag !== 'undefined') {
            (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
                page_path: url,
            });
        }
    }

    // Track custom events
    trackEvent({ category, action, label, value, metadata }: AnalyticsEvent) {
        if (!this.isEnabled) {
            console.log('[Analytics] Event:', { category, action, label, value, metadata });
            return;
        }

        if (typeof (window as any).gtag !== 'undefined') {
            (window as any).gtag('event', action, {
                event_category: category,
                event_label: label,
                value,
                ...metadata,
            });
        }
    }

    // User events
    trackSignUp(method: string) {
        this.trackEvent({
            category: 'user',
            action: 'sign_up',
            label: method,
        });
    }

    trackLogin(method: string) {
        this.trackEvent({
            category: 'user',
            action: 'login',
            label: method,
        });
    }

    trackLogout() {
        this.trackEvent({
            category: 'user',
            action: 'logout',
        });
    }

    // Report events
    trackReportUpload(type: string, fileSize: number) {
        this.trackEvent({
            category: 'report',
            action: 'upload',
            label: type,
            value: fileSize,
        });
    }

    trackReportView(reportId: string) {
        this.trackEvent({
            category: 'report',
            action: 'view',
            label: reportId,
        });
    }

    trackReportDelete(reportId: string) {
        this.trackEvent({
            category: 'report',
            action: 'delete',
            label: reportId,
        });
    }

    trackReportShare(method: string) {
        this.trackEvent({
            category: 'report',
            action: 'share',
            label: method,
        });
    }

    // Metric events
    trackMetricView(metricName: string) {
        this.trackEvent({
            category: 'metric',
            action: 'view',
            label: metricName,
        });
    }

    trackMetricExport(format: string) {
        this.trackEvent({
            category: 'metric',
            action: 'export',
            label: format,
        });
    }

    // Navigation events
    trackNavigation(destination: string) {
        this.trackEvent({
            category: 'navigation',
            action: 'navigate',
            label: destination,
        });
    }

    trackSearch(query: string, resultsCount: number) {
        this.trackEvent({
            category: 'navigation',
            action: 'search',
            label: query,
            value: resultsCount,
        });
    }

    // Error tracking
    trackError(error: Error, context?: Record<string, any>) {
        this.trackEvent({
            category: 'error',
            action: error.name,
            label: error.message,
            metadata: {
                stack: error.stack,
                ...context,
            },
        });

        // Send to error tracking service (e.g., Sentry)
        if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
            // Sentry.captureException(error, { extra: context });
        }
    }

    // Performance tracking
    trackPerformance(metric: string, value: number) {
        this.trackEvent({
            category: 'navigation',
            action: 'performance',
            label: metric,
            value: Math.round(value),
        });
    }

    // Conversion tracking
    trackConversion(type: string, value?: number) {
        this.trackEvent({
            category: 'user',
            action: 'conversion',
            label: type,
            value,
        });
    }

    // Feature usage
    trackFeatureUse(feature: string) {
        this.trackEvent({
            category: 'navigation',
            action: 'feature_use',
            label: feature,
        });
    }

    // User timing
    startTiming(name: string): () => void {
        const startTime = performance.now();

        return () => {
            const duration = performance.now() - startTime;
            this.trackPerformance(name, duration);
        };
    }
}

export const analytics = new Analytics();
export default analytics;

// Usage examples:
/*
// Initialize on app start
analytics.init();

// Track events
analytics.trackSignUp('email');
analytics.trackReportUpload('lab', 1024000);
analytics.trackError(new Error('Upload failed'), { reportId: '123' });

// Track timing
const endTiming = analytics.startTiming('report_processing');
// ... do work
endTiming();
*/
