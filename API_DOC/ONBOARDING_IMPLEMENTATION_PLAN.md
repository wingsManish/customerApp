# Onboarding Flow Implementation Plan

**Base API URL:** `https://tba-truckowner-dev.azurewebsites.net`  
**Auth API URL:** `https://tba-authentication-dev.azurewebsites.net`

---

## Overview

This document outlines the complete implementation plan for the company onboarding flow, including API integration, state management, token handling, and home screen completion.

### ⚠️ Important: First Submission Requirements

**The `POST /Company` API call must include ALL mandatory fields in a single request:**

**Mandatory Fields:**
- ✅ `name` - Company name
- ✅ `ownerName` - Owner name
- ✅ `orgType` - Organization type (3 = CustomerIndividual, 4 = CustomerCompany)
- ✅ `status` - Status (typically 1 for active)
- ✅ `primaryContactDto` - Complete contact object with:
  - ✅ `firstName` - First name
  - ✅ `mobile` - Mobile with country code
  - ✅ `emailID` - Email address
  - ✅ `modeOfCommunication` - Communication mode
  - ✅ `userName` - Username for login
  - ✅ `password` - Password for login

**Optional Fields:**
- ❌ `orgAttachments` - Optional, but if included, all sub-fields are mandatory
- ❌ `id` - NOT required for creation
- ❌ `orgRoles` - Optional, handled by API

**Key Points:**
1. **Authentication Flow:**
   - After OTP verification, auto-login with hardcoded credentials (manish981/manish982)
   - Get app token → Login → Receive JWT + Refresh tokens
   - Decode JWT token and store: userId (234), orgId (2), roleId (0), rgcode (tz), client (customer), type (user)
   - Set up token refresh mechanism using `/Auth/refresh` endpoint
   - Tokens stored in SecureStore/Keychain, decoded data in session

2. **NO `clientType` field** - This field does not exist in the API

3. **Combine Screen 2 + Screen 3 data** before making POST /Company call

4. **All contact fields are mandatory** and must be included in the first submission

5. **File upload is optional in POST /Company**, but **files must be uploaded on Screen 5** using:
   - `POST /Attachment/upload` for each file
   - `POST /Company/attachment` to associate files with the `organizationId` from POST /Company response

6. **POST /Company/attachment** request body is an **array** of attachment objects (not an object with `orgAttachments` property)

---

## Authentication Flow (Before Onboarding)

### Authentication Flow Diagram
```
OTP Verification Screen
    ↓
User enters OTP code
    ↓
POST /Otp/verify/{mobileNumber}/{otp}
    ↓
[OTP Verified Successfully]
    ↓
Auto-Login with Hardcoded Credentials:
  - username: "manish981"
  - password: "manish982"
    ↓
POST /Auth/apptoken?client=customer (Get App Token)
    ↓
POST /Auth/login (with App Token + credentials)
    ↓
Receive JWT Token + Refresh Token
    ↓
Decode JWT Token:
  - userId: 234
  - orgId: 2
  - roleId: 0
  - rgcode: "tz"
  - client: "customer"
  - type: "user"
  - exp: 1766455440
    ↓
Store Tokens in SecureStore/Keychain
    ↓
Store Decoded Token Data in Session
    ↓
[Authentication Complete]
    ↓
Start Onboarding Flow
```

---

## Onboarding Flow Sequence

### Flow Diagram
```
[Authentication Complete - User logged in with tokens]
    ↓
Screen 1: User Type Selection (CustomerIndividual = 3, CustomerCompany = 4)
    ↓
Screen 2: Company Details Form (name, ownerName, orgType, status)
    ↓
Screen 3: Contact Information (firstName, mobile, emailID, modeOfCommunication, userName, password)
    ↓
[COMBINE Screen 2 + Screen 3 DATA]
    ↓
POST /Company (with all mandatory fields)
    ↓
Store organizationId from response
    ↓
Screen 4: Bank Details (PUT /Company/{orgId}/bankdetails)
    ↓
Screen 5: File Upload (2 documents) - Files must be uploaded on this screen
    ↓
    POST /Attachment/upload (for each file)
    ↓
    POST /Company/attachment (associate with organizationId)
    ↓
Screen 6: Emergency Information (PUT /Company/{orgId}/emergencydetails)
    ↓
Home Screen
```

### Important: When to Make POST /Company Call

**The `POST /Company` API call should be made AFTER collecting data from both Screen 2 and Screen 3**, combining all mandatory fields:

1. **Screen 2 Data:**
   - name (company name)
   - ownerName
   - orgType (from Screen 1: 3 or 4)
   - status (typically 1)

2. **Screen 3 Data:**
   - primaryContactDto with:
     - firstName
     - mobile
     - emailID
     - modeOfCommunication
     - userName
     - password

3. **Optional (if files uploaded before):**
   - orgAttachments array

**Implementation Approach:**
- Option A: Collect all data first, then make single POST /Company call after Screen 3
- Option B: Make POST /Company call on Screen 3 "Next" button with combined data

---

## Authentication Implementation

### Step 1: OTP Verification (`otp-verification.tsx`)

**Purpose:** Verify OTP code and trigger auto-login

**API Endpoint:**
- **Method:** `POST /Otp/verify/{mobileNumber}/{otp}`
- **URL:** `https://tba-truckowner-dev.azurewebsites.net/Otp/verify/{mobileNumber}/{otp}`
- **Headers:**
  ```json
  {
    "Content-Type": "application/json",
    "authToken": "test"
  }
  ```

