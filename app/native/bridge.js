/**
 * Playables App Bridge
 *
 * This script detects when the website is running inside the Android app
 * and enables app-specific features. Include this script in your website's
 * <head> or before the closing </body> tag.
 *
 * The website can detect the app context by checking:
 * 1. URL parameters: isApp=true, platform=android
 * 2. JavaScript API: window.__ytpApp
 * 3. Custom event: 'ytp:app_ready'
 *
 * Example usage:
 *  if (window.__ytpApp && window.__ytpApp.isApp) {
 *    // Hide "Download App" button
 *    // Show "Rate App" button
 *    // Enable native sharing
 *    // Show rewarded ads
 *  }
 */

(function() {
  'use strict';

  function detectAppContext() {
    var params = new URLSearchParams(window.location.search);
    return {
      isApp: params.get('isApp') === 'true',
      platform: params.get('platform') || 'web',
      source: params.get('source') || 'web',
      baseUrl: params.get('baseUrl') || window.location.origin
    };
  }

  function init() {
    var context = detectAppContext();

    window.__ytpApp = {
      isApp: context.isApp,
      platform: context.platform,
      source: context.source,
      baseUrl: context.baseUrl,
      version: '1.0.0',

      features: {
        rewardedAds: context.isApp,
        nativeShare: context.isApp,
        rateApp: context.isApp,
        nativeNotifications: context.isApp,
        deepLinks: context.isApp,
        appOnlyEvents: context.isApp
      },

      sendEvent: function(event, data) {
        if (window.AndroidBridge && window.AndroidBridge.onEvent) {
          window.AndroidBridge.onEvent(event, JSON.stringify(data || {}));
        }
      },

      showRewardedAd: function(options) {
        if (context.isApp) {
          this.sendEvent('show_rewarded_ad', options || {});
        }
      },

      share: function(data) {
        if (context.isApp) {
          this.sendEvent('share_content', data);
        }
      },

      rateApp: function() {
        if (context.isApp) {
          this.sendEvent('rate_app', {});
        }
      },

      openPlayStore: function() {
        if (context.isApp) {
          this.sendEvent('open_play_store', {});
        }
      },

      downloadFile: function(url, filename) {
        if (context.isApp) {
          this.sendEvent('download_file', { url: url, filename: filename });
        }
      }
    };

    window.dispatchEvent(new CustomEvent('ytp:app_ready', {
      detail: context
    }));

    if (context.isApp) {
      console.log('[YTPlayables Bridge] App detected:', context);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
