# Data Storage Strategy for Customer App

## Overview

This document outlines what data should be stored locally on the device vs fetched from the API, considering security, performance, offline capabilities, and storage limitations.

---

## Current Storage Implementation

### ✅ Currently Stored (SessionService)

**In AsyncStorage:**
- User session metadata (phoneNumber, userType, profile completion flags)
- Onboarding form data (PersonalInfo, CompanyInfo, ContactInfo, BankDetails, EmergencyInfo)
- Document metadata (file names, sizes, types - NOT actual files)
- Onboarding progress flags

**In SecureStore (via apiClient):**
- App Token (less sensitive)
- User Token / JWT (highly sensitive)
- Refresh Token (highly sensitive)

---

## Recommended Storage Strategy

### ✅ **SHOULD Store Locally**

#### 1. **Authentication & Session Data** (Critical)
```typescript
// SecureStore (Highly Sensitive)
- User Token (JWT) ✅
- Refresh Token ✅
- App Token ✅ (can be AsyncStorage)

// AsyncStorage (Less Sensitive)
- User ID
- Username/Email
- User Type (individual/company)
- Basic user profile (name, email, phone)
- Session flags (isLoggedIn, onboardingComplete)
```

**Why:** Required for app functionality, security, and offline access.

---

#### 2. **User Preferences & Settings** (Recommended)
```typescript
// AsyncStorage
- Theme preference (light/dark)
- Language preference
- Notification settings
- App settings (biometric login, etc.)
- Last selected filters/search preferences
```

**Why:** Improves UX, reduces API calls, works offline.

---

#### 3. **Cached API Data** (Selective)
```typescript
// AsyncStorage with TTL (Time To Live)
- User profile (cached for 1 hour)
- Dashboard summary (cached for 5-15 minutes)
- Lookup/master data (cached for 24 hours)
- Recent quotes list (cached for 10 minutes)
- Recent trips list (cached for 5 minutes)
```

**Why:** Improves performance, reduces API calls, enables offline viewing.

**Implementation:**
```typescript
interface CachedData<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

// Example: Cache with expiration
const cacheQuote = async (quoteId: string, quoteData: Quote) => {
  const cached: CachedData<Quote> = {
    data: quoteData,
    timestamp: Date.now(),
    ttl: 10 * 60 * 1000, // 10 minutes
  };
  await AsyncStorage.setItem(`quote_${quoteId}`, JSON.stringify(cached));
};

const getCachedQuote = async (quoteId: string): Promise<Quote | null> => {
  const cachedStr = await AsyncStorage.getItem(`quote_${quoteId}`);
  if (!cachedStr) return null;
  
  const cached: CachedData<Quote> = JSON.parse(cachedStr);
  const isExpired = Date.now() - cached.timestamp > cached.ttl;
  
  if (isExpired) {
    await AsyncStorage.removeItem(`quote_${quoteId}`);
    return null;
  }
  
  return cached.data;
};
```

---

#### 4. **Temporary Form Data** (During Onboarding)
```typescript
// AsyncStorage (temporary, cleared after submission)
- Onboarding form progress ✅ (current implementation)
- Draft quote requests
- Unsubmitted form data
```

**Why:** Prevents data loss if user closes app, improves UX.

**Note:** Should be cleared after successful submission.

---

#### 5. **Offline Queue** (For Actions)
```typescript
// AsyncStorage
- Failed API requests (to retry when online)
- Pending uploads (file uploads that failed)
- Pending actions (create quote, update status, etc.)
```

**Why:** Enables offline functionality, ensures data sync when online.

**Implementation:**
```typescript
interface OfflineAction {
  id: string;
  type: 'CREATE_QUOTE' | 'UPDATE_TRIP_STATUS' | 'UPLOAD_DOCUMENT';
  payload: unknown;
  timestamp: number;
  retryCount: number;
}

const queueOfflineAction = async (action: OfflineAction) => {
  const queue = await getOfflineQueue();
  queue.push(action);
  await AsyncStorage.setItem('offline_queue', JSON.stringify(queue));
};

const processOfflineQueue = async () => {
  const queue = await getOfflineQueue();
  for (const action of queue) {
    try {
      await executeAction(action);
      await removeFromQueue(action.id);
    } catch (error) {
      action.retryCount++;
      if (action.retryCount > 3) {
        await removeFromQueue(action.id);
        // Notify user of failure
      }
    }
  }
};
```

---

### ❌ **SHOULD NOT Store Locally**

#### 1. **Sensitive Business Data**
```typescript
// DO NOT STORE:
- Full bank account numbers (store last 4 digits only if needed)
- Complete credit card information
- Full SSN/TIN numbers
- Complete financial transaction history
- Detailed payment information
```

