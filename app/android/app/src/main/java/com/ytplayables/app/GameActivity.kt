package com.ytplayables.app

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.widget.ImageButton
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView

class GameActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var nativeUi: FrameLayout
    private lateinit var refreshLayout: SwipeRefreshLayout
    private lateinit var gamesRecycler: RecyclerView
    private lateinit var loadingProgress: ProgressBar
    private lateinit var offlineText: TextView
    private lateinit var errorText: TextView
    private lateinit var retryButton: View
    private lateinit var toolbarTitle: TextView
    private lateinit var btnBack: ImageButton
    private lateinit var btnSearch: ImageButton
    private lateinit var btnMenu: ImageButton

    private var gameId: String? = null
    private var gameUrl: String? = null
    private var isNativeMode = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_game)

        webView = findViewById(R.id.game_webview)
        nativeUi = findViewById(R.id.game_native_ui)
        refreshLayout = findViewById(R.id.game_refresh)
        gamesRecycler = findViewById(R.id.games_recycler)
        loadingProgress = findViewById(R.id.game_loading)
        offlineText = findViewById(R.id.game_offline)
        errorText = findViewById(R.id.games_error)
        retryButton = findViewById(R.id.games_retry)
        toolbarTitle = findViewById(R.id.toolbar_title)
        btnBack = findViewById(R.id.btn_back)
        btnSearch = findViewById(R.id.btn_search)
        btnMenu = findViewById(R.id.btn_menu)

        gameId = intent.getStringExtra("game_id")
        gameUrl = intent.getStringExtra("url")

        setupViews()
        setupWebView()
        setupRecycler()
        loadContent()
    }

    private fun setupViews() {
        btnBack.setOnClickListener { onBackPressedDispatcher.onBackPressed() }

        btnSearch.setOnClickListener {
            // Open search overlay
            showSearchOverlay()
        }

        btnMenu.setOnClickListener {
            // Open options menu
            showOptionsMenu()
        }

        retryButton.setOnClickListener {
            loadContent()
        }

        refreshLayout.setOnRefreshListener {
            refreshContent()
        }
    }

    private fun setupWebView() {
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.allowFileAccess = true
        webView.settings.mixedContentMode = 0
        webView.settings.userAgentString = buildUserAgent()

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false
                if (url.startsWith("ytplayables://")) {
                    handleDeepLinkUrl(url)
                    return true
                }
                return false
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                loadingProgress.visibility = View.GONE
                injectBridge()
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: android.webkit.WebResourceError?
            ) {
                super.onReceivedError(view, request, error)
                if (request?.isForMainFrame == true) {
                    showError()
                }
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                super.onProgressChanged(view, newProgress)
                if (newProgress == 100) {
                    refreshLayout.isRefreshing = false
                }
            }
        }
    }

    private fun setupRecycler() {
        gamesRecycler.layoutManager = GridLayoutManager(this, 2)
        gamesRecycler.adapter = GameGridAdapter(mutableListOf()) { game ->
            openGame(game.id)
        }
    }

    private fun loadContent() {
        if (!YTPlayablesApplication.instance.isOnline()) {
            showOffline()
            return
        }

        loadingProgress.visibility = View.VISIBLE
        offlineText.visibility = View.GONE
        errorText.visibility = View.GONE
        retryButton.visibility = View.GONE

        if (gameUrl != null) {
            webView.loadUrl(gameUrl!!)
        } else if (gameId != null) {
            val url = "${YTPlayablesApplication.BASE_URL}/$gameId?isApp=true&platform=android&source=app"
            webView.loadUrl(url)
        } else {
            val url = "${YTPlayablesApplication.BASE_URL}/playables?isApp=true&platform=android&source=app"
            webView.loadUrl(url)
        }
    }

    private fun refreshContent() {
        webView.reload()
    }

    private fun showNativeGameGrid() {
        isNativeMode = true
        webView.visibility = View.GONE
        nativeUi.visibility = View.VISIBLE
        toolbarTitle.text = "Games"
        refreshLayout.isRefreshing = false

        // Fetch games from the live website
        fetchGamesFromWebsite()
    }

    private fun fetchGamesFromWebsite() {
        // In production, this would fetch from the website's API endpoint
        // For now, we use the website's games data via the bridge
        val url = "${YTPlayablesApplication.BASE_URL}/api/games?isApp=true&platform=android"
        // The actual fetching is done via the bridge JavaScript interface
        // This is a placeholder that shows the native UI
        gamesRecycler.visibility = View.VISIBLE
    }

    private fun showSearchOverlay() {
        // Show search UI overlay
    }

    private fun showOptionsMenu() {
        // Show options menu overlay
    }

    private fun handleDeepLinkUrl(url: String) {
        when {
            url.contains("ytplayables://game/") -> {
                val id = url.substringAfter("ytplayables://game/")
                openGame(id)
            }
            url.contains("ytplayables://category/") -> {
                val cat = url.substringAfter("ytplayables://category/")
                loadCategory(cat)
            }
        }
    }

    private fun openGame(id: String) {
        val url = "${YTPlayablesApplication.BASE_URL}/$id?isApp=true&platform=android&source=app"
        val intent = Intent(this, GameActivity::class.java)
        intent.putExtra("url", url)
        intent.putExtra("game_id", id)
        startActivity(intent)
    }

    private fun loadCategory(category: String) {
        val url = "${YTPlayablesApplication.BASE_URL}/playables?category=$category&isApp=true&platform=android&source=app"
        webView.loadUrl(url)
    }

    private fun showOffline() {
        loadingProgress.visibility = View.GONE
        offlineText.visibility = View.VISIBLE
        retryButton.visibility = View.VISIBLE
    }

    private fun showError() {
        loadingProgress.visibility = View.GONE
        errorText.visibility = View.VISIBLE
        retryButton.visibility = View.VISIBLE
    }

    private fun buildUserAgent(): String {
        val defaultUA = webView.settings.userAgentString
        return "$defaultUA YTPlayablesApp/1.0 (isApp=true; platform=android)"
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
                }
            };
        """.trimIndent()
        webView.evaluateJavascript(bridgeJs, null)
    }

    override fun onBackPressed() {
        if (isNativeMode && nativeUi.visibility == View.VISIBLE) {
            isNativeMode = false
            nativeUi.visibility = View.GONE
            webView.visibility = View.VISIBLE
            return
        }
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
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