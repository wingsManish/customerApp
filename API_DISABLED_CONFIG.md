# API Integration Disabled - Configuration Guide

## Current Status

**API Integration: DISABLED** ✅

The API integration has been temporarily disabled while the backend is being developed. The app will use mock responses instead of making real API calls.

## Configuration

The API can be enabled/disabled via `app.json`:

```json
{
  "expo": {
    "extra": {
      "apiEnabled": false,  // Set to true to enable API
      "apiUrl": "https://api.example.com"
    }
  }
}
```

## How It Works

When `apiEnabled` is set to `false`:

1. **All API calls return mock responses** - No actual network requests are made
2. **Mock responses are logged** - In development mode, you'll see `[API MOCK]` logs
3. **App continues to work** - All screens function normally with mock data
4. **No network errors** - Since no real calls are made, network errors won't occur

## Enabling API Integration

When the backend is ready:

1. **Update `app.json`:**
   ```json
   {
     "expo": {
       "extra": {
         "apiEnabled": true,  // Enable API
         "apiUrl": "https://your-actual-api-url.com"
       }
     }
   }
   ```

2. **Restart the app:**
   ```bash
   npm start
   ```

3. **Test the integration:**
   - All API calls will now go to the real backend
   - Check console logs for API requests
   - Verify responses match expected format

## Mock Response Format

When API is disabled, all requests return:

```typescript
{
  statusCode: 200,
  success: true,
  message: 'Mock response (API disabled)',
  data: null
}
```

## Benefits

- ✅ **No backend dependency** - App works without backend
- ✅ **Faster development** - No network delays
- ✅ **Easy to toggle** - Single config change
- ✅ **No breaking changes** - Same API interface
- ✅ **Development logging** - See when mocks are used

## Files Modified

- `app.json` - Added `apiEnabled` and `apiUrl` config
- `services/apiClient.ts` - Added API disabled check and mock responses

## Testing

When ready to test with real API:

1. Set `apiEnabled: true` in `app.json`
2. Set correct `apiUrl` in `app.json`
3. Restart the app
4. Test authentication flow
5. Test all API endpoints
6. Monitor for errors

## Notes

- Mock responses are intentionally simple (return `null` data)
- Real API integration will return actual data
- All error handling remains in place
- Token management still works (with mock tokens)

