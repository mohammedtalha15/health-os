import { useState, useCallback } from 'react';

interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

interface UseAsyncReturn<T> extends AsyncState<T> {
    execute: (...args: any[]) => Promise<T | null>;
    reset: () => void;
}

/**
 * Custom hook for managing async operations
 * @param asyncFunction Async function to execute
 * @returns Object with data, loading, error, execute, and reset
 */
export function useAsync<T>(
    asyncFunction: (...args: any[]) => Promise<T>
): UseAsyncReturn<T> {
    const [state, setState] = useState<AsyncState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const execute = useCallback(
        async (...args: any[]): Promise<T | null> => {
            setState({ data: null, loading: true, error: null });

            try {
                const data = await asyncFunction(...args);
                setState({ data, loading: false, error: null });
                return data;
            } catch (error) {
                setState({ data: null, loading: false, error: error as Error });
                return null;
            }
        },
        [asyncFunction]
    );

    const reset = useCallback(() => {
        setState({ data: null, loading: false, error: null });
    }, []);

    return {
        ...state,
        execute,
        reset,
    };
}
