// WebSocket utilities for real-time updates
type WebSocketEventType =
    | 'report_processed'
    | 'metric_updated'
    | 'notification'
    | 'user_activity'
    | 'system_update';

interface WebSocketMessage {
    type: WebSocketEventType;
    data: any;
    timestamp: number;
}

type MessageHandler = (data: any) => void;

class WebSocketManager {
    private ws: WebSocket | null = null;
    private url: string;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000;
    private handlers: Map<WebSocketEventType, Set<MessageHandler>> = new Map();
    private isConnecting = false;
    private heartbeatInterval: NodeJS.Timeout | null = null;

    constructor(url?: string) {
        this.url = url || this.getWebSocketUrl();
    }

    private getWebSocketUrl(): string {
        if (typeof window === 'undefined') return '';

        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = process.env.NEXT_PUBLIC_WS_URL || window.location.host;
        return `${protocol}//${host}/ws`;
    }

    // Connect to WebSocket server
    connect(token?: string): void {
        if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
            return;
        }

        this.isConnecting = true;
        const url = token ? `${this.url}?token=${token}` : this.url;

        try {
            this.ws = new WebSocket(url);
            this.setupEventHandlers();
        } catch (error) {
            console.error('WebSocket connection error:', error);
            this.isConnecting = false;
            this.scheduleReconnect();
        }
    }

    private setupEventHandlers(): void {
        if (!this.ws) return;

        this.ws.onopen = () => {
            console.log('WebSocket connected');
            this.isConnecting = false;
            this.reconnectAttempts = 0;
            this.startHeartbeat();
        };

        this.ws.onmessage = (event) => {
            try {
                const message: WebSocketMessage = JSON.parse(event.data);
                this.handleMessage(message);
            } catch (error) {
                console.error('Failed to parse WebSocket message:', error);
            }
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.ws.onclose = () => {
            console.log('WebSocket disconnected');
            this.isConnecting = false;
            this.stopHeartbeat();
            this.scheduleReconnect();
        };
    }

    private handleMessage(message: WebSocketMessage): void {
        const handlers = this.handlers.get(message.type);
        if (handlers) {
            handlers.forEach(handler => {
                try {
                    handler(message.data);
                } catch (error) {
                    console.error('Error in message handler:', error);
                }
            });
        }
    }

    // Subscribe to events
    on(type: WebSocketEventType, handler: MessageHandler): () => void {
        if (!this.handlers.has(type)) {
            this.handlers.set(type, new Set());
        }
        this.handlers.get(type)!.add(handler);

        // Return unsubscribe function
        return () => {
            this.handlers.get(type)?.delete(handler);
        };
    }

    // Send message
    send(type: WebSocketEventType, data: any): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            const message: WebSocketMessage = {
                type,
                data,
                timestamp: Date.now(),
            };
            this.ws.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket not connected. Message not sent.');
        }
    }

    // Disconnect
    disconnect(): void {
        this.stopHeartbeat();
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    // Reconnect logic
    private scheduleReconnect(): void {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnect attempts reached');
            return;
        }

        this.reconnectAttempts++;
        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

        console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
        setTimeout(() => {
            this.connect();
        }, delay);
    }

    // Heartbeat to keep connection alive
    private startHeartbeat(): void {
        this.heartbeatInterval = setInterval(() => {
            if (this.ws?.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({ type: 'ping' }));
            }
        }, 30000); // Every 30 seconds
    }

    private stopHeartbeat(): void {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    // Get connection state
    isConnected(): boolean {
        return this.ws?.readyState === WebSocket.OPEN;
    }
}

// Global instance
export const wsManager = new WebSocketManager();

// React hook for WebSocket
export function useWebSocket(type: WebSocketEventType, handler: MessageHandler) {
    React.useEffect(() => {
        const unsubscribe = wsManager.on(type, handler);
        return unsubscribe;
    }, [type, handler]);
}

// React hook for connection status
export function useWebSocketStatus() {
    const [isConnected, setIsConnected] = React.useState(false);

    React.useEffect(() => {
        const checkStatus = () => {
            setIsConnected(wsManager.isConnected());
        };

        const interval = setInterval(checkStatus, 1000);
        checkStatus();

        return () => clearInterval(interval);
    }, []);

    return isConnected;
}

export default wsManager;

// Usage examples:
/*
// Connect
wsManager.connect(authToken);

// Subscribe to events
wsManager.on('report_processed', (data) => {
  console.log('Report processed:', data);
});

// Send message
wsManager.send('user_activity', { action: 'view_report', reportId: '123' });

// React hook
function MyComponent() {
  const isConnected = useWebSocketStatus();
  
  useWebSocket('notification', (data) => {
    showNotification(data);
  });
  
  return <div>Status: {isConnected ? 'Connected' : 'Disconnected'}</div>;
}

// Disconnect
wsManager.disconnect();
*/

import React from 'react';
