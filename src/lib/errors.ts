// Error handling utilities
export class AppError extends Error {
    constructor(
        message: string,
        public statusCode: number = 500,
        public code?: string
    ) {
        super(message);
        this.name = 'AppError';
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message: string, public fields?: Record<string, string>) {
        super(message, 400, 'VALIDATION_ERROR');
        this.name = 'ValidationError';
    }
}

export class AuthenticationError extends AppError {
    constructor(message: string = 'Authentication required') {
        super(message, 401, 'AUTHENTICATION_ERROR');
        this.name = 'AuthenticationError';
    }
}

export class AuthorizationError extends AppError {
    constructor(message: string = 'Insufficient permissions') {
        super(message, 403, 'AUTHORIZATION_ERROR');
        this.name = 'AuthorizationError';
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string = 'Resource') {
        super(`${resource} not found`, 404, 'NOT_FOUND');
        this.name = 'NotFoundError';
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409, 'CONFLICT_ERROR');
        this.name = 'ConflictError';
    }
}

export class RateLimitError extends AppError {
    constructor(message: string = 'Too many requests') {
        super(message, 429, 'RATE_LIMIT_ERROR');
        this.name = 'RateLimitError';
    }
}

// Error handler for API routes
export function handleApiError(error: unknown): {
    message: string;
    statusCode: number;
    code?: string;
    fields?: Record<string, string>;
} {
    if (error instanceof AppError) {
        return {
            message: error.message,
            statusCode: error.statusCode,
            code: error.code,
            ...(error instanceof ValidationError && { fields: error.fields }),
        };
    }

    if (error instanceof Error) {
        console.error('Unexpected error:', error);
        return {
            message: 'An unexpected error occurred',
            statusCode: 500,
            code: 'INTERNAL_ERROR',
        };
    }

    return {
        message: 'An unknown error occurred',
        statusCode: 500,
        code: 'UNKNOWN_ERROR',
    };
}

// Error logger
export function logError(error: unknown, context?: Record<string, any>) {
    const timestamp = new Date().toISOString();
    const errorInfo = {
        timestamp,
        error: error instanceof Error ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
        } : error,
        context,
    };

    console.error('[ERROR]', JSON.stringify(errorInfo, null, 2));

    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
        // Send to Sentry, LogRocket, etc.
    }
}

// Async error wrapper for API routes
export function asyncHandler<T>(
    handler: (req: any, res: any) => Promise<T>
) {
    return async (req: any, res: any) => {
        try {
            return await handler(req, res);
        } catch (error) {
            logError(error, { url: req.url, method: req.method });
            const errorResponse = handleApiError(error);
            return res.status(errorResponse.statusCode).json(errorResponse);
        }
    };
}

// Client-side error boundary helper
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'An unexpected error occurred';
}

// Retry logic for failed operations
export async function retry<T>(
    fn: () => Promise<T>,
    options: {
        maxAttempts?: number;
        delay?: number;
        backoff?: boolean;
    } = {}
): Promise<T> {
    const { maxAttempts = 3, delay = 1000, backoff = true } = options;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxAttempts) throw error;

            const waitTime = backoff ? delay * Math.pow(2, attempt - 1) : delay;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }

    throw new Error('Retry failed');
}
