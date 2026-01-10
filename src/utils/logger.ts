/**
 * Logger Utility
 * Provides consistent logging across the application
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
    enabled: boolean;
    level: LogLevel;
}

const config: LoggerConfig = {
    enabled: process.env.NODE_ENV !== 'production',
    level: 'debug',
};

const levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};

class Logger {
    private shouldLog(level: LogLevel): boolean {
        if (!config.enabled) return false;
        return levels[level] >= levels[config.level];
    }

    debug(...args: any[]): void {
        if (this.shouldLog('debug')) {
            console.debug('🔍 [DEBUG]', ...args);
        }
    }

    info(...args: any[]): void {
        if (this.shouldLog('info')) {
            console.info('ℹ️ [INFO]', ...args);
        }
    }

    warn(...args: any[]): void {
        if (this.shouldLog('warn')) {
            console.warn('⚠️ [WARN]', ...args);
        }
    }

    error(...args: any[]): void {
        if (this.shouldLog('error')) {
            console.error('❌ [ERROR]', ...args);
        }
    }

    group(label: string): void {
        if (config.enabled) {
            console.group(label);
        }
    }

    groupEnd(): void {
        if (config.enabled) {
            console.groupEnd();
        }
    }

    table(data: any): void {
        if (config.enabled) {
            console.table(data);
        }
    }
}

export const logger = new Logger();

export function setLogLevel(level: LogLevel): void {
    config.level = level;
}

export function enableLogging(enabled: boolean): void {
    config.enabled = enabled;
}
