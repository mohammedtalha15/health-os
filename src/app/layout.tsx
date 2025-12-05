import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Health OS - Your Personal Health Clarity Engine',
    description: 'Transform complex medical reports into clear, actionable insights. Upload any medical file and get AI-powered explanations, trend detection, and health timeline visualization.',
    keywords: 'health, medical reports, lab results, AI health, health tracking, medical clarity',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={inter.className}>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
}