**Why:** Security risk, compliance issues (PCI-DSS, GDPR), unnecessary storage.

**Alternative:** Fetch from API when needed, display masked values.

---

#### 2. **Large Datasets**
```typescript
// DO NOT STORE:
- Complete trip history (store last 10-20 only)
- All quotes ever created (store recent only)
- Large file contents (store metadata only)
- Complete company/user lists
- Extensive transaction logs
```

**Why:** Storage limitations, performance issues, unnecessary data.

**Alternative:** 
- Paginate API requests
- Store only recent/relevant items
- Use infinite scroll with API pagination

---

#### 3. **Frequently Changing Data**
```typescript
// DO NOT STORE (or cache with very short TTL):
- Real-time trip status
- Live GPS coordinates
- Current quote prices
- Real-time notifications
- Live dashboard metrics
```

**Why:** Data becomes stale quickly, requires frequent updates.

**Alternative:** 
- Fetch fresh data on screen focus
- Use WebSocket/push notifications for real-time updates
- Cache with very short TTL (1-2 minutes)

---

#### 4. **Actual File Contents**
```typescript
// DO NOT STORE:
- Document file contents (PDFs, images)
- Large images
- Video files
- Audio files
```

**Why:** Storage bloat, performance issues.

**Alternative:**
- Store only file metadata (name, size, type, upload status)
- Store file IDs/references
- Fetch files from API/CDN when needed
- Use image caching library (react-native-fast-image) for thumbnails only

---

#### 5. **Other Users' Data**
```typescript
// DO NOT STORE:
- Other companies' information
- Other users' profiles
- Driver details (unless assigned to user's trips)
- Public/master data that changes frequently
```

**Why:** Privacy concerns, data freshness, unnecessary storage.

---

## Storage Architecture

### Storage Layers

```
┌─────────────────────────────────────┐
│     SecureStore (Encrypted)        │
│  - User Token (JWT)                 │
│  - Refresh Token                    │
│  - App Token (optional)           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│     AsyncStorage (Unencrypted)     │
│                                     │
│  ┌──────────────────────────────┐ │
│  │ Session Data                  │ │
│  │ - User ID, username           │ │
│  │ - User type, preferences     │ │
│  │ - Onboarding progress        │ │
│  └──────────────────────────────┘ │
│                                     │
│  ┌──────────────────────────────┐ │
│  │ Cache (with TTL)             │ │
│  │ - User profile (1h)          │ │
│  │ - Dashboard (15min)          │ │
│  │ - Master data (24h)          │ │
│  │ - Recent quotes (10min)      │ │
│  └──────────────────────────────┘ │
│                                     │
│  ┌──────────────────────────────┐ │
│  │ Offline Queue                │ │
│  │ - Failed requests            │ │
│  │ - Pending actions            │ │
│  └──────────────────────────────┘ │
│                                     │
│  ┌──────────────────────────────┐ │
│  │ Temporary Data               │ │
│  │ - Draft forms                │ │
│  │ - Upload progress            │ │
│  └──────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## Recommended Storage Limits

### Per Data Type

| Data Type | Max Items | Max Size | TTL | Storage Location |
|-----------|-----------|----------|-----|------------------|
| User Profile | 1 | 5 KB | 1 hour | AsyncStorage |
| Recent Quotes | 20 | 50 KB | 10 min | AsyncStorage |
| Recent Trips | 20 | 50 KB | 5 min | AsyncStorage |
| Dashboard Summary | 1 | 10 KB | 15 min | AsyncStorage |
| Master Data | 100 items | 100 KB | 24 hours | AsyncStorage |
| Offline Queue | 50 actions | 200 KB | Until processed | AsyncStorage |
| Draft Forms | 5 | 50 KB | Until submitted | AsyncStorage |
| Tokens | 3 | 2 KB | Until expiry | SecureStore |

### Total Storage Budget

- **SecureStore:** ~5 KB (tokens only)
- **AsyncStorage:** ~500 KB - 1 MB (all cached data)
- **Total:** ~1 MB maximum

**Why:** Mobile devices have limited storage, keep app lightweight.

---

## Implementation Recommendations

### 1. Create Cache Service

```typescript
// services/cacheService.ts
export class CacheService {
  private static readonly CACHE_PREFIX = 'cache_';
  private static readonly DEFAULT_TTL = 60 * 60 * 1000; // 1 hour

