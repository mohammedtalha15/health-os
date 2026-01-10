/**
 * Retry Utility
 * Retry failed operations with exponential backoff
 */

interface RetryOptions {
    maxAttempts?: number;
    delayMs?: number;
    backoffMultiplier?: number;
    maxDelayMs?: number;
    onRetry?: (attempt: number, error: Error) => void;
}

const defaultOptions: Required<RetryOptions> = {
    maxAttempts: 3,
    delayMs: 1000,
    backoffMultiplier: 2,
    maxDelayMs: 10000,
    onRetry: () => { },
};

/**
 * Retry an async operation
 */
export async function retry<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    const opts = { ...defaultOptions, ...options };
    let lastError: Error;

    for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;

            if (attempt === opts.maxAttempts) {
                break;
            }

            const delay = Math.min(
                opts.delayMs * Math.pow(opts.backoffMultiplier, attempt - 1),
                opts.maxDelayMs
            );

            opts.onRetry(attempt, lastError);

            await sleep(delay);
        }
    }

    throw lastError!;
}

/**
 * Retry with custom condition
 */
export async function retryWhen<T>(
    fn: () => Promise<T>,
    shouldRetry: (error: Error) => boolean,
    options: RetryOptions = {}
): Promise<T> {
    const opts = { ...defaultOptions, ...options };
    let lastError: Error;

    for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;

            if (attempt === opts.maxAttempts || !shouldRetry(lastError)) {
                break;
            }

            const delay = Math.min(
                opts.delayMs * Math.pow(opts.backoffMultiplier, attempt - 1),
                opts.maxDelayMs
            );

            opts.onRetry(attempt, lastError);

            await sleep(delay);
        }
    }

    throw lastError!;
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry with timeout
 */
export async function retryWithTimeout<T>(
    fn: () => Promise<T>,
    timeoutMs: number,
    options: RetryOptions = {}
): Promise<T> {
    return Promise.race([
        retry(fn, options),
        new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
        ),
    ]);
}