**Request:**
- Path parameters: `mobileNumber` and `otp`

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    // OTP verification data
  }
}
```

**Implementation Steps:**
1. User enters OTP code
2. Call `POST /Otp/verify/{mobileNumber}/{otp}`
3. On success → Trigger auto-login with hardcoded credentials
4. On failure → Show error message

---

### Step 2: Auto-Login with Hardcoded Credentials

**Purpose:** Automatically login user after OTP verification

**Hardcoded Credentials:**
```typescript
const HARDCODED_CREDENTIALS = {
  username: 'manish981',
  password: 'manish982',
};
```

**API Flow:**

**Step 2.1: Get App Token**
- **Method:** `POST /Auth/apptoken?client=customer`
- **URL:** `https://tba-authentication-dev.azurewebsites.net/Auth/apptoken?client=customer`
- **Headers:**
  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer test",
    "authToken": "test"
  }
  ```
- **Request Body:**
  ```json
  {
    "clientKey": "customer"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "success": true,
    "data": {
      "jwtToken": "app_token_here"
    }
  }
  ```

**Step 2.2: User Login**
- **Method:** `POST /Auth/login`
- **URL:** `https://tba-authentication-dev.azurewebsites.net/Auth/login`
- **Headers:**
  ```json
  {
    "Content-Type": "application/json",
    "Accept": "*/*",
    "Authorization": "Bearer <app_token>"
  }
  ```
- **Request Body:**
  ```json
  {
    "username": "manish981",
    "password": "manish982"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "success": true,
    "message": "Login successful",
    "data": {
      "jwtToken": "user_jwt_token_here",
      "refreshToken": "refresh_token_here",
      "expiresIn": 3600
    }
  }
  ```

**Implementation Code:**
```typescript
// After OTP verification success
const handleAutoLogin = async () => {
  try {
    // Step 1: Get App Token
    const appTokenResponse = await apiClient.post(
      '/Auth/apptoken?client=customer',
      { clientKey: 'customer' },
      { skipAuth: true }
    );
    
    if (!appTokenResponse.success || !appTokenResponse.data?.jwtToken) {
      throw new Error('Failed to get app token');
    }
    
    const appToken = appTokenResponse.data.jwtToken;
    
    // Step 2: Login with hardcoded credentials
    const loginResponse = await apiClient.post(
      '/Auth/login',
      {
        username: 'manish981',
        password: 'manish982',
      },
      {
        skipAuth: false,
        headers: {
          Authorization: `Bearer ${appToken}`,
        },
      }
    );
    
    if (loginResponse.success && loginResponse.data) {
      const { jwtToken, refreshToken } = loginResponse.data;
      
      // Store tokens
      await apiClient.saveUserToken(jwtToken);
      await apiClient.saveRefreshToken(refreshToken);
      
      // Decode and store token data
      await handleTokenStorage(jwtToken, refreshToken);
      
      // Navigate to onboarding
      router.push('/user-type-selection');
    } else {
      throw new Error(loginResponse.message || 'Login failed');
    }
  } catch (error) {
    console.error('Auto-login error:', error);
    // Show error message to user
  }
};
```

---

### Step 3: Token Decoding and Storage

**Decoded Token Structure:**
```typescript
interface DecodedToken {
  userId: 234;
  orgId: 2;
  roleId: 0;
  rgcode: 'tz';
  client: 'customer';
  type: 'user';
  exp: 1766455440; // Expiry timestamp
  iat?: number; // Issued at timestamp
}
```

**Token Decoding Implementation:**
```typescript
// utils/tokenUtils.ts
export interface DecodedToken {
  userId: number;
  orgId: number;
  roleId: number;
  rgcode: string;
  client: string;
  type: string;
  exp: number;
  iat?: number;
}

export const decodeJWT = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (decodedToken: DecodedToken): boolean => {
  if (!decodedToken.exp) return false;
  const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds
  return Date.now() >= expiryTime;
};

// Get time until expiry (in milliseconds)
export const getTimeUntilExpiry = (decodedToken: DecodedToken): number => {
  if (!decodedToken.exp) return Infinity;
  const expiryTime = decodedToken.exp * 1000;
  return expiryTime - Date.now();
};
```

**Token Storage Implementation:**
```typescript
// After successful login
const handleTokenStorage = async (jwtToken: string, refreshToken: string) => {
  try {
    // Store tokens in SecureStore/Keychain (existing apiClient methods)
    await apiClient.saveUserToken(jwtToken);
    await apiClient.saveRefreshToken(refreshToken);
    
    // Decode JWT token
    const decoded = decodeJWT(jwtToken);
    
    if (decoded) {
      // Store decoded data in session
      await updateSession({
        authToken: jwtToken,
        refreshToken: refreshToken,
        decodedToken: decoded,
        userId: decoded.userId,
        orgId: decoded.orgId,
        roleId: decoded.roleId,
        regionCode: decoded.rgcode,
        clientType: decoded.client,
        userType: decoded.type,
        tokenExpiry: decoded.exp,
      });
      
      console.log('Token decoded and stored:', {
        userId: decoded.userId,
        orgId: decoded.orgId,
        roleId: decoded.roleId,
        regionCode: decoded.rgcode,
        client: decoded.client,
        type: decoded.type,
        expiresAt: new Date(decoded.exp * 1000).toISOString(),
      });
    }
  } catch (error) {
    console.error('Error storing tokens:', error);
    throw error;
  }
};
```

---

### Step 4: Token Refresh Mechanism

**Purpose:** Refresh JWT token before it expires

**API Endpoint:**
- **Method:** `POST /Auth/refresh`
- **URL:** `https://tba-authentication-dev.azurewebsites.net/Auth/refresh`
- **Headers:**
  ```json
  {
    "Content-Type": "application/json",
    "Accept": "*/*",
    "Authorization": "<refresh_token>"
  }
  ```
