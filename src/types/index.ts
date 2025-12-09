export interface HealthMetric {
    metric: string;
    value: number | string;
    unit: string;
    refLow: number;
    refHigh: number;
    severity: 'green' | 'yellow' | 'red';
    trend?: 'up' | 'down' | 'stable';
    trendPercent?: number;
    date: string;
}

export interface TimelineEntry {
    id: number;
    type: 'report' | 'alert' | 'prescription' | 'vital';
    date: string;
    title: string;
    summary?: string;
    severity?: 'green' | 'yellow' | 'red';
    data?: any;
}

export interface Profile {
    id: number;
    name: string;
    age: number;
    gender: string;
    relation: string;
    avatar?: string;
    dateOfBirth?: string;
    allergies?: Array<{ name: string; severity: 'mild' | 'moderate' | 'severe' }>;
    medications?: Array<{ name: string; dosage: string; frequency: string }>;
}

export interface Report {
    id: number;
    name: string;
    date: string;
    type: string;
    status: 'processing' | 'processed' | 'failed';
    s3Path?: string;
    parsedData?: any;
}

export interface Alert {
    id: number;
    message: string;
    severity: 'success' | 'warning' | 'danger' | 'critical';
    date: string;
    read?: boolean;
}

export interface LLMExplanation {
    basic: string;
    normal: string;
    doctor: string;
}
