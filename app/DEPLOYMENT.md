# YouTube Playables Android App - Deployment Guide

## Prerequisites

### Development Environment
1. **Android Studio** Hedgehog (2023.1.1) or later
2. **JDK 17** or later
3. **Android SDK** API level 35 (Android 15)
4. **Android NDK** (for native libraries)
5. **Node.js** 22+ (for build scripts)

### Google Play Console Setup
1. Create a Google Play Developer account ($25 one-time fee)
2. Create a new app in the Play Console
3. Set up app signing (Play App Signing is recommended)
4. Create AdMob app and ad units (if using ads)
5. Set up Firebase project for push notifications (optional)

## Build Process

### 1. Generate Signing Keystore

```bash
cd app
./scripts/generate-keystore.sh
```

Save the keystore file securely. You'll need it for all release builds.

### 2. Configure Signing (CI/CD)

Set these environment variables in your CI/CD pipeline:

```bash
export KEYSTORE_FILE="/path/to/keystore.jks"
export KEYSTORE_PASSWORD="your-keystore-password"
export KEY_ALIAS="ytplayables"
export KEY_PASSWORD="your-key-password"
```

### 3. Build the App

```bash
# Build all variants (debug + release APK + release AAB)
cd app
./scripts/build-all.sh

# Or build individually
./scripts/build-debug.sh    # Debug APK for testing
./scripts/build-apk.sh      # Release APK for internal testing
./scripts/build-aab.sh      # Release AAB for Play Store
```

### 4. Test the App

```bash
# Install debug APK on connected device
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Run on emulator
adb -e install android/app/build/outputs/apk/debug/app-debug.apk

# Run on physical device
adb -d install android/app/build/outputs/apk/debug/app-debug.apk
```

## Google Play Store Submission

### Step 1: Prepare the Release

1. Build the release AAB:
   ```bash
   ./scripts/build-aab.sh
   ```

2. Verify the AAB:
   - File size should be reasonable (< 150MB for most apps)
   - Check for any warnings in the build output

### Step 2: Upload to Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app (or create a new one)
3. Navigate to **Production** > **Create new release**
4. Upload the AAB file from `android/app/build/outputs/bundle/release/app-release.aab`
5. Fill in release notes
6. Review the release declaration
7. Start rollout (canary, staged, or full)

### Step 3: Configure Store Listing

1. **Store Listing** tab:
   - App title: "YouTube Playables"
   - Short description: "Free browser-native HTML5 games"
   - Full description: Describe the app and its features
   - Icons (512x512 PNG)
   - Feature graphic (1024x500 PNG)
   - Screenshots (at least 2, recommended 8)
   - Category: Games
   - Tags: puzzle, arcade, strategy, casual

2. **Content rating** tab:
   - Complete the content rating questionnaire
   - Set appropriate age rating

3. **Pricing** tab:
   - Set price (free or paid)
   - Configure pricing for different countries

### Step 4: Compliance

1. **Privacy Policy**: Ensure the website's privacy policy is accessible in the app
2. **Terms of Service**: Link to the website's terms of service
3. **AdMob Policy**: If using ads, ensure compliance with AdMob policies
4. **Google Play Policies**: Review and comply with all Google Play developer policies

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Build Android App

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Setup Android SDK
        uses: android-actions/setup-android@v2

      - name: Generate keystore
        run: |
          cd app
          ./scripts/generate-keystore.sh
        env:
          KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
          KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}

      - name: Build AAB
        run: |
          cd app
          ./scripts/build-aab.sh
        env:
          KEYSTORE_FILE: ${{ secrets.KEYSTORE_FILE }}
          KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
          KEY_ALIAS: ${{ secrets.KEY_ALIAS }}
          KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}

      - name: Upload AAB
        uses: actions/upload-artifact@v4
        with:
          name: app-release.aab
          path: app/android/app/build/outputs/bundle/release/app-release.aab
```

## Post-Deployment

### Monitoring
1. Monitor crash reports in Firebase Crashlytics
2. Track ad performance in AdMob dashboard
3. Monitor app reviews in Play Console
4. Watch for ANR (Application Not Responding) reports

### Updates
1. When the website is updated with new games, no app update is needed
2. For native feature changes, build a new release
3. Follow the same build and submission process

### Rollback
1. In Play Console, go to Production > Manage
2. Select the previous release
3. Click "Rollout" to revert to the previous version

## Troubleshooting

### Build Failures
- Ensure Android SDK 35 is installed
- Check that all environment variables are set correctly
- Verify the keystore file exists and passwords are correct

### App Crashes
- Check Logcat for error messages
- Review Firebase Crashlytics for crash reports
- Test on multiple Android versions and devices

### AdMob Issues
- Ensure AdMob app ID is correctly configured
- Check AdMob dashboard for policy violations
- Use test ad unit IDs during development

### Deep Links Not Working
- Verify the intent filters in AndroidManifest.xml
- Test with `adb shell am start -W -a android.intent.action.VIEW -d "ytplayables://game/chess" com.ytplayables.app`