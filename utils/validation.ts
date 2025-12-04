/**
 * Validation Utilities
 * 
 * Comprehensive validation functions for form fields.
 * These validators match backend API validation rules.
 */

// Basic Validators
export const isRequired = (value: string | null | undefined): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return !!value;
};

export const isValidEmail = (value: string): boolean => {
  if (!value) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim());
};

export const isValidPhoneNumber = (value: string): boolean => {
  if (!value) return false;
  const cleaned = value.replace(/\D/g, '');
  return cleaned.length >= 7 && cleaned.length <= 15;
};

export const isValidPin = (value: string): boolean => {
  if (!value) return false;
  return /^\d{4,10}$/.test(value.trim());
};

// String Length Validators
export const minLength = (value: string, min: number): boolean => {
  if (!value) return false;
  return value.trim().length >= min;
};

export const maxLength = (value: string, max: number): boolean => {
  if (!value) return true; // Empty is handled by required validator
  return value.trim().length <= max;
};

export const exactLength = (value: string, length: number): boolean => {
  if (!value) return false;
  return value.trim().length === length;
};

// Number Validators
export const isNumber = (value: string): boolean => {
  if (!value) return false;
  return !isNaN(Number(value)) && value.trim() !== '';
};

export const minValue = (value: number, min: number): boolean => {
  return value >= min;
};

export const maxValue = (value: number, max: number): boolean => {
  return value <= max;
};

// Format Validators
export const isValidIFSC = (value: string): boolean => {
  if (!value) return false;
  // IFSC: 11 characters, first 4 letters, 5th is 0, last 6 alphanumeric
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.toUpperCase());
};

export const isValidMICR = (value: string): boolean => {
  if (!value) return false;
  // MICR: 9 digits
  return /^\d{9}$/.test(value.trim());
};

export const isValidLicenseNumber = (value: string): boolean => {
  if (!value) return false;
  // License number: typically 5-20 alphanumeric characters
  return /^[A-Z0-9]{5,20}$/i.test(value.trim());
};

export const isValidAccountNumber = (value: string): boolean => {
  if (!value) return false;
  // Account number: typically 9-18 digits
  return /^\d{9,18}$/.test(value.trim());
};

export const isValidTIN = (value: string): boolean => {
  if (!value) return false;
  // TIN: alphanumeric, typically 9-15 characters
  return /^[A-Z0-9]{9,15}$/i.test(value.trim());
};

// Date Validators
export const isValidDate = (value: string): boolean => {
  if (!value) return false;
  const date = new Date(value);
  return date instanceof Date && !isNaN(date.getTime());
};

export const isPastDate = (value: string): boolean => {
  if (!value) return false;
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export const isFutureDate = (value: string): boolean => {
  if (!value) return false;
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
};

// Password Validators
export const isValidPassword = (value: string): boolean => {
  if (!value) return false;
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(value);
};

export const passwordStrength = (value: string): 'weak' | 'medium' | 'strong' => {
  if (!value || value.length < 8) return 'weak';
  
  let strength = 0;
  if (/[a-z]/.test(value)) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/\d/.test(value)) strength++;
  if (/[@$!%*?&]/.test(value)) strength++;
  
  if (strength <= 2) return 'weak';
  if (strength === 3) return 'medium';
  return 'strong';
};

// Username Validator
export const isValidUsername = (value: string): boolean => {
  if (!value) return false;
  // Username: 3-50 alphanumeric characters, may include underscore/hyphen
  return /^[a-zA-Z0-9_-]{3,50}$/.test(value.trim());
};

// Sanitization Functions
export const sanitizePhoneNumber = (value: string): string => {
  return value.replace(/[^0-9]/g, '');
};

export const sanitizeEmail = (value: string): string => {
  return value.trim().toLowerCase();
};

export const sanitizeText = (value: string): string => {
  return value.trim();
};

// URL Validator
export const isValidURL = (value: string): boolean => {
  if (!value) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

// Enum Validator
export const isValidEnum = <T extends string>(
  value: string,
  allowedValues: T[]
): value is T => {
  return allowedValues.includes(value as T);
};
