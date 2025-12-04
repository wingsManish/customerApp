# API Implementation Guide

This guide provides step-by-step instructions for implementing the two-tier token authentication system in your Customer Mobile App.

## Overview

The authentication system uses:
1. **App Token** - Identifies the app (customer/driver/truck)
2. **User Token** - Authenticates the user (JWT with user info)
3. **Refresh Token** - Extends session without re-login

## Implementation Steps

### Step 1: Install Dependencies

```bash
npx expo install expo-secure-store @react-native-community/netinfo
```

### Step 2: Configure Environment

Update `app.config.js`:

```javascript
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

### Step 3: Update Login Screen

Replace OTP-based login with username/password login:

```typescript
// app/login.tsx
import { login } from '@/services/authService';
import { getErrorMessage } from '@/services/apiClient';

const handleLogin = async () => {
  if (!username.trim() || !password.trim()) {
    setError('Please enter username and password');
    return;
  }

  setIsLoading(true);
  setError('');

  try {
    const response = await login(username, password);

    if (response.success && response.data) {
      // Save user info to session
      await updateSession({
        phoneNumber: response.data.user.username,
        authToken: response.data.userToken,
        // ... other user data
      });

      // Navigate to home
      router.replace('/home');
    } else {
      setError(response.message || 'Login failed. Please try again.');
    }
  } catch (error) {
    setError(getErrorMessage(error));
  } finally {
    setIsLoading(false);
  }
};
```

### Step 4: Update Session Service

Update `sessionService.ts` to work with the new token system:

```typescript
import { apiClient } from './apiClient';

// Remove authToken from AsyncStorage - it's now in SecureStore
// Keep other session data in AsyncStorage

export const hasValidSession = async (): Promise<boolean> => {
  const session = await getSession();
  const userToken = await apiClient.getUserTokenPublic();
  
  return !!(session?.phoneNumber && userToken);
};
```

### Step 5: Handle Token Refresh

The API client automatically handles token refresh. However, you should handle refresh failures:

```typescript
// In app/_layout.tsx or a global error handler
import { AppState } from 'react-native';
import { logout } from '@/services/authService';

useEffect(() => {
  const subscription = AppState.addEventListener('change', async (nextAppState) => {
    if (nextAppState === 'active') {
      // Validate session
      const isValid = await hasValidSession();
      if (!isValid) {
        await logout();
        router.replace('/login');
      }
    }
  });

  return () => subscription.remove();
}, []);
```

### Step 6: Make Protected API Calls

All protected endpoints automatically include both tokens:

```typescript
// Example: Get user profile
import { apiClient } from '@/services/apiClient';

const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/api/user/profile');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching profile:', getErrorMessage(error));
    return null;
  }
};
```

### Step 7: Handle Logout

```typescript
import { logout } from '@/services/authService';
import { clearSession } from '@/services/sessionService';
import { router } from 'expo-router';

const handleLogout = async () => {
  try {
    await logout(); // Clears tokens
    await clearSession(); // Clears session data
    router.replace('/login');
  } catch (error) {
    // Ensure cleanup happens
    await logout();
    await clearSession();
    router.replace('/login');
  }
};
```

## API Response Handling

All API responses follow this format:

```typescript
interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T | null;
}
```

**Example Usage:**

```typescript
const response = await apiClient.get<UserProfile>('/api/user/profile');

if (response.success && response.data) {
  // Use response.data
  const profile = response.data;
} else {
  // Handle error
  console.error(response.message);
}
```

## Error Handling

Use the `getErrorMessage` helper for user-friendly error messages:

```typescript
import { getErrorMessage } from '@/services/apiClient';

try {
  const response = await apiClient.post('/api/endpoint', data);
  // Handle success
} catch (error) {
  const userMessage = getErrorMessage(error);
  // Show error to user
  Alert.alert('Error', userMessage);
}
```

## Token Management

### Automatic Token Management

The API client automatically:
- Generates/retrieves App Token on first request
- Includes App Token in all requests
- Includes User Token in protected requests
- Refreshes User Token when expired
- Handles token refresh failures

### Manual Token Operations

```typescript
// Check if authenticated
import { isAuthenticated } from '@/services/authService';

const checkAuth = async () => {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    router.replace('/login');
  }
};

// Logout
import { logout } from '@/services/authService';

await logout(); // Clears all tokens
```

## Testing Checklist

- [ ] App Token is generated automatically
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials shows error
- [ ] User Token is stored securely
- [ ] Protected API calls include both tokens
- [ ] Token refresh works automatically
- [ ] Token refresh failure triggers logout
- [ ] Logout clears all tokens
- [ ] Network errors are handled gracefully
- [ ] Offline scenarios are handled
- [ ] Session validation on app resume works

## Common Issues & Solutions

### Issue: "App Token not found"
**Solution:** The API client automatically generates App Token. Ensure API_BASE_URL is configured correctly.

### Issue: "401 Unauthorized on every request"
**Solution:** 
- Check if User Token is being saved after login
- Verify token refresh is working
- Check if tokens are being cleared unexpectedly

### Issue: "Network request failed"
**Solution:** 
- Check API_BASE_URL configuration
- Verify network connectivity
- Check CORS settings (for web)

### Issue: "Token refresh fails"
**Solution:**
- Verify Refresh Token is being saved
- Check Refresh Token expiry time
- Ensure App Token is included in refresh request

## Migration from OTP to Username/Password

If you're migrating from OTP-based authentication:

1. **Keep OTP functions** - They're still available in `authService.ts` if backend supports them
2. **Update login screen** - Replace OTP input with username/password fields
3. **Update session handling** - Remove OTP-related session data
4. **Test thoroughly** - Ensure all authentication flows work

## Next Steps

1. Review `API_INTEGRATION_DOCUMENTATION.md` for complete API specs
2. Review `services/apiClient.ts` for implementation details
3. Review `services/authService.ts` for authentication functions
4. Test authentication flow end-to-end
5. Implement protected API endpoints
6. Add error tracking (Sentry, etc.)
7. Test token refresh mechanism
8. Test offline scenarios

