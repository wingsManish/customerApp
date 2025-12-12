# Customer App – build & run guide

## Requirements
- Node 18 or 20 and npm (project uses npm lockfile).
- Java 17, Android Studio + Android SDK 34+, and a device/emulator.
- macOS with Xcode 15+ for iOS work; CocoaPods (`sudo gem install cocoapods`).
- Expo CLI is invoked via `npx` (no global install required).

## Install & local development
- Install deps: `npm install`
- Start Metro only: `npm run start`
- Run on Android (prebuilds native code if needed): `npm run android`
- Run on iOS simulator (creates `ios/` on first run): `npm run ios`
- Web preview: `npm run web`

## Android builds
- Clean caches: `npm run android:clean`
- Release APK (universal): `npm run android:release`  
  Output: `android/app/build/outputs/apk/release/app-release.apk`  
  Alternative with size/status echo: `./scripts/build-android-release.sh`
- Android App Bundle (AAB):  
  `cd android && ./gradlew bundleRelease --no-daemon`  
  Output: `android/app/build/outputs/bundle/release/app-release.aab`
- Generate smaller, ABI-targeted APKs for side-loading (requires your signing keystore):  
  1) Build the AAB as above.  
  2) Use bundletool:  
     `bundletool build-apks --bundle app/build/outputs/bundle/release/app-release.aab --output app-release.apks --ks <keystore> --ks-pass pass:<pass> --ks-key-alias <alias>`  
  3) Install splits on device: `bundletool install-apks --apks app-release.apks`
- Reduce universal APK size (optional, limits device support):  
  `cd android && ./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a,armeabi-v7a`
- Note on OBB: the project relies on app bundles / Play Asset Delivery; no `.obb` expansion files are produced by default. Add asset packs if you specifically need OBB-style delivery.

## iOS running & builds
- Simulator/dev run: `npm run ios` (requires Xcode and a simulator).
- After the first iOS prebuild, run `npx pod-install ios` if Xcode reports missing pods.
- Production build via EAS (cloud):  
  - Install CLI: `npm install -g eas-cli`  
  - Login: `eas login`  
  - Build: `eas build -p ios --profile production`

## EAS Android builds
- Current `eas.json` production profile outputs an APK:  
  `eas build -p android --profile production`
- To generate an AAB with EAS, change `build.production.android.buildType` to `"app-bundle"` in `eas.json`, then rerun the command above.

## Helpful scripts
- Reset project cache/assets: `npm run reset-project`
- Lint: `npm run lint`
