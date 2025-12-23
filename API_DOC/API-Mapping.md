# API-Screen Mapping Documentation

**Base API URL:** `https://tba-truckowner-dev.azurewebsites.net`  
**Auth API URL:** `https://tba-authentication-dev.azurewebsites.net`

This document maps each screen in the Customer App to the corresponding API endpoints that should be used for data operations.

---

## Table of Contents

1. [Authentication & Onboarding](#authentication--onboarding)
2. [Dashboard & Home](#dashboard--home)
3. [Quote Management](#quote-management)
4. [Trip Management](#trip-management)
5. [Company & Profile Management](#company--profile-management)
6. [Invoice & Payment](#invoice--payment)
7. [Support & Tickets](#support--tickets)
8. [Settings & Configuration](#settings--configuration)

---

## Authentication & Onboarding

### Screen 1: `login.tsx`
**Purpose:** User login with phone number and OTP verification

**APIs Used:**
- `POST /Otp/{mobileNumber}` - Send OTP to phone number
  - **Request:** `{ mobileNumber: string }`
  - **Response:** OTP sent confirmation
- `POST /Otp/verify/{mobileNumber}/{otp}` - Verify OTP code
  - **Request:** `{ mobileNumber: string, otp: string }`
  - **Response:** Authentication token

**Alternative (Username/Password):**
- `POST /Auth/apptoken?client=customer` - Generate app token
  - **Request:** `{ clientKey: "customer" }`
  - **Response:** `{ data: { jwtToken: string } }`
- `POST /Auth/login` - User login
  - **Request:** `{ username: string, password: string }`
  - **Headers:** `Authorization: Bearer <app_token>`
  - **Response:** `{ data: { jwtToken: string, refreshToken: string } }`

---

### Screen 2: `otp-verification.tsx`
**Purpose:** Verify OTP code sent to user's phone

**APIs Used:**
- `POST /Otp/verify/{mobileNumber}/{otp}` - Verify OTP
  - **Request:** `{ mobileNumber: string, otp: string }`
  - **Response:** Authentication token and user data

---

### Screen 3: `welcome.tsx`
**Purpose:** Welcome screen - entry point

**APIs Used:**
- None (static screen)

---
## Company Creation API with post method
### Screen 4: `user-type-selection.tsx`
**Purpose:** Select user type (Individual or Company)

**APIs Used:**
- None (stores selection in session, navigates to next screen)

---

### Screen 5: `select-company.tsx`
**Purpose:** Select existing company or create new one

**APIs Used:**
- `GET /Company/list` - Get list of companies
  - **Response:** Array of company objects
  - **Use Case:** Display list of companies user can select

---

## Dashboard & Home

### Screen 6: `home.tsx`
**Purpose:** Main dashboard showing overview, active trips, and requested quotes

**APIs Used:**
- `GET /Dashboard/home` - Get dashboard overview data
  - **Response:** Dashboard summary with active trips, pending trips, requested quotes, pending quotes
- `GET /Dashboard/trips` - Get active trips summary
  - **Response:** List of active trips
- `GET /TruckCall/quotes/user` - Get user's quotes
  - **Response:** List of quotes (requested/pending)
- `GET /TruckCall/quotes/trip/user/{userId}` - Get user's trips
  - **Response:** List of trips for the user

**Data Displayed:**
- Active Trips count
- Pending Trips count
- Requested Quotes count
- Pending Quotes count
- Active Trips carousel
- Requested Quotes carousel

---

### Screen 7: `orders.tsx`
**Purpose:** View all orders

**APIs Used:**
- `GET /TruckCall/list` - Get all truck calls/orders
  - **Response:** List of all orders/truck calls
- `GET /TruckCall/quotes/customer/{organizationId}` - Get customer orders
  - **Response:** List of orders for the customer organization

---

## Quote Management

### Screen 8: `quotes.tsx`
**Purpose:** List all quotes (Public/Private) with filtering and search

**APIs Used:**
- `GET /TruckCall/quotes/user` - Get user's quotes
  - **Response:** List of quotes with status, visibility, locations, cargo details
- `GET /TruckCall/quotes/customer/{organizationId}` - Get customer quotes
  - **Response:** List of quotes for customer organization
- `GET /TruckCall/quotes/admin/{organizationId}` - Get admin quotes (if applicable)
  - **Response:** List of quotes for admin view

**Filtering:**
- Filter by status: Pending, Accepted, Rejected, Awaiting Bid, Completed
- Filter by visibility: Public, Private
- Filter by duration: Last 30 Days, Last Week, Year
- Search by quote ID, locations, cargo type, body type

---

### Screen 9: `add-quote/index.tsx`
**Purpose:** Select quote type (Individuals or Open Forum)

**APIs Used:**
- None (navigation only)

---

### Screen 10: `add-quote/cargo-info.tsx`
**Purpose:** Enter cargo information for new quote

**APIs Used:**
- `GET /LookupMaster/code/{lookupcode}` - Get lookup values for cargo types, body types, etc.
  - **Lookup Codes:** `CARGO_TYPE`, `BODY_TYPE`, `TRUCK_TYPE`
- `POST /TruckCall/quotes` - Create new quote
  - **Request:** Quote details (cargo info, pickup/drop locations, weight, etc.)
  - **Response:** Created quote with quoteId

---

### Screen 11: `add-quote/pickup-drop.tsx`
**Purpose:** Enter pickup and drop-off locations

**APIs Used:**
- `GET /LookupMaster/code/LOCATION` - Get location lookup values (if applicable)
- `POST /TruckCall/quotes` - Create quote with location details
  - **Request:** Pickup location, drop location, dates

---

### Screen 12: `add-quote/individuals/cargo-info.tsx`
**Purpose:** Enter cargo info for individual quote

**APIs Used:**
- Same as `add-quote/cargo-info.tsx`

---

### Screen 13: `add-quote/individuals/pickup-drop.tsx`
**Purpose:** Enter pickup/drop locations for individual quote

**APIs Used:**
- Same as `add-quote/pickup-drop.tsx`

---

### Screen 14: `add-quote/individuals/company-select.tsx`
**Purpose:** Select company for individual quote

**APIs Used:**
- `GET /Company/list` - Get list of companies
  - **Response:** List of companies to select from

---

### Screen 15: `add-quote/success.tsx`
**Purpose:** Quote creation success confirmation

**APIs Used:**
- None (confirmation screen)

---

### Screen 16: `quote-details/[quoteId].tsx`
**Purpose:** View detailed information about a specific quote

**APIs Used:**
- `GET /TruckCall/quotes/{quoteId}` - Get quote details
  - **Response:** Complete quote information including status, locations, cargo, estimates
- `GET /TruckCall/quotes/{quoteId}/cargo` - Get cargo details for quote
  - **Response:** Detailed cargo information
- `GET /TruckCall/quotes/{quoteId}/companylist` - Get companies associated with quote
  - **Response:** List of companies bidding/associated with quote
- `GET /TruckCall/quotes/estimate/{quoteEstimateId}` - Get quote estimates
  - **Response:** Estimated costs and details
- `GET /TruckCall/quotes/rate/{rateRequestId}` - Get rate request details
  - **Response:** Rate request information
- `GET /TruckCall/quotes/trip/attachments/{truckcallId}` - Get quote attachments
  - **Response:** List of attachments for the quote/trip

---

## Trip Management

### Screen 17: `trips.tsx`
**Purpose:** List all trips with filtering

**APIs Used:**
- `GET /TruckCall/quotes/trip/user/{userId}` - Get user's trips
  - **Response:** List of trips for the user
- `GET /TruckCall/quotes/trip/driver` - Get driver trips (if applicable)
  - **Response:** List of trips assigned to driver
- `GET /TruckCall/list` - Get all truck calls/trips
  - **Response:** List of all trips

**Filtering:**
- Filter by status: Active, Pending, Completed
- Filter by duration: Last 30 Days, Last Week, Year
- Search by trip ID, locations

---

### Screen 18: `trips/[tripId].tsx`
**Purpose:** View detailed trip information

**APIs Used:**
- `GET /TruckCall/{truckCallId}` - Get trip details
  - **Response:** Complete trip information including status, locations, driver, vehicle
- `GET /TruckCall/quotes/trip/attachments/{truckcallId}` - Get trip attachments
  - **Response:** List of attachments (documents, images)
- `GET /TruckCall/quotes/trip/attachment/{truckcallattachmentId}` - Get specific attachment
  - **Response:** Attachment file/data

---

### Screen 19: `trips/[tripId]/tracking-history.tsx`
**Purpose:** View trip tracking history and location updates

**APIs Used:**
- `GET /TruckCall/{truckCallId}` - Get trip details with tracking info
  - **Response:** Trip details including location history
- Additional tracking endpoints (if available in API)

---

### Screen 20: `trip-details.tsx`
**Purpose:** View trip details (alternative trip detail view)

**APIs Used:**
- Same as `trips/[tripId].tsx`

---

## Company & Profile Management

### Screen 21: `company-details.tsx`
**Purpose:** Enter/Edit company details during registration or profile update

**APIs Used:**
- `POST /Company` - Create new company
  - **Request:** Company details (name, owner, license, address, city, state, country, PIN)
  - **Response:** Created company with organizationId
- `PUT /Company/{orgId}/details` - Update company details
  - **Request:** Updated company information
  - **Response:** Updated company data
- `GET /Company/{organizationId}` - Get company details
  - **Response:** Complete company information

---

### Screen 22: `company-profile.tsx`
**Purpose:** View company profile information

**APIs Used:**
- `GET /Company/{organizationId}` - Get company details
  - **Response:** Company information
- `GET /Company/attachments/{orgId}` - Get company attachments
  - **Response:** List of company documents

---

### Screen 23: `contact-info.tsx`
**Purpose:** Enter/Edit contact information

**APIs Used:**
- `POST /Company/contact/{primaryContactId}` - Create/Update primary contact
  - **Request:** Contact details (mobile, email, communication mode)
  - **Response:** Contact information
- `PUT /Company/{orgId}/details` - Update company with contact info
  - **Request:** Contact information updates

---

### Screen 24: `bank-details.tsx`
**Purpose:** Enter/Edit bank account details

**APIs Used:**
- `PUT /Company/{orgId}/bankdetails` - Update bank details
  - **Request:** Bank account information
  - **Response:** Updated bank details

---

### Screen 25: `emergency-info.tsx`
**Purpose:** Enter/Edit emergency contact information

**APIs Used:**
- `PUT /Company/{orgId}/emergencydetails` - Update emergency contact details
  - **Request:** Emergency contact information
  - **Response:** Updated emergency details

---

### Screen 26: `upload-documents.tsx`
**Purpose:** Upload company documents

**APIs Used:**
- `POST /Attachment/upload` - Upload document
  - **Request:** FormData with file
  - **Response:** Attachment ID and file info
- `POST /Company/attachment` - Associate attachment with company
  - **Request:** `{ organizationId, attachmentId }`
  - **Response:** Attachment association confirmation
- `PUT /Company/attachment` - Update company attachment
  - **Request:** Updated attachment information
- `GET /Company/attachments/{orgId}` - Get company attachments
  - **Response:** List of company documents

---

### Screen 27: `personal-info.tsx`
**Purpose:** Enter personal information for individual users

**APIs Used:**
- `POST /Company/employee` - Create employee/user profile
  - **Request:** Personal information (name, phone, email, etc.)
  - **Response:** Created employee/user profile
- `PUT /Company/employee` - Update employee profile
  - **Request:** Updated personal information

---

### Screen 28: `profile.tsx`
**Purpose:** User profile overview

**APIs Used:**
- `GET /Company/user/{userId}` - Get user details
  - **Response:** User profile information
- `GET /Company/user/{userId}/attachments` - Get user attachments
  - **Response:** User documents
- `GET /Company/allusers/{organizationId}` - Get all users in organization
  - **Response:** List of users

---

### Screen 29: `profile/company-details.tsx`
**Purpose:** View/edit company details from profile

**APIs Used:**
- Same as `company-details.tsx`

---

### Screen 30: `profile/edit-company.tsx`
**Purpose:** Edit company information

**APIs Used:**
- `PUT /Company/{orgId}/details` - Update company details
- `GET /Company/{organizationId}` - Get current company details

---

### Screen 31: `profile/settings.tsx`
**Purpose:** User settings and preferences

**APIs Used:**
- `PATCH /Account/changepassword` - Change password
  - **Request:** `{ oldPassword: string, newPassword: string }`
  - **Response:** Success confirmation
- `GET /Config/list` - Get configuration settings
  - **Response:** App configuration values

---

### Screen 32: `profile/chat.tsx`
**Purpose:** Support chat/messaging

**APIs Used:**
- `POST /Ticket/conversation` - Create support conversation
  - **Request:** Message content
  - **Response:** Conversation ID
- `GET /Ticket/conversation/all/{ticketid}` - Get all conversations for ticket
  - **Response:** List of conversation messages
- `PUT /Ticket/conversation` - Update conversation message
- `DELETE /Ticket/conversation/{conversationId}` - Delete conversation message

---

### Screen 33: `profile/terms.tsx`
**Purpose:** View terms and conditions

**APIs Used:**
- `GET /Config/code/TERMS_AND_CONDITIONS` - Get terms and conditions (if stored in config)
  - **Response:** Terms and conditions text

---

### Screen 34: `company-success.tsx`
**Purpose:** Company registration success confirmation

**APIs Used:**
- None (confirmation screen)

---

### Screen 35: `login-success.tsx`
**Purpose:** Login success confirmation

**APIs Used:**
- None (confirmation screen)

---

## Invoice & Payment

### Screen 36: `invoice.tsx`
**Purpose:** View invoices and payment information

**APIs Used:**
- `GET /Invoice/list` - Get list of invoices
  - **Response:** List of invoices
- `GET /Invoice/{id}` - Get invoice details
  - **Response:** Complete invoice information
- `GET /Invoice/trukcall/{truckcallid}` - Get invoice for specific truck call
  - **Response:** Invoice for the trip
- `GET /Invoice/header/{headerId}/details` - Get invoice header details
  - **Response:** Invoice header with line items
- `GET /Payment/list` - Get payment list
  - **Response:** List of payments
- `GET /Payment/invoiceHeaderId/{invoiceHeaderId}` - Get payments for invoice
  - **Response:** Payments associated with invoice

---

## Support & Tickets

### Screen 37: `profile/chat.tsx` (Support Chat)
**Purpose:** Support ticket conversations

**APIs Used:**
- `POST /Ticket` - Create support ticket
  - **Request:** Ticket details (subject, description, category)
  - **Response:** Created ticket with ticketId
- `GET /Ticket/list` - Get user's tickets
  - **Response:** List of support tickets
- `GET /Ticket/{ticketId}` - Get ticket details
  - **Response:** Complete ticket information
- `POST /Ticket/conversation` - Add message to ticket
  - **Request:** Message content
  - **Response:** Conversation entry
- `GET /Ticket/conversation/all/{ticketid}` - Get all conversations
  - **Response:** List of messages in ticket
- `PATCH /Ticket/{ticketId}/status/{status}` - Update ticket status
  - **Request:** New status
  - **Response:** Updated ticket

---

## Settings & Configuration

### Screen 38: `profile/settings.tsx`
**Purpose:** User settings and account management

**APIs Used:**
- `PATCH /Account/changepassword` - Change password
  - **Request:** `{ oldPassword: string, newPassword: string }`
- `PATCH /Account/forgetpassword` - Request password reset
  - **Request:** `{ userName: string }`
- `PATCH /Account/forgetpassword/{code}/reset/{newpasssword}` - Reset password with code
  - **Request:** Reset code and new password
- `GET /Config/list` - Get app configuration
  - **Response:** Configuration values

---

## Additional API Endpoints (Not Yet Mapped to Screens)

### Dashboard APIs
- `GET /Dashboard/companies` - Get companies dashboard data
- `GET /Dashboard/companystatus` - Get company status statistics
- `GET /Dashboard/tickets` - Get tickets dashboard data

### Lookup & Configuration
- `GET /LookupMaster/list` - Get all lookup values
- `GET /LookupMaster/{lookupId}` - Get specific lookup value
- `POST /LookupMaster` - Create lookup value (admin)
- `GET /Config/{id}` - Get config by ID
- `GET /Config/code/{configCode}` - Get config by code
- `POST /Config` - Create config (admin)
- `PUT /Config` - Update config (admin)
- `DELETE /Config/{configCode}` - Delete config (admin)

### Truck Details (For Truck Owners)
- `POST /TruckDetails` - Create truck details
- `PUT /TruckDetails` - Update truck details
- `GET /TruckDetails/{truckId}` - Get truck details
- `GET /TruckDetails/company/{organizationId}` - Get company trucks
- `GET /TruckDetails/list` - Get all trucks

### Rate Requests
- `POST /TruckCallRateRequest` - Create rate request
- `GET /TruckCallRateRequest/list/company/{orgId}` - Get company rate requests
- `GET /TruckCallRateRequest/{truckCallRateId}` - Get rate request details

### Truck Estimates
- `POST /TruckEstimate` - Create truck estimate
- `GET /TruckEstimate/list/{orgId}` - Get company estimates
- `GET /TruckEstimate/{truckEstimatesId}` - Get estimate details

---

## API Usage Patterns

### Authentication Flow
1. **App Token Generation:** `POST /Auth/apptoken?client=customer`
2. **User Login:** `POST /Auth/login` (with app token in Authorization header)
3. **Token Refresh:** `POST /refresh` (with refresh token)
4. **All Protected Endpoints:** Use user token in `Authorization` header

### File Upload Pattern
1. **Upload File:** `POST /Attachment/upload` (returns attachmentId)
2. **Associate with Entity:** `POST /Company/attachment` or `POST /TruckCall/quotes/trip/attachment`
3. **Retrieve:** `GET /Attachment/download/{attachmentid}`

### Quote to Trip Flow
1. **Create Quote:** `POST /TruckCall/quotes`
2. **Get Estimates:** `GET /TruckCall/quotes/estimate/{quoteEstimateId}`
3. **Approve Estimate:** `PATCH /TruckCall/quotes/trip/estimate/{tripestimateid}/approve`
4. **Assign Trip:** `POST /TruckCall/quotes/trip/assign`
5. **Update Trip Status:** `PATCH /TruckCall/quotes/trip/{quoteId}/status/{status}`

---

## Notes

1. **Base URLs:**
   - Main API: `https://tba-truckowner-dev.azurewebsites.net`
   - Auth API: `https://tba-authentication-dev.azurewebsites.net`

2. **Authentication:**
   - All protected endpoints require `Authorization` header with user token
   - App token is only needed for login endpoint

3. **Response Format:**
   - Standard response: `{ statusCode: number, success: boolean, message: string, data: T }`
   - Always check `success` before using `data`

4. **Error Handling:**
   - 401: Token expired/invalid - refresh token or re-login
   - 400: Bad request - check request body
   - 404: Resource not found
   - 500: Server error - retry or contact support

5. **Pagination:**
   - List endpoints may support pagination (check API docs for query parameters)

6. **Filtering & Search:**
   - Most list endpoints support filtering via query parameters
   - Check individual endpoint documentation for available filters

---

## Implementation Status

### ✅ Fully Implemented
- Authentication (OTP and Username/Password)
- API Client with token management
- Basic screen structure

### 🚧 Partially Implemented
- Quote creation flow (UI ready, API integration pending)
- Trip management (UI ready, API integration pending)
- Company profile (UI ready, API integration pending)

### 📋 To Be Implemented
- Invoice management API integration
- Payment processing API integration
- Support ticket API integration
- Real-time trip tracking
- Push notifications

---

**Last Updated:** December 2024  
**API Version:** v1  
**Documentation Source:** Swagger API Documentation

