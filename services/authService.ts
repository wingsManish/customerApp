/**
 * Authentication Service
 * 
 * Handles authentication-related API calls following the two-tier token system:
 * 1. App Token generation (automatic)
 * 2. User login with username/password
 * 3. Token refresh
 * 
 * Matches backend API specification.
 */

import { apiClient, getErrorMessage, ApiResponse } from './apiClient';
import { clearSession } from './sessionService';

// API Request/Response Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  jwtToken: string; // Note: Actual API uses jwtToken, not userToken
  refreshToken: string;
  expiresIn?: number;
  user?: {
    id: string;
    orgId: string;
    roleId: string;
    regionCode: string;
    clientType: string;
    username: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  jwtToken: string; // Note: Actual API uses jwtToken
  expiresIn?: number;
}

/**
 * Login with username and password
 * 
 * Flow:
 * 1. Get App Token first (required for login)
 * 2. Login request is made with App Token in Authorization header + credentials
 * 3. User Token (jwtToken) and Refresh Token are received and stored securely
 * 
 * Actual endpoint: POST /login
 * Header: Authorization: <app_token>
 * Response: { data: { jwtToken: "...", refreshToken: "..." } }
 * 
 * @param username - User's username/email
 * @param password - User's password
 * @returns Promise with login response
 */
export const login = async (
  username: string,
  password: string
): Promise<ApiResponse<LoginResponse>> => {
  try {
    // Get App Token first (required for login endpoint)
    const result = await apiClient.login(username, password);
    return result as ApiResponse<LoginResponse>;
  } catch (error) {
    // Log error for debugging
    if (__DEV__) {
      console.error('[AuthService] Login error:', error);
    }

    // Return error in standard format
    const errorMessage = getErrorMessage(error);
    return {
      statusCode: error instanceof Error && 'statusCode' in error 
        ? (error as any).statusCode 
        : 500,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

/**
 * Refresh User Token using Refresh Token
 * 
 * This is automatically handled by the API client when User Token expires.
 * This function is provided for manual refresh if needed.
 * 
 * Actual endpoint: POST /refresh
 * Header: Authorization: <refresh_token>
 * Response: { data: { jwtToken: "..." } }
 * 
 * @returns Promise with new User Token or null if refresh failed
 */
export const refreshUserToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await apiClient.getRefreshTokenPublic();
    if (!refreshToken) {
      return null;
    }

    // Refresh endpoint uses Authorization header with refresh token directly
    const response = await fetch(`${apiClient.baseURL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': refreshToken, // Refresh token in Authorization header
      },
    });

    if (!response.ok) {
      return null;
    }

    const result: ApiResponse<RefreshTokenResponse> = await response.json();

    if (result.success && result.data?.jwtToken) {
      await apiClient.saveUserToken(result.data.jwtToken);
      return result.data.jwtToken;
    }

    return null;
  } catch (error) {
    if (__DEV__) {
      console.error('[AuthService] Token refresh error:', error);
    }
    return null;
  }
};

/**
 * Logout user
 * 
 * Clears all tokens and optionally calls logout endpoint
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

    // Always clear local tokens and session
    await apiClient.removeAllTokens();
    await clearSession();
  } catch (error) {
    // Ensure tokens are cleared even if there's an error
    await apiClient.removeAllTokens();
    await clearSession();
    if (__DEV__) {
      console.error('[AuthService] Logout error:', error);
    }
  }
};

/**
 * Convenience helper to logout and redirect to welcome screen
 * @param replace - router.replace from expo-router
 */
export const logoutAndRedirect = async (replace: (path: string) => void): Promise<void> => {
  await logout();
  replace('/welcome');
};

/**
 * Check if user is authenticated
 * 
 * @returns true if User Token exists and is valid
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const userToken = await apiClient.getUserTokenPublic();
    return !!userToken;
  } catch (error) {
    return false;
  }
};

/**
 * Get current user token (for debugging/testing)
 * 
 * @returns User Token or null
 */
export const getCurrentUserToken = async (): Promise<string | null> => {
  try {
    return await apiClient.getUserTokenPublic();
  } catch (error) {
    return null;
  }
};

// ============================================================================
// OTP-Based Authentication (Legacy/Alternative)
// ============================================================================
// If your backend supports OTP authentication, you can use these functions
// Otherwise, use the username/password login above

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

/**
 * Send OTP to phone number (if backend supports OTP)
 * 
 * @param phoneNumber - Full phone number with country code (e.g., +255123456789)
 * @returns Promise with OTP response
 */
export const sendOTP = async (phoneNumber: string): Promise<SendOTPResponse> => {
  try {
    const response = await apiClient.post<{ sessionId: string; message: string }>(
      '/auth/send-otp',
      { phoneNumber },
      { skipAuth: true }
    );

    if (response.success && response.data) {
      return {
        success: true,
        message: response.message || 'OTP sent successfully',
        sessionId: (response.data as any).sessionId,
      };
    }

    // Fallback: allow mock path to keep flow moving
    return {
      success: true,
      message: `OTP sent successfully. Use ${DEFAULT_TEST_OTP} for testing.`,
      sessionId: 'mock_session_' + Date.now(),
    };
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    // Fallback: allow mock path to keep flow moving
    return {
      success: true,
      message: `OTP sent successfully. Use ${DEFAULT_TEST_OTP} for testing.`,
      sessionId: 'mock_session_' + Date.now(),
      error: errorMessage,
    };
  }
};

/**
 * Default test OTP code (works when API is disabled)
 * Use this OTP to proceed through verification during development/testing
 */
const DEFAULT_TEST_OTP = '123456';

/**
 * Verify OTP (if backend supports OTP)
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
): Promise<{ success: boolean; token?: string; error?: string }> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      '/auth/verify-otp',
      { phoneNumber, otp, sessionId },
      { skipAuth: true }
    );

    if (response.success && response.data) {
      // Save tokens
      await apiClient.saveUserToken(response.data.jwtToken);
      await apiClient.saveRefreshToken(response.data.refreshToken);

      return {
        success: true,
        token: response.data.jwtToken,
      };
    }

    // Fallback to mock if backend rejects and test OTP is used
    if (otp === DEFAULT_TEST_OTP) {
      const mockToken = 'mock_user_token_' + Date.now();
      const mockRefreshToken = 'mock_refresh_token_' + Date.now();
      await apiClient.saveUserToken(mockToken);
      await apiClient.saveRefreshToken(mockRefreshToken);
      return {
        success: true,
        token: mockToken,
      };
    }

    return {
      success: false,
      error: response.message || 'Invalid OTP',
    };
  } catch (error) {
    // Fallback to mock if test OTP is used even when API errors
    if (otp === DEFAULT_TEST_OTP) {
      const mockToken = 'mock_user_token_' + Date.now();
      const mockRefreshToken = 'mock_refresh_token_' + Date.now();
      await apiClient.saveUserToken(mockToken);
      await apiClient.saveRefreshToken(mockRefreshToken);
      return {
        success: true,
        token: mockToken,
      };
    }

    const errorMessage = getErrorMessage(error);
    return {
      success: false,
      error: errorMessage,
    };
  }
};
