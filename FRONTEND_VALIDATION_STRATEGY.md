# Frontend Validation Strategy

## Overview

**Yes, we can and SHOULD handle form validation on the frontend.** This document outlines a comprehensive validation strategy that aligns with the backend API requirements.

---

## Why Frontend Validation?

### ✅ Benefits
1. **Better UX** - Immediate feedback, no waiting for API response
2. **Reduced API Calls** - Catch errors before submission
3. **Offline Support** - Validate even without network
4. **Cost Savings** - Fewer failed API requests
5. **Performance** - Faster user feedback

### ⚠️ Important Note
**Frontend validation is NOT a replacement for backend validation.** Always validate on both sides:
- **Frontend:** For UX and immediate feedback
- **Backend:** For security and data integrity (source of truth)

---

## Current Validation Implementation

### Existing Validators (`utils/validation.ts`)
```typescript
✓ isRequired() - Checks if value is not empty
✓ isValidEmail() - Email format validation
✓ isValidPhoneNumber() - Phone number format (7-15 digits)
✓ isValidPin() - PIN code format (4-10 digits)
✓ sanitizePhoneNumber() - Removes non-numeric characters
```

### Current Form Validation
- ✅ Personal Info form
- ✅ Company Details form
- ✅ Contact Info form
- ✅ Bank Details form
- ✅ Emergency Info form

---

## API Validation Error Format

Based on the API documentation, validation errors follow this structure:

```typescript
{
  statusCode: 400,
  success: false,
  message: "Validation failed",
  data: {
    errors: {
      "fieldName": ["Error message 1", "Error message 2"],
      "anotherField": ["Error message"]
    }
  }
}
```

---

## Enhanced Validation Strategy

### 1. Extend Validation Utilities

Create comprehensive validators that match API requirements:

```typescript
// utils/validation.ts (Enhanced)

// Basic Validators
export const isRequired = (value: string | null | undefined): boolean => {
  return value !== null && value !== undefined && value.trim().length > 0;
};

export const isValidEmail = (value: string): boolean => {
  if (!value) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim());
};

export const isValidPhoneNumber = (value: string): boolean => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.length >= 7 && cleaned.length <= 15;
};

export const isValidPin = (value: string): boolean => {
  return /^\d{4,10}$/.test(value);
};

// String Length Validators
export const minLength = (value: string, min: number): boolean => {
  return value.trim().length >= min;
};

export const maxLength = (value: string, max: number): boolean => {
  return value.trim().length <= max;
};

export const exactLength = (value: string, length: number): boolean => {
  return value.trim().length === length;
};

// Number Validators
export const isNumber = (value: string): boolean => {
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
  // IFSC: 11 characters, first 4 letters, 5th is 0, last 6 alphanumeric
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.toUpperCase());
};

export const isValidMICR = (value: string): boolean => {
  // MICR: 9 digits
  return /^\d{9}$/.test(value);
};

export const isValidLicenseNumber = (value: string): boolean => {
  // License number format (adjust based on your country)
  return value.trim().length >= 5 && value.trim().length <= 20;
};

export const isValidAccountNumber = (value: string): boolean => {
  // Account number: typically 9-18 digits
  return /^\d{9,18}$/.test(value);
};

export const isValidTIN = (value: string): boolean => {
  // TIN: alphanumeric, typically 9-15 characters
  return /^[A-Z0-9]{9,15}$/i.test(value);
};

// Date Validators
export const isValidDate = (value: string): boolean => {
  const date = new Date(value);
  return date instanceof Date && !isNaN(date.getTime());
};

export const isPastDate = (value: string): boolean => {
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export const isFutureDate = (value: string): boolean => {
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
};

// URL Validators
export const isValidURL = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
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

// Password Validators
export const isValidPassword = (value: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(value);
};

export const passwordStrength = (value: string): 'weak' | 'medium' | 'strong' => {
  if (value.length < 8) return 'weak';
  
  let strength = 0;
  if (/[a-z]/.test(value)) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/\d/.test(value)) strength++;
  if (/[@$!%*?&]/.test(value)) strength++;
  
  if (strength <= 2) return 'weak';
  if (strength === 3) return 'medium';
  return 'strong';
};
```

---

## Validation Rules Based on API

### Company Creation API (`POST /company`)

Based on Postman collection, required fields:

