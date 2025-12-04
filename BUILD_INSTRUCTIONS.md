# Building Optimized Android APK Locally

This guide explains how to build an optimized release APK for Android locally.

## Prerequisites

1. **Android SDK** installed and configured
2. **Java Development Kit (JDK)** - Version 17 or higher
3. **Gradle** (usually comes with Android SDK)
4. **Node.js** and npm installed
5. **Expo CLI** installed globally (optional, but recommended)

## Build Steps

### Option 1: Using npm script (Recommended)

```bash
# Clean previous builds
npm run android:clean

# Build optimized release APK
npm run android:release
```

### Option 2: Using the build script

```bash
# Make script executable (if not already)
chmod +x scripts/build-android-release.sh

# Run the build script
./scripts/build-android-release.sh
```

### Option 3: Using Gradle directly

```bash
cd android

# Clean previous builds
./gradlew clean

# Build release APK
./gradlew assembleRelease
```

## Output Location

After a successful build, the optimized APK will be located at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Installing the APK

### On a connected device/emulator:
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Or manually:
1. Transfer the APK file to your Android device
2. Enable "Install from Unknown Sources" in device settings
3. Open the APK file and install

## Optimization Features Enabled

The build includes the following optimizations:

- ✅ **Code Minification** - Reduces code size by removing unused code
- ✅ **Resource Shrinking** - Removes unused resources
- ✅ **PNG Crunching** - Compresses PNG images
- ✅ **Hermes Engine** - Faster JavaScript execution
- ✅ **ProGuard** - Code obfuscation and optimization

## Build Configuration

Optimization settings are configured in:
- `android/gradle.properties` - Global optimization flags
- `android/app/build.gradle` - Build type configurations
- `android/app/proguard-rules.pro` - Code obfuscation rules

## Troubleshooting

### Build fails with "Out of memory" error
Increase Gradle memory in `android/gradle.properties`:
```
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m
```

### APK size is still large
- Check if you're building for all architectures (armeabi-v7a, arm64-v8a, x86, x86_64)
- Consider building separate APKs per architecture
- Review and remove unused dependencies

### ProGuard warnings
If you see ProGuard warnings, add keep rules to `android/app/proguard-rules.pro` for the affected classes.

## Creating a Release Keystore (For Production)

For production releases, you should create a proper release keystore:

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore -alias release-key -keyalg RSA -keysize 2048 -validity 10000
```

Then update `android/app/build.gradle` to use the release keystore instead of debug keystore.

## Notes

- The current build uses the debug keystore for signing (suitable for testing)
- For production, create and use a release keystore
- Keep your release keystore secure and backed up

