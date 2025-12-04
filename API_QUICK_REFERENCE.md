# API Integration Quick Reference

## Key Points Summary

### 🔐 Authentication Best Practices

1. **Secure Token Storage**
   - ✅ Use `expo-secure-store` for tokens (NOT AsyncStorage)
   - ✅ Store tokens separately from session data
   - ✅ Never log tokens in production

2. **Token Management**
   - ✅ Implement automatic token refresh
   - ✅ Handle token expiration gracefully
   - ✅ Clear tokens on logout
   - ✅ Validate session on app resume

3. **Authorization**
   - ✅ Always send tokens via `Authorization: Bearer <token>` header
   - ✅ Never send tokens in URL parameters
   - ✅ Handle 401 errors with token refresh

### 🌐 API Client Best Practices

1. **Centralized Client**
   - ✅ Single API client for all requests
   - ✅ Consistent error handling
   - ✅ Request/response interceptors

2. **Error Handling**
   - ✅ Custom error classes (NetworkError, ApiError, etc.)
   - ✅ User-friendly error messages
   - ✅ Proper error logging (sanitized)

3. **Network Resilience**
   - ✅ Request timeouts (30 seconds)
   - ✅ Retry logic with exponential backoff
   - ✅ Network connectivity checks
   - ✅ Request cancellation support

### 🔒 Security Best Practices

1. **HTTPS Only**
   - ✅ Always use HTTPS in production
   - ✅ Never send sensitive data over HTTP

2. **Input Validation**
   - ✅ Validate all inputs before sending
   - ✅ Sanitize user data
   - ✅ Use TypeScript for type safety

3. **Rate Limiting**
   - ✅ Implement client-side rate limiting
   - ✅ Handle 429 (Too Many Requests) errors

### 📱 Session Management

1. **Session Validation**
   - ✅ Validate session on app start
   - ✅ Validate session on app resume
   - ✅ Implement session timeout

2. **Session Storage**
   - ✅ Tokens in SecureStore
   - ✅ Non-sensitive data in AsyncStorage
   - ✅ Clear all data on logout

## Common Patterns

### Making API Calls

```typescript
import { apiClient, getErrorMessage } from '@/services/apiClient';

// GET request
const data = await apiClient.get<ResponseType>('/endpoint');

// POST request
const result = await apiClient.post<ResponseType>('/endpoint', { data });

// With error handling
try {
  const response = await apiClient.post('/endpoint', data);
  // Handle success
} catch (error) {
  const message = getErrorMessage(error);
  // Show error to user
}
```

### Authentication Flow

```typescript
// 1. Send OTP
const otpResponse = await sendOTP(phoneNumber);

// 2. Verify OTP
const verifyResponse = await verifyOTP(phoneNumber, otp, sessionId);

// 3. Token is automatically saved by API client
// 4. Subsequent requests automatically include token
```

### Error Handling

```typescript
import { 
  NetworkError, 
  ApiError, 
  AuthenticationError,
  getErrorMessage 
} from '@/services/apiClient';

try {
  const data = await apiClient.get('/endpoint');
} catch (error) {
  if (error instanceof NetworkError) {
    // Handle network error
  } else if (error instanceof AuthenticationError) {
    // Handle auth error - redirect to login
  } else if (error instanceof ApiError) {
    // Handle API error
  }
  
  // Or use helper function
  const userMessage = getErrorMessage(error);
  showError(userMessage);
}
```

### Logout

```typescript
import { apiClient } from '@/services/apiClient';
import { clearSession } from '@/services/sessionService';

const logout = async () => {
  try {
    await apiClient.post('/auth/logout', {});
  } catch (error) {
    // Continue even if endpoint fails
  }
  
  await apiClient.removeToken();
  await clearSession();
  router.replace('/login');
};
```

## File Structure

```
services/
  ├── apiClient.ts          # Main API client (use this)
  ├── authService.ts         # Authentication endpoints
  ├── userService.ts         # User-related endpoints
  └── [other]Service.ts      # Other API endpoints

config/
  └── index.ts              # Configuration (API URLs, etc.)
```

## Dependencies Required

```bash
npx expo install expo-secure-store @react-native-community/netinfo
```

## Environment Configuration

```javascript
// app.config.js
export default {
  expo: {
    extra: {
      apiUrl: process.env.API_URL || 'https://api.example.com',
    },
  },
};
```

## Checklist for New API Endpoints

- [ ] Define TypeScript interfaces for request/response
- [ ] Use `apiClient` methods (get/post/put/delete)
- [ ] Handle errors with `getErrorMessage`
- [ ] Add proper error logging
- [ ] Test error scenarios
- [ ] Test network failures
- [ ] Test token refresh flow

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Network request failed | Check API URL and network connectivity |
| 401 Unauthorized | Token may be expired - check token refresh |
| Timeout errors | Increase timeout or check server response time |
| Token not saved | Ensure using `apiClient.saveToken()` |
| CORS errors (web) | Configure CORS on backend or use proxy |

## Documentation Files

1. **API_INTEGRATION_BEST_PRACTICES.md** - Comprehensive best practices guide
2. **API_MIGRATION_GUIDE.md** - Step-by-step migration guide
3. **services/authService.example.ts** - Example implementation
4. **services/apiClient.ts** - API client implementation

