// Data export utilities for various formats
import { HealthReport, HealthMetric } from '@/types';

// Export to CSV
export function exportToCSV(data: any[], filename: string): void {
    if (data.length === 0) {
        console.warn('No data to export');
        return;
    }

    // Get headers from first object
    const headers = Object.keys(data[0]);

    // Create CSV content
    const csvContent = [
        headers.join(','),
        ...data.map(row =>
            headers.map(header => {
                const value = row[header];
                // Escape commas and quotes
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',')
        )
    ].join('\n');

    downloadFile(csvContent, filename, 'text/csv');
}

// Export to JSON
export function exportToJSON(data: any, filename: string, pretty: boolean = true): void {
    const jsonContent = pretty
        ? JSON.stringify(data, null, 2)
        : JSON.stringify(data);

    downloadFile(jsonContent, filename, 'application/json');
}

// Export to Excel (XLSX)
export function exportToExcel(data: any[], filename: string): void {
    // This would require a library like xlsx
    // For now, export as CSV which Excel can open
    exportToCSV(data, filename.replace('.xlsx', '.csv'));
}

// Export metrics to CSV
export function exportMetricsToCSV(metrics: HealthMetric[], filename: string = 'health-metrics.csv'): void {
    const data = metrics.map(metric => ({
        Date: metric.date,
        Name: metric.name,
        Value: metric.value,
        Unit: metric.unit,
        'Reference Low': metric.refLow || 'N/A',
        'Reference High': metric.refHigh || 'N/A',
        Status: metric.severity,
        Trend: metric.trend || 'N/A',
        'Trend %': metric.trendPercent || 'N/A',
    }));

    exportToCSV(data, filename);
}

// Export reports to JSON
export function exportReportsToJSON(reports: HealthReport[], filename: string = 'health-reports.json'): void {
    exportToJSON(reports, filename);
}

// Export to PDF (requires html2pdf or similar)
export async function exportToPDF(elementId: string, filename: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error('Element not found');
        return;
    }

    // This would require html2pdf.js or similar library
    // For now, just print
    window.print();
}

// Export timeline data
export function exportTimelineData(
    metrics: HealthMetric[],
    format: 'csv' | 'json' = 'csv',
    filename?: string
): void {
    const defaultFilename = `health-timeline-${new Date().toISOString().split('T')[0]}`;

    if (format === 'csv') {
        exportMetricsToCSV(metrics, filename || `${defaultFilename}.csv`);
    } else {
        exportToJSON(metrics, filename || `${defaultFilename}.json`);
    }
}

// Export for Apple Health
export function exportForAppleHealth(metrics: HealthMetric[]): void {
    // Convert to Apple Health XML format
    const xml = generateAppleHealthXML(metrics);
    downloadFile(xml, 'apple-health-export.xml', 'application/xml');
}

// Export for Google Fit
export function exportForGoogleFit(metrics: HealthMetric[]): void {
    // Convert to Google Fit JSON format
    const data = generateGoogleFitJSON(metrics);
    exportToJSON(data, 'google-fit-export.json');
}

// Helper: Download file
function downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Helper: Generate Apple Health XML
function generateAppleHealthXML(metrics: HealthMetric[]): string {
    const records = metrics.map(metric => {
        const type = mapToAppleHealthType(metric.name);
        return `
  <Record type="${type}" 
          value="${metric.value}" 
          unit="${metric.unit}"
          startDate="${metric.date}"
          endDate="${metric.date}" />`;
    }).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<HealthData locale="en_US">
  <ExportDate value="${new Date().toISOString()}" />
  <Me HKCharacteristicTypeIdentifierDateOfBirth="1990-01-01" />
  ${records}
</HealthData>`;
}

// Helper: Generate Google Fit JSON
function generateGoogleFitJSON(metrics: HealthMetric[]): any {
    return {
        dataSourceId: 'health-os',
        minStartTimeNs: Date.now() * 1000000,
        maxEndTimeNs: Date.now() * 1000000,
        point: metrics.map(metric => ({
            startTimeNanos: new Date(metric.date).getTime() * 1000000,
            endTimeNanos: new Date(metric.date).getTime() * 1000000,
            dataTypeName: mapToGoogleFitType(metric.name),
            value: [{
                fpVal: metric.value,
            }],
        })),
    };
}

// Helper: Map metric name to Apple Health type
function mapToAppleHealthType(metricName: string): string {
    const mapping: Record<string, string> = {
        'Hemoglobin': 'HKQuantityTypeIdentifierBloodGlucose',
        'Blood Pressure': 'HKQuantityTypeIdentifierBloodPressureSystolic',
        'Heart Rate': 'HKQuantityTypeIdentifierHeartRate',
        'Weight': 'HKQuantityTypeIdentifierBodyMass',
        'Height': 'HKQuantityTypeIdentifierHeight',
        // Add more mappings
    };
    return mapping[metricName] || 'HKQuantityTypeIdentifierBloodGlucose';
}

// Helper: Map metric name to Google Fit type
function mapToGoogleFitType(metricName: string): string {
    const mapping: Record<string, string> = {
        'Hemoglobin': 'com.google.blood_glucose',
        'Blood Pressure': 'com.google.blood_pressure',
        'Heart Rate': 'com.google.heart_rate.bpm',
        'Weight': 'com.google.weight',
        'Height': 'com.google.height',
        // Add more mappings
    };
    return mapping[metricName] || 'com.google.blood_glucose';
}

// Batch export all data
export async function exportAllData(
    reports: HealthReport[],
    metrics: HealthMetric[],
    format: 'json' | 'zip' = 'json'
): Promise<void> {
    if (format === 'json') {
        const allData = {
            exportDate: new Date().toISOString(),
            reports,
            metrics,
            version: '1.0',
        };
        exportToJSON(allData, `health-os-export-${new Date().toISOString().split('T')[0]}.json`);
    } else {
        // For ZIP, would need JSZip library
        console.log('ZIP export not yet implemented');
    }
}

// Import from CSV
export async function importFromCSV(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const lines = text.split('\n');
                const headers = lines[0].split(',');

                const data = lines.slice(1).map(line => {
                    const values = line.split(',');
                    const obj: any = {};
                    headers.forEach((header, index) => {
                        obj[header.trim()] = values[index]?.trim();
                    });
                    return obj;
                });

                resolve(data);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = reject;
        reader.readAsText(file);
    });
}

// Import from JSON
export async function importFromJSON(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const data = JSON.parse(text);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = reject;
        reader.readAsText(file);
    });
}
