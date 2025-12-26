// Notification system for in-app notifications
interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    timestamp: Date;
    actionUrl?: string;
    actionLabel?: string;
    metadata?: Record<string, any>;
}

type NotificationListener = (notifications: Notification[]) => void;

class NotificationManager {
    private notifications: Notification[] = [];
    private listeners: Set<NotificationListener> = new Set();
    private maxNotifications = 50;

    constructor() {
        this.loadFromStorage();
    }

    // Add new notification
    add(notification: Omit<Notification, 'id' | 'read' | 'timestamp'>): Notification {
        const newNotification: Notification = {
            ...notification,
            id: this.generateId(),
            read: false,
            timestamp: new Date(),
        };

        this.notifications.unshift(newNotification);

        // Keep only max notifications
        if (this.notifications.length > this.maxNotifications) {
            this.notifications = this.notifications.slice(0, this.maxNotifications);
        }

        this.saveToStorage();
        this.notifyListeners();

        // Show browser notification if permitted
        this.showBrowserNotification(newNotification);

        return newNotification;
    }

    // Get all notifications
    getAll(): Notification[] {
        return [...this.notifications];
    }

    // Get unread notifications
    getUnread(): Notification[] {
        return this.notifications.filter(n => !n.read);
    }

    // Get unread count
    getUnreadCount(): number {
        return this.getUnread().length;
    }

    // Mark as read
    markAsRead(id: string): void {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.saveToStorage();
            this.notifyListeners();
        }
    }

    // Mark all as read
    markAllAsRead(): void {
        this.notifications.forEach(n => n.read = true);
        this.saveToStorage();
        this.notifyListeners();
    }

    // Delete notification
    delete(id: string): void {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.saveToStorage();
        this.notifyListeners();
    }

    // Clear all notifications
    clear(): void {
        this.notifications = [];
        this.saveToStorage();
        this.notifyListeners();
    }

    // Subscribe to notifications
    subscribe(listener: NotificationListener): () => void {
        this.listeners.add(listener);
        listener(this.notifications);

        // Return unsubscribe function
        return () => {
            this.listeners.delete(listener);
        };
    }

    // Notify all listeners
    private notifyListeners(): void {
        this.listeners.forEach(listener => {
            listener(this.notifications);
        });
    }

    // Generate unique ID
    private generateId(): string {
        return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Save to localStorage
    private saveToStorage(): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem('notifications', JSON.stringify(this.notifications));
        } catch (error) {
            console.error('Failed to save notifications:', error);
        }
    }

    // Load from localStorage
    private loadFromStorage(): void {
        if (typeof window === 'undefined') return;

        try {
            const stored = localStorage.getItem('notifications');
            if (stored) {
                const parsed = JSON.parse(stored);
                this.notifications = parsed.map((n: any) => ({
                    ...n,
                    timestamp: new Date(n.timestamp),
                }));
            }
        } catch (error) {
            console.error('Failed to load notifications:', error);
        }
    }

    // Show browser notification
    private async showBrowserNotification(notification: Notification): Promise<void> {
        if (typeof window === 'undefined' || !('Notification' in window)) return;

        // Request permission if needed
        if (Notification.permission === 'default') {
            await Notification.requestPermission();
        }

        // Show notification if permitted
        if (Notification.permission === 'granted') {
            const browserNotif = new Notification(notification.title, {
                body: notification.message,
                icon: '/icon-192x192.png',
                badge: '/icon-72x72.png',
                tag: notification.id,
            });

            browserNotif.onclick = () => {
                window.focus();
                if (notification.actionUrl) {
                    window.location.href = notification.actionUrl;
                }
                browserNotif.close();
            };
        }
    }

    // Request browser notification permission
    async requestPermission(): Promise<NotificationPermission> {
        if (typeof window === 'undefined' || !('Notification' in window)) {
            return 'denied';
        }

        return await Notification.requestPermission();
    }
}

// Global instance
export const notificationManager = new NotificationManager();

// React hook for notifications
export function useNotifications() {
    const [notifications, setNotifications] = React.useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = React.useState(0);

    React.useEffect(() => {
        const unsubscribe = notificationManager.subscribe((notifs) => {
            setNotifications(notifs);
            setUnreadCount(notifs.filter(n => !n.read).length);
        });

        return unsubscribe;
    }, []);

    return {
        notifications,
        unreadCount,
        add: (notif: Omit<Notification, 'id' | 'read' | 'timestamp'>) =>
            notificationManager.add(notif),
        markAsRead: (id: string) => notificationManager.markAsRead(id),
        markAllAsRead: () => notificationManager.markAllAsRead(),
        delete: (id: string) => notificationManager.delete(id),
        clear: () => notificationManager.clear(),
        requestPermission: () => notificationManager.requestPermission(),
    };
}

// Convenience functions
export function showSuccessNotification(title: string, message: string): void {
    notificationManager.add({ title, message, type: 'success' });
}

export function showErrorNotification(title: string, message: string): void {
    notificationManager.add({ title, message, type: 'error' });
}

export function showInfoNotification(title: string, message: string): void {
    notificationManager.add({ title, message, type: 'info' });
}

export function showWarningNotification(title: string, message: string): void {
    notificationManager.add({ title, message, type: 'warning' });
}

export default notificationManager;

// Usage examples:
/*
// Add notification
notificationManager.add({
  title: 'Report Processed',
  message: 'Your blood test results are ready',
  type: 'success',
  actionUrl: '/reports/123',
  actionLabel: 'View Report',
});

// React hook
function NotificationBell() {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  
  return (
    <div>
      <Badge count={unreadCount} />
      {notifications.map(n => (
        <NotificationItem 
          key={n.id} 
          notification={n}
          onRead={() => markAsRead(n.id)}
        />
      ))}
    </div>
  );
}

// Convenience functions
showSuccessNotification('Success!', 'Report uploaded');
showErrorNotification('Error', 'Upload failed');
*/

import React from 'react';
