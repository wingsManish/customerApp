/**
 * Authentication Service - Example Implementation
 * 
 * This file shows how to use the API client for authentication.
 * Replace the mock implementation in authService.ts with this pattern.
 */

import { apiClient, getErrorMessage, ApiResponse } from './apiClient';

// API Response Types
export interface SendOTPRequest {
  phoneNumber: string;
  countryCode: string;
}

export interface SendOTPResponse {
  success: boolean;
  message?: string;
  sessionId?: string;
  error?: string;
}

export interface VerifyOTPRequest {
  phoneNumber: string;
  otp: string;
  sessionId: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  token?: string;
  refreshToken?: string;
  expiresIn?: number;
  error?: string;
}

/**
 * Send OTP to phone number
 * 
 * @param phoneNumber - Full phone number with country code (e.g., +255123456789)
 * @returns Promise with OTP response
 */
export const sendOTP = async (phoneNumber: string): Promise<SendOTPResponse> => {
  try {
    // Use API client for the request
    const response = await apiClient.post<ApiResponse<SendOTPResponse>>(
      '/auth/send-otp',
      { phoneNumber },
      { skipAuth: true } // Skip auth for login endpoints
    );

    // Handle API response format
    if (response.success && response.data) {
      return response.data;
    }

    // Handle error response
    return {
      success: false,
      error: response.error?.message || 'Failed to send OTP',
    };
  } catch (error) {
    // Get user-friendly error message
    const errorMessage = getErrorMessage(error);
    
    // Log error for debugging (sanitize sensitive data)
    if (__DEV__) {
      console.error('[AuthService] sendOTP error:', errorMessage);
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Verify OTP
 * 
 * @param phoneNumber - Phone number
 * @param otp - OTP code
 * @param sessionId - Session ID from sendOTP response
 * @returns Promise with verification response
 */
export const verifyOTP = async (
  phoneNumber: string,
  otp: string,
  sessionId: string
): Promise<VerifyOTPResponse> => {
  try {
    // Use API client for the request
    const response = await apiClient.post<ApiResponse<VerifyOTPResponse>>(
      '/auth/verify-otp',
      { phoneNumber, otp, sessionId },
      { skipAuth: true } // Skip auth for login endpoints
    );

    // Handle API response format
    if (response.success && response.data) {
      // Save token if received
      if (response.data.token) {
        await apiClient.saveToken(response.data.token);
      }

      return response.data;
    }

    // Handle error response
    return {
      success: false,
      error: response.error?.message || 'Invalid OTP',
    };
  } catch (error) {
    // Get user-friendly error message
    const errorMessage = getErrorMessage(error);
    
    // Log error for debugging
    if (__DEV__) {
      console.error('[AuthService] verifyOTP error:', errorMessage);
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Logout user
 * 
 * Clears tokens and optionally calls logout endpoint
 */
export const logout = async (): Promise<void> => {
  try {
    // Call logout endpoint (optional - server may handle token invalidation)
    try {
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      // Continue even if logout endpoint fails
      if (__DEV__) {
        console.warn('[AuthService] Logout endpoint failed:', error);
      }
    }

    // Always clear local tokens
    await apiClient.removeToken();
  } catch (error) {
    // Ensure tokens are cleared even if there's an error
    await apiClient.removeToken();
    throw error;
  }
};

/**
 * Refresh authentication token
 * 
 * This is handled automatically by the API client,
 * but can be called manually if needed
 */
export const refreshAuthToken = async (): Promise<string | null> => {
  try {
    // The API client handles token refresh automatically
    // This is just a convenience method if you need to refresh manually
    const token = await apiClient['getValidToken']();
    return token;
  } catch (error) {
    if (__DEV__) {
      console.error('[AuthService] Token refresh failed:', error);
    }
    return null;
  }
};