  static async set<T>(key: string, data: T, ttl?: number): Promise<void> {
    const cached: CachedData<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.DEFAULT_TTL,
    };
    await AsyncStorage.setItem(
      `${this.CACHE_PREFIX}${key}`,
      JSON.stringify(cached)
    );
  }

  static async get<T>(key: string): Promise<T | null> {
    const cachedStr = await AsyncStorage.getItem(`${this.CACHE_PREFIX}${key}`);
    if (!cachedStr) return null;

    const cached: CachedData<T> = JSON.parse(cachedStr);
    const isExpired = Date.now() - cached.timestamp > cached.ttl;

    if (isExpired) {
      await AsyncStorage.removeItem(`${this.CACHE_PREFIX}${key}`);
      return null;
    }

    return cached.data;
  }

  static async clear(key?: string): Promise<void> {
    if (key) {
      await AsyncStorage.removeItem(`${this.CACHE_PREFIX}${key}`);
    } else {
      // Clear all cache
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(k => k.startsWith(this.CACHE_PREFIX));
      await AsyncStorage.multiRemove(cacheKeys);
    }
  }
}
```

### 2. Update Session Service

```typescript
// services/sessionService.ts
// Keep minimal session data, remove full form data after submission

export interface UserSession {
  // Minimal session data
  userId?: string;
  username?: string;
  userType?: 'individual' | 'company';
  orgId?: string;
  profileCompleted: boolean;
  onboardingComplete?: boolean;
  
  // Remove these after onboarding:
  // personalInfo, companyInfo, contactInfo, etc.
  // Store in backend instead
}
```

### 3. Implement Offline Queue

```typescript
// services/offlineQueue.ts
export class OfflineQueue {
  static async add(action: OfflineAction): Promise<void> {
    const queue = await this.getQueue();
    queue.push(action);
    await AsyncStorage.setItem('offline_queue', JSON.stringify(queue));
  }

  static async process(): Promise<void> {
    const queue = await this.getQueue();
    // Process queue when online
  }
}
```

---

## Data Cleanup Strategy

### Automatic Cleanup

1. **On App Start:**
   - Clear expired cache entries
   - Process offline queue if online
   - Validate session tokens

2. **On Logout:**
   - Clear all user data
   - Clear cache
   - Clear offline queue
   - Clear tokens

3. **Periodic Cleanup:**
   - Clear cache older than 7 days
   - Clear failed offline actions older than 24 hours
   - Limit cache size (remove oldest entries)

### Manual Cleanup

```typescript
// utils/storageCleanup.ts
export const cleanupStorage = async () => {
  // Clear expired cache
  await CacheService.clear();
  
  // Clear old offline queue items
  const queue = await getOfflineQueue();
  const validQueue = queue.filter(
    item => Date.now() - item.timestamp < 24 * 60 * 60 * 1000
  );
  await AsyncStorage.setItem('offline_queue', JSON.stringify(validQueue));
  
  // Limit cache size
  await limitCacheSize(500 * 1024); // 500 KB max
};
```

---

## Security Considerations

### ✅ Safe to Store
- User preferences
- Cached API responses (non-sensitive)
- UI state
- Form drafts (non-sensitive fields)

### ⚠️ Store Securely
- Authentication tokens → SecureStore
- User IDs, usernames → AsyncStorage (acceptable)
- Basic profile info → AsyncStorage (acceptable)

### ❌ Never Store
- Passwords (even hashed)
- Full credit card numbers
- Complete bank account numbers
- SSN/TIN numbers
- API keys/secrets

---

## Migration Plan

### Phase 1: Clean Up Current Storage
- [ ] Remove full form data from session after submission
- [ ] Move tokens to SecureStore (already done)
- [ ] Keep only minimal session data

### Phase 2: Implement Caching
- [ ] Create CacheService
- [ ] Add cache for user profile
- [ ] Add cache for dashboard
- [ ] Add cache for master data

### Phase 3: Implement Offline Support
- [ ] Create OfflineQueue
- [ ] Handle failed requests
- [ ] Sync when online

### Phase 4: Optimize Storage
- [ ] Implement storage cleanup
- [ ] Set storage limits
- [ ] Monitor storage usage

---

## Summary

### Store Locally:
✅ Authentication tokens (SecureStore)  
✅ Minimal session data (AsyncStorage)  
✅ User preferences (AsyncStorage)  
✅ Cached API data with TTL (AsyncStorage)  
✅ Temporary form drafts (AsyncStorage)  
✅ Offline action queue (AsyncStorage)  

### Don't Store:
❌ Sensitive financial data  
❌ Large datasets  
❌ Frequently changing real-time data  
❌ Actual file contents  
❌ Other users' data  

### Storage Budget:
- **SecureStore:** ~5 KB (tokens)
- **AsyncStorage:** ~500 KB - 1 MB (cache + session)
- **Total:** ~1 MB maximum

This strategy balances performance, offline capabilities, security, and storage efficiency.

