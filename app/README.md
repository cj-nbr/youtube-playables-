# YouTube Playables Android Application
# ======================================

## Overview

Production-ready Android gaming application for YouTube Playables. This app provides a native Android gaming experience while using the existing website as the live backend for all games.

## Architecture

### Design Pattern
- **Capacitor Bridge**: Uses Capacitor 7.x to bridge the web app and native Android
- **WebView Rendering**: Games are rendered in a WebView using the live website
- **Native Shell**: Native Android UI provides splash screen, navigation, ads, and native features
- **JavaScript Bridge**: Bidirectional communication between native Android and the website

### Key Components

```
app/
├── android/                    # Android Studio project
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/com/ytplayables/app/
│   │   │   │   ├── MainActivity.kt        # Main activity with WebView + native UI
│   │   │   │   ├── GameActivity.kt         # Fullscreen game activity
│   │   │   │   ├── SplashActivity.kt       # Splash screen
│   │   │   │   ├── OfflineActivity.kt      # Offline fallback
│   │   │   │   ├── ErrorActivity.kt        # Error fallback
│   │   │   │   ├── YTPlayablesApplication.kt # Application class
│   │   │   │   ├── BridgeService.kt        # JS-to-native bridge service
│   │   │   │   ├── AdManager.kt            # AdMob integration
│   │   │   │   ├── NotificationHelper.kt   # Push notifications
│   │   │   │   ├── DeepLinkHandler.kt      # Deep link handling
│   │   │   │   ├── NetworkMonitor.kt       # Connectivity monitoring
│   │   │   │   ├── BootReceiver.kt         # Boot completion receiver
│   │   │   │   ├── PreferenceManager.kt    # Shared preferences manager
│   │   │   │   └── GameGridAdapter.kt      # Native game grid adapter
│   │   │   ├── res/
│   │   │   │   ├── layout/                 # XML layouts
│   │   │   │   ├── drawable/               # Vector drawables
│   │   │   │   ├── values/                 # Strings, colors, themes
│   │   │   │   ├── menu/                   # Bottom navigation menu
│   │   │   │   ├── anim/                   # Animation resources
│   │   │   │   ├── color/                  # Color state lists
│   │   │   │   └── xml/                    # XML configs (network, backup)
│   │   │   └── AndroidManifest.xml
│   │   ├── build.gradle
│   │   └── proguard-rules.pro
│   ├── build.gradle
│   ├── settings.gradle
│   └── gradle.properties
├── capacitor/
│   └── capacitor.config.ts               # Capacitor configuration
├── assets/                               # App icons, splash screens
├── config/
│   ├── signing.gradle                    # Signing configuration
│   └── keystore.jks                      # Release keystore (not committed)
├── scripts/
│   ├── build-apk.sh                      # Build release APK
│   ├── build-aab.sh                      # Build release AAB
│   ├── build-debug.sh                    # Build debug APK
│   ├── build-all.sh                      # Build all variants
│   ├── deploy.sh                         # Deploy to Play Store
│   └── generate-keystore.sh              # Generate signing keys
├── native/
│   └── bridge.js                         # JavaScript bridge code
├── package.json
├── capacitor.config.ts
├── README.md
├── ARCHITECTURE.md                       # Detailed architecture documentation
├── DEPLOYMENT.md                         # Deployment guide
└── FOLDER_STRUCTURE.md                   # Folder documentation
```

## Live Update System

The app always loads games from the production website. When games are updated on the website:
1. Users automatically see the latest content
2. No Play Store update is required
3. New games appear immediately
4. Updated levels and bug fixes are live instantly

This is achieved by:
- Loading the website URL in a WebView with `isApp=true` parameter
- The website detects the app context and serves app-optimized content
- All game data is fetched live from the website's backend

## Bridge System

The app injects `isApp=true` and `platform=android` parameters into all requests. The website can detect these parameters to:
- Show rewarded ads (app-only)
- Hide website ads
- Enable native sharing
- Show app-only buttons
- Unlock native functionality

## Native Features

- **Splash Screen**: Native Android splash screen with app branding
- **Bottom Navigation**: Home, Games, Categories, Favorites, Profile
- **Google AdMob**: Rewarded, Interstitial, Banner, and App Open ads
- **Push Notifications**: Firebase Cloud Messaging integration
- **Deep Linking**: Custom URL scheme (`ytplayables://`) for game/category deep links
- **Internet Detection**: Automatic offline detection with fallback screen
- **Pull to Refresh**: Swipe-to-refresh for game lists
- **File Downloads**: Support for downloading game assets
- **Back Button Handling**: Proper Android back button behavior
- **Screen Orientation**: Landscape support for games
- **Loading Indicators**: Native progress indicators
- **Error Screens**: Graceful error handling with retry
- **Offline Screen**: Dedicated offline fallback page

## Build System

### Prerequisites
- Android Studio Hedgehog or later
- JDK 17+
- Android SDK 35
- Android NDK (for native libraries)

### Build Commands

```bash
# Build debug APK
npm run build:debug

# Build release APK
npm run build:apk

# Build release AAB
npm run build:aab

# Build all variants
npm run build:all

# Clean build
npm run clean

# Sync Capacitor
npm run capacitor:sync
```

### One-Command Build
```bash
./scripts/build-all.sh
```

## Signing

Release builds require a signing keystore. Generate one with:

```bash
./scripts/generate-keystore.sh
```

Set environment variables for CI/CD:
- `KEYSTORE_FILE` - Path to keystore file
- `KEYSTORE_PASSWORD` - Keystore password
- `KEY_ALIAS` - Key alias
- `KEY_PASSWORD` - Key password

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Authentication

The app reuses the website's existing login system. Users have the same:
- Profile
- Progress
- Saved games
- Coins
- Achievements
- Settings

across the website and app via the shared Supabase backend.

## Future Scalability

The architecture supports:
- Achievements system
- Leaderboards
- Cloud Save
- Coins economy
- Daily Rewards
- Login Streaks
- Multiplayer
- In-App Purchases
- Subscriptions
- Game Pass

## AdMob Integration

The app is ready for AdMob integration. Replace the placeholder AdMob IDs in `AdManager.kt` with your real AdMob unit IDs:
- `ADMOB_APP_ID`
- `BANNER_AD_UNIT`
- `INTERSTITIAL_AD_UNIT`
- `REWARDED_AD_UNIT`
- `APP_OPEN_AD_UNIT`

## Website Detection

When the website detects `isApp=true` in the URL or request, it can:
- Serve app-optimized layouts
- Hide "Download App" banners
- Show "Rate App" prompts
- Enable native sharing buttons
- Show app-only events
- Hide website ads and show rewarded ads instead

## License

Proprietary - All rights reserved.