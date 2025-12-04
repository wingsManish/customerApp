# Customer App

Cross-platform mobile application for customers to request quotes, manage trips, and track deliveries.

## Tech Stack

- **Framework**: Expo (React Native)
- **Navigation**: Expo Router
- **UI Library**: React Native Paper
- **Language**: TypeScript
- **Font**: Figtree (Regular & SemiBold)

## Project Structure

```
customer-app/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Entry point
│   ├── splash.tsx        # Splash screen
│   └── login.tsx         # Login screen
├── components/            # Reusable UI components
├── constants/            # Theme and configuration
├── services/             # API services
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
└── assets/               # Images, fonts, SVG assets
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Font Files**
   - Download Figtree font from [Google Fonts](https://fonts.google.com/specimen/Figtree)
   - Place `Figtree-Regular.ttf` and `Figtree-SemiBold.ttf` in `assets/fonts/`

3. **Run the App**
   ```bash
   # Start development server
   npm start

   # Run on iOS
   npm run ios

   # Run on Android
   npm run android

   # Run on Web
   npm run web
   ```

## Features

- Phone number-based authentication with OTP
- User registration (Individual/Company)
- Quote request management
- Trip tracking
- Real-time GPS tracking
- Payment integration
- Document upload

## Development

- Uses Expo Router for file-based routing
- React Native Paper for UI components
- TypeScript for type safety
- Session-based authentication (stored in AsyncStorage)

## Notes

- This app requires admin approval for company registrations
- Payment is processed only after delivery completion
- OTP verification is required for delivery confirmation
- Real-time tracking throughout trip lifecycle

