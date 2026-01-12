// Logger utility for consistent logging across the application
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
    [key: string]: any;
}

class Logger {
    private isDevelopment = process.env.NODE_ENV === 'development';
    private isProduction = process.env.NODE_ENV === 'production';

    private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
        const timestamp = new Date().toISOString();
        const contextStr = context ? ` ${JSON.stringify(context)}` : '';
        return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
    }

    private shouldLog(level: LogLevel): boolean {
        if (this.isDevelopment) return true;
        if (this.isProduction && level === 'debug') return false;
        return true;
    }

    debug(message: string, context?: LogContext): void {
        if (this.shouldLog('debug')) {
            console.debug(this.formatMessage('debug', message, context));
        }
    }

    info(message: string, context?: LogContext): void {
        if (this.shouldLog('info')) {
            console.info(this.formatMessage('info', message, context));
        }
    }

    warn(message: string, context?: LogContext): void {
        if (this.shouldLog('warn')) {
            console.warn(this.formatMessage('warn', message, context));
        }
    }

    error(message: string, error?: Error | unknown, context?: LogContext): void {
        if (this.shouldLog('error')) {
            const errorContext = {
                ...context,
                ...(error instanceof Error && {
                    error: {
                        name: error.name,
                        message: error.message,
                        stack: error.stack,
                    },
                }),
            };
            console.error(this.formatMessage('error', message, errorContext));

            // Send to error tracking service in production
            if (this.isProduction) {
                this.sendToErrorTracking(message, error, errorContext);
            }
        }
    }

    private sendToErrorTracking(message: string, error: unknown, context: LogContext): void {
        // Integrate with Sentry, LogRocket, or other error tracking services
        // Example: Sentry.captureException(error, { extra: context });
    }

    // Specialized logging methods
    api(method: string, url: string, statusCode: number, duration: number): void {
        this.info('API Request', {
            method,
            url,
            statusCode,
            duration: `${duration}ms`,
        });
    }

    performance(operation: string, duration: number): void {
        this.debug('Performance', {
            operation,
            duration: `${duration}ms`,
        });
    }

    security(event: string, context?: LogContext): void {
        this.warn(`Security Event: ${event}`, context);
    }

    /**
     * Log user actions for analytics
     */
    userAction(action: string, context?: LogContext): void {
        this.info(`User Action: ${action}`, context);
    }

    // Measure execution time
    async measure<T>(operation: string, fn: () => Promise<T>): Promise<T> {
        const start = Date.now();
        try {
            const result = await fn();
            const duration = Date.now() - start;
            this.performance(operation, duration);
            return result;
        } catch (error) {
            const duration = Date.now() - start;
            this.error(`${operation} failed`, error, { duration });
            throw error;
        }
    }
}

export const logger = new Logger();
export default logger;

// Usage examples:
// logger.info('User logged in', { userId: '123' });
// logger.error('Failed to fetch data', error, { endpoint: '/api/users' });
// logger.api('GET', '/api/users', 200, 150);
// const result = await logger.measure('fetchUsers', () => fetchUsers());
