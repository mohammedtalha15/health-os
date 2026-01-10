import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: 'var(--color-error-bg)',
                    color: 'var(--color-error)',
                    borderRadius: '8px',
                    margin: '2rem'
                }}>
                    <h2>⚠️ Something went wrong</h2>
                    <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
                    {this.state.error && (
                        <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                            <summary>Error details</summary>
                            <pre style={{
                                padding: '1rem',
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                borderRadius: '4px',
                                overflow: 'auto'
                            }}>
                                {this.state.error.toString()}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
