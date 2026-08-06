package com.ytplayables.app

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.widget.ProgressBar
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var bottomNav: BottomNavigationView
    private lateinit var splashContainer: FrameLayout
    private lateinit var nativeOverlay: FrameLayout
    private lateinit var navHost: FrameLayout
    private lateinit var progressBar: ProgressBar
    private var currentTab = R.id.nav_home

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webview)
        splashContainer = findViewById(R.id.splash_container)
        nativeOverlay = findViewById(R.id.native_overlay)
        navHost = findViewById(R.id.nav_host)
        progressBar = findViewById(R.id.progress_bar)

        setupWebView()
        setupSplash()
        handleDeepLink(intent)
    }

    private fun setupWebView() {
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.allowFileAccess = true
        webView.settings.allowContentAccess = true
        webView.settings.setSupportZoom(false)
        webView.settings.builtInZoomControls = false
        webView.settings.displayZoomControls = false
        webView.settings.loadWithOverviewMode = true
        webView.settings.useWideViewPort = true
        webView.settings.mixedContentMode = 0
        webView.settings.userAgentString = buildUserAgent()

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false
                if (url.startsWith("ytplayables://")) {
                    handleDeepLinkUrl(url)
                    return true
                }
                if (url.startsWith("market://") || url.startsWith("https://play.google.com")) {
                    return false
                }
                return false
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                hideSplash()
                injectBridge()
                hideWebsiteChrome()
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: android.webkit.WebResourceError?
            ) {
                super.onReceivedError(view, request, error)
                if (request?.isForMainFrame == true) {
                    showOfflineScreen()
                }
            }
        }

        webView.webChromeClient = object : android.webkit.WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                super.onProgressChanged(view, newProgress)
                progressBar.visibility = if (newProgress < 100) View.VISIBLE else View.GONE
            }
        }

        loadUrlWithAppParam()
    }

    private fun buildUserAgent(): String {
        val defaultUA = webView.settings.userAgentString
        return "$defaultUA YTPlayablesApp/1.0 (isApp=true; platform=android)"
    }

    private fun loadUrlWithAppParam() {
        val baseUrl = YTPlayablesApplication.BASE_URL
        val url = "$baseUrl/playables?isApp=true&platform=android&source=app"
        webView.loadUrl(url)
    }

    private fun injectBridge() {
        val bridgeJs = """
            window.__ytpApp = {
                isApp: true,
                platform: 'android',
                version: '1.0.0',
                baseUrl: '${YTPlayablesApplication.BASE_URL}',
                sendEvent: function(event, data) {
                    window.AndroidBridge.onEvent(event, JSON.stringify(data || {}));
                },
                getAppParam: function() {
                    return 'isApp=true&platform=android&source=app';
                }
            };
        """.trimIndent()

        webView.evaluateJavascript(bridgeJs, null)
    }

    private fun hideWebsiteChrome() {
        val js = """
            (function() {
              var style = document.createElement('style');
              style.id = 'ytp-app-chrome';
              style.innerHTML = '.ytp-app .site-header, .ytp-app .main-header, .ytp-app header, .ytp-app .site-footer, .ytp-app .main-footer, .ytp-app footer, .ytp-app .profile-menu, .ytp-app .profile-dropdown, .ytp-app .user-menu, .ytp-app .account-menu, .ytp-app [data-testid="profile"], .ytp-app [data-testid="account"] { display: none !important; height: 0 !important; margin: 0 !important; padding: 0 !important; visibility: hidden !important; overflow: hidden !important; } .ytp-app body { padding-bottom: 64px !important; } .ytp-app-bottom-nav { display: flex !important; }';
              var existing = document.getElementById('ytp-app-chrome');
              if (existing) existing.remove();
              document.head.appendChild(style);
            })();
        """.trimIndent()
        webView.evaluateJavascript("javascript:($js);", null)
    }

    private fun setupBottomNavigation() {
        bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_home -> {
                    loadUrlWithAppParam()
                    currentTab = R.id.nav_home
                    true
                }
                R.id.nav_games -> {
                    val url = "${YTPlayablesApplication.BASE_URL}/playables?isApp=true&platform=android&source=app"
                    webView.loadUrl(url)
                    currentTab = R.id.nav_games
                    true
                }
                R.id.nav_profile -> {
                    loadUrlWithAppParam()
                    currentTab = R.id.nav_profile
                    true
                }
                else -> false
            }
        }
    }

    private fun setupSplash() {
        splashContainer.postDelayed({
            hideSplash()
        }, 2000)
    }

    private fun hideSplash() {
        if (splashContainer.visibility == View.VISIBLE) {
            splashContainer.visibility = View.GONE
        }
    }

    private fun showOfflineScreen() {
        val intent = Intent(this, OfflineActivity::class.java)
        startActivity(intent)
    }

    private fun handleDeepLink(intent: Intent?) {
        intent?.data?.let { uri ->
            handleDeepLinkUrl(uri.toString())
        }
    }

    private fun handleDeepLinkUrl(url: String) {
        when {
            url.contains("ytplayables://game/") -> {
                val gameId = url.substringAfter("ytplayables://game/")
                loadGame(gameId)
            }
            url.contains("ytplayables://category/") -> {
                val category = url.substringAfter("ytplayables://category/")
                loadCategory(category)
            }
            url.contains("ytplayables://settings") -> {
                currentTab = R.id.nav_profile
                bottomNav.selectedItemId = R.id.nav_profile
            }
        }
    }

    private fun loadGame(gameId: String) {
        val url = "${YTPlayablesApplication.BASE_URL}/$gameId?isApp=true&platform=android&source=app"
        val intent = Intent(this, GameActivity::class.java)
        intent.putExtra("url", url)
        intent.putExtra("game_id", gameId)
        startActivity(intent)
    }

    private fun loadCategory(category: String) {
        val url = "${YTPlayablesApplication.BASE_URL}/playables?category=$category&isApp=true&platform=android&source=app"
        webView.loadUrl(url)
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        handleDeepLink(intent)
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
        injectBridge()
    }

    override fun onPause() {
        webView.onPause()
        super.onPause()
    }

    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }
}