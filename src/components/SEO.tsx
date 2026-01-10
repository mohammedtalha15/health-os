import Head from 'next/head';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    ogType?: string;
    canonical?: string;
    noindex?: boolean;
}

const defaultMeta = {
    title: 'Health OS - Your Personal Health Operating System',
    description: 'Manage your health data, track metrics, and gain insights with AI-powered analysis.',
    keywords: ['health', 'medical records', 'health tracking', 'AI health assistant'],
    ogImage: '/og-image.png',
    ogType: 'website',
};

/**
 * SEO Component for managing page metadata
 */
export function SEO({
    title,
    description = defaultMeta.description,
    keywords = defaultMeta.keywords,
    ogImage = defaultMeta.ogImage,
    ogType = defaultMeta.ogType,
    canonical,
    noindex = false,
}: SEOProps) {
    const fullTitle = title ? `${title} | Health OS` : defaultMeta.title;
    const keywordsString = keywords.join(', ');

    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywordsString} />

            {/* Robots */}
            {noindex && <meta name="robots" content="noindex,nofollow" />}

            {/* Canonical URL */}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Viewport */}
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

            {/* Theme Color */}
            <meta name="theme-color" content="#6366f1" />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </Head>
    );
}
