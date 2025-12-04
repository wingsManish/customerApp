export const sanitizePhoneNumber = (value: string): string => value.replace(/[^0-9]/g, '');

export const isValidPhoneNumber = (value: string): boolean => /^\d{7,15}$/.test(value);

export const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const isRequired = (value: string): boolean => value.trim().length > 0;

export const isValidPin = (value: string): boolean => /^\d{4,10}$/.test(value);

