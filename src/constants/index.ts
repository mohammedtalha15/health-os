/**
 * Application Constants
 */

// App Information
export const APP_NAME = 'Health OS';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Your Personal Health Operating System';

// API Configuration
export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000; // 1 second

// Storage Keys
export const STORAGE_KEYS = {
    USER_PREFERENCES: 'health_os_user_preferences',
    THEME: 'health_os_theme',
    AUTH_TOKEN: 'health_os_auth_token',
    LAST_SYNC: 'health_os_last_sync',
    ONBOARDING_COMPLETED: 'health_os_onboarding_completed',
} as const;

// Routes
export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    UPLOAD: '/upload',
    TIMELINE: '/timeline',
    SETTINGS: '/settings',
    PROFILE: '/profile',
    LOGIN: '/login',
    SIGNUP: '/signup',
} as const;

// Breakpoints (in pixels)
export const BREAKPOINTS = {
    MOBILE: 480,
    TABLET: 768,
    DESKTOP: 1024,
    WIDE: 1440,
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
} as const;

// File Upload
export const FILE_UPLOAD = {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/jpg',
    ],
    ALLOWED_EXTENSIONS: ['.pdf', '.jpg', '.jpeg', '.png'],
} as const;

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

// Date Formats
export const DATE_FORMATS = {
    SHORT: 'MMM DD, YYYY',
    LONG: 'MMMM DD, YYYY',
    WITH_TIME: 'MMM DD, YYYY HH:mm',
    TIME_ONLY: 'HH:mm',
} as const;

// Health Metrics
export const HEALTH_METRICS = {
    BLOOD_PRESSURE: 'blood_pressure',
    HEART_RATE: 'heart_rate',
    BLOOD_SUGAR: 'blood_sugar',
    WEIGHT: 'weight',
    TEMPERATURE: 'temperature',
    OXYGEN_SATURATION: 'oxygen_saturation',
} as const;

// Toast Notification Durations (in milliseconds)
export const TOAST_DURATION = {
    SHORT: 2000,
    NORMAL: 4000,
    LONG: 6000,
} as const;

// Debounce Delays (in milliseconds)
export const DEBOUNCE_DELAY = {
    SEARCH: 300,
    INPUT: 500,
    RESIZE: 150,
} as const;

// Feature Flags
export const FEATURES = {
    AI_CHAT: true,
    DARK_MODE: true,
    NOTIFICATIONS: true,
    ANALYTICS: false,
    BETA_FEATURES: false,
} as const;
