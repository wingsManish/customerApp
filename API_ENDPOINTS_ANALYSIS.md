# API Endpoints Analysis from Postman Collection

## Key Findings

Based on the Postman collection, here are the actual API endpoint structures:

### Authentication Endpoints

#### 1. Get App Token
- **Endpoint:** `POST /apptoken` (NOT `/auth/app-token`)
- **Request Body:**
  ```json
  {
    "clientKey": "customer"  // Use "customer" for Customer App
  }
  ```
- **Response:**
  ```json
  {
    "data": {
      "jwtToken": "app_token_here"  // Note: jwtToken, not appToken
    }
  }
  ```
- **Important:** No headers required for this endpoint

#### 2. Login
- **Endpoint:** `POST /login` (NOT `/auth/login`)
- **Headers:**
  ```
  Authorization: <app_token_from_step_1>
  ```
  **Note:** Uses `Authorization` header, NOT `App-Token` header!
- **Request Body:**
  ```json
  {
    "username": "admin",
    "password": "admin@123"
  }
  ```
- **Response:**
  ```json
  {
    "data": {
      "jwtToken": "user_token_here",      // Note: jwtToken, not userToken
      "refreshToken": "refresh_token_here"
    }
  }
  ```

#### 3. Refresh Token
- **Endpoint:** `POST /refresh` (NOT `/auth/refresh`)
- **Headers:**
  ```
  Authorization: <refresh_token>
  ```
  **Note:** Uses `Authorization` header with refresh token directly
- **Request Body:** None (empty)
- **Response:**
  ```json
  {
    "data": {
      "jwtToken": "new_user_token_here"
    }
  }
  ```

### Protected Endpoints

All protected endpoints use:
- **Header:** `Authorization: <user_token>` (the jwtToken from login)

**Note:** The Postman collection shows that protected endpoints only use the User Token (jwtToken) in the Authorization header, NOT both App Token and User Token.

### Base URLs

From Postman collection:
- `{{authentication_url}}` - Authentication service base URL
- `{{truckowner_url}}` - Truck Owner/Customer service base URL

## Differences from Initial Implementation

| Aspect | Initial Implementation | Actual API (Postman) |
|--------|----------------------|---------------------|
| App Token Endpoint | `/auth/app-token` | `/apptoken` |
| App Token Response Field | `data.appToken` | `data.jwtToken` |
| Login Endpoint | `/auth/login` | `/login` |
| Login Header | `App-Token: <token>` | `Authorization: <app_token>` |
| User Token Field | `data.userToken` | `data.jwtToken` |
| Refresh Endpoint | `/auth/refresh` | `/refresh` |
| Refresh Header | `App-Token` + body | `Authorization: <refresh_token>` |
| Protected Endpoints | `App-Token` + `Authorization` | `Authorization` only |

## Corrected Authentication Flow

1. **Get App Token**
   ```
   POST /apptoken
   Body: { "clientKey": "customer" }
   Response: { "data": { "jwtToken": "app_token" } }
   ```

2. **Login**
   ```
   POST /login
   Header: Authorization: <app_token>
   Body: { "username": "...", "password": "..." }
   Response: { "data": { "jwtToken": "user_token", "refreshToken": "..." } }
   ```

3. **Protected API Calls**
   ```
   GET /api/endpoint
   Header: Authorization: <user_token>
   ```

4. **Refresh Token**
   ```
   POST /refresh
   Header: Authorization: <refresh_token>
   Response: { "data": { "jwtToken": "new_user_token" } }
   ```

## API Endpoints Summary

### Authentication
- `POST /apptoken` - Get App Token
- `POST /login` - User Login
- `POST /refresh` - Refresh User Token

### Company (Customer App may use similar endpoints)
- `POST /company` - Create Company
- `GET /company/{id}` - Get Company By ID
- `PUT /company` - Update Company
- `DELETE /company/{id}` - Delete Company
- `GET /Company/user?userId={id}` - Get Company By User ID
- `PUT /company/{id}/details` - Update Company All Information
- `PUT /company/{id}/bankdetails` - Update Bank Details
- `PUT /company/{id}/emergencydetails` - Update Emergency Details
- `POST /company/employee` - Add Primary Contact
- `PUT /company/employee` - Update Primary Contact
- `POST /attachment/upload` - Upload Attachment
- `POST /company/attachment` - Add Company Attachment
- `PUT /company/attachment` - Update Company Attachment
- `GET /attachment/download/{id}` - Get Attachment

### Trips & Quotes
- `POST /truckcall/quotes` - Create Quote
- `GET /truckcall/quotes/{id}` - Get Quote by TruckCallID
- `PUT /truckcall/quotes` - Update Quote
- `POST /truckcall/quotes/trip/assign` - Assign Truck Driver
- `PATCH /quotes/trip/estimate/{id}/approve` - Approve Trip Estimate
- `PATCH /quotes/trip/estimate/{id}/cancel` - Cancel Trip Estimate
- `PATCH /truckcall/quotes/trip/status` - Update Trip Status
- `GET /truckcall/quotes/user` - Get Quote by user
- `GET /truckcall/quotes/user/{id}?status={status}` - Get Quote by user with status
- `GET /truckcall/quotes/{id}` - Get Cargo by TruckCall Id

### Dashboard
- `GET /dashboard/trips` - Web - HomeDashboard
- `GET /dashboard/companies` - WEB - CompanyDashboard
- `GET /dashboard/companystatus` - WEB - CompanyStatusDashboard
- `GET /dashboard/tickets` - Web - TicketsDashboard

### Attachments
- `POST /attachment/upload` - Upload file (multipart/form-data)
- `GET /attachment/download/{id}` - Download attachment
- `GET /company/attachment` - Get Org attachments
- `GET /company/user/{id}/attachments` - Get User attachments
- `GET /truckdetails/attachments/{id}` - Get Truck attachments

### Tickets
- `POST /ticket` - Create Ticket
- `PUT /ticket` - Update Ticket
- `GET /ticket/{id}` - Get ticket by ID
- `GET /ticket/list` - Get tickets list
- `PATCH /ticket/{id}/status/{status}` - Update ticket status
- `POST /ticketconversation` - Create Ticket Conversation
- `GET /ticket/conversation/list` - Get tickets List
- `GET /ticket/conversation/{id}` - Get tickets List By ticket Id

### Lookup Master
- `POST /lookupmaster` - Create a lookup master
- `GET /lookupmaster/{id}` - Get Master Data By ID
- `GET /lookupmaster/code/{code}` - Get Master Data By Code
- `GET /lookupmaster/list` - Get All Master Data

## Next Steps

1. Update `apiClient.ts` to match actual endpoint structure
2. Update `authService.ts` to use correct field names (`jwtToken` instead of `userToken`)
3. Update authentication flow to use `Authorization` header for App Token
4. Update protected endpoints to only use User Token in Authorization header
5. Test each endpoint step by step

