import { useRef, useEffect } from 'react';

/**
 * Custom hook to track previous value
 * Useful for comparing current and previous values
 */
export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}
