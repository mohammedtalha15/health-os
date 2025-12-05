import apiClient from './client';

export interface Report {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    status: 'processing' | 'processed' | 'failed';
    fileUrl?: string;
}

export interface ReportSummary {
    reportId: string;
    summary: string;
    style: 'basic' | 'normal' | 'doctor';
    metrics: Metric[];
    interpretations: Interpretation[];
}

export interface Metric {
    name: string;
    value: number | string;
    unit: string;
    refLow?: number;
    refHigh?: number;
    flag?: 'LOW' | 'HIGH' | 'CRITICAL' | 'NORMAL';
}

export interface Interpretation {
    metric: string;
    severity: 'green' | 'yellow' | 'red';
    explanation: string;
    suggestions?: string[];
    possibleCauses?: string[];
}

/**
 * Upload a medical report file
 */
export async function uploadReport(file: File): Promise<Report> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<Report>('/reports/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}

/**
 * Get report by ID
 */
export async function getReport(reportId: string): Promise<Report> {
    const response = await apiClient.get<Report>(`/reports/${reportId}`);
    return response.data;
}

/**
 * Get report summary with specified style
 */
export async function getReportSummary(
    reportId: string,
    style: 'basic' | 'normal' | 'doctor' = 'normal'
): Promise<ReportSummary> {
    const response = await apiClient.get<ReportSummary>(
        `/reports/${reportId}/summary`,
        {
            params: { style },
        }
    );
    return response.data;
}

/**
 * Get all reports for current user
 */
export async function getUserReports(): Promise<Report[]> {
    const response = await apiClient.get<Report[]>('/reports');
    return response.data;
}

/**
 * Delete a report
 */
export async function deleteReport(reportId: string): Promise<void> {
    await apiClient.delete(`/reports/${reportId}`);
}
