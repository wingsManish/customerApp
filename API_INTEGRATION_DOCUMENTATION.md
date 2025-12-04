# API Integration Documentation

## Overview

This document describes the API integration for the Customer Mobile App, including authentication flow, request/response formats, and implementation guidelines.

---

## Authentication Flow

The authentication system uses a **two-tier token approach** to secure API access:

### 1. App Token Generation

**Purpose:** Identifies which mobile application is making the API call

**Required for:** All API requests (mandatory first step)

**Endpoint:** Authentication API

**Client Keys:**
- `truck` - Truck Owner Mobile App
- `customer` - Customer Mobile App (this app)
- `driver` - Truck Driver Mobile App

**For this app:** Use client key `customer`

### 2. User Token Generation (Login)

**Purpose:** Authenticates and authorizes specific user access

**Required:** App Token (from step 1)

**Input:** Username and Password

**Returns:**
- **JWT Token (User Token)** - Contains user information:
  - User ID
  - Org ID
  - Role ID
  - Region Code
  - Client Type
- **Refresh Token** - Used to extend session without re-login

**Important Note on User Roles:**

The username and password must correspond to the correct role for the application:
- **For Customer App** - Use customer credentials
- **For Driver App** - Use driver credentials
- **For Truck Owner App** - Use truck company credentials
- **For Admin/Web Portal** - Use admin credentials (provides access to all company and customer details)

### 3. Refresh Token Mechanism

**Purpose:** Extend user session without requiring re-authentication

**Token Expiry Times:**
- **User Token:** 1 hour
- **Refresh Token:** Extended expiry (e.g., 1 hour 10 minutes)

**How it works:**
1. When User Token expires, use Refresh Token to call the Refresh API
2. Refresh API generates a new User Token
3. Continue accessing APIs with new User Token
4. Avoids forcing users to login again

---

## Authentication Sequence Diagram

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Mobile    │         │     API     │         │   Backend   │
│    App      │         │   Client    │         │   Server    │
└──────┬──────┘         └──────┬───────┘         └──────┬──────┘
       │                      │                        │
       │  1. Generate App Token                        │
       │  POST /auth/app-token                         │
       │  { clientKey: "customer" }                   │
       ├───────────────────────────────────────────────>│
       │                      │                        │
       │                      │  2. App Token          │
       │                      │<───────────────────────┤
       │  3. App Token        │                        │
       │<────────────────────┤                        │
       │                      │                        │
       │  4. Login            │                        │
       │  POST /auth/login    │                        │
       │  Headers: App-Token  │                        │
       │  Body: { username,    │                        │
       │         password }   │                        │
       ├───────────────────────────────────────────────>│
       │                      │                        │
       │                      │  5. User Token +       │
       │                      │     Refresh Token      │
       │                      │<───────────────────────┤
       │  6. User Token +     │                        │
       │     Refresh Token    │                        │
       │<────────────────────┤                        │
       │                      │                        │
       │  7. API Requests     │                        │
       │  Headers:            │                        │
       │  App-Token           │                        │
       │  Authorization:      │                        │
       │  Bearer <User Token> │                        │
       ├───────────────────────────────────────────────>│
       │                      │                        │
       │                      │  8. Response          │
       │                      │<───────────────────────┤
       │  9. Response         │                        │
       │<────────────────────┤                        │
       │                      │                        │
       │  [If User Token      │                        │
       │   Expired]           │                        │
       │  10. Refresh Token   │                        │
       │  POST /auth/refresh  │                        │
       │  Headers: App-Token  │                        │
       │  Body: { refreshToken }                       │
       ├───────────────────────────────────────────────>│
       │                      │                        │
       │                      │  11. New User Token    │
       │                      │<───────────────────────┤
       │  12. New User Token  │                        │
       │<────────────────────┤                        │
       │                      │                        │
       │  13. Retry Original  │                        │
       │      Request         │                        │
       ├───────────────────────────────────────────────>│
       │                      │                        │
```

---

## Standard API Response Format

All API responses follow a consistent structure with four standard parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `statusCode` | Integer | HTTP status code (200, 400, 401, 404, 500, etc.) |
| `message` | String | Human-readable message describing the result |
| `data` | Object/Array | Response payload containing actual data |
| `success` | Boolean | `true` for successful operations, `false` for errors |

### Example Responses

**Success Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "userToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "123",
      "orgId": "456",
      "roleId": "789",
      "regionCode": "TZ",
      "clientType": "customer"
    }
  }
}
```

**Error Response:**
```json
{
  "statusCode": 401,
  "success": false,
  "message": "Invalid credentials",
  "data": null
}
```

**Validation Error Response:**
```json
{
  "statusCode": 400,
  "success": false,
  "message": "Validation failed",
  "data": {
    "errors": {
      "username": ["Username is required"],
      "password": ["Password must be at least 8 characters"]
    }
  }
}
```

---

## API Endpoints

### Authentication Endpoints

#### 1. Generate App Token

**Endpoint:** `POST /auth/app-token`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "clientKey": "customer"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "App token generated successfully",
  "data": {
    "appToken": "app_token_string_here"
  }
}
```

**Error Responses:**
- `400` - Invalid client key
- `500` - Server error

---

#### 2. User Login

**Endpoint:** `POST /auth/login`

**Headers:**
```
Content-Type: application/json
App-Token: <app_token_from_step_1>
```

**Request Body:**
```json
{
  "username": "customer@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "user_123",
      "orgId": "org_456",
      "roleId": "role_789",
      "regionCode": "TZ",
      "clientType": "customer",
      "username": "customer@example.com"
    }
  }
}
```

**Error Responses:**
- `400` - Invalid request body
- `401` - Invalid credentials
- `403` - Account disabled or locked
- `500` - Server error

---

#### 3. Refresh User Token

**Endpoint:** `POST /auth/refresh`

**Headers:**
```
Content-Type: application/json
App-Token: <app_token>
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

