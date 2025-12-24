// Feature flags system for gradual rollouts and A/B testing
interface FeatureFlag {
    enabled: boolean;
    rolloutPercentage?: number;
    userGroups?: string[];
    startDate?: Date;
    endDate?: Date;
}

interface FeatureFlags {
    [key: string]: FeatureFlag;
}

class FeatureFlagManager {
    private flags: FeatureFlags;
    private userId?: string;

    constructor() {
        this.flags = this.getDefaultFlags();
    }

    private getDefaultFlags(): FeatureFlags {
        return {
            // UI Features
            darkMode: { enabled: true },
            newDashboard: { enabled: false, rolloutPercentage: 50 },
            advancedCharts: { enabled: false, rolloutPercentage: 25 },

            // Functionality
            aiInsights: { enabled: true },
            batchUpload: { enabled: false, userGroups: ['premium'] },
            exportPDF: { enabled: true },
            shareReports: { enabled: true },

            // Integrations
            appleHealthSync: { enabled: false },
            googleFitSync: { enabled: false },
            wearableDevices: { enabled: false, rolloutPercentage: 10 },

            // Experimental
            voiceInput: { enabled: false, userGroups: ['beta'] },
            predictiveAnalytics: { enabled: false, userGroups: ['beta'] },
            telemedicine: { enabled: false },

            // Performance
            lazyLoading: { enabled: true },
            imageOptimization: { enabled: true },
            caching: { enabled: true },
        };
    }

    setUserId(userId: string): void {
        this.userId = userId;
    }

    // Check if feature is enabled for current user
    isEnabled(featureName: string): boolean {
        const flag = this.flags[featureName];

        if (!flag) {
            console.warn(`Feature flag "${featureName}" not found`);
            return false;
        }

        // Check if feature is globally disabled
        if (!flag.enabled) return false;

        // Check date range
        if (flag.startDate && new Date() < flag.startDate) return false;
        if (flag.endDate && new Date() > flag.endDate) return false;

        // Check user groups
        if (flag.userGroups && flag.userGroups.length > 0) {
            const userGroup = this.getUserGroup();
            if (!userGroup || !flag.userGroups.includes(userGroup)) {
                return false;
            }
        }

        // Check rollout percentage
        if (flag.rolloutPercentage !== undefined) {
            return this.isInRollout(featureName, flag.rolloutPercentage);
        }

        return true;
    }

    // Determine if user is in rollout percentage
    private isInRollout(featureName: string, percentage: number): boolean {
        if (!this.userId) return false;

        // Use consistent hash to determine if user is in rollout
        const hash = this.hashString(`${featureName}_${this.userId}`);
        return (hash % 100) < percentage;
    }

    // Simple string hash function
    private hashString(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    // Get user group (would be fetched from user profile in real app)
    private getUserGroup(): string | null {
        // This would come from user profile
        // For now, return null or check localStorage
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('userGroup');
    }

    // Enable/disable feature (for admin use)
    setFlag(featureName: string, enabled: boolean): void {
        if (this.flags[featureName]) {
            this.flags[featureName].enabled = enabled;
        }
    }

    // Get all flags
    getAllFlags(): FeatureFlags {
        return { ...this.flags };
    }

    // Get enabled features for current user
    getEnabledFeatures(): string[] {
        return Object.keys(this.flags).filter(key => this.isEnabled(key));
    }

    // Override flags (for testing)
    overrideFlags(flags: Partial<FeatureFlags>): void {
        this.flags = { ...this.flags, ...flags };
    }

    // Reset to defaults
    reset(): void {
        this.flags = this.getDefaultFlags();
    }
}

// Global instance
export const featureFlags = new FeatureFlagManager();

// React hook for feature flags
export function useFeatureFlag(featureName: string): boolean {
    if (typeof window === 'undefined') return false;
    return featureFlags.isEnabled(featureName);
}

// HOC for feature-gated components
export function withFeatureFlag<P extends object>(
    featureName: string,
    Component: React.ComponentType<P>,
    Fallback?: React.ComponentType<P>
) {
    return function FeatureGatedComponent(props: P) {
        const isEnabled = featureFlags.isEnabled(featureName);

        if (!isEnabled && Fallback) {
            return <Fallback { ...props } />;
        }

        if (!isEnabled) {
            return null;
        }

        return <Component { ...props } />;
    };
}

export default featureFlags;

// Usage examples:
/*
// Check feature flag
if (featureFlags.isEnabled('newDashboard')) {
  // Show new dashboard
}

// React hook
function MyComponent() {
  const hasAI = useFeatureFlag('aiInsights');
  
  return hasAI ? <AIInsights /> : <BasicInsights />;
}

// HOC
const NewDashboard = withFeatureFlag(
  'newDashboard',
  NewDashboardComponent,
  OldDashboardComponent
);

// Set user for rollout
featureFlags.setUserId('user_123');
*/
