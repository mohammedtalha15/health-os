import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    pages: {
        signIn: '/login',
        signOut: '/',
        error: '/login',
        newUser: '/dashboard',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            // You can add custom logic here to save user to your database
            return true;
        },
        async redirect({ url, baseUrl }) {
            // Redirect to dashboard after successful login
            if (url.startsWith(baseUrl)) return url;
            else if (url.startsWith('/')) return baseUrl + url;
            return baseUrl + '/dashboard';
        },
        async session({ session, token }) {
            // Add custom fields to session if needed
            if (session.user) {
                session.user.id = token.sub || '';
            }
            return session;
        },
        async jwt({ token, user, account }) {
            // Add custom fields to JWT token if needed
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
};
