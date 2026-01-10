/**
 * Environment Validation Utility
 * Validates that all required environment variables are set
 */

interface EnvConfig {
    NEXT_PUBLIC_API_URL?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    NEXTAUTH_SECRET?: string;
    NEXTAUTH_URL?: string;
}

const requiredEnvVars = [
    'NEXT_PUBLIC_API_URL',
] as const;

const optionalEnvVars = [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
] as const;

export function validateEnv(): EnvConfig {
    const env: EnvConfig = {};
    const missing: string[] = [];

    // Check required variables
    requiredEnvVars.forEach((key) => {
        const value = process.env[key];
        if (!value) {
            missing.push(key);
        } else {
            env[key] = value;
        }
    });

    // Check optional variables (warn but don't fail)
    optionalEnvVars.forEach((key) => {
        const value = process.env[key];
        if (value) {
            env[key] = value;
        } else if (typeof window === 'undefined') {
            console.warn(`⚠️  Optional environment variable ${key} is not set`);
        }
    });

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables:\n${missing.join('\n')}\n\nPlease check your .env file.`
        );
    }

    return env;
}

export function getEnv(key: keyof EnvConfig): string | undefined {
    return process.env[key];
}

export function isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
}
