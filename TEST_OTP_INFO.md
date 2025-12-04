# Test OTP Code

## Default Test OTP

**When API is disabled, use this OTP to proceed:**

```
123456
```

## How to Use

1. Enter your phone number on the login screen
2. Click "Continue" to send OTP
3. On the OTP verification screen, enter: **`123456`**
4. Click "Continue" to proceed

## Notes

- This OTP only works when `apiEnabled: false` in `app.json`
- When API is enabled, you'll need to use the actual OTP sent by the backend
- The test OTP is logged in the console when API is disabled
- You'll see a message: `Use 123456 for testing (API disabled)` if you enter wrong OTP

## Location

The test OTP is defined in `services/authService.ts`:

```typescript
const DEFAULT_TEST_OTP = '123456';
```

## Changing the Test OTP

If you want to change the test OTP, update it in `services/authService.ts`:

```typescript
const DEFAULT_TEST_OTP = 'YOUR_CODE_HERE';
```

