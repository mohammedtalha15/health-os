import { useState } from 'react';

interface UseClipboardReturn {
    copied: boolean;
    copy: (text: string) => Promise<void>;
    error: Error | null;
}

/**
 * Custom hook for clipboard operations
 * @returns Object with copied state, copy function, and error
 */
export function useClipboard(): UseClipboardReturn {
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const copy = async (text: string): Promise<void> => {
        try {
            if (!navigator?.clipboard) {
                throw new Error('Clipboard API not available');
            }

            await navigator.clipboard.writeText(text);
            setCopied(true);
            setError(null);

            // Reset copied state after 2 seconds
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            setError(err as Error);
            setCopied(false);
        }
    };

    return { copied, copy, error };
}
