/**
 * Common TypeScript Type Definitions
 */

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// Common Props
export interface BaseComponentProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

// API Response Types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// User Types
export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserPreferences {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    language: string;
}

// Health Data Types
export interface HealthMetric {
    id: string;
    type: string;
    value: number;
    unit: string;
    timestamp: string;
    notes?: string;
}

export interface HealthReport {
    id: string;
    userId: string;
    title: string;
    type: string;
    fileUrl: string;
    uploadedAt: string;
    processedAt?: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    metadata?: Record<string, any>;
}

// Form Types
export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea';
    placeholder?: string;
    required?: boolean;
    validation?: (value: any) => string | undefined;
}

export interface FormErrors {
    [key: string]: string;
}

// Navigation Types
export interface NavItem {
    label: string;
    href: string;
    icon?: React.ComponentType;
    badge?: number;
    children?: NavItem[];
}

// Toast/Notification Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

// Modal Types
export interface ModalProps extends BaseComponentProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Table Types
export interface TableColumn<T = any> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
    width?: string;
}

export interface TableProps<T = any> {
    columns: TableColumn<T>[];
    data: T[];
    loading?: boolean;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
}

// Chart Types
export interface ChartDataPoint {
    label: string;
    value: number;
    color?: string;
}

export interface ChartProps {
    data: ChartDataPoint[];
    width?: number;
    height?: number;
    showLegend?: boolean;
}

// File Upload Types
export interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
    uploadedAt: string;
}

export interface FileUploadProgress {
    fileId: string;
    progress: number;
    status: 'uploading' | 'completed' | 'failed';
}
