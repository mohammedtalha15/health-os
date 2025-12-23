// SEO and metadata utilities for Next.js
import { Metadata } from 'next';

interface SEOConfig {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
}

export function generateMetadata(config: SEOConfig): Metadata {
    const {
        title,
        description,
        keywords = [],
        image = '/og-image.png',
        url = 'https://healthos.com',
        type = 'website',
        author = 'Health OS',
        publishedTime,
        modifiedTime,
    } = config;

    const fullTitle = `${title} | Health OS`;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        authors: [{ name: author }],
        creator: author,
        publisher: 'Health OS',

        // Open Graph
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: 'Health OS',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type,
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
        },

        // Twitter
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [image],
            creator: '@healthos',
            site: '@healthos',
        },

        // Additional metadata
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        // Icons
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon-16x16.png',
            apple: '/apple-touch-icon.png',
        },

        // Manifest
        manifest: '/site.webmanifest',

        // Verification
        verification: {
            google: 'your-google-verification-code',
            yandex: 'your-yandex-verification-code',
        },
    };
}

// Common page metadata
export const homeMetadata = generateMetadata({
    title: 'Your Personal Health Clarity Engine',
    description: 'Upload, analyze, and understand your health reports with AI-powered insights. Track your health metrics over time and make informed decisions.',
    keywords: ['health', 'medical reports', 'health tracking', 'AI health', 'health analytics'],
    type: 'website',
});

export const dashboardMetadata = generateMetadata({
    title: 'Dashboard',
    description: 'View your health metrics, reports, and insights in one place.',
    keywords: ['health dashboard', 'health metrics', 'health tracking'],
});

export const uploadMetadata = generateMetadata({
    title: 'Upload Health Report',
    description: 'Upload your medical reports and get AI-powered insights instantly.',
    keywords: ['upload health report', 'medical report upload', 'health document'],
});

// Structured data helpers
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Health OS',
        url: 'https://healthos.com',
        logo: 'https://healthos.com/logo.png',
        description: 'Your personal health clarity engine',
        sameAs: [
            'https://twitter.com/healthos',
            'https://linkedin.com/company/healthos',
            'https://github.com/healthos',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'support@healthos.com',
            contactType: 'Customer Support',
        },
    };
}

export function generateWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Health OS',
        url: 'https://healthos.com',
        description: 'Your personal health clarity engine',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://healthos.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
        },
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function generateArticleSchema(config: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: config.title,
        description: config.description,
        image: config.image,
        datePublished: config.datePublished,
        dateModified: config.dateModified,
        author: {
            '@type': 'Person',
            name: config.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Health OS',
            logo: {
                '@type': 'ImageObject',
                url: 'https://healthos.com/logo.png',
            },
        },
    };
}

// Canonical URL helper
export function getCanonicalUrl(path: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://healthos.com';
    return `${baseUrl}${path}`;
}

// Sitemap generation helper
export function generateSitemapEntry(config: {
    url: string;
    lastModified?: Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
}) {
    return {
        url: config.url,
        lastModified: config.lastModified || new Date(),
        changeFrequency: config.changeFrequency || 'weekly',
        priority: config.priority || 0.5,
    };
}
