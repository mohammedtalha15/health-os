// Form validation utilities
export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    email?: boolean;
    url?: boolean;
    custom?: (value: any) => boolean | string;
}

export interface ValidationRules {
    [field: string]: ValidationRule;
}

export interface ValidationErrors {
    [field: string]: string;
}

export function validate(
    data: Record<string, any>,
    rules: ValidationRules
): ValidationErrors {
    const errors: ValidationErrors = {};

    Object.keys(rules).forEach((field) => {
        const value = data[field];
        const rule = rules[field];

        // Required check
        if (rule.required && !value) {
            errors[field] = `${field} is required`;
            return;
        }

        // Skip other validations if value is empty and not required
        if (!value && !rule.required) return;

        // String length validations
        if (typeof value === 'string') {
            if (rule.minLength && value.length < rule.minLength) {
                errors[field] = `${field} must be at least ${rule.minLength} characters`;
                return;
            }
            if (rule.maxLength && value.length > rule.maxLength) {
                errors[field] = `${field} must be at most ${rule.maxLength} characters`;
                return;
            }
        }

        // Number validations
        if (typeof value === 'number') {
            if (rule.min !== undefined && value < rule.min) {
                errors[field] = `${field} must be at least ${rule.min}`;
                return;
            }
            if (rule.max !== undefined && value > rule.max) {
                errors[field] = `${field} must be at most ${rule.max}`;
                return;
            }
        }

        // Pattern validation
        if (rule.pattern && !rule.pattern.test(String(value))) {
            errors[field] = `${field} format is invalid`;
            return;
        }

        // Email validation
        if (rule.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(String(value))) {
                errors[field] = 'Invalid email address';
                return;
            }
        }

        // URL validation
        if (rule.url) {
            try {
                new URL(String(value));
            } catch {
                errors[field] = 'Invalid URL';
                return;
            }
        }

        // Custom validation
        if (rule.custom) {
            const result = rule.custom(value);
            if (result !== true) {
                errors[field] = typeof result === 'string' ? result : `${field} is invalid`;
            }
        }
    });

    return errors;
}

// Common validation rules
export const commonRules = {
    email: {
        required: true,
        email: true,
    },
    password: {
        required: true,
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    },
    name: {
        required: true,
        minLength: 2,
        maxLength: 100,
    },
    phone: {
        pattern: /^\+?[\d\s-()]+$/,
    },
    age: {
        required: true,
        min: 0,
        max: 150,
    },
};

// Sanitization utilities
export function sanitizeInput(input: string): string {
    return input
        .trim()
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, ''); // Remove event handlers
}

export function sanitizeEmail(email: string): string {
    return email.toLowerCase().trim();
}

export function sanitizePhone(phone: string): string {
    return phone.replace(/\D/g, ''); // Keep only digits
}

// Form helpers
export function hasErrors(errors: ValidationErrors): boolean {
    return Object.keys(errors).length > 0;
}

export function getFirstError(errors: ValidationErrors): string | null {
    const firstKey = Object.keys(errors)[0];
    return firstKey ? errors[firstKey] : null;
}

export function clearError(
    errors: ValidationErrors,
    field: string
): ValidationErrors {
    const newErrors = { ...errors };
    delete newErrors[field];
    return newErrors;
}

// Real-time validation hook helper
export function createValidator(rules: ValidationRules) {
    return (data: Record<string, any>) => validate(data, rules);
}

// Example usage:
/*
const loginRules: ValidationRules = {
  email: commonRules.email,
  password: commonRules.password,
};

const errors = validate(formData, loginRules);
if (hasErrors(errors)) {
  console.error('Validation failed:', errors);
}
*/