```typescript
interface CompanyValidationRules {
  name: {
    required: true;
    minLength: 2;
    maxLength: 100;
  };
  ownerName: {
    required: true;
    minLength: 2;
    maxLength: 100;
  };
  licenseNo: {
    required: true;
    validate: isValidLicenseNumber;
  };
  address1: {
    required: true;
    minLength: 5;
    maxLength: 200;
  };
  city: {
    required: true;
    minLength: 2;
    maxLength: 50;
  };
  state: {
    required: true;
    minLength: 2;
    maxLength: 50;
  };
  country: {
    required: true;
    minLength: 2;
    maxLength: 50;
  };
  pinCode: {
    required: true;
    validate: isValidPin;
  };
  phone: {
    required: true;
    validate: isValidPhoneNumber;
  };
  primaryContactDto: {
    firstName: { required: true; minLength: 2; maxLength: 50; };
    lastName: { required: true; minLength: 1; maxLength: 50; };
    mobile: { required: true; validate: isValidPhoneNumber; };
    emailId: { required: true; validate: isValidEmail; };
    userName: { required: true; minLength: 3; maxLength: 50; };
    password: { required: true; validate: isValidPassword; };
  };
  bankAcNo: {
    required: true;
    validate: isValidAccountNumber;
  };
  bankName: {
    required: true;
    minLength: 2;
    maxLength: 100;
  };
  accountType: {
    required: true;
    enum: ['Savings', 'Current', 'Checking'];
  };
  bankBranch: {
    required: true;
    minLength: 2;
    maxLength: 100;
  };
  ifsc: {
    required: false;
    validate: isValidIFSC; // If provided, must be valid
  };
  micr: {
    required: false;
    validate: isValidMICR; // If provided, must be valid
  };
}
```

---

## Validation Service Pattern

### Create a Validation Service

```typescript
// services/validationService.ts

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
      const value = data[fieldName];
      const fieldErrors = this.validateField(fieldName, value, fieldRules);

      if (fieldErrors.length > 0) {
        errors[fieldName] = fieldErrors;
      }
    }

    return errors;
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
}
```

---

## Form Validation Rules

### Company Form Rules

```typescript
// validationRules/companyRules.ts

import { ValidationRules } from '@/services/validationService';
import {
  isValidEmail,
  isValidPhoneNumber,
  isValidPin,
  isValidIFSC,
  isValidMICR,
  isValidAccountNumber,
  isValidLicenseNumber,
  isValidPassword,
} from '@/utils/validation';

export const companyValidationRules: ValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    message: 'Company name is required',
  },
  ownerName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    message: 'Owner name is required',
  },
  licenseNo: {
    required: true,
    custom: isValidLicenseNumber,
    message: 'Valid license number is required',
  },
  address1: {
    required: true,
    minLength: 5,
    maxLength: 200,
    message: 'Address is required',
  },
  city: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'City is required',
  },
  state: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'State is required',
  },
  country: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Country is required',
  },
  pinCode: {
    required: true,
    custom: isValidPin,
    message: 'Valid PIN code is required',
  },
  phone: {
    required: true,
    custom: isValidPhoneNumber,
    message: 'Valid phone number is required',
  },
  bankAcNo: {
    required: true,
    custom: isValidAccountNumber,
    message: 'Valid account number is required',
  },
  bankName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    message: 'Bank name is required',
  },
  accountType: {
    required: true,
    custom: (value: string) => ['Savings', 'Current', 'Checking'].includes(value),
    message: 'Account type is required',
  },
  bankBranch: {
    required: true,
    minLength: 2,
    maxLength: 100,
    message: 'Bank branch is required',
  },
  ifsc: {
    required: false,
    custom: (value: string) => !value || isValidIFSC(value),
    message: 'IFSC code must be 11 characters',
  },
  micr: {
    required: false,
    custom: (value: string) => !value || isValidMICR(value),
    message: 'MICR code must be 9 digits',
  },
  'primaryContactDto.firstName': {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'First name is required',
  },
  'primaryContactDto.emailId': {
    required: true,
    custom: isValidEmail,
    message: 'Valid email is required',
  },
  'primaryContactDto.mobile': {
    required: true,
    custom: isValidPhoneNumber,
    message: 'Valid mobile number is required',
  },
  'primaryContactDto.userName': {
    required: true,
    minLength: 3,
    maxLength: 50,
    message: 'Username is required',
  },
  'primaryContactDto.password': {
    required: true,
    custom: isValidPassword,
    message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
  },
};
```

---

## Usage in Forms

### Example: Company Details Form

