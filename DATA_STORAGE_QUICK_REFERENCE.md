# Data Storage Quick Reference

## 🎯 Quick Answer: How Much Data to Store?

**Total Storage Budget: ~1 MB**

- **SecureStore (Encrypted):** ~5 KB - Authentication tokens only
- **AsyncStorage (Unencrypted):** ~500 KB - 1 MB - Session, cache, preferences

---

## ✅ Store Locally

### SecureStore (Encrypted - Highly Sensitive)
```
✓ User Token (JWT)
✓ Refresh Token  
✓ App Token (optional)
```
**Size:** ~5 KB total

### AsyncStorage (Unencrypted - Less Sensitive)

#### 1. Session Data (~10 KB)
```
✓ User ID, username, email
✓ User type (individual/company)
✓ Profile completion flags
✓ Onboarding progress flags
```

#### 2. User Preferences (~5 KB)
```
✓ Theme (light/dark)
✓ Language
✓ Notification settings
✓ App settings
```

#### 3. Cached API Data (~400-500 KB)
```
✓ User profile (cached 1 hour) - ~5 KB
✓ Dashboard summary (cached 15 min) - ~10 KB
✓ Recent quotes (last 20, cached 10 min) - ~50 KB
✓ Recent trips (last 20, cached 5 min) - ~50 KB
✓ Master/lookup data (cached 24 hours) - ~100 KB
```

#### 4. Temporary Data (~50 KB)
```
✓ Draft forms (until submitted)
✓ Offline action queue (until processed)
✓ Upload progress
```

---

## ❌ Don't Store Locally

```
✗ Full bank account numbers
✗ Credit card details
✗ Complete financial history
✗ Large file contents (PDFs, images)
✗ Complete trip/quote history (store recent only)
✗ Real-time data (fetch fresh)
✗ Other users' data
✗ Passwords
```

---

## 📊 Storage Breakdown

| Category | Size | Location | TTL |
|----------|------|----------|-----|
| Tokens | 5 KB | SecureStore | Until expiry |
| Session | 10 KB | AsyncStorage | Until logout |
| Preferences | 5 KB | AsyncStorage | Permanent |
| User Profile Cache | 5 KB | AsyncStorage | 1 hour |
| Dashboard Cache | 10 KB | AsyncStorage | 15 min |
| Recent Quotes | 50 KB | AsyncStorage | 10 min |
| Recent Trips | 50 KB | AsyncStorage | 5 min |
| Master Data | 100 KB | AsyncStorage | 24 hours |
| Draft Forms | 30 KB | AsyncStorage | Until submitted |
| Offline Queue | 50 KB | AsyncStorage | Until processed |
| **Total** | **~315 KB** | | |

---

## 🔄 Current vs Recommended

### Current Implementation
- ✅ Stores onboarding form data (good for drafts)
- ✅ Stores tokens securely (good)
- ⚠️ Stores full form data after submission (should remove)
- ⚠️ No caching strategy (should add)
- ⚠️ No offline queue (should add)

### Recommended Changes
1. **After onboarding submission:** Remove full form data, keep only flags
2. **Add caching:** Cache API responses with TTL
3. **Add offline queue:** Queue failed actions for retry
4. **Add cleanup:** Remove expired cache automatically

---

## 🎯 Key Principles

1. **Minimal Session Data:** Store only what's needed for app functionality
2. **Cache with TTL:** Cache API responses but expire them appropriately
3. **Secure Sensitive Data:** Use SecureStore for tokens only
4. **Limit Storage:** Keep total under 1 MB
5. **Clean Up:** Remove expired/unused data regularly
6. **Don't Store:** Sensitive financial data, large files, real-time data

---

## 💡 Implementation Priority

### High Priority
1. ✅ Tokens in SecureStore (already done)
2. ⏳ Minimal session data (update sessionService)
3. ⏳ Cache service (create new)

### Medium Priority
4. ⏳ Offline queue (create new)
5. ⏳ Storage cleanup (create new)

### Low Priority
6. ⏳ Advanced caching strategies
7. ⏳ Storage monitoring/analytics

---

## 📝 Quick Checklist

- [ ] Tokens stored in SecureStore ✓
- [ ] Session data minimal (only flags, not full forms)
- [ ] Cache API responses with TTL
- [ ] Remove form data after submission
- [ ] Implement offline queue
- [ ] Add storage cleanup
- [ ] Monitor storage usage
- [ ] Set storage limits

---

**Bottom Line:** Store ~1 MB total - mostly cached API data with short TTL, minimal session data, and secure tokens. Don't store sensitive financial data or large files.

