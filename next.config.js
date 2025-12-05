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
        if (!apiUrl) {
            return [];
        }
        return [
            {
                source: '/api/:path*',
                destination: apiUrl + '/:path*',
            },
        ];
    },
};

module.exports = nextConfig;
