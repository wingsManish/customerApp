/**
 * Validation Service
 * 
 * Provides form validation functionality that matches backend API validation.
 * Handles both frontend validation and API validation error syncing.
 */

import {
  isRequired,
  isValidEmail,
  isValidPhoneNumber,
  isValidPin,
  isValidIFSC,
  isValidMICR,
  isValidAccountNumber,
  isValidLicenseNumber,
  isValidPassword,
  isValidUsername,
  minLength,
  maxLength,
} from '@/utils/validation';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message?: string;
}

export interface ValidationRules {
  [fieldName: string]: ValidationRule | ValidationRule[];
}

export interface ValidationErrors {
  [fieldName: string]: string[];
}

export class ValidationService {
  /**
   * Validate a single field
   */
  static validateField(
    fieldName: string,
    value: any,
    rules: ValidationRule | ValidationRule[]
  ): string[] {
    const errors: string[] = [];
    const ruleArray = Array.isArray(rules) ? rules : [rules];

    for (const rule of ruleArray) {
      // Required check
      if (rule.required && !isRequired(value)) {
        errors.push(rule.message || `${fieldName} is required`);
        continue; // Don't check other rules if required fails
      }

      // Skip other validations if field is empty and not required
      if (!value && !rule.required) {
        continue;
      }

      // Min length
      if (rule.minLength && typeof value === 'string') {
        if (!minLength(value, rule.minLength)) {
          errors.push(
            rule.message ||
              `${fieldName} must be at least ${rule.minLength} characters`
          );
        }
      }

      // Max length
      if (rule.maxLength && typeof value === 'string') {
        if (!maxLength(value, rule.maxLength)) {
          errors.push(
            rule.message ||
              `${fieldName} must be no more than ${rule.maxLength} characters`
          );
        }
      }

      // Pattern match
      if (rule.pattern && typeof value === 'string') {
        if (!rule.pattern.test(value)) {
          errors.push(rule.message || `${fieldName} format is invalid`);
        }
      }

      // Custom validation
      if (rule.custom) {
        if (!rule.custom(value)) {
          errors.push(rule.message || `${fieldName} is invalid`);
        }
      }
    }

    return errors;
  }

  /**
   * Validate entire form
   */
  static validateForm(
    data: Record<string, any>,
    rules: ValidationRules
  ): ValidationErrors {
    const errors: ValidationErrors = {};

    for (const [fieldName, fieldRules] of Object.entries(rules)) {
      const value = this.getNestedValue(data, fieldName);
      const fieldErrors = this.validateField(fieldName, value, fieldRules);

      if (fieldErrors.length > 0) {
        errors[fieldName] = fieldErrors;
      }
    }

    return errors;
  }

  /**
   * Get nested value from object (supports dot notation like "primaryContactDto.firstName")
   */
  private static getNestedValue(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Check if form is valid
   */
  static isValid(errors: ValidationErrors): boolean {
    return Object.keys(errors).length === 0;
  }

  /**
   * Get first error message for a field
   */
  static getFirstError(
    errors: ValidationErrors,
    fieldName: string
  ): string | undefined {
    return errors[fieldName]?.[0];
  }

  /**
   * Get all error messages for a field
   */
  static getErrors(
    errors: ValidationErrors,
    fieldName: string
  ): string[] {
    return errors[fieldName] || [];
  }

  /**
   * Merge API validation errors with frontend errors
   */
  static mergeErrors(
    frontendErrors: ValidationErrors,
    apiErrors: ValidationErrors
  ): ValidationErrors {
    return {
      ...frontendErrors,
      ...apiErrors,
    };
  }

  /**
   * Clear errors for a specific field
   */
  static clearFieldError(
    errors: ValidationErrors,
    fieldName: string
  ): ValidationErrors {
    const newErrors = { ...errors };
    delete newErrors[fieldName];
    return newErrors;
  }

  /**
   * Clear all errors
   */
  static clearAllErrors(): ValidationErrors {
    return {};
  }
}

/**
 * Handle API validation errors
 */
export const handleApiValidationErrors = (
  apiResponse: { statusCode: number; data?: { errors?: ValidationErrors } },
  setErrors: (errors: ValidationErrors) => void
): boolean => {
  if (apiResponse.statusCode === 400 && apiResponse.data?.errors) {
    // API returned validation errors
    setErrors(apiResponse.data.errors);
    return false; // Form is invalid
  }

  return true; // No validation errors
};

