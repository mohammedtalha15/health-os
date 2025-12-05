import apiClient from './client';

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupData {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

/**
 * Login user
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);

    // Store token in localStorage
    if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
    }

    return response.data;
}

/**
 * Signup new user
 */
export async function signup(data: SignupData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);

    // Store token in localStorage
    if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
    }

    return response.data;
}

/**
 * Logout user
 */
export function logout(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
    }
}

/**
 * Refresh auth token
 */
export async function refreshToken(): Promise<string> {
    const response = await apiClient.post<{ token: string }>('/auth/refresh');

    if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
    }

    return response.data.token;
}