- **Request Body:** None (refresh token in Authorization header)
- **Response:**
  ```json
  {
    "statusCode": 200,
    "success": true,
    "data": {
      "jwtToken": "new_jwt_token_here",
      "refreshToken": "new_refresh_token_here",
      "expiresIn": 3600
    }
  }
  ```

**Token Refresh Implementation:**
```typescript
// services/tokenRefreshService.ts
import { apiClient } from './apiClient';
import { decodeJWT, isTokenExpired, getTimeUntilExpiry } from '@/utils/tokenUtils';
import { getSession, updateSession } from './sessionService';

// Refresh token proactively (e.g., 5 minutes before expiry)
const REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

export const refreshTokenIfNeeded = async (): Promise<boolean> => {
  try {
    const session = await getSession();
    
    if (!session?.decodedToken || !session?.refreshToken) {
      return false;
    }
    
    const decoded = session.decodedToken;
    
    // Check if token is expired or about to expire
    if (isTokenExpired(decoded)) {
      console.log('Token expired, refreshing...');
      return await refreshToken();
    }
    
    const timeUntilExpiry = getTimeUntilExpiry(decoded);
    
    // Refresh if less than threshold time remaining
    if (timeUntilExpiry < REFRESH_THRESHOLD) {
      console.log('Token expiring soon, refreshing proactively...');
      return await refreshToken();
    }
    
    return true; // Token is still valid
  } catch (error) {
    console.error('Error checking token expiry:', error);
    return false;
  }
};

export const refreshToken = async (): Promise<boolean> => {
  try {
    const session = await getSession();
    
    if (!session?.refreshToken) {
      throw new Error('No refresh token available');
    }
    
    // Call refresh endpoint
    const response = await fetch(
      `${apiClient.baseURL}/Auth/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': session.refreshToken,
        },
      }
    );
    
    const result = await response.json();
    
    if (result.success && result.data?.jwtToken) {
      const { jwtToken, refreshToken: newRefreshToken } = result.data;
      
      // Store new tokens
      await apiClient.saveUserToken(jwtToken);
      if (newRefreshToken) {
        await apiClient.saveRefreshToken(newRefreshToken);
      }
      
      // Decode and store new token data
      const decoded = decodeJWT(jwtToken);
      if (decoded) {
        await updateSession({
          authToken: jwtToken,
          refreshToken: newRefreshToken || session.refreshToken,
          decodedToken: decoded,
          userId: decoded.userId,
          orgId: decoded.orgId,
          roleId: decoded.roleId,
          regionCode: decoded.rgcode,
          clientType: decoded.client,
          userType: decoded.type,
          tokenExpiry: decoded.exp,
        });
      }
      
      console.log('Token refreshed successfully');
      return true;
    }
    
    throw new Error(result.message || 'Token refresh failed');
  } catch (error) {
    console.error('Error refreshing token:', error);
    // If refresh fails, user needs to re-login
    await apiClient.removeAllTokens();
    await clearSession();
    return false;
  }
};

// Set up automatic token refresh check
export const setupTokenRefreshTimer = () => {
  // Check token expiry every minute
  setInterval(async () => {
    await refreshTokenIfNeeded();
  }, 60 * 1000); // Check every minute
};
```

**Usage in App:**
```typescript
// In app/_layout.tsx or main component
useEffect(() => {
  // Set up token refresh timer on app start
  setupTokenRefreshTimer();
  
  // Also check token before making API calls
  refreshTokenIfNeeded();
}, []);
```

---

## Screen-by-Screen Implementation Plan

### Screen 1: User Type Selection (`user-type-selection.tsx`)

**Purpose:** Select account type (Individual or Company)

**User Options:**
- `CustomerIndividual = 3`
- `CustomerCompany = 4`

**Implementation:**
- Store selected type in session state
- No API call at this stage
- Navigate to company details screen

**State Management:**
```typescript
const [userType, setUserType] = useState<3 | 4 | null>(null);
// Store in session: userType
```

**Navigation:**
- On selection → Navigate to `/company-details`

---

### Screen 2: Company Details Form (`company-details.tsx`)

**Purpose:** Collect basic company registration information

**Form Fields (Mandatory for API):**
- Company Name (required) - maps to `name` field
- Owner Name (required) - maps to `ownerName` field
- Organization Type (required) - maps to `orgType` field (from Screen 1: 3 or 4)
- Status (required) - maps to `status` field (typically 1 for active)

**Note:** Additional fields like license number, address, city, state, country, pincode may be collected but are NOT mandatory for the initial `POST /Company` call. These can be updated later using `PUT /Company/{orgId}/details`.

**API Endpoint:**
- **Method:** `POST /Company`
- **Base URL:** `https://tba-truckowner-dev.azurewebsites.net`
- **Headers:**
  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "<user_jwt_token>",
    "authToken": "test"
  }
  ```

**Request Body Structure (Complete Mandatory Fields):**
```json
{
  "name": "string",  // Company name (MANDATORY)
  "ownerName": "string",  // MANDATORY
  "orgType": 4,  // CustomerCompany = 4, CustomerIndividual = 3 (from Screen 1) (MANDATORY)
  "status": 1,  // Active status (MANDATORY) - typically 1 for active
  "primaryContactDto": {  // MANDATORY - Complete object required
    "firstName": "string",  // MANDATORY
    "mobile": "+255712345678",  // MANDATORY (with country code)
    "emailID": "contact@company.com",  // MANDATORY
    "modeOfCommunication": "Phone",  // MANDATORY (Phone, Email, or Both)
    "userName": "string",  // MANDATORY (for login)
    "password": "string"  // MANDATORY (for login)
  },
  "orgAttachments": [  // OPTIONAL - but if included, ALL fields are mandatory
    {
      "organizationId": 0,  // MANDATORY if orgAttachments included (0 for creation)
      "attachmentType": 0,  // MANDATORY if orgAttachments included
      "attachmentId": 387,  // MANDATORY if orgAttachments included (from upload response)
      "fileName": "document1.pdf",  // MANDATORY if orgAttachments included
      "isActive": true  // MANDATORY if orgAttachments included
    }
  ]
  // Note: 
  // - "id" field is NOT required for creation
  // - "orgRoles" is optional and handled by API side
}
```

**Field Summary:**
| Field | Mandatory | Source | Notes |
|-------|-----------|--------|-------|
| name | ✅ Yes | Screen 2 | Company name |
| ownerName | ✅ Yes | Screen 2 | Owner name |
| orgType | ✅ Yes | Screen 1 | 3 = CustomerIndividual, 4 = CustomerCompany |
| status | ✅ Yes | Default | Typically 1 for active |
| primaryContactDto | ✅ Yes | Screen 3 | Complete object required |
| ├─ firstName | ✅ Yes | Screen 3 | First name |
| ├─ mobile | ✅ Yes | Screen 3 | With country code |
| ├─ emailID | ✅ Yes | Screen 3 | Valid email format |
| ├─ modeOfCommunication | ✅ Yes | Screen 3 | Phone/Email/Both |
| ├─ userName | ✅ Yes | Screen 3 | For login |
| └─ password | ✅ Yes | Screen 3 | For login |
| orgAttachments | ❌ Optional | Screen 5 | If included, all sub-fields mandatory |
| id | ❌ No | - | Not required for creation |
| orgRoles | ❌ Optional | - | Handled by API |

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Company created successfully",
  "data": {
    "id": 123,
    "organizationId": 123,
    "name": "string",
    // ... other company fields
  }
}
```

