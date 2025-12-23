/**
 * API Client Service
 * 
 * Centralized API client with two-tier token authentication:
 * 1. App Token - Identifies the mobile application (customer/driver/truck)
 * 2. User Token - Authenticates and authorizes specific user access
 * 
 * Implements automatic token refresh and error handling.
 */

import Constants from 'expo-constants';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

// Configuration
const API_BASE_URL =
  (Constants.expoConfig?.extra?.apiUrl as string);
const AUTH_BASE_URL =
  (Constants.expoConfig?.extra?.authApiUrl as string) || API_BASE_URL;
const BASE_API_URL =
  (Constants.expoConfig?.extra?.baseApiUrl as string) || AUTH_BASE_URL;
const AUTH_REFRESH_URL =
  (Constants.expoConfig?.extra?.authRefreshUrl as string) ||
  `${AUTH_BASE_URL}/Auth/refresh`;
const DEFAULT_AUTH_TOKEN =
  (Constants.expoConfig?.extra?.authToken as string) || 'test';
const DEFAULT_REFRESH_TOKEN =
  (Constants.expoConfig?.extra?.refreshTokenDefault as string) || '';

const escapeSingleQuotes = (value: string): string =>
  value.replace(/'/g, `'\"'\"'`);

const buildCurlCommand = (
  method: string,
  url: string,
  headers: Record<string, string>,
  body?: unknown
): string => {
  const headerLines = Object.entries(headers).map(
    ([key, val]) => `  -H '${key}: ${escapeSingleQuotes(String(val))}'`
  );

  let dataLine = '';
  if (body !== undefined && body !== null) {
    const asString =
      typeof body === 'string' ? body : JSON.stringify(body, null, 2);
    dataLine = `  --data '${escapeSingleQuotes(asString)}'`;
  }

  const parts = [
    `curl -X '${method}' '${url}' \\`,
    ...headerLines.map((line, idx) =>
      idx === headerLines.length - 1 && !dataLine ? line.replace(/ \\$/, '') : `${line} \\`
    ),
  ];

  if (dataLine) {
    parts.push(dataLine);
  } else if (parts.length > 0) {
    // remove trailing backslash on last header line
    parts[parts.length - 1] = parts[parts.length - 1].replace(/ \\$/, '');
  }

  return parts.join('\n');
};

const appendLogToFile = async (entry: string) => {
};
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;

// Storage keys
const APP_TOKEN_KEY = 'app_token'; // Stored in AsyncStorage (less sensitive)
const USER_TOKEN_KEY = 'user_token'; // Stored in SecureStore (highly sensitive)
const REFRESH_TOKEN_KEY = 'refresh_token'; // Stored in SecureStore (highly sensitive)

// Client configuration
const CLIENT_KEY =
  (Constants.expoConfig?.extra?.clientKey as string) || 'customer'; // Fixed for Customer Mobile App

// Standard API Response Format
export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T | null;
}

// Custom Error Classes
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network error. Please check your connection.') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'Authentication failed') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string = 'Request timeout. Please try again.') {
    super(message);
    this.name = 'TimeoutError';
  }
}

// Request configuration interface
interface RequestConfig extends RequestInit {
  url: string;
  timeout?: number;
  retries?: number;
  skipAuth?: boolean; // Skip User Token (for login endpoints)
  skipAppToken?: boolean; // Skip App Token (for app-token generation)
}

interface LoginResponsePayload {
  jwtToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

interface RefreshAppTokenPayload {
  jwtToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

class ApiClient {
  public baseURL: string; // Made public for authService to access
  public baseApiURL: string; // Base API URL for company/business endpoints
  private authBaseURL: string;
  private defaultHeaders: Record<string, string>;
  private refreshPromise: Promise<string | null> | null = null;
  private appTokenPromise: Promise<string | null> | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.baseApiURL = BASE_API_URL;
    this.authBaseURL = AUTH_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  /**
   * Check network connectivity
   */
  private async checkNetwork(): Promise<void> {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      throw new NetworkError('No internet connection. Please check your network settings.');
    }
  }

