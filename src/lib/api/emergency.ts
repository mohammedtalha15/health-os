import apiClient from './client';

export interface EmergencySnapshotData {
    name: string;
    age: number;
    gender: string;
    bloodType?: string;
    allergies: Array<{ name: string; severity: 'mild' | 'moderate' | 'severe' }>;
    medications: Array<{ name: string; dosage: string; frequency: string }>;
    criticalFlags: Array<{ metric: string; value: number; severity: 'red' }>;
    lastVitals?: { heartRate?: number; bloodPressure?: string; temperature?: number };
    emergencyContacts: Array<{ name: string; relation: string; phone: string }>;
}

export interface EmergencyLinkResponse {
    link_id: string;
    share_link: string;
    expires_at: string;
    qr_code_data: string;
}

export interface GenerateEmergencyLinkRequest {
    profile_id: number;
    medications?: Array<{ name: string; dosage: string; frequency: string }>;
    critical_flags?: Array<{ metric: string; value: number; severity: 'red' }>;
    last_vitals?: { heartRate?: number; bloodPressure?: string; temperature?: number };
    emergency_contacts?: Array<{ name: string; relation: string; phone: string }>;
    blood_type?: string;
    password?: string;
    expires_in_hours?: number;
}

/**
 * Generate an ephemeral emergency snapshot link
 */
export async function generateEmergencyLink(
    data: GenerateEmergencyLinkRequest
): Promise<EmergencyLinkResponse> {
    const response = await apiClient.post('/emergency/generate', data);
    return response.data;
}

/**
 * Get emergency snapshot by link ID (public endpoint)
 */
export async function getEmergencySnapshot(
    linkId: string,
    password?: string
): Promise<EmergencySnapshotData> {
    const params = password ? { password } : {};
    const response = await apiClient.get(`/emergency/${linkId}`, { params });
    return response.data;
}

/**
 * Revoke an emergency link
 */
export async function revokeEmergencyLink(linkId: string): Promise<void> {
    await apiClient.delete(`/emergency/${linkId}`);
}