**Implementation Steps:**
1. Collect company name and owner name (Screen 2)
2. Collect contact information including firstName, mobile, emailID, modeOfCommunication, userName, password (Screen 3)
3. Combine all mandatory fields
4. Validate all required fields
5. Call `POST /Company` with complete data (company + contact info together)
6. Store `organizationId` from response in session state
7. Navigate to bank details screen

**State Management:**
```typescript
// Combined state for company creation
const [companyData, setCompanyData] = useState({
  name: '',  // Company name
  ownerName: '',
  orgType: 3,  // From Screen 1: 3 = CustomerIndividual, 4 = CustomerCompany
  status: 1,  // Active status
});

const [contactData, setContactData] = useState({
  firstName: '',
  mobile: '',
  emailID: '',
  modeOfCommunication: 'Phone',
  userName: '',
  password: '',
});

const [organizationId, setOrganizationId] = useState<number | null>(null);
```

**Error Handling:**
- Display validation errors for required fields
- Handle API errors (400, 401, 500)
- Show user-friendly error messages

---

### Screen 3: Contact Information (`contact-info.tsx`)

**Purpose:** Collect primary contact details (part of company creation)

**Form Fields (All Mandatory):**
- First Name (required)
- Mobile Number with Country Code (required)
- Email ID (required)
- Mode of Communication (required - dropdown: Phone, Email, Both)
- User Name (required) - for login
- Password (required) - for login

**API Integration:**
- **This data is combined with Screen 2 data and sent in `POST /Company`**
- No separate API call at this stage
- All contact fields are included in the `primaryContactDto` object

**Implementation Steps:**
1. Collect all contact form fields
2. Validate all required fields:
   - First name (required)
   - Mobile number format with country code (e.g., +255712345678)
   - Email format (required)
   - Mode of communication (required)
   - Username (required, unique)
   - Password (required, min length validation)
3. Store contact data in session state
4. Navigate to bank details screen
5. **Note:** The actual `POST /Company` API call will be made after collecting both company details (Screen 2) and contact info (Screen 3)

**State Management:**
```typescript
const [contactData, setContactData] = useState({
  firstName: '',  // MANDATORY
  mobile: '',  // MANDATORY (with country code)
  emailID: '',  // MANDATORY
  modeOfCommunication: 'Phone',  // MANDATORY (Phone, Email, Both)
  userName: '',  // MANDATORY (for login)
  password: '',  // MANDATORY (for login)
});
```

**Note:** 
- Mobile number should include country code (e.g., +255712345678)
- Validate email format
- Mode of communication: dropdown with options (Phone, Email, Both)
- Username should be unique (API will validate)
- Password should meet security requirements (min 8 chars, etc.)
- **All this data will be sent together with company details in POST /Company**

---

### Screen 4: Bank Details (`bank-details.tsx`)

**Purpose:** Collect banking information

**Form Fields:**
- Bank Name (required)
- Account Number (required)
- Account Type (required - dropdown: Savings, Current, etc.)
- Bank Branch (required)
- IFSC Code (optional)
- MICR Code (optional)
- TIN Number (optional)

**API Endpoint:**
- **Method:** `PUT /Company/{orgId}/bankdetails`
- **URL:** `https://tba-truckowner-dev.azurewebsites.net/Company/{organizationId}/bankdetails`
- **Headers:** Same as previous screens

**Request Body Structure:**
```json
{
  "bankName": "string",
  "accountNumber": "string",
  "accountType": "string", // "Savings" or "Current"
  "bankBranch": "string",
  "ifsc": "string", // optional
  "micr": "string", // optional
  "tinNumber": "string" // optional
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Bank details updated",
  "data": {
    // Updated company data with bank details
  }
}
```