  /**
   * Get stored App Token
   */
  private async getAppToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(APP_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting app token:', error);
      return null;
    }
  }

  /**
   * Save App Token
   */
  async saveAppToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(APP_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving app token:', error);
      throw new Error('Failed to save app token');
    }
  }

  /**
   * Generate App Token from server
   */
  async generateAppToken(): Promise<string | null> {
    // Prevent multiple simultaneous app token generation calls
    if (this.appTokenPromise) {
      return this.appTokenPromise;
    }

    this.appTokenPromise = this.performAppTokenGeneration();
    try {
      const token = await this.appTokenPromise;
      return token;
    } finally {
      this.appTokenPromise = null;
    }
  }

  /**
   * Perform actual App Token generation
   * Actual endpoint: POST /Auth/apptoken
   * Response: { data: { jwtToken: "..." } }
   */
  private async performAppTokenGeneration(): Promise<string | null> {
    const authHeaderValue =
      DEFAULT_AUTH_TOKEN?.startsWith('Bearer ')
        ? DEFAULT_AUTH_TOKEN
        : `Bearer ${DEFAULT_AUTH_TOKEN}`;

    const sharedHeaders = {
      ...this.defaultHeaders,
      Authorization: authHeaderValue,
      authToken: DEFAULT_AUTH_TOKEN,
    };

    const tryRequest = async (
      url: string,
      init: RequestInit,
      expectJson: boolean = true
    ): Promise<{ ok: boolean; status: number; data?: any; url: string }> => {
      const response = await fetch(url, init);
      if (!response.ok) {
        let errorData: any = {};
        if (expectJson) {
          errorData = await response.json().catch(() => ({}));
        }
        return { ok: false, status: response.status, data: errorData, url };
      }
      const data = expectJson ? await response.json() : await response.text();
      return { ok: true, status: response.status, data, url };
    };

    let lastAttemptCurl: string | null = null;

    try {
      // Primary attempt (matches working curl): POST /Auth/apptoken?client={clientKey} with Bearer test and JSON body
      const primaryUrl = `${this.authBaseURL}/Auth/apptoken?client=${encodeURIComponent(
        CLIENT_KEY
      )}`;
      lastAttemptCurl = buildCurlCommand('POST', primaryUrl, sharedHeaders, {
        clientKey: CLIENT_KEY,
      });
      console.log('[APP TOKEN REQUEST]', { url: primaryUrl, method: 'POST' });
      console.log('[APP TOKEN CURL]', lastAttemptCurl);
      const primary = await tryRequest(
        primaryUrl,
        {
          method: 'POST',
          headers: sharedHeaders,
          body: JSON.stringify({ clientKey: CLIENT_KEY }),
        },
        true
      );

      if (primary.ok) {
        const result: any = primary.data;
        const token =
          result?.data?.jwtToken ||
          result?.data?.token ||
          result?.jwtToken ||
          result?.token;
        const success =
          result?.success === true ||
          result?.isSuccess === true ||
          result?.statusCode === 200 ||
          Boolean(token);
        if (success && token) {
          await this.saveAppToken(token);
          return token;
        }
      } else if (primary.status !== 404) {
        throw new ApiError(
          primary.data?.message ||
            `Failed to generate app token (${primary.status})`,
          primary.status,
          { ...primary.data, url: primary.url }
        );
      }

      // Fallback attempt: POST /Auth/apptoken/apptoken with JSON body
      const fallbackUrl = `${this.authBaseURL}/Auth/apptoken/apptoken`;
      const fallback = await tryRequest(
        fallbackUrl,
        {
          method: 'POST',
          headers: sharedHeaders,
          body: JSON.stringify({ clientKey: CLIENT_KEY }),
        },
        true
      );

      if (fallback.ok) {
        const result: any = fallback.data;
        const token =
          result?.data?.jwtToken ||
          result?.data?.token ||
          result?.jwtToken ||
          result?.token;
        const success =
          result?.success === true ||
          result?.isSuccess === true ||
          result?.statusCode === 200 ||
          Boolean(token);
        if (success && token) {
          await this.saveAppToken(token);
          return token;
        }
      } else {
        throw new ApiError(
          fallback.data?.message ||
            `Failed to generate app token (${fallback.status})`,
          fallback.status,
          {
            ...fallback.data,
            url: fallback.url,
            curl: lastAttemptCurl,
          }
        );
      }

      return null;
    } catch (error) {
      if (lastAttemptCurl) {
        console.log(
          'Curl command used for app token generation:',
          lastAttemptCurl
        );
      }
      console.error('App token generation failed:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      return null;
    }
  }

  /**
   * Perform user login against Auth service using app token (Bearer)
   */
  async login(
    username: string,
    password: string
  ): Promise<ApiResponse<LoginResponsePayload>> {
    const appToken = await this.generateAppToken();
    if (!appToken) {
      throw new ApiError('Failed to get app token for login', 500);
    }

    const loginCurl = buildCurlCommand(
      'POST',
      `${this.authBaseURL}/Auth/login`,
      {
        ...this.defaultHeaders,
        Accept: '*/*',
        Authorization: appToken.startsWith('Bearer ')
          ? appToken
          : `Bearer ${appToken}`,
      },
      { username, password }
    );
    console.log('[LOGIN REQUEST]', {
      url: `${this.authBaseURL}/Auth/login`,
      method: 'POST',
    });
    console.log('[LOGIN CURL]', loginCurl);

    const response = await fetch(`${this.authBaseURL}/Auth/login`, {
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        Accept: '*/*',
        Authorization: appToken.startsWith('Bearer ')
          ? appToken
          : `Bearer ${appToken}`,
      },
      body: JSON.stringify({ username, password }),
    });

    const json: ApiResponse<LoginResponsePayload> = await response
      .json()
      .catch(() => ({
        statusCode: response.status,
        success: false,
        message: response.statusText,
        data: null,
      }));

    if (!response.ok || !json?.data?.jwtToken) {
      throw new ApiError(
        json?.message || `Login failed (${response.status})`,
        response.status,
        json
      );
    }

    // Save tokens if present
    if (json.data?.jwtToken) {
      await this.saveUserToken(json.data.jwtToken);
    }
    if (json.data?.refreshToken) {
      await this.saveRefreshToken(json.data.refreshToken);
    }

    return json;
  }

  /**
   * Refresh app token using refresh token (Auth refresh endpoint)
   */
  async refreshAppToken(refreshToken: string): Promise<ApiResponse<RefreshAppTokenPayload>> {
    const refreshCurl = buildCurlCommand(
      'POST',
      AUTH_REFRESH_URL,
      {
        ...this.defaultHeaders,
        Accept: '*/*',
        Authorization: refreshToken,
      },
      undefined
    );
    console.log('[REFRESH REQUEST]', { url: AUTH_REFRESH_URL, method: 'POST' });
    console.log('[REFRESH CURL]', refreshCurl);

    const response = await fetch(AUTH_REFRESH_URL, {
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        Accept: '*/*',
        Authorization: refreshToken,
      },
    });

    const json: ApiResponse<RefreshAppTokenPayload> = await response
      .json()
      .catch(() => ({
        statusCode: response.status,
        success: false,
        message: response.statusText,
        data: null,
      }));

    if (!response.ok || !json?.data?.jwtToken) {
      throw new ApiError(
        json?.message || `Refresh failed (${response.status})`,
        response.status,
        json
      );
    }

    if (json.data?.jwtToken) {
      await this.saveAppToken(json.data.jwtToken);
    }
    if (json.data?.refreshToken) {
      await this.saveRefreshToken(json.data.refreshToken);
    }

    return json;
  }

  /**
   * Get or generate App Token
   */
  private async getOrGenerateAppToken(): Promise<string | null> {
    let appToken = await this.getAppToken();
    
    if (!appToken) {
      appToken = await this.generateAppToken();
    }

    return appToken;
  }

  /**
   * Get stored User Token
   */
  private async getUserToken(): Promise<string | null> {
    try {
      // SecureStore may not be available on web, fallback to AsyncStorage
      if (Platform.OS === 'web') {
        return await AsyncStorage.getItem(USER_TOKEN_KEY);
      } else {
        return await SecureStore.getItemAsync(USER_TOKEN_KEY);
      }
    } catch (error) {
      console.error('Error getting user token:', error);
      // Try fallback to AsyncStorage
      try {
        return await AsyncStorage.getItem(USER_TOKEN_KEY);
      } catch {
        return null;
      }
    }
  }

  /**
   * Save User Token securely
   */
  async saveUserToken(token: string): Promise<void> {
    try {
      // SecureStore may not be available on web, fallback to AsyncStorage
      if (Platform.OS === 'web') {
        await AsyncStorage.setItem(USER_TOKEN_KEY, token);
      } else {
        await SecureStore.setItemAsync(USER_TOKEN_KEY, token);
      }
    } catch (error) {
      console.error('Error saving user token:', error);
      // Try fallback to AsyncStorage if SecureStore fails
      try {
        await AsyncStorage.setItem(USER_TOKEN_KEY, token);
        if (__DEV__) {
          console.warn('[API Client] SecureStore failed, using AsyncStorage fallback for user token');
        }
      } catch (fallbackError) {
        console.error('Error saving user token to AsyncStorage:', fallbackError);
        // Don't throw - allow app to continue even if token saving fails
        if (__DEV__) {
          console.warn('[API Client] Failed to save user token, but continuing...');
        }
      }
    }
  }

  /**
   * Get stored Refresh Token
   */
  private async getRefreshToken(): Promise<string | null> {
    try {
      // SecureStore may not be available on web, fallback to AsyncStorage
      if (Platform.OS === 'web') {
        return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
      } else {
        return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      }
    } catch (error) {
      console.error('Error getting refresh token:', error);
      // Try fallback to AsyncStorage
      try {
        return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
      } catch {
        return null;
      }
    }
  }

  /**
   * Save Refresh Token securely
   */
  async saveRefreshToken(token: string): Promise<void> {
    try {
      // SecureStore may not be available on web, fallback to AsyncStorage
      if (Platform.OS === 'web') {
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
      } else {
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
      }
    } catch (error) {
      console.error('Error saving refresh token:', error);
      // Try fallback to AsyncStorage if SecureStore fails
      try {
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
        if (__DEV__) {
          console.warn('[API Client] SecureStore failed, using AsyncStorage fallback for refresh token');
        }
      } catch (fallbackError) {
        console.error('Error saving refresh token to AsyncStorage:', fallbackError);
        // Don't throw - allow app to continue even if token saving fails
        if (__DEV__) {
          console.warn('[API Client] Failed to save refresh token, but continuing...');
        }
      }
    }
  }

  /**
   * Remove all tokens
   */
  async removeAllTokens(): Promise<void> {
    try {
      await AsyncStorage.removeItem(APP_TOKEN_KEY);
      
      // Remove from SecureStore (mobile) or AsyncStorage (web)
      if (Platform.OS === 'web') {
        await AsyncStorage.removeItem(USER_TOKEN_KEY);
        await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
      } else {
        try {
          await SecureStore.deleteItemAsync(USER_TOKEN_KEY);
        } catch (error) {
          // Fallback to AsyncStorage if SecureStore fails
          await AsyncStorage.removeItem(USER_TOKEN_KEY);
        }
        try {
          await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        } catch (error) {
          // Fallback to AsyncStorage if SecureStore fails
          await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
        }
      }
    } catch (error) {
      console.error('Error removing tokens:', error);
    }
  }

  /**
   * Check if User Token is expired (JWT check)
   */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= exp;
    } catch {
      // If token is not a JWT, assume it's valid
      return false;
    }
  }

  /**
   * Refresh User Token using Refresh Token
   */
  private async refreshUserToken(): Promise<string | null> {
    // Prevent multiple simultaneous refresh calls
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performUserTokenRefresh();
    try {
      const newToken = await this.refreshPromise;
      return newToken;
    } finally {
      this.refreshPromise = null;
    }
  }

  /**
   * Perform actual User Token refresh
   * Actual endpoint: POST /refresh (not /auth/refresh)
   * Header: Authorization: <refresh_token> (not App-Token)
   * Response: { data: { jwtToken: "..." } }
   */
  private async performUserTokenRefresh(): Promise<string | null> {
    try {
      const refreshToken = await this.getRefreshToken();
      if (!refreshToken) {
        return null;
      }

      // Refresh endpoint uses Authorization header with refresh token directly
      const response = await fetch(`${this.baseURL}/refresh`, {
        method: 'POST',
        headers: {
          ...this.defaultHeaders,
          'Authorization': refreshToken, // Refresh token in Authorization header
        },
      });

      if (!response.ok) {
        // Refresh token expired or invalid
        if (response.status === 401) {
          await this.removeAllTokens();
        }
        return null;
      }

      const result: ApiResponse<{ jwtToken: string; expiresIn?: number }> = await response.json();

      if (result.success && result.data?.jwtToken) {
        await this.saveUserToken(result.data.jwtToken);
        return result.data.jwtToken;
      }

      return null;
    } catch (error) {
      console.error('User token refresh failed:', error);
      return null;
    }
  }

  /**
   * Get valid User Token (refresh if expired)
   */
  private async getValidUserToken(): Promise<string | null> {
    const token = await this.getUserToken();
    if (!token) return null;

    if (this.isTokenExpired(token)) {
      return await this.refreshUserToken();
    }

    return token;
  }

  /**
   * Public method to get User Token (for auth service)
   */
  async getUserTokenPublic(): Promise<string | null> {
    return this.getUserToken();
  }

  /**
   * Public method to get Refresh Token (for auth service)
   */
  async getRefreshTokenPublic(): Promise<string | null> {
    return this.getRefreshToken();
  }

  /**
   * Create request with timeout
   */
  private createRequestWithTimeout(
    url: string,
    config: RequestInit,
    timeout: number
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        reject(new TimeoutError());
      }, timeout);

      fetch(url, {
        ...config,
        signal: controller.signal,
      })
        .then((response) => {
          clearTimeout(timeoutId);
          resolve(response);
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          if (error.name === 'AbortError') {
            reject(new TimeoutError());
          } else {
            reject(error);
          }
        });
    });
  }

  /**
   * Handle API errors according to standard response format
   */
  private async handleError(response: Response, config: RequestConfig): Promise<never> {
    let errorData: ApiResponse<unknown>;
    
    try {
      errorData = await response.json();
    } catch {
      // If response is not JSON, create error response
      errorData = {
        statusCode: response.status,
        success: false,
        message: `HTTP ${response.status} ${response.statusText}`,
        data: null,
      };
    }

    // Log error context for debugging
    try {
      console.log('[API ERROR]', {
        url: response.url,
        status: response.status,
        method: config.method || 'GET',
        requestBody: config.body ?? null,
      });
    } catch {
      // ignore logging failures
    }

    // Handle 401 Unauthorized - try to refresh User Token
    if (response.status === 401 && !config.skipAuth && !config.skipAppToken) {
      const newToken = await this.refreshUserToken();
      if (newToken) {
        // Retry original request with new token
        return this.request(config) as Promise<never>;
      } else {
        // Refresh failed - clear tokens
        await this.removeAllTokens();
        throw new AuthenticationError(errorData.message || 'Session expired. Please login again.');
      }
    }

    // Map status codes to error types
    switch (response.status) {
      case 400:
        throw new ApiError(
          errorData.message || 'Invalid request',
          400,
          errorData.data
        );
      case 401:
        throw new AuthenticationError(
          errorData.message || 'Authentication required'
        );
      case 403:
        throw new ApiError(
          errorData.message || 'Access forbidden',
          403,
          errorData.data
        );
      case 404:
        throw new ApiError(
          errorData.message || 'Resource not found',
          404,
          errorData.data
        );
      case 408:
        throw new TimeoutError(errorData.message || 'Request timeout');
      case 429:
        throw new ApiError(
          errorData.message || 'Too many requests. Please try again later.',
          429,
          errorData.data
        );
      case 500:
      case 502:
      case 503:
        throw new ApiError(
          errorData.message || 'Server error. Please try again later.',
          response.status,
          errorData.data
        );
      default:
        throw new ApiError(
          errorData.message || `Request failed with status ${response.status}`,
          response.status,
          errorData.data
        );
    }
  }

  /**
   * Retry request with exponential backoff
   */
  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    maxRetries: number,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let i = 0; i < maxRetries; i++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error as Error;

        // Don't retry on certain errors
        if (error instanceof AuthenticationError) {
          throw error;
        }

        if (error instanceof ApiError) {
          // Don't retry on 4xx errors (except 408, 429)
          if (error.statusCode >= 400 && error.statusCode < 500) {
            if (![408, 429].includes(error.statusCode)) {
              throw error;
            }
          }
        }

        // Exponential backoff
        if (i < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
        }
      }
    }

    throw lastError!;
  }

  /**
   * Main request method
   */
  async request<T>(config: RequestConfig): Promise<ApiResponse<T>> {

    // Check network connectivity
    await this.checkNetwork();

    const {
      url,
      timeout = REQUEST_TIMEOUT,
      retries = MAX_RETRIES,
      skipAuth = false,
      skipAppToken = false,
      ...fetchConfig
    } = config;

    // Build full URL
    const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;

    // Prepare headers
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...(fetchConfig.headers as Record<string, string>),
    };

    // Add default authToken header if not already provided (aligns with Postman globals)
    if (!headers['authToken']) {
      headers['authToken'] = DEFAULT_AUTH_TOKEN;
    }

    // Optionally include a default refreshToken header if provided via config/env
    if (DEFAULT_REFRESH_TOKEN && !headers['refreshToken']) {
      headers['refreshToken'] = DEFAULT_REFRESH_TOKEN;
    }

    // For protected endpoints, only User Token is needed in Authorization header
    // App Token is only used for login endpoint
    if (!skipAuth && !skipAppToken) {
      const userToken = await this.getValidUserToken();
      if (userToken) {
        headers['Authorization'] = userToken; // Direct token, not "Bearer <token>"
      }
    }

    // Debug: log outgoing request with curl
    let bodyPreview: unknown = (fetchConfig as any).body;
    if (typeof bodyPreview === 'string') {
      try {
        bodyPreview = JSON.parse(bodyPreview);
      } catch {
        // keep as string
      }
    }
    const method = (fetchConfig.method || 'GET').toUpperCase();
    const curl = buildCurlCommand(method, fullUrl, headers, bodyPreview ?? undefined);
    console.log('[API REQUEST]', { method, url: fullUrl, headers, body: bodyPreview ?? null });
    console.log('[API REQUEST CURL]', curl);

    // Create request function
    const makeRequest = async (): Promise<ApiResponse<T>> => {
      const response = await this.createRequestWithTimeout(
        fullUrl,
        {
          ...fetchConfig,
          headers,
        },
        timeout
      );

      // Handle non-OK responses
      if (!response.ok) {
        await this.handleError(response, config);
      }

      // Parse response according to standard format
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const result: ApiResponse<T> = await response.json();
        return result;
      }

      // If not JSON, wrap in standard format
      const text = await response.text();
      return {
        statusCode: response.status,
        success: response.ok,
        message: response.statusText,
        data: text as unknown as T,
      };
    };

    // Retry logic
    return this.retryRequest(makeRequest, retries);
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: Omit<RequestConfig, 'url' | 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      url,
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(
    url: string,
    data?: unknown,
    config?: Omit<RequestConfig, 'url' | 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      url,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  async put<T>(
    url: string,
    data?: unknown,
    config?: Omit<RequestConfig, 'url' | 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      url,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    url: string,
    data?: unknown,
    config?: Omit<RequestConfig, 'url' | 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      url,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: Omit<RequestConfig, 'url' | 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      url,
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export helper function to get user-friendly error messages
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof NetworkError) {
    return 'Please check your internet connection and try again.';
  }

  if (error instanceof TimeoutError) {
    return 'Request timed out. Please try again.';
  }

  if (error instanceof AuthenticationError) {
    return 'Your session has expired. Please login again.';
  }

  if (error instanceof ApiError) {
    switch (error.statusCode) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Authentication required. Please login.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
      case 502:
      case 503:
        return 'Server error. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
};
