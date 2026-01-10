/**
 * Performance Monitoring Utility
 */

interface PerformanceMark {
    name: string;
    startTime: number;
    duration?: number;
}

class PerformanceMonitor {
    private marks: Map<string, number> = new Map();
    private measurements: PerformanceMark[] = [];

    /**
     * Start a performance measurement
     */
    start(name: string): void {
        if (typeof performance === 'undefined') return;
        this.marks.set(name, performance.now());
    }

    /**
     * End a performance measurement
     */
    end(name: string): number | null {
        if (typeof performance === 'undefined') return null;

        const startTime = this.marks.get(name);
        if (!startTime) {
            console.warn(`No start mark found for: ${name}`);
            return null;
        }

        const endTime = performance.now();
        const duration = endTime - startTime;

        this.measurements.push({
            name,
            startTime,
            duration,
        });

        this.marks.delete(name);
        return duration;
    }

    /**
     * Measure a function execution time
     */
    async measure<T>(name: string, fn: () => T | Promise<T>): Promise<T> {
        this.start(name);
        try {
            const result = await fn();
            const duration = this.end(name);
            if (duration !== null) {
                console.log(`⏱️  ${name}: ${duration.toFixed(2)}ms`);
            }
            return result;
        } catch (error) {
            this.end(name);
            throw error;
        }
    }

    /**
     * Get all measurements
     */
    getMeasurements(): PerformanceMark[] {
        return [...this.measurements];
    }

    /**
     * Get measurements by name
     */
    getMeasurementsByName(name: string): PerformanceMark[] {
        return this.measurements.filter(m => m.name === name);
    }

    /**
     * Get average duration for a measurement
     */
    getAverageDuration(name: string): number | null {
        const measurements = this.getMeasurementsByName(name);
        if (measurements.length === 0) return null;

        const total = measurements.reduce((sum, m) => sum + (m.duration || 0), 0);
        return total / measurements.length;
    }

    /**
     * Clear all measurements
     */
    clear(): void {
        this.marks.clear();
        this.measurements = [];
    }

    /**
     * Log performance summary
     */
    logSummary(): void {
        if (this.measurements.length === 0) {
            console.log('No performance measurements recorded');
            return;
        }

        console.group('📊 Performance Summary');

        const grouped = this.measurements.reduce((acc, m) => {
            if (!acc[m.name]) {
                acc[m.name] = [];
            }
            acc[m.name].push(m.duration || 0);
            return acc;
        }, {} as Record<string, number[]>);

        Object.entries(grouped).forEach(([name, durations]) => {
            const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
            const min = Math.min(...durations);
            const max = Math.max(...durations);

            console.log(`${name}:`);
            console.log(`  Count: ${durations.length}`);
            console.log(`  Avg: ${avg.toFixed(2)}ms`);
            console.log(`  Min: ${min.toFixed(2)}ms`);
            console.log(`  Max: ${max.toFixed(2)}ms`);
        });

        console.groupEnd();
    }
}

export const performanceMonitor = new PerformanceMonitor();
