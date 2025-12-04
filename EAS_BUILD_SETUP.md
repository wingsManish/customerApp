# EAS Cloud Build Setup Guide

This guide will help you set up EAS (Expo Application Services) for cloud builds of the Customer App.

## Prerequisites

1. **Expo Account**: You need an Expo account. If you don't have one, create it at [expo.dev](https://expo.dev)

2. **EAS CLI**: Already installed at `/opt/homebrew/bin/eas`

## Setup Steps

### 1. Login to EAS

```bash
cd /Users/apple/Manish/Personal/M1/customer-app
eas login
```

This will prompt you to:
- Enter your Expo username/email
- Enter your password
- Or open a browser to authenticate

### 2. Initialize EAS Project

```bash
eas build:configure
```

This will:
- Create/update `eas.json` (already configured)
- Link your project to EAS
- Generate a project ID in `app.json`

### 3. Build Commands

Once logged in and configured, you can build:

#### Android APK (Preview/Internal Testing)
```bash
# Preview build (for testing)
eas build --platform android --profile preview

# Production build
eas build --platform android --profile production
```

#### iOS Build
```bash
# Preview build (for testing)
eas build --platform ios --profile preview

# Production build (requires Apple Developer account)
eas build --platform ios --profile production
```

#### Build for Both Platforms
```bash
eas build --platform all --profile preview
```

### 4. Build Profiles Explained

- **development**: For development builds with development client
- **preview**: For internal testing (APK/IPA files)
- **production**: For app store releases

### 5. Monitor Builds

```bash
# List all builds
eas build:list

# View build details
eas build:view [BUILD_ID]
```

### 6. Download Builds

After a build completes, you can download it:
- From the EAS dashboard: https://expo.dev/accounts/[your-account]/projects/customer-app/builds
- Or use: `eas build:download [BUILD_ID]`

## Important Notes

1. **First Build**: The first build may take longer (15-30 minutes) as EAS sets up the build environment

2. **iOS Requirements**: For iOS production builds, you'll need:
   - Apple Developer account ($99/year)
   - Configure credentials: `eas credentials`

3. **Android Requirements**: Android builds work immediately, no additional setup needed

4. **Project ID**: After running `eas build:configure`, the `projectId` in `app.json` will be automatically filled

## Troubleshooting

### Check Login Status
```bash
eas whoami
```

### Check Project Info
```bash
eas project:info
```

### View Build Logs
```bash
eas build:view [BUILD_ID] --logs
```

## Next Steps

1. Run `eas login` to authenticate
2. Run `eas build:configure` to initialize the project
3. Run your first build: `eas build --platform android --profile preview`

For more information, visit: https://docs.expo.dev/build/introduction/