**Implementation Steps:**
1. Get `organizationId` from session state
2. Collect bank details form data
3. Validate required fields
4. Call `PUT /Company/{organizationId}/bankdetails`
5. Store bank details in session
6. Navigate to file upload screen

**State Management:**
```typescript
const [bankData, setBankData] = useState({
  bankName: '',
  accountNumber: '',
  accountType: 'Savings',
  bankBranch: '',
  ifsc: '',
  micr: '',
  tinNumber: '',
});
```

---

### Screen 5: File Upload (`upload-documents.tsx`)

**Purpose:** Upload 2 documents and associate with company

**Important Notes:**
- File upload is **optional during company creation** (POST /Company), but **files should be uploaded on this screen**
- User must upload 2 documents on this screen
- After uploading files, associate them with the company using the `organizationId` from POST /Company response

**Upload Flow:**
1. Upload Document 1 → Get `attachmentId1` and `fileName1`
2. Upload Document 2 → Get `attachmentId2` and `fileName2`
3. Associate both attachments with company using `POST /Company/attachment`

**Step 5.1: Upload Documents**

**API Endpoint:** `POST /Attachment/upload`
- **URL:** `https://tba-truckowner-dev.azurewebsites.net/Attachment/upload`
- **Method:** POST
- **Content-Type:** `multipart/form-data`

**Request:**
- FormData with file
- Headers: Include `Authorization` token

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "attachmentId": 387,
    "fileName": "Participation_Certificate.pdf"
  }
}
```

**Implementation Code Example:**
```typescript
// Upload Document 1
const uploadFile1 = async (file: File) => {
  setDocument1(prev => ({ ...prev, uploading: true }));
  
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post('/Attachment/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.success && response.data) {
      const { attachmentId, fileName } = response.data;
      setDocument1({
        attachmentId,
        fileName,
        file,
        uploading: false,
      });
      return { attachmentId, fileName };
    }
    throw new Error('Upload failed');
  } catch (error) {
    setDocument1(prev => ({ ...prev, uploading: false }));
    throw error;
  }
};

// Upload Document 2 (same process)
const uploadFile2 = async (file: File) => {
  setDocument2(prev => ({ ...prev, uploading: true }));
  
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post('/Attachment/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.success && response.data) {
      const { attachmentId, fileName } = response.data;
      setDocument2({
        attachmentId,
        fileName,
        file,
        uploading: false,
      });
      return { attachmentId, fileName };
    }
    throw new Error('Upload failed');
  } catch (error) {
    setDocument2(prev => ({ ...prev, uploading: false }));
    throw error;
  }
};

// Associate attachments with company
const associateAttachments = async () => {
  if (!organizationId || !document1.attachmentId || !document2.attachmentId) {
    throw new Error('Missing required data');
  }
  
  setAssociating(true);
  
  try {
    const attachments = [
      {
        organizationId: organizationId,
        attachmentType: 0,
        attachmentId: document1.attachmentId,
        fileName: document1.fileName!,
        isActive: true,
      },
      {
        organizationId: organizationId,
        attachmentType: 0,
        attachmentId: document2.attachmentId,
        fileName: document2.fileName!,
        isActive: true,
      },
    ];
    
    const response = await apiClient.post('/Company/attachment', attachments);
    
    if (response.success) {
      // Success - navigate to next screen
      return response.data;
    }
    throw new Error(response.message || 'Association failed');
  } catch (error) {
    throw error;
  } finally {
    setAssociating(false);
  }
};
```

**Step 5.2: Associate Attachments with Company**

**API Endpoint:** `POST /Company/attachment`
- **URL:** `https://tba-truckowner-dev.azurewebsites.net/Company/attachment`
- **Method:** POST
- **Headers:** Same as previous screens (Authorization token, authToken)

**Request Body Structure:**
```json
[
  {
    "organizationId": 123,  // From POST /Company response (organizationId)
    "attachmentType": 0,  // Document type (0 = default, check API docs for available types)
    "attachmentId": 387,  // From POST /Attachment/upload response (attachmentId1)
    "fileName": "Participation_Certificate.pdf",  // From POST /Attachment/upload response (fileName1)
    "isActive": true
  },
  {
    "organizationId": 123,  // Same organizationId from POST /Company response
    "attachmentType": 0,  // Document type
    "attachmentId": 388,  // From POST /Attachment/upload response (attachmentId2)
    "fileName": "Business_License.pdf",  // From POST /Attachment/upload response (fileName2)
    "isActive": true
  }
]
```

**Note:** The request body is an **array** of attachment objects, not an object with `orgAttachments` property.

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Attachments associated successfully",
  "data": {
    // Confirmation data
  }
}
```

**Implementation Steps:**
1. Get `organizationId` from session state (stored after POST /Company call)
2. Upload Document 1 → Store `attachmentId1` and `fileName1`
3. Upload Document 2 → Store `attachmentId2` and `fileName2`
4. Prepare array with both attachment objects using:
   - `organizationId` from POST /Company response
   - `attachmentId` and `fileName` from each upload response
   - `attachmentType` (default: 0, or check API docs for specific types)
   - `isActive: true`
5. Call `POST /Company/attachment` with the array
6. Handle success/error responses
7. Navigate to emergency info screen

**Complete Implementation Flow:**

1. **Get organizationId:**
   - Retrieve `organizationId` from session state (stored after POST /Company response)

2. **Upload Document 1:**
   - User selects Document 1
   - Show file picker (PDF, images)
   - Upload using `POST /Attachment/upload`
   - Store response: `attachmentId1` and `fileName1`
   - Show upload progress

3. **Upload Document 2:**
   - User selects Document 2
   - Show file picker
   - Upload using `POST /Attachment/upload`
   - Store response: `attachmentId2` and `fileName2`
   - Show upload progress

4. **Associate Attachments:**
   - Once both files uploaded successfully
   - Prepare request body array with both attachment objects:
     ```typescript
     const attachments = [
       {
         organizationId: organizationId,  // From POST /Company response
         attachmentType: 0,
         attachmentId: attachmentId1,  // From upload response
         fileName: fileName1,  // From upload response
         isActive: true
       },
       {
         organizationId: organizationId,
         attachmentType: 0,
         attachmentId: attachmentId2,  // From upload response
         fileName: fileName2,  // From upload response
         isActive: true
       }
     ];
     ```
   - Call `POST /Company/attachment` with the array
   - Handle success/error

5. **Navigate:**
   - On success → Navigate to emergency info screen
   - On error → Show error message, allow retry

**State Management:**
```typescript
const [organizationId, setOrganizationId] = useState<number | null>(null); // From POST /Company response

