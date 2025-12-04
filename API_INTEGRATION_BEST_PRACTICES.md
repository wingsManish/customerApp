# API Integration & Authentication Best Practices

This document outlines best practices for API integration and authentication in React Native/Expo applications.

## Table of Contents
1. [API Client Architecture](#api-client-architecture)
2. [Authentication & Token Management](#authentication--token-management)
3. [Error Handling](#error-handling)
4. [Security Best Practices](#security-best-practices)
5. [Session Management](#session-management)
6. [Network Resilience](#network-resilience)
7. [Environment Configuration](#environment-configuration)
8. [Request/Response Interceptors](#requestresponse-interceptors)
9. [Type Safety](#type-safety)
10. [Testing & Debugging](#testing--debugging)

---

## 1. API Client Architecture

### ✅ Centralized API Client
Create a single, reusable API client that handles all HTTP requests:

**Benefits:**
- Consistent error handling
- Centralized request/response transformation
- Easy to add interceptors, retry logic, and logging
- Single place to update base URLs and headers

**Implementation:**
```typescript
// services/apiClient.ts
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || 'https://api.example.com';

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Implementation with interceptors, error handling, etc.
  }
}
```

### ✅ Request Timeout
Always set reasonable timeouts (15-30 seconds) to prevent hanging requests:

```typescript
const timeout = 30000; // 30 seconds
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), timeout);
```

---

## 2. Authentication & Token Management

### ✅ Secure Token Storage
**DO:**
- Use secure storage for sensitive tokens (use `expo-secure-store` instead of AsyncStorage for tokens)
- Store tokens separately from other session data
- Never log tokens in production

**DON'T:**
- Store tokens in AsyncStorage (use it only for non-sensitive data)
- Hardcode tokens or API keys
- Send tokens in URL parameters

```typescript
// ✅ GOOD: Use expo-secure-store for tokens
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const saveToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const removeToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};
```

### ✅ Token Refresh Mechanism
Implement automatic token refresh before expiration:

```typescript
// services/tokenService.ts
export class TokenService {
  private refreshPromise: Promise<string> | null = null;

  async getValidToken(): Promise<string | null> {
    const token = await getToken();
    if (!token) return null;

    // Check if token is expired (decode JWT or check expiry)
    if (this.isTokenExpired(token)) {
      return await this.refreshToken();
    }

    return token;
  }

  private async refreshToken(): Promise<string | null> {
    // Prevent multiple simultaneous refresh calls
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performRefresh();
    try {
      const newToken = await this.refreshPromise;
      return newToken;
    } finally {
      this.refreshPromise = null;
    }
  }
}
```

### ✅ Authorization Header
Always attach tokens via Authorization header:

```typescript
// ✅ GOOD
headers: {
  'Authorization': `Bearer ${token}`,
}

// ❌ BAD - Don't send in query params or body
// ?token=xyz
// body: { token: 'xyz' }
```

### ✅ Token Expiration Handling
Handle token expiration gracefully:

```typescript
// In API client interceptor
if (response.status === 401) {
  // Attempt token refresh
  const newToken = await refreshToken();
  if (newToken) {
    // Retry original request with new token
    return retryRequest(originalRequest, newToken);
  } else {
    // Refresh failed - logout user
    await logout();
    throw new AuthenticationError('Session expired');
  }
}
```

---

## 3. Error Handling

### ✅ Standardized Error Types
Create custom error classes for different error scenarios:

```typescript
// utils/errors.ts
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

export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

### ✅ User-Friendly Error Messages
Map API errors to user-friendly messages:

```typescript
const getErrorMessage = (error: unknown): string => {
  if (error instanceof NetworkError) {
    return 'Please check your internet connection and try again.';
  }
  
  if (error instanceof ApiError) {
    switch (error.statusCode) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Your session has expired. Please login again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }

  return 'An unexpected error occurred. Please try again.';
};
```

### ✅ Error Logging
Log errors for debugging (but sanitize sensitive data):

```typescript
const logError = (error: unknown, context?: string) => {
  if (__DEV__) {
    console.error(`[API Error] ${context || 'Unknown'}`, {
      message: error instanceof Error ? error.message : String(error),
      // Don't log tokens or sensitive data
    });
  }
  
  // In production, send to error tracking service (Sentry, etc.)
  // Sentry.captureException(error, { extra: { context } });
};
```

---

## 4. Security Best Practices

### ✅ HTTPS Only
**CRITICAL:** Always use HTTPS in production. Never send sensitive data over HTTP.

```typescript
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000'  // Only for development
  : 'https://api.production.com';  // Always HTTPS in production
```

### ✅ Input Validation
Validate all user inputs before sending to API:

```typescript
// utils/validation.ts
export const validatePhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 7 && cleaned.length <= 15;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### ✅ Rate Limiting
Implement client-side rate limiting to prevent abuse:

```typescript
class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  canMakeRequest(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const recentRequests = requests.filter(time => now - time < windowMs);
    
    if (recentRequests.length >= maxRequests) {
      return false;
    }
    
    recentRequests.push(now);
    this.requests.set(key, recentRequests);
    return true;
  }
}
```

### ✅ Certificate Pinning (Production)
For high-security apps, implement certificate pinning:

```typescript
// Only for production, requires native modules
// Consider using react-native-cert-pinner or similar
```

### ✅ Prevent Token Leakage
- Never log tokens
- Don't include tokens in error messages
- Use secure storage
- Clear tokens on logout

---

## 5. Session Management

### ✅ Session Validation
Regularly validate session on app resume:

```typescript
// app/_layout.tsx or App.tsx
import { AppState } from 'react-native';

useEffect(() => {
  const subscription = AppState.addEventListener('change', async (nextAppState) => {
    if (nextAppState === 'active') {
      // Validate session when app comes to foreground
      const isValid = await validateSession();
      if (!isValid) {
        await logout();
        router.replace('/login');
      }
    }
  });

  return () => subscription.remove();
}, []);
```

### ✅ Session Timeout
Implement session timeout handling:

```typescript
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const updateLastActivity = async (): Promise<void> => {
  await AsyncStorage.setItem('last_activity', Date.now().toString());
};

export const isSessionExpired = async (): Promise<boolean> => {
  const lastActivity = await AsyncStorage.getItem('last_activity');
  if (!lastActivity) return true;
  
  const timeSinceLastActivity = Date.now() - parseInt(lastActivity, 10);
  return timeSinceLastActivity > SESSION_TIMEOUT;
};
```

### ✅ Logout on Security Events
Clear session on security-related events:

```typescript
export const logout = async (): Promise<void> => {
  // Clear all tokens
  await removeToken();
  await removeRefreshToken();
  
  // Clear session data
  await clearSession();
  
  // Clear any cached data
  await clearCache();
  
  // Navigate to login
  router.replace('/login');
};
```

---

## 6. Network Resilience

### ✅ Retry Logic
Implement intelligent retry for transient failures:

```typescript
const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on 4xx errors (except 401/408/429)
      if (error instanceof ApiError && error.statusCode >= 400 && error.statusCode < 500) {
        if (![401, 408, 429].includes(error.statusCode)) {
          throw error;
        }
      }
      
      // Exponential backoff
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError!;
};
```

### ✅ Network State Detection
Check network connectivity before making requests:

```typescript
import NetInfo from '@react-native-community/netinfo';

export const isConnected = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.isConnected ?? false;
};

// Before making API call
if (!(await isConnected())) {
  throw new NetworkError('No internet connection');
}
```

### ✅ Request Cancellation
Allow users to cancel long-running requests:

```typescript
const controller = new AbortController();

// Make request with signal
fetch(url, { signal: controller.signal });

// Cancel if needed
controller.abort();
```

---

## 7. Environment Configuration

### ✅ Environment Variables
Use environment-specific configuration:

```typescript
// app.config.js or eas.json
export default {
  extra: {
    apiUrl: process.env.API_URL || 'https://api.example.com',
    apiKey: process.env.API_KEY,
    environment: process.env.NODE_ENV || 'development',
  },
};
```

### ✅ Configuration Service
Centralize configuration:

```typescript
// config/index.ts
import Constants from 'expo-constants';

export const config = {
  api: {
    baseURL: Constants.expoConfig?.extra?.apiUrl || '',
    timeout: 30000,
  },
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    sessionTimeout: 30 * 60 * 1000,
  },
  app: {
    environment: Constants.expoConfig?.extra?.environment || 'development',
    version: Constants.expoConfig?.version || '1.0.0',
  },
};
```

---

## 8. Request/Response Interceptors

### ✅ Request Interceptor
Add common headers, tokens, and request logging:

```typescript
const requestInterceptor = async (config: RequestConfig): Promise<RequestConfig> => {
  // Add auth token
  const token = await getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  // Add request ID for tracking
  config.headers['X-Request-ID'] = generateRequestId();

  // Log request in development
  if (__DEV__) {
    console.log(`[API Request] ${config.method} ${config.url}`);
  }

  return config;
};
```

### ✅ Response Interceptor
Handle common response patterns:

```typescript
const responseInterceptor = async (response: Response): Promise<Response> => {
  // Handle token refresh
  if (response.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      // Retry original request
      return retryRequest(response.config);
    }
  }

  // Log response in development
  if (__DEV__) {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
  }

  return response;
};
```

---

## 9. Type Safety

### ✅ TypeScript Interfaces
Define types for all API requests and responses:

```typescript
// types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface LoginRequest {
  phoneNumber: string;
  countryCode: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

export interface User {
  id: string;
  phoneNumber: string;
  email?: string;
  name?: string;
}
```

### ✅ Type-Safe API Calls
Use generics for type-safe API calls:

```typescript
async function apiCall<TRequest, TResponse>(
  endpoint: string,
  data: TRequest
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  return response.json() as Promise<TResponse>;
}

// Usage
const loginResponse = await apiCall<LoginRequest, ApiResponse<LoginResponse>>(
  '/auth/login',
  { phoneNumber: '+255123456789', countryCode: '255' }
);
```

---

## 10. Testing & Debugging

### ✅ API Mocking for Development
Use mock data during development:

```typescript
const USE_MOCK_API = __DEV__ && process.env.USE_MOCK_API === 'true';

export const sendOTP = async (phoneNumber: string) => {
  if (USE_MOCK_API) {
    return mockSendOTP(phoneNumber);
  }
  return realSendOTP(phoneNumber);
};
```

### ✅ Request/Response Logging
Log requests and responses (sanitize sensitive data):

```typescript
const logRequest = (config: RequestConfig) => {
  if (__DEV__) {
    console.log('Request:', {
      method: config.method,
      url: config.url,
      headers: sanitizeHeaders(config.headers),
      // Don't log body if it contains sensitive data
    });
  }
};
```

### ✅ Network Debugging Tools
Use tools like React Native Debugger or Flipper for network inspection.

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Create centralized API client
- [ ] Set up environment configuration
- [ ] Implement secure token storage
- [ ] Add basic error handling

### Phase 2: Authentication
- [ ] Implement token refresh mechanism
- [ ] Add request interceptors for auth headers
- [ ] Handle token expiration
- [ ] Implement logout flow

### Phase 3: Resilience
- [ ] Add retry logic
- [ ] Implement network state detection
- [ ] Add request timeouts
- [ ] Handle offline scenarios

### Phase 4: Security
- [ ] Input validation
- [ ] Rate limiting
- [ ] Session timeout
- [ ] Certificate pinning (if needed)

### Phase 5: Developer Experience
- [ ] TypeScript types for all APIs
- [ ] Error logging and tracking
- [ ] Development tools and debugging
- [ ] API documentation

---

## Quick Reference: Do's and Don'ts

### ✅ DO:
- Use HTTPS in production
- Store tokens in secure storage
- Implement token refresh
- Handle network errors gracefully
- Validate all inputs
- Use TypeScript for type safety
- Set request timeouts
- Log errors (sanitized)
- Implement retry logic for transient failures
- Clear tokens on logout

### ❌ DON'T:
- Store tokens in AsyncStorage
- Hardcode API keys or tokens
- Send tokens in URL parameters
- Ignore network errors
- Trust client-side validation alone
- Log sensitive data
- Make requests without timeouts
- Retry on 4xx errors (except specific cases)
- Keep tokens after logout

---

## Additional Resources

- [OWASP Mobile Security](https://owasp.org/www-project-mobile-security/)
- [React Native Security Best Practices](https://reactnative.dev/docs/security)
- [Expo SecureStore Documentation](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)

