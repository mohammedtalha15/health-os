/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    async rewrites() {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        // Only create rewrite if apiUrl is a valid URL (starts with http:// or https://)
        if (!apiUrl || (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://'))) {
            return [];
        }
        return [
            {
                // Proxy backend API routes, but EXCLUDE /api/auth/* (NextAuth)
                source: '/api/backend/:path*',
                destination: apiUrl + '/:path*',
            },
        ];
    },
};

module.exports = nextConfig;
