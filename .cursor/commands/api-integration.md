# api-integration
Always follow these API integration rules in React Native development:

1. Secure tokens (JWT/OAuth) stored safely, refresh handled.
2. Centralized API service with axios/fetch + interceptors.
3. Validate inputs, handle errors gracefully, log safely.
4. Use mock data aligned with real API contracts until backend ready.
5. Enforce HTTPS, never expose keys, sanitize inputs.
6. Write unit/integration tests, monitor with Sentry/Crashlytics.
7. Document fallback strategies (offline mode, cached data).