# App Size Optimization Guide

## Current Optimizations Implemented

### 1. **Reusable Components**
- ✅ `FormField` - Single component for all text inputs
- ✅ `OTPInput` - Reusable OTP input component
- ✅ `SelectField` - Reusable dropdown component
- ✅ `CountryCodePicker` - Shared component

### 2. **Image Optimization**
- ✅ Using SVG for logos and icons (smaller file size)
- ✅ Image quality set to 0.8 in ImagePicker (reduces file size)
- ✅ Using `expo-image` for optimized image loading

### 3. **Code Splitting**
- ✅ Screen-based routing with Expo Router (lazy loading)
- ✅ Components loaded only when needed

### 4. **Font Optimization**
- ✅ Using Google Fonts CDN for web (no local font files)
- ✅ Only loading required font weights (Regular, SemiBold)
- ✅ Platform-specific font loading

### 5. **Dependencies Optimization**
- ✅ Removed unused dependencies
- ✅ Using Expo managed workflow (smaller bundle)
- ✅ Tree-shaking enabled

## Additional Optimization Recommendations

### 1. **Image Assets**
```bash
# Optimize images before adding to assets
# Use WebP format for better compression
# Resize images to required dimensions only
```

### 2. **Bundle Analysis**
```bash
# Analyze bundle size
npx expo export --platform android
# Check bundle size in build output
```

### 3. **Code Splitting**
- Use dynamic imports for heavy components
- Lazy load screens that aren't immediately needed
- Split vendor bundles

### 4. **Asset Optimization**
- Compress images: Use tools like `imagemin` or `squoosh`
- Use vector graphics (SVG) instead of raster images where possible
- Remove unused assets

### 5. **Dependencies**
- Regularly audit dependencies: `npm audit`
- Remove unused packages
- Use lighter alternatives when possible

### 6. **Build Configuration**
```json
// app.json - Enable compression
{
  "expo": {
    "android": {
      "enableDangerousExperimentalLeanBuilds": true
    }
  }
}
```

## Size Reduction Checklist

- [ ] Remove unused dependencies
- [ ] Optimize all images (compress, resize)
- [ ] Use SVG instead of PNG/JPG where possible
- [ ] Enable ProGuard/R8 for Android (minification)
- [ ] Enable code splitting
- [ ] Remove console.logs in production
- [ ] Use Hermes engine (already enabled)
- [ ] Enable compression in build config

## Estimated Size Impact

| Optimization | Size Reduction |
|-------------|----------------|
| Image optimization | ~30-50% |
| Code splitting | ~20-30% |
| Dependency cleanup | ~10-15% |
| Font optimization | ~5-10% |
| **Total Potential** | **~50-70%** |

## Monitoring

- Check APK size after each build
- Use `npx react-native-bundle-visualizer` for analysis
- Monitor app size in Play Store Console