**Error Responses:**
- `400` - Invalid refresh token
- `401` - Refresh token expired
- `500` - Server error

---

#### 4. Logout

**Endpoint:** `POST /auth/logout`

**Headers:**
```
Content-Type: application/json
App-Token: <app_token>
Authorization: Bearer <user_token>
```

**Request Body:**
```json
{}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

---

## Protected API Requests

All protected endpoints require both tokens:

**Headers:**
```
Content-Type: application/json
App-Token: <app_token>
Authorization: Bearer <user_token>
```

**Example Protected Request:**
```typescript
GET /api/user/profile
Headers:
  App-Token: app_token_here
  Authorization: Bearer user_token_here
```

---

## Token Management

### Token Storage

- **App Token:** Store in memory or AsyncStorage (less sensitive, identifies app)
- **User Token:** Store in SecureStore (highly sensitive, contains user info)
- **Refresh Token:** Store in SecureStore (highly sensitive)

### Token Expiry Handling

1. **User Token Expiry (1 hour):**
   - API returns `401 Unauthorized`
   - Automatically attempt token refresh using Refresh Token
   - If refresh succeeds, retry original request
   - If refresh fails, redirect to login

2. **Refresh Token Expiry:**
   - Refresh API returns `401 Unauthorized`
   - Clear all tokens
   - Redirect user to login screen

3. **App Token Expiry:**
   - Regenerate App Token automatically
   - No user interaction required

---

## Implementation Guidelines

### 1. Initialize App Token on App Start

```typescript
// On app launch
const appToken = await generateAppToken('customer');
// Store appToken for all subsequent requests
```

### 2. Login Flow

```typescript
// Step 1: Ensure App Token exists
const appToken = await getOrGenerateAppToken();

// Step 2: Login with credentials
const loginResponse = await login(username, password, appToken);

// Step 3: Store tokens securely
await saveUserToken(loginResponse.data.userToken);
await saveRefreshToken(loginResponse.data.refreshToken);
```

### 3. Making Protected API Calls

```typescript
// All protected requests automatically include:
// - App-Token header
// - Authorization: Bearer <user_token> header
const response = await apiClient.get('/api/user/profile');
```

### 4. Automatic Token Refresh

```typescript
// API client automatically handles:
// 1. Detects 401 response
// 2. Attempts token refresh
// 3. Retries original request
// 4. If refresh fails, triggers logout
```

---

## Error Handling

### Standard Error Codes

| Status Code | Meaning | Action |
|-------------|---------|--------|
| 200 | Success | Process response data |
| 400 | Bad Request | Show validation errors to user |
| 401 | Unauthorized | Attempt token refresh, then logout if fails |
| 403 | Forbidden | Show access denied message |
| 404 | Not Found | Show resource not found message |
| 429 | Too Many Requests | Show rate limit message, retry after delay |
| 500 | Server Error | Show generic error, log for debugging |

### Error Response Format

```json
{
  "statusCode": 400,
  "success": false,
  "message": "Validation failed",
  "data": {
    "errors": {
      "fieldName": ["Error message 1", "Error message 2"]
    }
  }
}
```

---

## Security Best Practices

1. **Never store passwords** - Only store tokens
2. **Use SecureStore** for User Token and Refresh Token
3. **HTTPS only** - Never use HTTP in production
4. **Token expiration** - Respect token expiry times
5. **Automatic refresh** - Implement seamless token refresh
6. **Logout on security events** - Clear tokens on logout, app uninstall, etc.
7. **Validate tokens** - Check token validity before making requests
8. **Error handling** - Never expose sensitive error details to users

---

## Testing Checklist

- [ ] App Token generation works correctly
- [ ] Login with valid credentials succeeds
- [ ] Login with invalid credentials fails gracefully
- [ ] User Token is stored securely
- [ ] Protected API calls include both tokens
- [ ] Token refresh works automatically
- [ ] Token refresh failure triggers logout
- [ ] Logout clears all tokens
- [ ] Network errors are handled gracefully
- [ ] Offline scenarios are handled
- [ ] Session timeout is respected
- [ ] Error messages are user-friendly

---

## Configuration

### Environment Variables

```javascript
// app.config.js
export default {
  expo: {
    extra: {
      apiUrl: process.env.API_URL || 'https://api.example.com',
      clientKey: 'customer', // Fixed for this app
      environment: process.env.NODE_ENV || 'development',
    },
  },
};
```

### API Base URL

- **Development:** `http://localhost:3000` or `https://api-dev.example.com`
- **Staging:** `https://api-staging.example.com`
- **Production:** `https://api.example.com`

---

## Next Steps

1. Review the implementation in `services/apiClient.ts`
2. Review authentication service in `services/authService.ts`
3. Test authentication flow end-to-end
4. Implement protected API endpoints
5. Add error tracking and logging
6. Test token refresh mechanism
7. Test offline scenarios
8. Perform security audit

---

## Support

For API-related issues:
- Check API response format matches documentation
- Verify tokens are being sent correctly
- Check network connectivity
- Review error logs for detailed error messages
- Contact backend team for API-specific issues

