// Internationalization (i18n) utilities
export type Locale = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'hi';

interface Translations {
    [key: string]: string | Translations;
}

interface LocaleData {
    locale: Locale;
    translations: Translations;
}

class I18n {
    private currentLocale: Locale = 'en';
    private translations: Map<Locale, Translations> = new Map();
    private fallbackLocale: Locale = 'en';

    constructor() {
        this.loadTranslations();
        this.detectLocale();
    }

    private loadTranslations(): void {
        // English (default)
        this.translations.set('en', {
            common: {
                welcome: 'Welcome to Health OS',
                loading: 'Loading...',
                error: 'An error occurred',
                save: 'Save',
                cancel: 'Cancel',
                delete: 'Delete',
                edit: 'Edit',
                close: 'Close',
                confirm: 'Confirm',
                search: 'Search',
                filter: 'Filter',
                export: 'Export',
                import: 'Import',
            },
            dashboard: {
                title: 'Dashboard',
                healthScore: 'Health Score',
                recentReports: 'Recent Reports',
                keyMetrics: 'Key Metrics',
                activity: 'Activity Feed',
            },
            upload: {
                title: 'Upload Report',
                dragDrop: 'Drag and drop your file here',
                orClick: 'or click to browse',
                processing: 'Processing your report...',
                success: 'Report uploaded successfully',
                error: 'Failed to upload report',
            },
            metrics: {
                normal: 'Normal',
                caution: 'Caution',
                critical: 'Critical',
                trend: {
                    up: 'Increasing',
                    down: 'Decreasing',
                    stable: 'Stable',
                },
            },
            auth: {
                login: 'Log In',
                signup: 'Sign Up',
                logout: 'Log Out',
                email: 'Email',
                password: 'Password',
                forgotPassword: 'Forgot Password?',
                rememberMe: 'Remember Me',
            },
        });

        // Add more locales as needed
        // this.translations.set('es', { ... });
        // this.translations.set('fr', { ... });
    }

    private detectLocale(): void {
        if (typeof window === 'undefined') return;

        // Check localStorage first
        const stored = localStorage.getItem('locale');
        if (stored && this.isValidLocale(stored)) {
            this.currentLocale = stored as Locale;
            return;
        }

        // Detect from browser
        const browserLocale = navigator.language.split('-')[0];
        if (this.isValidLocale(browserLocale)) {
            this.currentLocale = browserLocale as Locale;
        }
    }

    private isValidLocale(locale: string): boolean {
        return ['en', 'es', 'fr', 'de', 'zh', 'ja', 'hi'].includes(locale);
    }

    // Get translation by key
    t(key: string, params?: Record<string, string | number>): string {
        const keys = key.split('.');
        let value: any = this.translations.get(this.currentLocale);

        // Traverse the translation object
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                // Fallback to English if not found
                value = this.translations.get(this.fallbackLocale);
                for (const fk of keys) {
                    if (value && typeof value === 'object') {
                        value = value[fk];
                    }
                }
                break;
            }
        }

        // If still not found, return key
        if (typeof value !== 'string') {
            console.warn(`Translation not found for key: ${key}`);
            return key;
        }

        // Replace parameters
        if (params) {
            Object.keys(params).forEach(param => {
                value = value.replace(`{${param}}`, String(params[param]));
            });
        }

        return value;
    }

    // Get current locale
    getLocale(): Locale {
        return this.currentLocale;
    }

    // Set locale
    setLocale(locale: Locale): void {
        if (!this.isValidLocale(locale)) {
            console.warn(`Invalid locale: ${locale}`);
            return;
        }

        this.currentLocale = locale;

        if (typeof window !== 'undefined') {
            localStorage.setItem('locale', locale);
            // Trigger re-render if needed
            window.dispatchEvent(new Event('localechange'));
        }
    }

    // Get available locales
    getAvailableLocales(): Locale[] {
        return Array.from(this.translations.keys());
    }

    // Format number based on locale
    formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
        return new Intl.NumberFormat(this.currentLocale, options).format(value);
    }

    // Format date based on locale
    formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
        return new Intl.DateTimeFormat(this.currentLocale, options).format(date);
    }

    // Format currency based on locale
    formatCurrency(value: number, currency: string = 'USD'): string {
        return new Intl.NumberFormat(this.currentLocale, {
            style: 'currency',
            currency,
        }).format(value);
    }

    // Pluralization helper
    plural(count: number, singular: string, plural: string): string {
        return count === 1 ? singular : plural;
    }
}

// Global instance
export const i18n = new I18n();

// React hook for translations
export function useTranslation() {
    const [locale, setLocale] = React.useState(i18n.getLocale());

    React.useEffect(() => {
        const handleLocaleChange = () => {
            setLocale(i18n.getLocale());
        };

        window.addEventListener('localechange', handleLocaleChange);
        return () => window.removeEventListener('localechange', handleLocaleChange);
    }, []);

    return {
        t: (key: string, params?: Record<string, string | number>) => i18n.t(key, params),
        locale,
        setLocale: (newLocale: Locale) => i18n.setLocale(newLocale),
        formatNumber: (value: number, options?: Intl.NumberFormatOptions) =>
            i18n.formatNumber(value, options),
        formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) =>
            i18n.formatDate(date, options),
        formatCurrency: (value: number, currency?: string) =>
            i18n.formatCurrency(value, currency),
    };
}

export default i18n;

// Usage examples:
/*
// Direct usage
const welcomeText = i18n.t('common.welcome');
const uploadTitle = i18n.t('upload.title');

// With parameters
const greeting = i18n.t('common.greeting', { name: 'John' });

// React hook
function MyComponent() {
  const { t, locale, setLocale } = useTranslation();
  
  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <button onClick={() => setLocale('es')}>Español</button>
    </div>
  );
}

// Formatting
i18n.formatNumber(1234.56); // "1,234.56" (en) or "1.234,56" (de)
i18n.formatDate(new Date()); // Localized date
i18n.formatCurrency(99.99, 'USD'); // "$99.99"
*/

// Import React for the hook
import React from 'react';
