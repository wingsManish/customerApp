#!/bin/bash

# Build optimized Android APK locally
# This script builds a release APK with optimizations enabled

set -e

echo "🚀 Building optimized Android APK..."

# Navigate to android directory
cd android

# Build release APK with optimizations
# Note: We skip clean to avoid CMake codegen issues
# The build system will handle incremental builds
echo "📦 Building release APK..."
./gradlew assembleRelease --no-daemon

# The APK will be located at:
# android/app/build/outputs/apk/release/app-release.apk

APK_PATH="app/build/outputs/apk/release/app-release.apk"

if [ -f "$APK_PATH" ]; then
    APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo ""
    echo "✅ Build successful!"
    echo "📱 APK location: $(pwd)/$APK_PATH"
    echo "📊 APK size: $APK_SIZE"
    echo ""
    echo "To install on a connected device, run:"
    echo "  adb install $APK_PATH"
else
    echo "❌ Build failed - APK not found"
    exit 1
fi

