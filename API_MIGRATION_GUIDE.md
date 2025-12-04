# API Integration Migration Guide

This guide will help you migrate from mock API calls to real API integration using the best practices.

## Step 1: Install Required Dependencies

```bash
npx expo install expo-secure-store @react-native-community/netinfo
```

## Step 2: Configure Environment Variables

Update your `app.config.js` or `eas.json` to include API configuration:

```javascript
// app.config.js
export default {
  expo: {
    // ... existing config
    extra: {
      apiUrl: process.env.API_URL || 'https://api.yourdomain.com',
      environment: process.env.NODE_ENV || 'development',
    },
  },
};
```

For EAS Build, add to `eas.json`:

```json
{
  "build": {
    "development": {
      "env": {
        "API_URL": "https://api-dev.yourdomain.com"
      }
    },
    "production": {
      "env": {
        "API_URL": "https://api.yourdomain.com"
      }
    }
  }
}
```

## Step 3: Update authService.ts

Replace the mock implementation with real API calls:

1. Import the API client:
```typescript
import { apiClient, getErrorMessage } from './apiClient';
```

2. Replace `sendOTP` function:
```typescript
export const sendOTP = async (phoneNumber: string): Promise<SendOTPResponse> => {
  try {
    const response = await apiClient.post('/auth/send-otp', 
      { phoneNumber },
      { skipAuth: true }
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    return {
      success: false,
      error: response.error?.message || 'Failed to send OTP',
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};
```

3. Replace `verifyOTP` function:
```typescript
export const verifyOTP = async (
  phoneNumber: string,
  otp: string,
  sessionId: string
): Promise<{ success: boolean; token?: string; error?: string }> => {
  try {
    const response = await apiClient.post('/auth/verify-otp',
      { phoneNumber, otp, sessionId },
      { skipAuth: true }
    );
    
    if (response.success && response.data?.token) {
      // Save token securely
      await apiClient.saveToken(response.data.token);
      return {
        success: true,
        token: response.data.token,
      };
    }
    
    return {
      success: false,
      error: response.error?.message || 'Invalid OTP',
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};
```

## Step 4: Update Session Service

Update `sessionService.ts` to use secure storage for tokens:

```typescript
import { apiClient } from './apiClient';

// Remove authToken from AsyncStorage - it's now in SecureStore
// Keep other session data in AsyncStorage

export const updateSession = async (updates: Partial<UserSession>): Promise<UserSession | null> => {
  const existing = await getSession();
  
  // If token is provided, save it securely
  if (updates.authToken) {
    await apiClient.saveToken(updates.authToken);
    // Don't store token in AsyncStorage
    delete updates.authToken;
  }
  
  // Save rest of session data
  const nextSession: UserSession = {
    // ... existing code
  };
  
  await saveSession(nextSession);
  return nextSession;
};

export const hasValidSession = async (): Promise<boolean> => {
  const session = await getSession();
  const token = await apiClient['getToken'](); // Access private method or create public getter
  
  return !!(session?.phoneNumber && token);
};
```

## Step 5: Update Login Flow

The login flow in `login.tsx` and `otp-verification.tsx` should work as-is, but you can improve error handling:

```typescript
// In login.tsx
const handleContinue = async () => {
  setError('');
  
  if (!validatePhoneNumber(phoneNumber)) {
    setError('Please enter a valid phone number');
    return;
  }

  setIsLoading(true);

  try {
    const fullPhoneNumber = `+${selectedCountry.callingCode}${phoneNumber.replace(/\D/g, '')}`;
    const response = await sendOTP(fullPhoneNumber);
    
    if (response.success) {
      router.push({
        pathname: '/otp-verification',
        params: {
          phoneNumber: fullPhoneNumber,
          sessionId: response.sessionId ?? '',
        },
      });
    } else {
      setError(response.error || 'Failed to send OTP. Please try again.');
    }
  } catch (err) {
    // Error is already handled in sendOTP, but you can add additional handling
    setError('An unexpected error occurred. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

## Step 6: Create Other API Services

Create service files for other API endpoints following the same pattern:

```typescript
// services/userService.ts
import { apiClient, getErrorMessage, ApiResponse } from './apiClient';

export interface UserProfile {
  id: string;
  phoneNumber: string;
  email?: string;
  name?: string;
}

export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const response = await apiClient.get<ApiResponse<UserProfile>>('/user/profile');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    return null;
  } catch (error) {
    console.error('[UserService] Error fetching profile:', getErrorMessage(error));
    return null;
  }
};

export const updateUserProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
  try {
    const response = await apiClient.put<ApiResponse<UserProfile>>('/user/profile', data);
    return response.success ?? false;
  } catch (error) {
    console.error('[UserService] Error updating profile:', getErrorMessage(error));
    return false;
  }
};
```

## Step 7: Handle Logout

Update logout functionality to use the API client:

```typescript
// In your logout handler
import { apiClient } from '@/services/apiClient';
import { clearSession } from '@/services/sessionService';

const handleLogout = async () => {
  try {
    // Call logout endpoint (optional)
    try {
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      // Continue even if endpoint fails
    }
    
    // Clear tokens
    await apiClient.removeToken();
    
    // Clear session data
    await clearSession();
    
    // Navigate to login
    router.replace('/login');
  } catch (error) {
    // Ensure cleanup happens even on error
    await apiClient.removeToken();
    await clearSession();
    router.replace('/login');
  }
};
```

## Step 8: Add Session Validation

Add session validation on app start/resume:

```typescript
// app/_layout.tsx
import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useRouter } from 'expo-router';
import { hasValidSession } from '@/services/sessionService';
import { apiClient } from '@/services/apiClient';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Validate session on app start
    const validateSession = async () => {
      const isValid = await hasValidSession();
      if (!isValid) {
        router.replace('/login');
      }
    };

    validateSession();

    // Validate session when app comes to foreground
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (nextAppState === 'active') {
        const isValid = await hasValidSession();
        if (!isValid) {
          router.replace('/login');
        }
      }
    });

    return () => subscription.remove();
  }, []);

  // ... rest of component
}
```

## Step 9: Testing

1. **Test with Mock API**: Keep mock implementation during development
2. **Test Error Handling**: Test network errors, timeouts, invalid responses
3. **Test Token Refresh**: Verify token refresh works correctly
4. **Test Offline**: Verify app handles offline scenarios gracefully

## Step 10: Production Checklist

Before deploying to production:

- [ ] API URL is configured correctly
- [ ] HTTPS is enabled (never HTTP in production)
- [ ] Error tracking is set up (Sentry, etc.)
- [ ] Token storage is secure (using SecureStore)
- [ ] Session timeout is configured
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
- [ ] Error messages are user-friendly
- [ ] Logging doesn't expose sensitive data
- [ ] Network error handling is tested

## Common Issues & Solutions

### Issue: "Network request failed"
**Solution**: Check API URL configuration and network connectivity

### Issue: "Token refresh fails"
**Solution**: Ensure refresh token endpoint is implemented correctly

### Issue: "401 Unauthorized on every request"
**Solution**: Check token is being saved and sent correctly in headers

### Issue: "Timeout errors"
**Solution**: Increase timeout or check server response time

### Issue: "CORS errors (web)"
**Solution**: Configure CORS headers on backend or use proxy

## Next Steps

1. Review `API_INTEGRATION_BEST_PRACTICES.md` for detailed best practices
2. Review `services/apiClient.ts` for implementation details
3. Review `services/authService.example.ts` for usage examples
4. Implement other API services following the same pattern
5. Add error tracking (Sentry, etc.)
6. Add analytics for API calls
7. Implement request/response logging for debugging