```typescript
// app/company-details.tsx

import { ValidationService } from '@/services/validationService';
import { companyValidationRules } from '@/validationRules/companyRules';

export default function CompanyDetailsScreen() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    licenseNo: '',
    // ... other fields
  });

  const validateForm = (): boolean => {
    // Frontend validation
    const frontendErrors = ValidationService.validateForm(
      formData,
      companyValidationRules
    );

    setErrors(frontendErrors);
    return ValidationService.isValid(frontendErrors);
  };

  const handleSubmit = async () => {
    // Validate on frontend first
    if (!validateForm()) {
      return; // Don't submit if frontend validation fails
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post('/company', formData);

      if (!response.success) {
        // Handle API validation errors
        if (response.statusCode === 400 && response.data?.errors) {
          const apiErrors = response.data.errors;
          const mergedErrors = ValidationService.mergeErrors(errors, apiErrors);
          setErrors(mergedErrors);
          return;
        }
      }

      // Success - navigate to next screen
      router.push('/next-screen');
    } catch (error) {
      // Handle network/other errors
      Alert.alert('Error', 'Failed to save. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Form JSX with error display
    <View>
      <TextInput
        value={formData.name}
        onChangeText={(text) => {
          setFormData({ ...formData, name: text });
          // Clear error when user starts typing
          if (errors.name) {
            setErrors({ ...errors, name: [] });
          }
        }}
        error={!!errors.name}
        errorText={ValidationService.getFirstError(errors, 'name')}
      />
      {/* Other fields */}
    </View>
  );
}
```

---

## Handling API Validation Errors

### Sync Frontend and Backend Errors

```typescript
// utils/apiErrorHandler.ts

import { ApiResponse } from '@/services/apiClient';
import { ValidationService, ValidationErrors } from '@/services/validationService';

export const handleApiValidationErrors = (
  response: ApiResponse<{ errors?: ValidationErrors }>,
  setErrors: (errors: ValidationErrors) => void
): boolean => {
  if (response.statusCode === 400 && response.data?.errors) {
    // API returned validation errors
    setErrors(response.data.errors);
    return false; // Form is invalid
  }

  return true; // No validation errors
};

// Usage in form
const handleSubmit = async () => {
  // Frontend validation
  if (!validateForm()) {
    return;
  }

  const response = await apiClient.post('/company', formData);

  if (!response.success) {
    // Handle API validation errors
    if (!handleApiValidationErrors(response, setErrors)) {
      return; // Show API errors to user
    }
  }

  // Success
};
```

---

## Real-time Validation

### Validate on Change/Blur

```typescript
// Validate single field on change
const handleFieldChange = (fieldName: string, value: any) => {
  setFormData({ ...formData, [fieldName]: value });

  // Validate single field
  const fieldRules = companyValidationRules[fieldName];
  if (fieldRules) {
    const fieldErrors = ValidationService.validateField(
      fieldName,
      value,
      fieldRules
    );

    if (fieldErrors.length > 0) {
      setErrors({ ...errors, [fieldName]: fieldErrors });
    } else {
      // Clear error for this field
      const newErrors = { ...errors };
      delete newErrors[fieldName];
      setErrors(newErrors);
    }
  }
};
```

---

## Best Practices

### ✅ DO:
1. **Validate on frontend** - Immediate feedback
2. **Validate on backend** - Security and data integrity
3. **Show clear error messages** - User-friendly
4. **Validate on blur/change** - Real-time feedback
5. **Sync API errors** - Show backend validation errors
6. **Sanitize input** - Clean data before validation
7. **Use consistent rules** - Match backend validation

### ❌ DON'T:
1. **Don't rely only on frontend** - Always validate on backend
2. **Don't show technical errors** - Use user-friendly messages
3. **Don't validate too early** - Wait for user to finish typing (debounce)
4. **Don't ignore API errors** - Always handle backend validation
5. **Don't store sensitive validation logic** - Keep it simple

---

## Summary

### ✅ Yes, Handle Validation on Frontend

**Benefits:**
- Better UX with immediate feedback
- Reduced API calls
- Works offline
- Faster user experience

**Implementation:**
1. ✅ Extend validation utilities
2. ✅ Create validation service
3. ✅ Define validation rules per form
4. ✅ Validate on frontend before API call
5. ✅ Handle API validation errors
6. ✅ Show errors to user

**Remember:**
- Frontend validation = UX improvement
- Backend validation = Security and data integrity
- Always validate on both sides!

---

## Next Steps

1. ✅ Extend `utils/validation.ts` with more validators
2. ✅ Create `services/validationService.ts`
3. ✅ Create validation rules for each form
4. ✅ Update forms to use new validation service
5. ✅ Handle API validation errors
6. ✅ Add real-time validation (on change/blur)

