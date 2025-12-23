# API Documentation

**Base URL:** https://tba-truckowner-dev.azurewebsites.net

**API Title:** Truck Company Service API
**Description:** API Routes- Truck Company Service
**Version:** v1

---

## Table of Contents

- [Account](#account)
- [Attachment](#attachment)
- [Company](#company)
- [Config](#config)
- [Dashboard](#dashboard)
- [Home](#home)
- [Invoice](#invoice)
- [LookupMaster](#lookupmaster)
- [Otp](#otp)
- [Payment](#payment)
- [Ticket](#ticket)
- [TruckCall](#truckcall)
- [TruckCallRateRequest](#truckcallraterequest)
- [TruckDetails](#truckdetails)
- [TruckEstimate](#truckestimate)

---

## Account

### PATCH /Account/changepassword

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| oldPassword | string | No | N/A |
| newPassword | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| oldPassword | string | No | N/A |
| newPassword | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| oldPassword | string | No | N/A |
| newPassword | string | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### PATCH /Account/forgetpassword

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| userName | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| userName | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| userName | string | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `string`

**Content-Type:** `application/json`

**Schema Type:** `string`

**Content-Type:** `text/json`

**Schema Type:** `string`

---

### PATCH /Account/forgetpassword/{code}/reset/{newpasssword}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| code | path | Yes | string | N/A |
| newpasssword | path | Yes | string | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `string`

**Content-Type:** `application/json`

**Schema Type:** `string`

**Content-Type:** `text/json`

**Schema Type:** `string`

---

### PATCH /Account/resetpassword

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| userName | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| userName | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| userName | string | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

## Attachment

### POST /Attachment/upload

#### Request Body

**Content-Type:** `multipart/form-data`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| file | string (binary) | No | N/A |

#### Responses

**200** - OK

---

### PUT /Attachment/update/{attachmentId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| attachmentId | path | Yes | integer (int64) | N/A |

#### Request Body

**Content-Type:** `multipart/form-data`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| file | string (binary) | No | N/A |

#### Responses

**200** - OK

---

### GET /Attachment/download/{attachmentid}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| attachmentid | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

---

### DELETE /Attachment/{attachmentId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| attachmentId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

---

## Company

### POST /Company

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| isAgent | boolean | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| primaryContactDto | Object | No | N/A |
| parentCompanyID | integer (int64) | No | N/A |
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| location | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |
| orgAttachments | Array<Object> | No | N/A |
| orgRoles | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| isAgent | boolean | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| primaryContactDto | Object | No | N/A |
| parentCompanyID | integer (int64) | No | N/A |
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| location | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |
| orgAttachments | Array<Object> | No | N/A |
| orgRoles | Array<Object> | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| isAgent | boolean | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| primaryContactDto | Object | No | N/A |
| parentCompanyID | integer (int64) | No | N/A |
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| location | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |
| orgAttachments | Array<Object> | No | N/A |
| orgRoles | Array<Object> | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /Company

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| isAgent | boolean | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| primaryContactDto | Object | No | N/A |
| parentCompanyID | integer (int64) | No | N/A |
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| location | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |
| orgAttachments | Array<Object> | No | N/A |
| orgRoles | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| isAgent | boolean | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| primaryContactDto | Object | No | N/A |
| parentCompanyID | integer (int64) | No | N/A |
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| location | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |
| orgAttachments | Array<Object> | No | N/A |
| orgRoles | Array<Object> | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| isAgent | boolean | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| primaryContactDto | Object | No | N/A |
| parentCompanyID | integer (int64) | No | N/A |
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| location | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |
| orgAttachments | Array<Object> | No | N/A |
| orgRoles | Array<Object> | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /Company/{organizationId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| organizationId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| isAgent | boolean | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| primaryContactDto | Object | No | N/A |
| parentCompanyID | integer (int64) | No | N/A |
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| location | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |
| orgAttachments | Array<Object> | No | N/A |
| orgRoles | Array<Object> | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| isAgent | boolean | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| primaryContactDto | Object | No | N/A |
| parentCompanyID | integer (int64) | No | N/A |
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| location | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |
| orgAttachments | Array<Object> | No | N/A |
| orgRoles | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| isAgent | boolean | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| primaryContactDto | Object | No | N/A |
| parentCompanyID | integer (int64) | No | N/A |
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| location | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |
| orgAttachments | Array<Object> | No | N/A |
| orgRoles | Array<Object> | No | N/A |

---

### DELETE /Company/{organizationId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| organizationId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### POST /Company/attachment

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| organizationId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| organizationId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| organizationId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### PUT /Company/attachment

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| organizationId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| organizationId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| organizationId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /Company/list

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| status | query | No | integer (int32) | N/A |
| orgType | query | No | integer (int32) | N/A |
| searcheyword | query | No | string | N/A |
| type | query | No | string | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /Company/list/export

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| status | query | No | integer (int32) | N/A |
| orgType | query | No | integer (int32) | N/A |
| searcheyword | query | No | string | N/A |
| type | query | No | string | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### PUT /Company/{orgId}/details

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| orgId | path | Yes | integer (int64) | N/A |

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| location | string | No | N/A |
| orgRoles | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| location | string | No | N/A |
| orgRoles | Array<Object> | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| location | string | No | N/A |
| orgRoles | Array<Object> | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### PUT /Company/{orgId}/bankdetails

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| orgId | path | Yes | integer (int64) | N/A |

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |

#### Responses

**200** - OK

---

### PUT /Company/{orgId}/emergencydetails

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| orgId | path | Yes | integer (int64) | N/A |

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |

#### Responses

**200** - OK

---

### POST /Company/employee

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| mobile | string | No | N/A |
| phone | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| orgId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| country | string | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| mobile | string | No | N/A |
| phone | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| orgId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| country | string | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| mobile | string | No | N/A |
| phone | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| orgId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| country | string | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |

#### Responses

**200** - OK

---

### PUT /Company/employee

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| mobile | string | No | N/A |
| phone | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| orgId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| country | string | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| mobile | string | No | N/A |
| phone | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| orgId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| country | string | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| mobile | string | No | N/A |
| phone | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| orgId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| country | string | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### DELETE /Company/employee/{employeeId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| employeeId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### POST /Company/employee/profile/picture

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### PUT /Company/employee/profile/picture

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /Company/employee/profile/picture/{userId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| userId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| stream | string (binary) | No | N/A |
| contentType | string | No | N/A |
| blobName | string | No | N/A |
| errorMessage | string | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| stream | string (binary) | No | N/A |
| contentType | string | No | N/A |
| blobName | string | No | N/A |
| errorMessage | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| stream | string (binary) | No | N/A |
| contentType | string | No | N/A |
| blobName | string | No | N/A |
| errorMessage | string | No | N/A |

---

### POST /Company/contact/{primaryContactId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| primaryContactId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| mobile | string | No | N/A |
| phone | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| orgId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| country | string | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| mobile | string | No | N/A |
| phone | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| orgId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| country | string | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| mobile | string | No | N/A |
| phone | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| orgId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| country | string | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |

---

### POST /Company/driver

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| fatherName | string | No | N/A |
| qualification | string | No | N/A |
| specilisation | string | No | N/A |
| department | string | No | N/A |
| designation | string | No | N/A |
| dob | string (date-time) | No | N/A |
| age | integer (int32) | No | N/A |
| doj | string (date-time) | No | N/A |
| doResig | string (date-time) | No | N/A |
| gender | string | No | N/A |
| maritalStatus | string | No | N/A |
| bloodGroup | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pin | string | No | N/A |
| phone | string | No | N/A |
| mobile | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| location | string | No | N/A |
| hiEmployee | string (date-time) | No | N/A |
| groupId | integer (int32) | No | N/A |
| orgId | integer (int64) | No | N/A |
| isPilot | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| attachment | Object | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| fatherName | string | No | N/A |
| qualification | string | No | N/A |
| specilisation | string | No | N/A |
| department | string | No | N/A |
| designation | string | No | N/A |
| dob | string (date-time) | No | N/A |
| age | integer (int32) | No | N/A |
| doj | string (date-time) | No | N/A |
| doResig | string (date-time) | No | N/A |
| gender | string | No | N/A |
| maritalStatus | string | No | N/A |
| bloodGroup | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pin | string | No | N/A |
| phone | string | No | N/A |
| mobile | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| location | string | No | N/A |
| hiEmployee | string (date-time) | No | N/A |
| groupId | integer (int32) | No | N/A |
| orgId | integer (int64) | No | N/A |
| isPilot | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| attachment | Object | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| fatherName | string | No | N/A |
| qualification | string | No | N/A |
| specilisation | string | No | N/A |
| department | string | No | N/A |
| designation | string | No | N/A |
| dob | string (date-time) | No | N/A |
| age | integer (int32) | No | N/A |
| doj | string (date-time) | No | N/A |
| doResig | string (date-time) | No | N/A |
| gender | string | No | N/A |
| maritalStatus | string | No | N/A |
| bloodGroup | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pin | string | No | N/A |
| phone | string | No | N/A |
| mobile | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| location | string | No | N/A |
| hiEmployee | string (date-time) | No | N/A |
| groupId | integer (int32) | No | N/A |
| orgId | integer (int64) | No | N/A |
| isPilot | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| attachment | Object | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /Company/driver

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| fatherName | string | No | N/A |
| qualification | string | No | N/A |
| specilisation | string | No | N/A |
| department | string | No | N/A |
| designation | string | No | N/A |
| dob | string (date-time) | No | N/A |
| age | integer (int32) | No | N/A |
| doj | string (date-time) | No | N/A |
| doResig | string (date-time) | No | N/A |
| gender | string | No | N/A |
| maritalStatus | string | No | N/A |
| bloodGroup | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pin | string | No | N/A |
| phone | string | No | N/A |
| mobile | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| location | string | No | N/A |
| hiEmployee | string (date-time) | No | N/A |
| groupId | integer (int32) | No | N/A |
| orgId | integer (int64) | No | N/A |
| isPilot | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| attachment | Object | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| fatherName | string | No | N/A |
| qualification | string | No | N/A |
| specilisation | string | No | N/A |
| department | string | No | N/A |
| designation | string | No | N/A |
| dob | string (date-time) | No | N/A |
| age | integer (int32) | No | N/A |
| doj | string (date-time) | No | N/A |
| doResig | string (date-time) | No | N/A |
| gender | string | No | N/A |
| maritalStatus | string | No | N/A |
| bloodGroup | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pin | string | No | N/A |
| phone | string | No | N/A |
| mobile | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| location | string | No | N/A |
| hiEmployee | string (date-time) | No | N/A |
| groupId | integer (int32) | No | N/A |
| orgId | integer (int64) | No | N/A |
| isPilot | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| attachment | Object | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| fatherName | string | No | N/A |
| qualification | string | No | N/A |
| specilisation | string | No | N/A |
| department | string | No | N/A |
| designation | string | No | N/A |
| dob | string (date-time) | No | N/A |
| age | integer (int32) | No | N/A |
| doj | string (date-time) | No | N/A |
| doResig | string (date-time) | No | N/A |
| gender | string | No | N/A |
| maritalStatus | string | No | N/A |
| bloodGroup | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pin | string | No | N/A |
| phone | string | No | N/A |
| mobile | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| location | string | No | N/A |
| hiEmployee | string (date-time) | No | N/A |
| groupId | integer (int32) | No | N/A |
| orgId | integer (int64) | No | N/A |
| isPilot | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| attachment | Object | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### GET /Company/driver/{driverId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| driverId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| fatherName | string | No | N/A |
| qualification | string | No | N/A |
| specilisation | string | No | N/A |
| department | string | No | N/A |
| designation | string | No | N/A |
| dob | string (date-time) | No | N/A |
| age | integer (int32) | No | N/A |
| doj | string (date-time) | No | N/A |
| doResig | string (date-time) | No | N/A |
| gender | string | No | N/A |
| maritalStatus | string | No | N/A |
| bloodGroup | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pin | string | No | N/A |
| phone | string | No | N/A |
| mobile | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| location | string | No | N/A |
| hiEmployee | string (date-time) | No | N/A |
| groupId | integer (int32) | No | N/A |
| orgId | integer (int64) | No | N/A |
| isPilot | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| attachment | Object | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| fatherName | string | No | N/A |
| qualification | string | No | N/A |
| specilisation | string | No | N/A |
| department | string | No | N/A |
| designation | string | No | N/A |
| dob | string (date-time) | No | N/A |
| age | integer (int32) | No | N/A |
| doj | string (date-time) | No | N/A |
| doResig | string (date-time) | No | N/A |
| gender | string | No | N/A |
| maritalStatus | string | No | N/A |
| bloodGroup | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pin | string | No | N/A |
| phone | string | No | N/A |
| mobile | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| location | string | No | N/A |
| hiEmployee | string (date-time) | No | N/A |
| groupId | integer (int32) | No | N/A |
| orgId | integer (int64) | No | N/A |
| isPilot | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| attachment | Object | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| fatherName | string | No | N/A |
| qualification | string | No | N/A |
| specilisation | string | No | N/A |
| department | string | No | N/A |
| designation | string | No | N/A |
| dob | string (date-time) | No | N/A |
| age | integer (int32) | No | N/A |
| doj | string (date-time) | No | N/A |
| doResig | string (date-time) | No | N/A |
| gender | string | No | N/A |
| maritalStatus | string | No | N/A |
| bloodGroup | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pin | string | No | N/A |
| phone | string | No | N/A |
| mobile | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| location | string | No | N/A |
| hiEmployee | string (date-time) | No | N/A |
| groupId | integer (int32) | No | N/A |
| orgId | integer (int64) | No | N/A |
| isPilot | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| attachment | Object | No | N/A |

---

### PATCH /Company/employee/credentials

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| applicationUserId | integer (int64) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| orgId | integer (int64) | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| applicationUserId | integer (int64) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| orgId | integer (int64) | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| applicationUserId | integer (int64) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| orgId | integer (int64) | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### PUT /Company/driver/attachment

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| driverId | integer (int64) | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| driverId | integer (int64) | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| driverId | integer (int64) | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### PUT /Company/driver/proofdetails

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| driverId | integer (int64) | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| driverId | integer (int64) | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| driverId | integer (int64) | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /Company/allusers/{organizationId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| organizationId | path | Yes | integer (int64) | N/A |
| roleName | query | No | string | N/A |
| status | query | No | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /Company/drivers/{organizationId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| organizationId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /Company/user/{userId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| userId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| isAgent | boolean | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| primaryContactDto | Object | No | N/A |
| parentCompanyID | integer (int64) | No | N/A |
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| location | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |
| orgAttachments | Array<Object> | No | N/A |
| orgRoles | Array<Object> | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| isAgent | boolean | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| primaryContactDto | Object | No | N/A |
| parentCompanyID | integer (int64) | No | N/A |
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| location | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |
| orgAttachments | Array<Object> | No | N/A |
| orgRoles | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| isAgent | boolean | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| primaryContactDto | Object | No | N/A |
| parentCompanyID | integer (int64) | No | N/A |
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| location | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |
| orgAttachments | Array<Object> | No | N/A |
| orgRoles | Array<Object> | No | N/A |

---

### PATCH /Company/status

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| organizationId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| organizationId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| organizationId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /Company/attachments/{orgId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| orgId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /Company/user/{userId}/attachments

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| userId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| blobFileName | string | No | N/A |
| isDeleted | boolean | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| blobFileName | string | No | N/A |
| isDeleted | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| blobFileName | string | No | N/A |
| isDeleted | boolean | No | N/A |

---

### GET /Company/user/{userId}/attachments/all

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| userId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

## Config

### POST /Config

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| configCode | string | No | N/A |
| configValue | string | No | N/A |
| configDescription | string | No | N/A |
| terminal | string | No | N/A |
| systemOrUser | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| configCode | string | No | N/A |
| configValue | string | No | N/A |
| configDescription | string | No | N/A |
| terminal | string | No | N/A |
| systemOrUser | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| configCode | string | No | N/A |
| configValue | string | No | N/A |
| configDescription | string | No | N/A |
| terminal | string | No | N/A |
| systemOrUser | string | No | N/A |

#### Responses

**200** - OK

---

### PUT /Config

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| configCode | string | No | N/A |
| configValue | string | No | N/A |
| configDescription | string | No | N/A |
| terminal | string | No | N/A |
| systemOrUser | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| configCode | string | No | N/A |
| configValue | string | No | N/A |
| configDescription | string | No | N/A |
| terminal | string | No | N/A |
| systemOrUser | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| configCode | string | No | N/A |
| configValue | string | No | N/A |
| configDescription | string | No | N/A |
| terminal | string | No | N/A |
| systemOrUser | string | No | N/A |

#### Responses

**200** - OK

---

### GET /Config/{id}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| id | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

---

### GET /Config/code/{configCode}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| configCode | path | Yes | string | N/A |

#### Responses

**200** - OK

---

### DELETE /Config/{configCode}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| configCode | path | Yes | string | N/A |

#### Responses

**200** - OK

---

### GET /Config/list

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| searchkeyword | query | No | string | N/A |

#### Responses

**200** - OK

---

## Dashboard

### GET /Dashboard/companies

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| totalCustomers | integer (int64) | No | N/A |
| totalCustomersIncreasePercent | integer (int64) | No | N/A |
| totalCompanies | integer (int64) | No | N/A |
| totalCompaniesIncreasePercent | integer (int64) | No | N/A |
| activeDrivers | integer (int64) | No | N/A |
| activeDriversIncreasePercent | integer (int64) | No | N/A |
| suspendedCompanies | integer (int64) | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| totalCustomers | integer (int64) | No | N/A |
| totalCustomersIncreasePercent | integer (int64) | No | N/A |
| totalCompanies | integer (int64) | No | N/A |
| totalCompaniesIncreasePercent | integer (int64) | No | N/A |
| activeDrivers | integer (int64) | No | N/A |
| activeDriversIncreasePercent | integer (int64) | No | N/A |
| suspendedCompanies | integer (int64) | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| totalCustomers | integer (int64) | No | N/A |
| totalCustomersIncreasePercent | integer (int64) | No | N/A |
| totalCompanies | integer (int64) | No | N/A |
| totalCompaniesIncreasePercent | integer (int64) | No | N/A |
| activeDrivers | integer (int64) | No | N/A |
| activeDriversIncreasePercent | integer (int64) | No | N/A |
| suspendedCompanies | integer (int64) | No | N/A |

---

### GET /Dashboard/companystatus

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| newlyAdded | integer (int64) | No | N/A |
| rejected | integer (int64) | No | N/A |
| pending | integer (int64) | No | N/A |
| approved | integer (int64) | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| newlyAdded | integer (int64) | No | N/A |
| rejected | integer (int64) | No | N/A |
| pending | integer (int64) | No | N/A |
| approved | integer (int64) | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| newlyAdded | integer (int64) | No | N/A |
| rejected | integer (int64) | No | N/A |
| pending | integer (int64) | No | N/A |
| approved | integer (int64) | No | N/A |

---

### GET /Dashboard/trips

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| activeTrips | integer (int64) | No | N/A |
| activeTripsIncreasePercent | integer (int64) | No | N/A |
| liveTrips | integer (int64) | No | N/A |
| liveTripsIncreasePercent | integer (int64) | No | N/A |
| delayedTrips | integer (int64) | No | N/A |
| delayedTripsIncreasePercent | integer (int64) | No | N/A |
| suspendedTrips | integer (int64) | No | N/A |
| suspendedTripsIncreasePercent | integer (int64) | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| activeTrips | integer (int64) | No | N/A |
| activeTripsIncreasePercent | integer (int64) | No | N/A |
| liveTrips | integer (int64) | No | N/A |
| liveTripsIncreasePercent | integer (int64) | No | N/A |
| delayedTrips | integer (int64) | No | N/A |
| delayedTripsIncreasePercent | integer (int64) | No | N/A |
| suspendedTrips | integer (int64) | No | N/A |
| suspendedTripsIncreasePercent | integer (int64) | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| activeTrips | integer (int64) | No | N/A |
| activeTripsIncreasePercent | integer (int64) | No | N/A |
| liveTrips | integer (int64) | No | N/A |
| liveTripsIncreasePercent | integer (int64) | No | N/A |
| delayedTrips | integer (int64) | No | N/A |
| delayedTripsIncreasePercent | integer (int64) | No | N/A |
| suspendedTrips | integer (int64) | No | N/A |
| suspendedTripsIncreasePercent | integer (int64) | No | N/A |

---

### GET /Dashboard/home

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| activeTrips | integer (int64) | No | N/A |
| activeTripsIncreasePercent | integer (int64) | No | N/A |
| totalRevenue | integer (int64) | No | N/A |
| totalRevenueIncreasePercent | integer (int64) | No | N/A |
| totalOwners | integer (int64) | No | N/A |
| totalOwnersIncreasePercent | integer (int64) | No | N/A |
| totalDrivers | integer (int64) | No | N/A |
| totalDriversIncreasePercent | integer (int64) | No | N/A |
| totalCustomer | integer (int64) | No | N/A |
| totalCustomerIncreasePercent | integer (int64) | No | N/A |
| pendingQuotes | integer (int64) | No | N/A |
| pendingQuotesIncreasePercent | integer (int64) | No | N/A |
| pendingTickets | integer (int64) | No | N/A |
| pendingTicketsIncreasePercent | integer (int64) | No | N/A |
| fleetUtlization | integer (int64) | No | N/A |
| fleetUtlizationIncreasePercent | integer (int64) | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| activeTrips | integer (int64) | No | N/A |
| activeTripsIncreasePercent | integer (int64) | No | N/A |
| totalRevenue | integer (int64) | No | N/A |
| totalRevenueIncreasePercent | integer (int64) | No | N/A |
| totalOwners | integer (int64) | No | N/A |
| totalOwnersIncreasePercent | integer (int64) | No | N/A |
| totalDrivers | integer (int64) | No | N/A |
| totalDriversIncreasePercent | integer (int64) | No | N/A |
| totalCustomer | integer (int64) | No | N/A |
| totalCustomerIncreasePercent | integer (int64) | No | N/A |
| pendingQuotes | integer (int64) | No | N/A |
| pendingQuotesIncreasePercent | integer (int64) | No | N/A |
| pendingTickets | integer (int64) | No | N/A |
| pendingTicketsIncreasePercent | integer (int64) | No | N/A |
| fleetUtlization | integer (int64) | No | N/A |
| fleetUtlizationIncreasePercent | integer (int64) | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| activeTrips | integer (int64) | No | N/A |
| activeTripsIncreasePercent | integer (int64) | No | N/A |
| totalRevenue | integer (int64) | No | N/A |
| totalRevenueIncreasePercent | integer (int64) | No | N/A |
| totalOwners | integer (int64) | No | N/A |
| totalOwnersIncreasePercent | integer (int64) | No | N/A |
| totalDrivers | integer (int64) | No | N/A |
| totalDriversIncreasePercent | integer (int64) | No | N/A |
| totalCustomer | integer (int64) | No | N/A |
| totalCustomerIncreasePercent | integer (int64) | No | N/A |
| pendingQuotes | integer (int64) | No | N/A |
| pendingQuotesIncreasePercent | integer (int64) | No | N/A |
| pendingTickets | integer (int64) | No | N/A |
| pendingTicketsIncreasePercent | integer (int64) | No | N/A |
| fleetUtlization | integer (int64) | No | N/A |
| fleetUtlizationIncreasePercent | integer (int64) | No | N/A |

---

### GET /Dashboard/tickets

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| activeTrips | integer (int64) | No | N/A |
| activeTripsIncreasePercent | integer (int64) | No | N/A |
| totalRevenue | integer (int64) | No | N/A |
| totalRevenueIncreasePercent | integer (int64) | No | N/A |
| totalOwners | integer (int64) | No | N/A |
| totalOwnersIncreasePercent | integer (int64) | No | N/A |
| totalDrivers | integer (int64) | No | N/A |
| totalDriversIncreasePercent | integer (int64) | No | N/A |
| totalCustomer | integer (int64) | No | N/A |
| totalCustomerIncreasePercent | integer (int64) | No | N/A |
| pendingQuotes | integer (int64) | No | N/A |
| pendingQuotesIncreasePercent | integer (int64) | No | N/A |
| pendingTickets | integer (int64) | No | N/A |
| pendingTicketsIncreasePercent | integer (int64) | No | N/A |
| fleetUtlization | integer (int64) | No | N/A |
| fleetUtlizationIncreasePercent | integer (int64) | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| activeTrips | integer (int64) | No | N/A |
| activeTripsIncreasePercent | integer (int64) | No | N/A |
| totalRevenue | integer (int64) | No | N/A |
| totalRevenueIncreasePercent | integer (int64) | No | N/A |
| totalOwners | integer (int64) | No | N/A |
| totalOwnersIncreasePercent | integer (int64) | No | N/A |
| totalDrivers | integer (int64) | No | N/A |
| totalDriversIncreasePercent | integer (int64) | No | N/A |
| totalCustomer | integer (int64) | No | N/A |
| totalCustomerIncreasePercent | integer (int64) | No | N/A |
| pendingQuotes | integer (int64) | No | N/A |
| pendingQuotesIncreasePercent | integer (int64) | No | N/A |
| pendingTickets | integer (int64) | No | N/A |
| pendingTicketsIncreasePercent | integer (int64) | No | N/A |
| fleetUtlization | integer (int64) | No | N/A |
| fleetUtlizationIncreasePercent | integer (int64) | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| activeTrips | integer (int64) | No | N/A |
| activeTripsIncreasePercent | integer (int64) | No | N/A |
| totalRevenue | integer (int64) | No | N/A |
| totalRevenueIncreasePercent | integer (int64) | No | N/A |
| totalOwners | integer (int64) | No | N/A |
| totalOwnersIncreasePercent | integer (int64) | No | N/A |
| totalDrivers | integer (int64) | No | N/A |
| totalDriversIncreasePercent | integer (int64) | No | N/A |
| totalCustomer | integer (int64) | No | N/A |
| totalCustomerIncreasePercent | integer (int64) | No | N/A |
| pendingQuotes | integer (int64) | No | N/A |
| pendingQuotesIncreasePercent | integer (int64) | No | N/A |
| pendingTickets | integer (int64) | No | N/A |
| pendingTicketsIncreasePercent | integer (int64) | No | N/A |
| fleetUtlization | integer (int64) | No | N/A |
| fleetUtlizationIncreasePercent | integer (int64) | No | N/A |

---

## Home

### GET /Home

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `string`

**Content-Type:** `application/json`

**Schema Type:** `string`

**Content-Type:** `text/json`

**Schema Type:** `string`

---

## Invoice

### POST /Invoice

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /Invoice

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### GET /Invoice/{id}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| id | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

---

### GET /Invoice/trukcall/{truckcallid}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| truckcallid | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

---

### PUT /Invoice/header

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | EmployeeDto (circular) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### POST /Invoice/header/detail

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| activity | string | No | N/A |
| subActivity | string | No | N/A |
| commodity | string | No | N/A |
| subCommodity | string | No | N/A |
| contLength | number (double) | No | N/A |
| gcVolume | number (double) | No | N/A |
| grossWeight | number (double) | No | N/A |
| startDate | string (date-time) | No | N/A |
| endDate | string (date-time) | No | N/A |
| showTextCode | string | No | N/A |
| rate | number (double) | No | N/A |
| quantity1 | number (double) | No | N/A |
| quantity2 | number (double) | No | N/A |
| qtyUnit1 | string | No | N/A |
| qtyUnit2 | string | No | N/A |
| amount | number (double) | No | N/A |
| taxAmount | number (double) | No | N/A |
| invDetailStatus | string | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| isManual | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| activity | string | No | N/A |
| subActivity | string | No | N/A |
| commodity | string | No | N/A |
| subCommodity | string | No | N/A |
| contLength | number (double) | No | N/A |
| gcVolume | number (double) | No | N/A |
| grossWeight | number (double) | No | N/A |
| startDate | string (date-time) | No | N/A |
| endDate | string (date-time) | No | N/A |
| showTextCode | string | No | N/A |
| rate | number (double) | No | N/A |
| quantity1 | number (double) | No | N/A |
| quantity2 | number (double) | No | N/A |
| qtyUnit1 | string | No | N/A |
| qtyUnit2 | string | No | N/A |
| amount | number (double) | No | N/A |
| taxAmount | number (double) | No | N/A |
| invDetailStatus | string | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| isManual | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| activity | string | No | N/A |
| subActivity | string | No | N/A |
| commodity | string | No | N/A |
| subCommodity | string | No | N/A |
| contLength | number (double) | No | N/A |
| gcVolume | number (double) | No | N/A |
| grossWeight | number (double) | No | N/A |
| startDate | string (date-time) | No | N/A |
| endDate | string (date-time) | No | N/A |
| showTextCode | string | No | N/A |
| rate | number (double) | No | N/A |
| quantity1 | number (double) | No | N/A |
| quantity2 | number (double) | No | N/A |
| qtyUnit1 | string | No | N/A |
| qtyUnit2 | string | No | N/A |
| amount | number (double) | No | N/A |
| taxAmount | number (double) | No | N/A |
| invDetailStatus | string | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| isManual | boolean | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /Invoice/header/detail

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| activity | string | No | N/A |
| subActivity | string | No | N/A |
| commodity | string | No | N/A |
| subCommodity | string | No | N/A |
| contLength | number (double) | No | N/A |
| gcVolume | number (double) | No | N/A |
| grossWeight | number (double) | No | N/A |
| startDate | string (date-time) | No | N/A |
| endDate | string (date-time) | No | N/A |
| showTextCode | string | No | N/A |
| rate | number (double) | No | N/A |
| quantity1 | number (double) | No | N/A |
| quantity2 | number (double) | No | N/A |
| qtyUnit1 | string | No | N/A |
| qtyUnit2 | string | No | N/A |
| amount | number (double) | No | N/A |
| taxAmount | number (double) | No | N/A |
| invDetailStatus | string | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| isManual | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| activity | string | No | N/A |
| subActivity | string | No | N/A |
| commodity | string | No | N/A |
| subCommodity | string | No | N/A |
| contLength | number (double) | No | N/A |
| gcVolume | number (double) | No | N/A |
| grossWeight | number (double) | No | N/A |
| startDate | string (date-time) | No | N/A |
| endDate | string (date-time) | No | N/A |
| showTextCode | string | No | N/A |
| rate | number (double) | No | N/A |
| quantity1 | number (double) | No | N/A |
| quantity2 | number (double) | No | N/A |
| qtyUnit1 | string | No | N/A |
| qtyUnit2 | string | No | N/A |
| amount | number (double) | No | N/A |
| taxAmount | number (double) | No | N/A |
| invDetailStatus | string | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| isManual | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| activity | string | No | N/A |
| subActivity | string | No | N/A |
| commodity | string | No | N/A |
| subCommodity | string | No | N/A |
| contLength | number (double) | No | N/A |
| gcVolume | number (double) | No | N/A |
| grossWeight | number (double) | No | N/A |
| startDate | string (date-time) | No | N/A |
| endDate | string (date-time) | No | N/A |
| showTextCode | string | No | N/A |
| rate | number (double) | No | N/A |
| quantity1 | number (double) | No | N/A |
| quantity2 | number (double) | No | N/A |
| qtyUnit1 | string | No | N/A |
| qtyUnit2 | string | No | N/A |
| amount | number (double) | No | N/A |
| taxAmount | number (double) | No | N/A |
| invDetailStatus | string | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| isManual | boolean | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### GET /Invoice/header/detail/{detailId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| detailId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| activity | string | No | N/A |
| subActivity | string | No | N/A |
| commodity | string | No | N/A |
| subCommodity | string | No | N/A |
| contLength | number (double) | No | N/A |
| gcVolume | number (double) | No | N/A |
| grossWeight | number (double) | No | N/A |
| startDate | string (date-time) | No | N/A |
| endDate | string (date-time) | No | N/A |
| showTextCode | string | No | N/A |
| rate | number (double) | No | N/A |
| quantity1 | number (double) | No | N/A |
| quantity2 | number (double) | No | N/A |
| qtyUnit1 | string | No | N/A |
| qtyUnit2 | string | No | N/A |
| amount | number (double) | No | N/A |
| taxAmount | number (double) | No | N/A |
| invDetailStatus | string | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| isManual | boolean | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| activity | string | No | N/A |
| subActivity | string | No | N/A |
| commodity | string | No | N/A |
| subCommodity | string | No | N/A |
| contLength | number (double) | No | N/A |
| gcVolume | number (double) | No | N/A |
| grossWeight | number (double) | No | N/A |
| startDate | string (date-time) | No | N/A |
| endDate | string (date-time) | No | N/A |
| showTextCode | string | No | N/A |
| rate | number (double) | No | N/A |
| quantity1 | number (double) | No | N/A |
| quantity2 | number (double) | No | N/A |
| qtyUnit1 | string | No | N/A |
| qtyUnit2 | string | No | N/A |
| amount | number (double) | No | N/A |
| taxAmount | number (double) | No | N/A |
| invDetailStatus | string | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| isManual | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| activity | string | No | N/A |
| subActivity | string | No | N/A |
| commodity | string | No | N/A |
| subCommodity | string | No | N/A |
| contLength | number (double) | No | N/A |
| gcVolume | number (double) | No | N/A |
| grossWeight | number (double) | No | N/A |
| startDate | string (date-time) | No | N/A |
| endDate | string (date-time) | No | N/A |
| showTextCode | string | No | N/A |
| rate | number (double) | No | N/A |
| quantity1 | number (double) | No | N/A |
| quantity2 | number (double) | No | N/A |
| qtyUnit1 | string | No | N/A |
| qtyUnit2 | string | No | N/A |
| amount | number (double) | No | N/A |
| taxAmount | number (double) | No | N/A |
| invDetailStatus | string | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| isManual | boolean | No | N/A |

---

### GET /Invoice/header/{headerId}/details

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| headerId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /Invoice/list

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| truckcallId | query | No | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /Invoice/details/list

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

## LookupMaster

### POST /LookupMaster

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| createdDate | string (date-time) | No | N/A |
| createdBy | integer (int64) | No | N/A |
| updatedDate | string (date-time) | No | N/A |
| updatedBy | integer (int64) | No | N/A |
| deletedDate | string (date-time) | No | N/A |
| deletedBy | integer (int64) | No | N/A |
| regionCode | string | No | N/A |
| id | integer (int64) | No | N/A |
| lookUpCode | string | No | N/A |
| lookUpDescription | string | No | N/A |
| tsLookUp | string (date-time) | No | N/A |
| remark | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| createdDate | string (date-time) | No | N/A |
| createdBy | integer (int64) | No | N/A |
| updatedDate | string (date-time) | No | N/A |
| updatedBy | integer (int64) | No | N/A |
| deletedDate | string (date-time) | No | N/A |
| deletedBy | integer (int64) | No | N/A |
| regionCode | string | No | N/A |
| id | integer (int64) | No | N/A |
| lookUpCode | string | No | N/A |
| lookUpDescription | string | No | N/A |
| tsLookUp | string (date-time) | No | N/A |
| remark | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| createdDate | string (date-time) | No | N/A |
| createdBy | integer (int64) | No | N/A |
| updatedDate | string (date-time) | No | N/A |
| updatedBy | integer (int64) | No | N/A |
| deletedDate | string (date-time) | No | N/A |
| deletedBy | integer (int64) | No | N/A |
| regionCode | string | No | N/A |
| id | integer (int64) | No | N/A |
| lookUpCode | string | No | N/A |
| lookUpDescription | string | No | N/A |
| tsLookUp | string (date-time) | No | N/A |
| remark | string | No | N/A |

#### Responses

**200** - OK

---

### GET /LookupMaster/code/{lookupcode}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| lookupcode | path | Yes | string | N/A |

#### Responses

**200** - OK

---

### GET /LookupMaster/{lookupId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| lookupId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

---

### GET /LookupMaster/list

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| lookupcode | query | No | string | N/A |

#### Responses

**200** - OK

---

## Otp

### POST /Otp/{mobileNumber}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| mobileNumber | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

---

### POST /Otp/verify/{mobileNumber}/{otp}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| mobileNumber | path | Yes | integer (int64) | N/A |
| otp | path | Yes | string | N/A |

#### Responses

**200** - OK

---

## Payment

### POST /Payment

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| paidAmount | number (double) | No | N/A |
| currency | string | No | N/A |
| paidDate | string (date-time) | No | N/A |
| expireDate | string (date-time) | No | N/A |
| cashPoint | string | No | N/A |
| paymentMode | string | No | N/A |
| bankRef | string | No | N/A |
| paymentStatus | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| paidAmount | number (double) | No | N/A |
| currency | string | No | N/A |
| paidDate | string (date-time) | No | N/A |
| expireDate | string (date-time) | No | N/A |
| cashPoint | string | No | N/A |
| paymentMode | string | No | N/A |
| bankRef | string | No | N/A |
| paymentStatus | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| paidAmount | number (double) | No | N/A |
| currency | string | No | N/A |
| paidDate | string (date-time) | No | N/A |
| expireDate | string (date-time) | No | N/A |
| cashPoint | string | No | N/A |
| paymentMode | string | No | N/A |
| bankRef | string | No | N/A |
| paymentStatus | string | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /Payment

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| paidAmount | number (double) | No | N/A |
| currency | string | No | N/A |
| paidDate | string (date-time) | No | N/A |
| expireDate | string (date-time) | No | N/A |
| cashPoint | string | No | N/A |
| paymentMode | string | No | N/A |
| bankRef | string | No | N/A |
| paymentStatus | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| paidAmount | number (double) | No | N/A |
| currency | string | No | N/A |
| paidDate | string (date-time) | No | N/A |
| expireDate | string (date-time) | No | N/A |
| cashPoint | string | No | N/A |
| paymentMode | string | No | N/A |
| bankRef | string | No | N/A |
| paymentStatus | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| paidAmount | number (double) | No | N/A |
| currency | string | No | N/A |
| paidDate | string (date-time) | No | N/A |
| expireDate | string (date-time) | No | N/A |
| cashPoint | string | No | N/A |
| paymentMode | string | No | N/A |
| bankRef | string | No | N/A |
| paymentStatus | string | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /Payment/{id}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| id | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| paidAmount | number (double) | No | N/A |
| currency | string | No | N/A |
| paidDate | string (date-time) | No | N/A |
| expireDate | string (date-time) | No | N/A |
| cashPoint | string | No | N/A |
| paymentMode | string | No | N/A |
| bankRef | string | No | N/A |
| paymentStatus | string | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| paidAmount | number (double) | No | N/A |
| currency | string | No | N/A |
| paidDate | string (date-time) | No | N/A |
| expireDate | string (date-time) | No | N/A |
| cashPoint | string | No | N/A |
| paymentMode | string | No | N/A |
| bankRef | string | No | N/A |
| paymentStatus | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| paidAmount | number (double) | No | N/A |
| currency | string | No | N/A |
| paidDate | string (date-time) | No | N/A |
| expireDate | string (date-time) | No | N/A |
| cashPoint | string | No | N/A |
| paymentMode | string | No | N/A |
| bankRef | string | No | N/A |
| paymentStatus | string | No | N/A |

---

### DELETE /Payment/{id}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| id | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /Payment/invoiceHeaderId/{invoiceHeaderId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| invoiceHeaderId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| paidAmount | number (double) | No | N/A |
| currency | string | No | N/A |
| paidDate | string (date-time) | No | N/A |
| expireDate | string (date-time) | No | N/A |
| cashPoint | string | No | N/A |
| paymentMode | string | No | N/A |
| bankRef | string | No | N/A |
| paymentStatus | string | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| paidAmount | number (double) | No | N/A |
| currency | string | No | N/A |
| paidDate | string (date-time) | No | N/A |
| expireDate | string (date-time) | No | N/A |
| cashPoint | string | No | N/A |
| paymentMode | string | No | N/A |
| bankRef | string | No | N/A |
| paymentStatus | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| paidAmount | number (double) | No | N/A |
| currency | string | No | N/A |
| paidDate | string (date-time) | No | N/A |
| expireDate | string (date-time) | No | N/A |
| cashPoint | string | No | N/A |
| paymentMode | string | No | N/A |
| bankRef | string | No | N/A |
| paymentStatus | string | No | N/A |

---

### GET /Payment/list

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| searchkeyword | query | No | string | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

## Ticket

### POST /Ticket

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketNumber | string | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| customerName | string | No | N/A |
| issueDescription | string | No | N/A |
| phoneNumber | integer (int64) | No | N/A |
| dateOfIssue | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| ticketConversations | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketNumber | string | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| customerName | string | No | N/A |
| issueDescription | string | No | N/A |
| phoneNumber | integer (int64) | No | N/A |
| dateOfIssue | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| ticketConversations | Array<Object> | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketNumber | string | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| customerName | string | No | N/A |
| issueDescription | string | No | N/A |
| phoneNumber | integer (int64) | No | N/A |
| dateOfIssue | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| ticketConversations | Array<Object> | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /Ticket

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketNumber | string | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| customerName | string | No | N/A |
| issueDescription | string | No | N/A |
| phoneNumber | integer (int64) | No | N/A |
| dateOfIssue | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| ticketConversations | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketNumber | string | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| customerName | string | No | N/A |
| issueDescription | string | No | N/A |
| phoneNumber | integer (int64) | No | N/A |
| dateOfIssue | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| ticketConversations | Array<Object> | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketNumber | string | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| customerName | string | No | N/A |
| issueDescription | string | No | N/A |
| phoneNumber | integer (int64) | No | N/A |
| dateOfIssue | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| ticketConversations | Array<Object> | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /Ticket/{ticketId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| ticketId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketNumber | string | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| customerName | string | No | N/A |
| issueDescription | string | No | N/A |
| phoneNumber | integer (int64) | No | N/A |
| dateOfIssue | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| ticketConversations | Array<Object> | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketNumber | string | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| customerName | string | No | N/A |
| issueDescription | string | No | N/A |
| phoneNumber | integer (int64) | No | N/A |
| dateOfIssue | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| ticketConversations | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketNumber | string | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| customerName | string | No | N/A |
| issueDescription | string | No | N/A |
| phoneNumber | integer (int64) | No | N/A |
| dateOfIssue | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| ticketConversations | Array<Object> | No | N/A |

---

### DELETE /Ticket/{ticketId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| ticketId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### PATCH /Ticket/{ticketId}/status/{status}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| ticketId | path | Yes | integer (int64) | N/A |
| status | path | Yes | integer (int32) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /Ticket/list

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| status | query | No | integer (int32) | N/A |
| fromDate | query | No | string (date-time) | N/A |
| toDate | query | No | string (date-time) | N/A |
| searchkeyword | query | No | string | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### POST /Ticket/conversation

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketId | integer (int64) | No | N/A |
| tickets | Object | No | N/A |
| conversationMessage | string | No | N/A |
| sentBy | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketId | integer (int64) | No | N/A |
| tickets | Object | No | N/A |
| conversationMessage | string | No | N/A |
| sentBy | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketId | integer (int64) | No | N/A |
| tickets | Object | No | N/A |
| conversationMessage | string | No | N/A |
| sentBy | string | No | N/A |
| isActive | boolean | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /Ticket/conversation

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketId | integer (int64) | No | N/A |
| tickets | Object | No | N/A |
| conversationMessage | string | No | N/A |
| sentBy | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketId | integer (int64) | No | N/A |
| tickets | Object | No | N/A |
| conversationMessage | string | No | N/A |
| sentBy | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketId | integer (int64) | No | N/A |
| tickets | Object | No | N/A |
| conversationMessage | string | No | N/A |
| sentBy | string | No | N/A |
| isActive | boolean | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### DELETE /Ticket/conversation/{conversationId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| conversationId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /Ticket/conversation/{ticketConversationId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| ticketConversationId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketId | integer (int64) | No | N/A |
| tickets | Object | No | N/A |
| conversationMessage | string | No | N/A |
| sentBy | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketId | integer (int64) | No | N/A |
| tickets | Object | No | N/A |
| conversationMessage | string | No | N/A |
| sentBy | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketId | integer (int64) | No | N/A |
| tickets | Object | No | N/A |
| conversationMessage | string | No | N/A |
| sentBy | string | No | N/A |
| isActive | boolean | No | N/A |

---

### GET /Ticket/conversation/all/{ticketid}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| ticketid | path | Yes | integer (int64) | N/A |
| fromDate | query | No | string (date-time) | N/A |
| toDate | query | No | string (date-time) | N/A |
| searchkeyword | query | No | string | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /Ticket/conversation/list

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| ticketId | query | No | integer (int64) | N/A |
| fromDate | query | No | string (date-time) | N/A |
| toDate | query | No | string (date-time) | N/A |
| searchkeyword | query | No | string | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

## TruckCall

### POST /TruckCall/quotes

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckCallId | integer (int64) | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| truckCallStatus | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| companyIds | Array<integer (int32)> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckCallId | integer (int64) | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| truckCallStatus | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| companyIds | Array<integer (int32)> | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckCallId | integer (int64) | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| truckCallStatus | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| companyIds | Array<integer (int32)> | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /TruckCall/quotes

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /TruckCall/quotes/{quoteId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| quoteId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

---

### GET /TruckCall/quotes/{quoteId}/cargo

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| quoteId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

---

### GET /TruckCall/quotes/{quoteId}/companylist

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| quoteId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

---

### POST /TruckCall/quotes/estimate

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /TruckCall/quotes/estimate

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /TruckCall/quotes/rate/{rateRequestId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| rateRequestId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| requestedToUID | integer (int64) | No | N/A |
| requestedToUIDName | string | No | N/A |
| isActive | boolean | No | N/A |
| truckEstimates | Object | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| requestedToUID | integer (int64) | No | N/A |
| requestedToUIDName | string | No | N/A |
| isActive | boolean | No | N/A |
| truckEstimates | Object | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| requestedToUID | integer (int64) | No | N/A |
| requestedToUIDName | string | No | N/A |
| isActive | boolean | No | N/A |
| truckEstimates | Object | No | N/A |

---

### GET /TruckCall/quotes/estimate/{quoteEstimateId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| quoteEstimateId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

---

### POST /TruckCall/quotes/trip/assign

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| quoteId | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| driverId | integer (int64) | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| quoteId | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| driverId | integer (int64) | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| quoteId | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| driverId | integer (int64) | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### POST /TruckCall/quotes/trip/update

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| quoteId | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| driverId | integer (int64) | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| quoteId | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| driverId | integer (int64) | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| quoteId | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| driverId | integer (int64) | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### PATCH /TruckCall/quotes/trip/estimate/{tripestimateid}/approve

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| tripestimateid | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### PATCH /TruckCall/quotes/trip/estimate/{tripestimateid}/cancel

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| tripestimateid | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### PATCH /TruckCall/quotes/trip/{quoteId}/status/{status}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| quoteId | path | Yes | integer (int64) | N/A |
| status | path | Yes | integer (int32) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /TruckCall/quotes/trip/user/{userId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| userId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /TruckCall/quotes/trip/driver

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| organizationId | query | No | integer (int64) | N/A |
| driverId | query | No | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### POST /TruckCall/quotes/trip/attachment

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |
| attachment | Object | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |
| attachment | Object | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |
| attachment | Object | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /TruckCall/quotes/trip/attachment

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |
| attachment | Object | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |
| attachment | Object | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |
| attachment | Object | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### GET /TruckCall/quotes/trip/attachment/{truckcallattachmentId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| truckcallattachmentId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |
| attachment | Object | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |
| attachment | Object | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |
| attachment | Object | No | N/A |

---

### GET /TruckCall/quotes/trip/attachments/{truckcallId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| truckcallId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### DELETE /TruckCall/quotes/trip/attachment/{truckcallAttachmentId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| truckcallAttachmentId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /TruckCall/quotes/user

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| organizationId | query | No | integer (int64) | N/A |
| status | query | No | integer (int32) | N/A |
| fromDate | query | No | string (date-time) | N/A |
| toDate | query | No | string (date-time) | N/A |
| searchkeyword | query | No | string | N/A |
| RequestType | query | No | string | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /TruckCall/quotes/customer/{organizationId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| organizationId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /TruckCall/quotes/truckCompany/{organizationId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| organizationId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /TruckCall/quotes/admin/{organizationId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| organizationId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### DELETE /TruckCall/{quoteId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| quoteId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /TruckCall/{truckCallId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| truckCallId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

---

### GET /TruckCall/list/all

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| organizationId | query | No | integer (int64) | N/A |
| status | query | No | integer (int32) | N/A |
| fromDate | query | No | string (date-time) | N/A |
| toDate | query | No | string (date-time) | N/A |
| searchkeyword | query | No | string | N/A |
| RequestType | query | No | string | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /TruckCall/list

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| organizationId | query | No | integer (int64) | N/A |
| status | query | No | integer (int32) | N/A |
| fromDate | query | No | string (date-time) | N/A |
| toDate | query | No | string (date-time) | N/A |
| searchkeyword | query | No | string | N/A |
| RequestType | query | No | string | N/A |

#### Responses

**200** - OK

---

## TruckCallRateRequest

### POST /TruckCallRateRequest

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| requestedToUID | integer (int64) | No | N/A |
| requestedToUIDName | string | No | N/A |
| isActive | boolean | No | N/A |
| truckEstimates | Object | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| requestedToUID | integer (int64) | No | N/A |
| requestedToUIDName | string | No | N/A |
| isActive | boolean | No | N/A |
| truckEstimates | Object | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| requestedToUID | integer (int64) | No | N/A |
| requestedToUIDName | string | No | N/A |
| isActive | boolean | No | N/A |
| truckEstimates | Object | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /TruckCallRateRequest

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| requestedToUID | integer (int64) | No | N/A |
| requestedToUIDName | string | No | N/A |
| isActive | boolean | No | N/A |
| truckEstimates | Object | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| requestedToUID | integer (int64) | No | N/A |
| requestedToUIDName | string | No | N/A |
| isActive | boolean | No | N/A |
| truckEstimates | Object | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| requestedToUID | integer (int64) | No | N/A |
| requestedToUIDName | string | No | N/A |
| isActive | boolean | No | N/A |
| truckEstimates | Object | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### DELETE /TruckCallRateRequest/{truckCallRateId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| truckCallRateId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /TruckCallRateRequest/{truckCallRateId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| truckCallRateId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| requestedToUID | integer (int64) | No | N/A |
| requestedToUIDName | string | No | N/A |
| isActive | boolean | No | N/A |
| truckEstimates | Object | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| requestedToUID | integer (int64) | No | N/A |
| requestedToUIDName | string | No | N/A |
| isActive | boolean | No | N/A |
| truckEstimates | Object | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| requestedToUID | integer (int64) | No | N/A |
| requestedToUIDName | string | No | N/A |
| isActive | boolean | No | N/A |
| truckEstimates | Object | No | N/A |

---

### GET /TruckCallRateRequest/list/company/{orgId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| orgId | path | Yes | integer (int64) | N/A |
| status | query | No | string | N/A |
| fromDate | query | No | string (date-time) | N/A |
| toDate | query | No | string (date-time) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /TruckCallRateRequest/list/all

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| orgId | query | No | integer (int64) | N/A |
| status | query | No | string | N/A |
| fromDate | query | No | string (date-time) | N/A |
| toDate | query | No | string (date-time) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

## TruckDetails

### POST /TruckDetails

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |
| organizationId | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| truckDetailsAttachments | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |
| organizationId | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| truckDetailsAttachments | Array<Object> | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |
| organizationId | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| truckDetailsAttachments | Array<Object> | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /TruckDetails

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |
| organizationId | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| truckDetailsAttachments | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |
| organizationId | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| truckDetailsAttachments | Array<Object> | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |
| organizationId | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| truckDetailsAttachments | Array<Object> | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /TruckDetails/info

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckId | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckId | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckId | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /TruckDetails/identification

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckId | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckId | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckId | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /TruckDetails/connectivity

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckId | integer (int64) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckId | integer (int64) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckId | integer (int64) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### DELETE /TruckDetails/{truckId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| truckId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /TruckDetails/{truckId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| truckId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |
| organizationId | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| truckDetailsAttachments | Array<Object> | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |
| organizationId | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| truckDetailsAttachments | Array<Object> | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |
| organizationId | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| truckDetailsAttachments | Array<Object> | No | N/A |

---

### POST /TruckDetails/attachment

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckDetailsId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckDetailsId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckDetailsId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### PUT /TruckDetails/attachment

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckDetailsId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckDetailsId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckDetailsId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /TruckDetails/company/{organizationId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| organizationId | path | Yes | integer (int64) | N/A |
| truckStatus | query | No | string | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /TruckDetails/user/{userId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| userId | path | Yes | integer (int64) | N/A |
| truckStatus | query | No | string | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /TruckDetails/list/all

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /TruckDetails/list

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /TruckDetails/attachments/{truckId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| truckId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

## TruckEstimate

### POST /TruckEstimate

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `integer (int64)`

**Content-Type:** `application/json`

**Schema Type:** `integer (int64)`

**Content-Type:** `text/json`

**Schema Type:** `integer (int64)`

---

### PUT /TruckEstimate

#### Request Body

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `application/*+json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### DELETE /TruckEstimate/{truckEstimatesId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| truckEstimatesId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `boolean`

**Content-Type:** `application/json`

**Schema Type:** `boolean`

**Content-Type:** `text/json`

**Schema Type:** `boolean`

---

### GET /TruckEstimate/{truckEstimatesId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| truckEstimatesId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `application/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

**Content-Type:** `text/json`

**Schema Type:** `Object`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

---

### GET /TruckEstimate/list/{orgId}

#### Parameters

| Name | In | Required | Type | Description |
|------|----|----------|------|-------------|
| orgId | path | Yes | integer (int64) | N/A |

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

### GET /TruckEstimate/list/all

#### Responses

**200** - OK

**Content-Type:** `text/plain`

**Schema Type:** `Array<Object>`

**Content-Type:** `application/json`

**Schema Type:** `Array<Object>`

**Content-Type:** `text/json`

**Schema Type:** `Array<Object>`

---

## Data Models

### AssignTripDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| quoteId | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| driverId | integer (int64) | No | N/A |

---

### AttachmentDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| blobFileName | string | No | N/A |
| isDeleted | boolean | No | N/A |

---

### AttachmentType

**Type:** integer (int32) [0, 1, 2, 3, 4, 5, 6]

---

### CargoType

**Type:** integer (int32) [0, 1, 2, 3]

---

### ChangePasswordDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| oldPassword | string | No | N/A |
| newPassword | string | No | N/A |

---

### CompanyDashboardDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| totalCustomers | integer (int64) | No | N/A |
| totalCustomersIncreasePercent | integer (int64) | No | N/A |
| totalCompanies | integer (int64) | No | N/A |
| totalCompaniesIncreasePercent | integer (int64) | No | N/A |
| activeDrivers | integer (int64) | No | N/A |
| activeDriversIncreasePercent | integer (int64) | No | N/A |
| suspendedCompanies | integer (int64) | No | N/A |

---

### CompanyStatusDashboardDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| newlyAdded | integer (int64) | No | N/A |
| rejected | integer (int64) | No | N/A |
| pending | integer (int64) | No | N/A |
| approved | integer (int64) | No | N/A |

---

### ConfigDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| configCode | string | No | N/A |
| configValue | string | No | N/A |
| configDescription | string | No | N/A |
| terminal | string | No | N/A |
| systemOrUser | string | No | N/A |

---

### DriverAttachmentDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| driverId | integer (int64) | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |

---

### DriverProofDetailsDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| driverId | integer (int64) | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |

---

### EmployeeAttachmentDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| employeeId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

---

### EmployeeDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| fatherName | string | No | N/A |
| qualification | string | No | N/A |
| specilisation | string | No | N/A |
| department | string | No | N/A |
| designation | string | No | N/A |
| dob | string (date-time) | No | N/A |
| age | integer (int32) | No | N/A |
| doj | string (date-time) | No | N/A |
| doResig | string (date-time) | No | N/A |
| gender | string | No | N/A |
| maritalStatus | string | No | N/A |
| bloodGroup | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pin | string | No | N/A |
| phone | string | No | N/A |
| mobile | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| licenseNo | string | No | N/A |
| licenseExpiryDate | string (date-time) | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| passportNo | string | No | N/A |
| ppPlaceOfIssue | string | No | N/A |
| ppDateOfIssue | string (date-time) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| location | string | No | N/A |
| hiEmployee | string (date-time) | No | N/A |
| groupId | integer (int32) | No | N/A |
| orgId | integer (int64) | No | N/A |
| isPilot | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| attachment | Object | No | N/A |

---

### EmployeeStatus

**Type:** integer (int32) [0, 1, 2, 3, 4, 5]

---

### FileResponse

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| stream | string (binary) | No | N/A |
| contentType | string | No | N/A |
| blobName | string | No | N/A |
| errorMessage | string | No | N/A |

---

### HomeDashboardDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| activeTrips | integer (int64) | No | N/A |
| activeTripsIncreasePercent | integer (int64) | No | N/A |
| totalRevenue | integer (int64) | No | N/A |
| totalRevenueIncreasePercent | integer (int64) | No | N/A |
| totalOwners | integer (int64) | No | N/A |
| totalOwnersIncreasePercent | integer (int64) | No | N/A |
| totalDrivers | integer (int64) | No | N/A |
| totalDriversIncreasePercent | integer (int64) | No | N/A |
| totalCustomer | integer (int64) | No | N/A |
| totalCustomerIncreasePercent | integer (int64) | No | N/A |
| pendingQuotes | integer (int64) | No | N/A |
| pendingQuotesIncreasePercent | integer (int64) | No | N/A |
| pendingTickets | integer (int64) | No | N/A |
| pendingTicketsIncreasePercent | integer (int64) | No | N/A |
| fleetUtlization | integer (int64) | No | N/A |
| fleetUtlizationIncreasePercent | integer (int64) | No | N/A |

---

### InvoiceDetailDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| activity | string | No | N/A |
| subActivity | string | No | N/A |
| commodity | string | No | N/A |
| subCommodity | string | No | N/A |
| contLength | number (double) | No | N/A |
| gcVolume | number (double) | No | N/A |
| grossWeight | number (double) | No | N/A |
| startDate | string (date-time) | No | N/A |
| endDate | string (date-time) | No | N/A |
| showTextCode | string | No | N/A |
| rate | number (double) | No | N/A |
| quantity1 | number (double) | No | N/A |
| quantity2 | number (double) | No | N/A |
| qtyUnit1 | string | No | N/A |
| qtyUnit2 | string | No | N/A |
| amount | number (double) | No | N/A |
| taxAmount | number (double) | No | N/A |
| invDetailStatus | string | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| isManual | boolean | No | N/A |

---

### InvoiceHeaderDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invSender | integer (int64) | No | N/A |
| sender | Object | No | N/A |
| invType | string | No | N/A |
| invSubType | string | No | N/A |
| invRcvr | integer (int64) | No | N/A |
| receiver | Object | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| truckCall | Object | No | N/A |
| invoiceNumber | string | No | N/A |
| approvalDate | string (date-time) | No | N/A |
| approvedBy | integer (int64) | No | N/A |
| currency | string | No | N/A |
| invStatus | string | No | N/A |
| actualInvNumber | string | No | N/A |
| creationType | string | No | N/A |
| totalAmount | number (double) | No | N/A |
| vatAmount | number (double) | No | N/A |
| grandTotal | number (double) | No | N/A |
| exchangeCurrency | string | No | N/A |
| exchangeRate | number (double) | No | N/A |
| exchangeTotalAmount | number (double) | No | N/A |
| exchangeGrandTotal | number (double) | No | N/A |
| isAdvance | boolean | No | N/A |
| isAdvanceCredited | boolean | No | N/A |
| paymentValidity | string (date-time) | No | N/A |
| invoiceLocation | string | No | N/A |
| paymentStatus | string | No | N/A |
| paymentIntfStatus | string | No | N/A |
| invoiceDetails | Array<Object> | No | N/A |

---

### LookUpMaster

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| createdDate | string (date-time) | No | N/A |
| createdBy | integer (int64) | No | N/A |
| updatedDate | string (date-time) | No | N/A |
| updatedBy | integer (int64) | No | N/A |
| deletedDate | string (date-time) | No | N/A |
| deletedBy | integer (int64) | No | N/A |
| regionCode | string | No | N/A |
| id | integer (int64) | No | N/A |
| lookUpCode | string | No | N/A |
| lookUpDescription | string | No | N/A |
| tsLookUp | string (date-time) | No | N/A |
| remark | string | No | N/A |

---

### MyProfileDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |

---

### OrgStatusDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| organizationId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |

---

### OrganizationAttachmentDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| organizationId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

---

### OrganizationBankDetailsDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |

---

### OrganizationContactCredentialsDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| applicationUserId | integer (int64) | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| orgId | integer (int64) | No | N/A |

---

### OrganizationContactDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| employeeId | integer (int64) | No | N/A |
| title | string | No | N/A |
| firstName | string | No | N/A |
| middleName | string | No | N/A |
| lastName | string | No | N/A |
| mobile | string | No | N/A |
| phone | string | No | N/A |
| emailId | string | No | N/A |
| modeOfCommunication | string | No | N/A |
| userName | string | No | N/A |
| password | string | No | N/A |
| specialRole | string | No | N/A |
| isPrimary | boolean | No | N/A |
| orgId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| country | string | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |

---

### OrganizationDetailsDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| address2 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| location | string | No | N/A |
| orgRoles | Array<Object> | No | N/A |

---

### OrganizationDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| name | string | No | N/A |
| ownerName | string | No | N/A |
| orgType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| isAgent | boolean | No | N/A |
| alsoTruckOwner | boolean | No | N/A |
| alsoCustomer | boolean | No | N/A |
| licenseNo | string | No | N/A |
| address1 | string | No | N/A |
| city | string | No | N/A |
| state | string | No | N/A |
| country | string | No | N/A |
| pinCode | string | No | N/A |
| phone | string | No | N/A |
| primaryContactDto | Object | No | N/A |
| parentCompanyID | integer (int64) | No | N/A |
| tinNo | string | No | N/A |
| bankAcNo | string | No | N/A |
| bankName | string | No | N/A |
| accountType | string | No | N/A |
| bankBranch | string | No | N/A |
| ifsc | string | No | N/A |
| micr | string | No | N/A |
| bankOtherDetails | string | No | N/A |
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |
| location | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| comments | string | No | N/A |
| orgAttachments | Array<Object> | No | N/A |
| orgRoles | Array<Object> | No | N/A |

---

### OrganizationEmergencyInfoDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| emergencyName | string | No | N/A |
| emerPhone | string | No | N/A |
| emerAddress | string | No | N/A |

---

### OrganizationList

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| customerId | integer (int64) | No | N/A |
| companyName | string | No | N/A |
| companyOwnerName | string | No | N/A |
| companyType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| companyTypeName | string | No | N/A |
| companySatus | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| companyStatusName | string | No | N/A |
| contactPersonId | integer (int64) | No | N/A |
| contactPerson | string | No | N/A |
| contactPersonStatus | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| contactPersonStatusName | string | No | N/A |
| contactPersonMobile | string | No | N/A |
| companyEmergencyContactName | string | No | N/A |
| companyEmergencyPhone | string | No | N/A |
| createdDate | string (date-time) | No | N/A |
| quotesRequested | integer (int32) | No | N/A |
| activeTrips | integer (int32) | No | N/A |
| fleetSize | integer (int32) | No | N/A |
| activeDrivers | integer (int32) | No | N/A |
| paymentStatus | string | No | N/A |

---

### OrganizationRoleDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| organizationId | integer (int64) | No | N/A |
| role | string | No | N/A |
| isActive | boolean | No | N/A |

---

### OrganizationStatus

**Type:** integer (int32) [0, 1, 2, 3, 4]

---

### OrganizationType

**Type:** integer (int32) [0, 1, 2, 3, 4]

---

### PaymentHeaderDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| invoiceHeaderId | integer (int64) | No | N/A |
| paidAmount | number (double) | No | N/A |
| currency | string | No | N/A |
| paidDate | string (date-time) | No | N/A |
| expireDate | string (date-time) | No | N/A |
| cashPoint | string | No | N/A |
| paymentMode | string | No | N/A |
| bankRef | string | No | N/A |
| paymentStatus | string | No | N/A |

---

### QuoteType

**Type:** integer (int32) [0, 1, 2]

---

### ResetPasswordDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| userName | string | No | N/A |

---

### TicketStaus

**Type:** integer (int32) [0, 1, 2, 3, 4, 5]

---

### TicketsConversationDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketId | integer (int64) | No | N/A |
| tickets | Object | No | N/A |
| conversationMessage | string | No | N/A |
| sentBy | string | No | N/A |
| isActive | boolean | No | N/A |

---

### TicketsDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| ticketNumber | string | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| customerName | string | No | N/A |
| issueDescription | string | No | N/A |
| phoneNumber | integer (int64) | No | N/A |
| dateOfIssue | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| ticketConversations | Array<Object> | No | N/A |

---

### TripsDashboardDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| activeTrips | integer (int64) | No | N/A |
| activeTripsIncreasePercent | integer (int64) | No | N/A |
| liveTrips | integer (int64) | No | N/A |
| liveTripsIncreasePercent | integer (int64) | No | N/A |
| delayedTrips | integer (int64) | No | N/A |
| delayedTripsIncreasePercent | integer (int64) | No | N/A |
| suspendedTrips | integer (int64) | No | N/A |
| suspendedTripsIncreasePercent | integer (int64) | No | N/A |

---

### TruckCallAttachmentDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |
| attachment | Object | No | N/A |

---

### TruckCallDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckId | integer (int64) | No | N/A |
| truckDetails | Object | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| truckTypeName | string | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| cargoTypeName | string | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| truckCompany | integer (int64) | No | N/A |
| truckCompanyDetails | Object | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| driverName | string | No | N/A |
| driverId | integer (int64) | No | N/A |
| driverDetails | Object | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| terminalOrgName | string | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedByOrgName | string | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| requestedOnBeHalfOrgName | string | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| statusName | string | No | N/A |
| actualStartTime | string (date-time) | No | N/A |
| timeReachedFromLoc | string (date-time) | No | N/A |
| timePickedCargo | string (date-time) | No | N/A |
| timeReachedToLoc | string (date-time) | No | N/A |
| timeHandedOverCargo | string (date-time) | No | N/A |
| otpForHandOver | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| costQuoted | number (double) | No | N/A |
| platformFee | number (double) | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| requestTypeName | string | No | N/A |
| truckCallRateRequestDtos | Array<Object> | No | N/A |

---

### TruckCallRateEstimatesDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallRateRequestUID | integer (int64) | No | N/A |
| costQuoted | number (double) | No | N/A |
| costCurrency | string | No | N/A |
| platformFee | number (double) | No | N/A |
| platformFeeCurrency | string | No | N/A |
| quoteComments | string | No | N/A |
| termsAndConditions | string | No | N/A |
| otherRemarks | string | No | N/A |
| truckType | string | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| isActive | boolean | No | N/A |

---

### TruckCallRateRequestDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckCallId | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3, 4, 5] | No | N/A |
| requestedToUID | integer (int64) | No | N/A |
| requestedToUIDName | string | No | N/A |
| isActive | boolean | No | N/A |
| truckEstimates | Object | No | N/A |

---

### TruckCallRateRequestEstimateStatus

**Type:** integer (int32) [0, 1, 2, 3, 4, 5]

---

### TruckCallRateRequestStatus

**Type:** integer (int32) [0, 1, 2, 3, 4, 5]

---

### TruckCallStatus

**Type:** integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8]

---

### TruckConnectivityDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckId | integer (int64) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |

---

### TruckDetailsAttachmentDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckDetailsId | integer (int64) | No | N/A |
| attachmentType | integer (int32) [0, 1, 2, 3, 4, 5, 6] | No | N/A |
| attachmentId | integer (int64) | No | N/A |
| fileName | string | No | N/A |
| isActive | boolean | No | N/A |

---

### TruckDetailsDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |
| phoneNr | integer (int64) | No | N/A |
| gpsTrackerNr | integer (int64) | No | N/A |
| country | string | No | N/A |
| organizationId | integer (int64) | No | N/A |
| isActive | boolean | No | N/A |
| truckDetailsAttachments | Array<Object> | No | N/A |

---

### TruckIdentificationDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckId | integer (int64) | No | N/A |
| truckNumber | string | No | N/A |
| vin | string | No | N/A |
| haulerChassis | string | No | N/A |
| trailerChassis | string | No | N/A |
| insuranceNumber | string | No | N/A |
| insuranceExpiryDate | string (date-time) | No | N/A |

---

### TruckInfoDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckId | integer (int64) | No | N/A |
| truckName | string | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| model | string | No | N/A |
| make | string | No | N/A |
| yearOfMfr | integer (int32) | No | N/A |
| capacity | integer (int64) | No | N/A |
| engineCapacity | integer (int64) | No | N/A |
| tankCapacity | integer (int64) | No | N/A |
| grossTonnage | integer (int64) | No | N/A |
| status | integer (int32) [0, 1, 2, 3] | No | N/A |
| teuCapacity | integer (int64) | No | N/A |

---

### TruckQuoteDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| truckCallId | integer (int64) | No | N/A |
| fromLocation | string | No | N/A |
| toLocation | string | No | N/A |
| fromGPSCoords | string | No | N/A |
| fromLocSPOC | string | No | N/A |
| fromLocMobileNr | integer (int64) | No | N/A |
| toGPSCoords | string | No | N/A |
| toLocSPOC | string | No | N/A |
| toLocMobileNr | integer (int64) | No | N/A |
| truckType | integer (int32) [0, 1, 2, 3, 4] | No | N/A |
| cargoType | integer (int32) [0, 1, 2, 3] | No | N/A |
| containerLength | integer (int64) | No | N/A |
| specialCargoDescription | string | No | N/A |
| dropOffOrPickUp | string | No | N/A |
| cargoId | integer (int64) | No | N/A |
| quantityOrdered | integer (int64) | No | N/A |
| quantityHandled | integer (int64) | No | N/A |
| cargoWeight | number (double) | No | N/A |
| terminalId | integer (int64) | No | N/A |
| requestedById | integer (int64) | No | N/A |
| requestedOnBeHalfId | integer (int64) | No | N/A |
| reqPickupTime | string (date-time) | No | N/A |
| quantityUnit | string | No | N/A |
| insuranceValue | string | No | N/A |
| cargoValue | string | No | N/A |
| temperatureControl | string | No | N/A |
| specialInstructions | string | No | N/A |
| hazardousMaterial | boolean | No | N/A |
| truckCallStatus | integer (int32) [0, 1, 2, 3, 4, 5, 6, 7, 8] | No | N/A |
| requestType | integer (int32) [0, 1, 2] | No | N/A |
| companyIds | Array<integer (int32)> | No | N/A |

---

### TruckStaus

**Type:** integer (int32) [0, 1, 2, 3]

---

### TruckType

**Type:** integer (int32) [0, 1, 2, 3, 4]

---

