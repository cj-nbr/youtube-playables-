# Playables Android App - Folder Structure Documentation

## Root Directory (`app/`)

| File/Folder | Description |
|---|---|
| `android/` | Android Studio project with all native Android code |
| `capacitor/` | Capacitor configuration and web assets |
| `assets/` | App icons, splash screens, and media assets |
| `native/` | Native bridge code and JavaScript interfaces |
| `config/` | Build configurations, signing configs |
| `scripts/` | Build, deploy, and utility scripts |
| `package.json` | Node.js project configuration and dependencies |
| `capacitor.config.ts` | Capacitor configuration file |
| `README.md` | Main README with overview and quick start |
| `ARCHITECTURE.md` | Detailed architecture documentation |
| `DEPLOYMENT.md` | Deployment and release guide |
| `FOLDER_STRUCTURE.md` | This file |

## `android/` - Android Studio Project

The core Android project containing all native Android code, resources, and build configuration.

### `android/app/` - Application Module

| Subfolder | Description |
|---|---|
| `src/main/java/com/ytplayables/app/` | Kotlin source files |
| `src/main/res/` | Android resources (layouts, drawables, values) |
| `src/main/assets/` | Raw assets bundled with the app |
| `src/main/AndroidManifest.xml` | Android application manifest |
| `build.gradle` | Module-level Gradle build configuration |
| `proguard-rules.pro` | ProGuard rules for code obfuscation |

### Kotlin Source Files

| File | Description |
|---|---|
| `YTPlayablesApplication.kt` | Application class, global state, preferences |
| `MainActivity.kt` | Main activity with WebView and native shell UI |
| `GameActivity.kt` | Fullscreen game activity with native overlays |
| `SplashActivity.kt` | Splash screen activity |
| `OfflineActivity.kt` | Offline fallback screen |
| `ErrorActivity.kt` | Error fallback screen |
| `BridgeService.kt` | JavaScript-to-native bridge service |
| `AdManager.kt` | AdMob ad management (rewarded, interstitial, banner, app open) |
| `NotificationHelper.kt` | Firebase push notification helper |
| `DeepLinkHandler.kt` | Deep link parsing and navigation |
| `NetworkMonitor.kt` | Connectivity change receiver |
| `BootReceiver.kt` | Boot completion receiver |
| `PreferenceManager.kt` | Shared preferences wrapper |
| `GameGridAdapter.kt` | RecyclerView adapter for native game grid |

### Resource Files

| Folder | Description |
|---|---|
| `res/layout/` | XML layout files for activities and items |
| `res/drawable/` | Vector drawables and shape drawables |
| `res/values/` | Strings, colors, themes, styles |
| `res/menu/` | Bottom navigation menu definition |
| `res/anim/` | Animation resources |
| `res/color/` | Color state lists |
| `res/xml/` | XML config files (network security, backup rules) |
| `res/mipmap-*/` | App icon at various densities |

### Build Configuration

| File | Description |
|---|---|
| `build.gradle` | Module-level build config with dependencies |
| `proguard-rules.pro` | Code shrinking and obfuscation rules |
| `AndroidManifest.xml` | App permissions, activities, services, receivers |
| `settings.gradle` | Project settings and plugin management |
| `build.gradle` (root) | Root build config with plugin versions |
| `gradle.properties` | Gradle JVM and Android build properties |

## `capacitor/` - Capacitor Configuration

| File | Description |
|---|---|
| `capacitor.config.ts` | Capacitor app configuration (app ID, name, server URL, plugins) |

## `assets/` - App Assets

| Subfolder | Description |
|---|---|
| `icons/` | App icon variants for different densities |
| `splash/` | Splash screen images and animations |

## `config/` - Build Configuration

| File | Description |
|---|---|
| `signing.gradle` | Signing configuration for release builds |
| `keystore.jks` | Release keystore (not committed to version control) |

## `scripts/` - Build and Deploy Scripts

| Script | Description |
|---|---|
| `build-apk.sh` | Build release APK |
| `build-aab.sh` | Build release AAB for Play Store |
| `build-debug.sh` | Build debug APK for testing |
| `build-all.sh` | Build all variants (debug + release APK + AAB) |
| `deploy.sh` | Deploy to Google Play Store |
| `generate-keystore.sh` | Generate signing keystore |

## `native/` - Native Bridge Code

| File | Description |
|---|---|
| `bridge.js` | JavaScript bridge for native-to-web communication |

## Key Design Principles

1. **Isolation**: The app folder is completely separate from the website. Website files are never modified.
2. **Live Updates**: All game content is loaded from the production website, enabling instant updates.
3. **Native Experience**: The app provides a native Android UI (splash, navigation, ads) while delegating game rendering to WebView.
4. **Bridge Pattern**: The `isApp=true` parameter enables the website to detect app context and serve appropriate content.
5. **Scalability**: The architecture supports future features like achievements, leaderboards, cloud save, and in-app purchases.
