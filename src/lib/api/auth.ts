import apiClient from './client';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
}

/**
 * Login with email and password
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login', data);

    // Store token in localStorage
    if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
    }

    return response.data;
}

/**
 * Sign up new user
 */
export async function signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/signup', data);

    // Store token in localStorage
    if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
    }

    return response.data;
}

/**
 * Logout user
 */
export function logout(): void {
    localStorage.removeItem('auth_token');
}

/**
 * Get current auth token
 */
export function getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    return !!getAuthToken();
}