const [document1, setDocument1] = useState<{
  attachmentId: number | null;
  fileName: string | null;
  file: File | null;
  uploading: boolean;
}>({
  attachmentId: null,
  fileName: null,
  file: null,
  uploading: false,
});

const [document2, setDocument2] = useState<{
  attachmentId: number | null;
  fileName: string | null;
  file: File | null;
  uploading: boolean;
}>({
  attachmentId: null,
  fileName: null,
  file: null,
  uploading: false,
});

const [associating, setAssociating] = useState(false); // For POST /Company/attachment call
```

**File Upload Component:**
- Use `expo-document-picker` or `react-native-document-picker`
- Support PDF, images (JPG, PNG)
- Show file name and size
- Display upload progress
- Allow file removal before final submission

**Error Handling:**
- Handle file size limits
- Handle unsupported file types
- Handle upload failures
- Retry mechanism for failed uploads

---

### Screen 6: Emergency Information (`emergency-info.tsx`)

**Purpose:** Collect emergency contact details

**Form Fields:**
- Emergency Contact Name (required)
- Emergency Phone Number (required)
- Emergency Address (required)
- Relationship (optional - **DO NOT PASS** as per requirements)

**API Endpoint:**
- **Method:** `PUT /Company/{orgId}/emergencydetails`
- **URL:** `https://tba-truckowner-dev.azurewebsites.net/Company/{organizationId}/emergencydetails`
- **Headers:** Same as previous screens

**Request Body Structure:**
```json
{
  "emergencyName": "John Doe",
  "emerPhone": "+255712345678",
  "emerAddress": "123 Emergency St, City, Country"
  // DO NOT include "relationship" field
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Emergency details updated",
  "data": {
    // Updated company data with emergency details
  }
}
```

**Implementation Steps:**
1. Get `organizationId` from session state
2. Collect emergency contact form data
3. Validate required fields (name, phone, address)
4. Call `PUT /Company/{organizationId}/emergencydetails`
5. Mark onboarding as complete in session
6. Navigate to home screen

**State Management:**
```typescript
const [emergencyData, setEmergencyData] = useState({
  emergencyName: '',
  emerPhone: '',
  emerAddress: '',
  // relationship: '' // DO NOT include
});
```

---

## JWT Token Handling

### Token Storage

**Current Implementation:**
- Tokens are stored in SecureStore (mobile) or AsyncStorage (web)
- User token key: `user_token`
- Refresh token key: `refresh_token`

### Using Decoded Token Data in Onboarding

**After authentication, use decoded token data:**
- `userId: 234` - Use for user-specific operations
- `orgId: 2` - Use for organization-specific operations (may be updated after company creation)
- `roleId: 0` - User role
- `rgcode: "tz"` - Region code
- `client: "customer"` - Client type
- `type: "user"` - User type

**Note:** The `orgId` from the token (2) may be different from the `organizationId` created during onboarding. Store the new `organizationId` from POST /Company response and use it for subsequent API calls.

3. **Use Decoded Token Data:**
- Use `orgId` from decoded token for API calls
- Use `userId` for user-specific operations
- Check token expiry using `exp` field

### Hardcoded User Details (Development)

**Hardcoded Credentials for Auto-Login:**
```typescript
// constants/hardcodedData.ts
export const HARDCODED_CREDENTIALS = {
  username: 'manish981',
  password: 'manish982',
};

// Expected decoded token values (for reference)
export const EXPECTED_TOKEN_DATA = {
  userId: 234,
  orgId: 2,
  roleId: 0,
  rgcode: 'tz',
  client: 'customer',
  type: 'user',
  exp: 1766455440, // Expires: Tue Dec 23 2025 07:34:00 GMT+0530
};

// Helper to get organization ID
export const getOrganizationId = async (): Promise<number> => {
  // Try to get from decoded token
  const session = await getSession();
  if (session?.decodedToken?.orgId) {
    return session.decodedToken.orgId;
  }
  
  // Fallback to expected value
  return EXPECTED_TOKEN_DATA.orgId;
};

// Helper to get user ID
export const getUserId = async (): Promise<number> => {
  const session = await getSession();
  if (session?.decodedToken?.userId) {
    return session.decodedToken.userId;
  }
  return EXPECTED_TOKEN_DATA.userId;
};
```

---

## Home Screen Completion

### Screen: `home.tsx`

**Purpose:** Main dashboard showing overview statistics and recent activity

**APIs to Integrate:**

1. **Dashboard Overview:**
   - **Endpoint:** `GET /Dashboard/home`
   - **Response:** Dashboard summary data
   ```json
   {
     "statusCode": 200,
     "success": true,
     "data": {
       "activeTrips": 5,
       "pendingTrips": 2,
       "requestedQuotes": 10,
       "pendingQuotes": 3
     }
   }
   ```

