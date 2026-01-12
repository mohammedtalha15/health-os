// Constants for Health OS application

export const APP_NAME = 'Health OS';
export const APP_DESCRIPTION = 'Your personal health clarity engine';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000; // 1 second

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Health Metrics
export const SEVERITY_COLORS = {
    green: '#10b981',
    yellow: '#f59e0b',
    red: '#ef4444',
} as const;

export const METRIC_TRENDS = {
    up: '↑',
    down: '↓',
    stable: '→',
} as const;

// Report Types
export const REPORT_TYPES = {
    lab: 'Lab Report',
    prescription: 'Prescription',
    discharge: 'Discharge Summary',
    imaging: 'Imaging Report',
    other: 'Other',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
    info: 'Information',
    success: 'Success',
    warning: 'Warning',
    danger: 'Critical',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
    THEME: 'health-os-theme',
    USER_PREFERENCES: 'health-os-preferences',
    AUTH_TOKEN: 'health-os-token',
    RECENT_SEARCHES: 'health-os-recent-searches',
} as const;

// Animation Durations (ms)
export const ANIMATION_DURATION = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
} as const;

// Z-Index Layers
export const Z_INDEX = {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
} as const;

// Breakpoints (matches CSS)
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
} as const;

// Date Formats
export const DATE_FORMATS = {
    SHORT: 'MM/DD/YYYY',
    LONG: 'MMMM DD, YYYY',
    TIME: 'HH:mm:ss',
    DATETIME: 'MM/DD/YYYY HH:mm',
} as const;
