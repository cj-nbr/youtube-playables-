# Playables Android App - Architecture Documentation

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│          Android App Shell            │
│ ┌─────────────┐ ┌──────────────┐ ┌───────────────────┐ │
│ │ Splash   │ │ Bottom   │ │ Native UI    │ │
│ │ Screen   │ │ Navigation │ │ Overlays     │ │
│ └──────┬──────┘ └──────┬───────┘ └───────────────────┘ │
│     │        │                  │
│ ┌──────▼────────────────▼───────────────────────────────┐ │
│ │       Main Activity (WebView + Native)     │ │
│ │ ┌─────────────────────────────────────────────────┐ │ │
│ │ │       WebView Container         │ │ │
│ │ │ Loads: https://playables.calorie...  │ │ │
│ │ │ with: isApp=true&platform=android       │ │ │
│ │ └─────────────────────────────────────────────────┘ │ │
│ │ ┌─────────────────────────────────────────────────┐ │ │
│ │ │       Native Overlay           │ │ │
│ │ │ (Game grid, search, categories when needed)  │ │ │
│ │ └─────────────────────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────────────┘ │
│                               │
│ ┌─────────────┐ ┌──────────────┐ ┌───────────────────┐ │
│ │ AdManager │ │ Bridge   │ │ Notification   │ │
│ │ (AdMob)  │ │ Service   │ │ Helper      │ │
│ └─────────────┘ └──────────────┘ └───────────────────┘ │
│                               │
│ ┌─────────────┐ ┌──────────────┐ ┌───────────────────┐ │
│ │ Deep Link │ │ Network   │ │ Preference    │ │
│ │ Handler  │ │ Monitor   │ │ Manager     │ │
│ └─────────────┘ └──────────────┘ └───────────────────┘ │
└─────────────────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│       Live Website Backend              │
│ (https://playables.caloriecalculatorfree.com)   │
│ - Game data (dynamic, always latest)           │
│ - Authentication (shared)                 │
│ - User progress (shared)                 │
│ - Ad serving (app vs web detection)            │
│ - API endpoints for app bridge              │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **App Launch** → SplashActivity → MainActivity
2. **MainActivity** loads website URL with `isApp=true&platform=android` params
3. **WebView** renders the website content
4. **Bridge** injects JavaScript into the WebView to enable native features
5. **User interactions** flow through the BridgeService to native features
6. **Game data** is always fetched live from the website
7. **Ad events** are routed through AdManager to AdMob SDK
8. **Push notifications** are handled by NotificationHelper via FCM

### Bridge Communication Protocol

```
Website → App:
 URL params: isApp=true, platform=android, source=app
 JavaScript: window.__ytpApp API
 Custom scheme: ytplayables://game/{id}

App → Website:
 JavaScript injection: window.AndroidBridge.onEvent()
 URL parameter injection
 Shared preferences sync
```

### Key Design Decisions

1. **WebView for Games**: Games are HTML5/JavaScript applications that run best in a WebView. This ensures all games work without modification.

2. **Native UI Shell**: The app provides a native Android experience (navigation, ads, notifications) while delegating game rendering to the WebView.

3. **Live Backend**: All game content is loaded from the production website, ensuring instant updates without app store releases.

4. **Capacitor Bridge**: Capacitor provides the bridge between web and native, handling plugin integration, WebView management, and native API access.

5. **Parameter-Based Detection**: The `isApp=true` URL parameter is the primary mechanism for the website to detect app context and serve appropriate content.

### Offline Strategy

- Game assets are cached by the WebView automatically
- The app detects connectivity changes via NetworkMonitor
- When offline, an offline fallback screen is shown
- Background refresh via WorkManager keeps the cache warm

### Security Considerations

- HTTPS is enforced for all network requests
- Network security config restricts cleartext traffic
- User tokens are stored in encrypted SharedPreferences
- Deep links are validated before navigation
- WebView JavaScript interface is properly sandboxed