2. **Active Trips:**
   - **Endpoint:** `GET /TruckCall/quotes/trip/user/{userId}`
   - **Query Params:** `status=Active`
   - **Response:** List of active trips

3. **Requested Quotes:**
   - **Endpoint:** `GET /TruckCall/quotes/user`
   - **Query Params:** `status=Pending`
   - **Response:** List of pending quotes

**Implementation Steps:**

1. **Load Dashboard Data on Mount:**
```typescript
useEffect(() => {
  loadDashboardData();
}, []);

const loadDashboardData = async () => {
  try {
    // Get user ID from decoded token or hardcoded
    const userId = await getUserId();
    
    // Fetch dashboard overview
    const overviewResponse = await apiClient.get('/Dashboard/home');
    if (overviewResponse.success) {
      setOverviewData(overviewResponse.data);
    }
    
    // Fetch active trips
    const tripsResponse = await apiClient.get(
      `/TruckCall/quotes/trip/user/${userId}?status=Active`
    );
    if (tripsResponse.success) {
      setActiveTrips(tripsResponse.data);
    }
    
    // Fetch requested quotes
    const quotesResponse = await apiClient.get(
      '/TruckCall/quotes/user?status=Pending'
    );
    if (quotesResponse.success) {
      setRequestedQuotes(quotesResponse.data);
    }
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
};
```

2. **Pull to Refresh:**
- Implement refresh control
- Reload all dashboard data on pull

3. **Navigation:**
- Active trips → Navigate to `/trips/[tripId]`
- Requested quotes → Navigate to `/quote-details/[quoteId]`
- View All buttons → Navigate to respective list screens

**State Management:**
```typescript
const [overviewData, setOverviewData] = useState({
  activeTrips: 0,
  pendingTrips: 0,
  requestedQuotes: 0,
  pendingQuotes: 0,
});

const [activeTrips, setActiveTrips] = useState<Trip[]>([]);
const [requestedQuotes, setRequestedQuotes] = useState<Quote[]>([]);
const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
```

---

## State Management Strategy

### Session Service Updates

**Update `sessionService.ts` to include:**
```typescript
import { DecodedToken } from '@/utils/tokenUtils';

export interface UserSession {
  // ... existing fields (phoneNumber, sessionId, etc.)
  
  // Authentication fields
  authToken?: string;
  refreshToken?: string;
  decodedToken?: DecodedToken;
  userId?: number;
  orgId?: number; // From decoded token (may be different from organizationId)
  roleId?: number;
  regionCode?: string;
  clientType?: string;
  userType?: string; // "user" from decoded token
  tokenExpiry?: number; // Expiry timestamp
  
  // Onboarding fields
  userTypeSelection?: 3 | 4; // CustomerIndividual = 3, CustomerCompany = 4
  organizationId?: number; // From POST /Company response (may differ from orgId in token)
  
  // Onboarding progress
  companyDetailsCompleted?: boolean;
  contactInfoCompleted?: boolean;
  bankDetailsCompleted?: boolean;
  documentsCompleted?: boolean;
  emergencyInfoCompleted?: boolean;
  
  // Attachment IDs
  document1AttachmentId?: number;
  document2AttachmentId?: number;
}
```

### Global State Management

**Consider using Context API or Zustand for:**
- Current organization ID
- Decoded token data
- Onboarding progress
- API loading states

---

## Error Handling Strategy

### API Error Handling

1. **401 Unauthorized:**
   - Token expired → Refresh token
   - Refresh fails → Redirect to login

2. **400 Bad Request:**
   - Validation errors → Show field-specific errors
   - Display user-friendly messages

3. **500 Server Error:**
   - Show generic error message
   - Allow retry

4. **Network Errors:**
   - Show "No internet connection" message
   - Allow retry when connection restored

### Form Validation

- Client-side validation before API calls
- Required field indicators
- Format validation (email, phone, etc.)
- Real-time validation feedback

---

## Testing Strategy

### Development Testing

1. **Hardcoded Data:**
   - Use hardcoded `organizationId = 1` for all API calls
   - Use hardcoded user credentials for login

2. **Mock Responses:**
   - Create mock API responses for testing
   - Test UI flows without backend

3. **Error Scenarios:**
   - Test with invalid data
   - Test with network failures
   - Test with expired tokens

### Integration Testing

1. **API Integration:**
   - Test each endpoint individually
   - Verify request/response formats
   - Test error responses

2. **Flow Testing:**
   - Test complete onboarding flow
   - Test navigation between screens
   - Test data persistence

---

## Implementation Checklist

### Phase 1: Setup & Infrastructure
- [ ] Create token decoding utility (`utils/tokenUtils.ts`)
- [ ] Create token refresh service (`services/tokenRefreshService.ts`)
- [ ] Update session service with new fields (decodedToken, userId, orgId, etc.)
- [ ] Create hardcoded credentials constants
- [ ] Set up error handling utilities
- [ ] Set up token refresh timer

### Phase 1.5: Authentication Flow
- [ ] Update OTP verification screen to trigger auto-login
- [ ] Implement auto-login with hardcoded credentials
- [ ] Implement app token generation (`POST /Auth/apptoken`)
- [ ] Implement user login (`POST /Auth/login`)
- [ ] Decode JWT token and store decoded data
- [ ] Store tokens in SecureStore/Keychain
- [ ] Implement token refresh mechanism
- [ ] Set up automatic token refresh timer
- [ ] Test token expiry and refresh flow

### Phase 2: Screen 1 - User Type Selection
- [ ] Update UI to show CustomerIndividual (3) and CustomerCompany (4)
- [ ] Store selection in session
- [ ] Navigate to company details

### Phase 3: Screen 2 - Company Details
- [ ] Create/update form with mandatory fields (name, ownerName)
- [ ] Get orgType from Screen 1 (3 or 4)
- [ ] Set status (typically 1 for active)
- [ ] Implement validation
- [ ] Store data in session state
- [ ] Navigate to contact info screen
- [ ] **Note:** Do NOT call API yet - wait for Screen 3 data

### Phase 4: Screen 3 - Contact Info
- [ ] Create/update form with all mandatory contact fields:
  - [ ] firstName (required)
  - [ ] mobile with country code (required)
  - [ ] emailID (required)
  - [ ] modeOfCommunication (required)
  - [ ] userName (required)
  - [ ] password (required)
- [ ] Implement validation for all fields
- [ ] Combine Screen 2 + Screen 3 data
- [ ] **Make `POST /Company` API call with combined data:**
  - [ ] Include name, ownerName, orgType, status from Screen 2
  - [ ] Include primaryContactDto with all contact fields from Screen 3
  - [ ] Optionally include orgAttachments if files uploaded
- [ ] Store `organizationId` from response
- [ ] Store decoded JWT token data
- [ ] Handle errors
- [ ] Navigate to bank details screen

### Phase 5: Screen 4 - Bank Details
- [ ] Create/update form with bank fields
- [ ] Implement validation
- [ ] Integrate `PUT /Company/{orgId}/bankdetails` API
- [ ] Handle errors

### Phase 6: Screen 5 - File Upload
- [ ] Get `organizationId` from session state (from POST /Company response)
- [ ] Implement file picker for Document 1
- [ ] Integrate `POST /Attachment/upload` for Document 1
- [ ] Store `attachmentId1` and `fileName1` from response
- [ ] Implement file picker for Document 2
- [ ] Integrate `POST /Attachment/upload` for Document 2
- [ ] Store `attachmentId2` and `fileName2` from response
- [ ] Prepare array with both attachment objects:
  - [ ] Use `organizationId` from POST /Company response
  - [ ] Use `attachmentId` and `fileName` from each upload response
  - [ ] Set `attachmentType: 0` (or appropriate type)
  - [ ] Set `isActive: true`
- [ ] Integrate `POST /Company/attachment` with array of attachment objects
- [ ] Show upload progress for each file
- [ ] Show association progress
- [ ] Handle errors for upload and association
- [ ] Navigate to emergency info screen on success

### Phase 7: Screen 6 - Emergency Info
- [ ] Create/update form with emergency fields
- [ ] Implement validation (exclude relationship field)
- [ ] Integrate `PUT /Company/{orgId}/emergencydetails` API
- [ ] Mark onboarding complete
- [ ] Navigate to home

### Phase 8: Home Screen
- [ ] Integrate `GET /Dashboard/home` API
- [ ] Integrate `GET /TruckCall/quotes/trip/user/{userId}` API
- [ ] Integrate `GET /TruckCall/quotes/user` API
- [ ] Implement pull to refresh
- [ ] Handle loading states
- [ ] Handle errors

### Phase 9: Token Management
- [ ] Implement JWT decoding
- [ ] Store decoded token data in session
- [ ] Use decoded data for API calls
- [ ] Implement token refresh logic

### Phase 10: Testing & Refinement
- [ ] Test complete onboarding flow
- [ ] Test error scenarios
- [ ] Test with hardcoded data
- [ ] Refine UI/UX
- [ ] Add loading indicators
- [ ] Add success/error messages

---

## API Endpoints Summary

| Screen | Method | Endpoint | Purpose |
|--------|--------|----------|---------|
| Screen 1 | - | - | Store user type selection (orgType: 3 or 4) |
| Screen 2 | - | - | Collect company name, ownerName (store in state) |
| Screen 3 | POST | `/Company` | **Create company with combined data** (Screen 2 + Screen 3) |
| Screen 4 | PUT | `/Company/{orgId}/bankdetails` | Update bank details |
| Screen 5a | POST | `/Attachment/upload` | Upload document 1 |
| Screen 5b | POST | `/Attachment/upload` | Upload document 2 |
| Screen 5c | POST | `/Company/attachment` | Associate attachments with company (array of attachment objects) |
| Screen 6 | PUT | `/Company/{orgId}/emergencydetails` | Update emergency info |
| Home | GET | `/Dashboard/home` | Get dashboard overview |
| Home | GET | `/TruckCall/quotes/trip/user/{userId}` | Get active trips |
| Home | GET | `/TruckCall/quotes/user` | Get requested quotes |

---

## Notes

1. **Hardcoded Values for Development:**
   - `organizationId = 1` (use from API response when available)
   - `attachmentId = 1` and `2` for file associations
   - User credentials for login testing

2. **Token Handling:**
   - Decode JWT after login/OTP verification
   - Store decoded data in session
   - Use `orgId` and `userId` from decoded token for API calls
   - Fallback to hardcoded values if token data unavailable

3. **File Upload:**
   - Upload files sequentially or in parallel
   - Store attachment IDs before association
   - Show progress for each upload
   - Handle upload failures gracefully

4. **Error Handling:**
   - Always check `success` field in API responses
   - Display user-friendly error messages
   - Implement retry mechanisms where appropriate
   - Handle network errors separately

5. **Navigation:**
   - Use session state to determine next screen
   - Mark onboarding steps as complete
   - Navigate to home only after all steps complete

---

**Last Updated:** December 2024  
**Status:** Planning Phase - Ready for Implementation

