package com.ytplayables.app

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.webkit.JavascriptInterface
import android.webkit.WebView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import okhttp3.Request
import com.google.gson.Gson

class BridgeService : Service() {

    companion object {
        const val ACTION_BRIDGE_EVENT = "com.ytplayables.app.BRIDGE_EVENT"
        const val EXTRA_EVENT = "event"
        const val EXTRA_DATA = "data"
        const val EXTRA_GAME_ID = "game_id"
        const val EXTRA_USER_ID = "user_id"
        const val EXTRA_TOKEN = "token"
    }

    private val httpClient = OkHttpClient()
    private val gson = Gson()

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        intent?.let { processIntent(it) }
        return START_NOT_STICKY
    }

    private fun processIntent(intent: Intent) {
        when (intent.action) {
            ACTION_BRIDGE_EVENT -> {
                val event = intent.getStringExtra(EXTRA_EVENT) ?: return
                val data = intent.getStringExtra(EXTRA_DATA) ?: "{}"
                handleBridgeEvent(event, data)
            }
        }
    }

    private fun handleBridgeEvent(event: String, data: String) {
        CoroutineScope(Dispatchers.IO).launch {
            when (event) {
                "game_started" -> {
                    val gameId = extractGameId(data)
                    YTPlayablesApplication.instance.addRecentGame(gameId ?: return@launch)
                    trackEvent("game_started", data)
                }
                "game_completed" -> {
                    val gameId = extractGameId(data)
                    val score = extractScore(data)
                    trackEvent("game_completed", data)
                    syncProgress(gameId, score)
                }
                "ad_requested" -> {
                    trackEvent("ad_requested", data)
                }
                "ad_completed" -> {
                    val reward = extractReward(data)
                    YTPlayablesApplication.instance.addCoins(reward)
                    trackEvent("ad_completed", data)
                }
                "favorite_toggled" -> {
                    val gameId = extractGameId(data)
                    val isFavorite = extractBoolean(data, "isFavorite")
                    if (gameId != null) {
                        if (isFavorite) YTPlayablesApplication.instance.addFavorite(gameId)
                        else YTPlayablesApplication.instance.removeFavorite(gameId)
                    }
                    trackEvent("favorite_toggled", data)
                }
                "share_clicked" -> {
                    trackEvent("share_clicked", data)
                }
                "rate_clicked" -> {
                    trackEvent("rate_clicked", data)
                }
                "login" -> {
                    val userId = extractString(data, "userId")
                    val token = extractString(data, "token")
                    if (userId != null && token != null) {
                        syncAuth(userId, token)
                    }
                    trackEvent("login", data)
                }
                "logout" -> {
                    trackEvent("logout", data)
                }
                "settings_changed" -> {
                    trackEvent("settings_changed", data)
                }
                "push_token" -> {
                    val token = extractString(data, "token")
                    if (token != null) {
                        syncPushToken(token)
                    }
                }
                else -> {
                    trackEvent(event, data)
                }
            }
        }
    }

    private fun extractGameId(data: String): String? {
        return try {
            val map = gson.fromJson(data, Map::class.java)
            map["gameId"] as? String
        } catch (_: Exception) { null }
    }

    private fun extractScore(data: String): Int {
        return try {
            val map = gson.fromJson(data, Map::class.java)
            (map["score"] as? Double)?.toInt() ?: 0
        } catch (_: Exception) { 0 }
    }

    private fun extractReward(data: String): Int {
        return try {
            val map = gson.fromJson(data, Map::class.java)
            (map["reward"] as? Double)?.toInt() ?: 0
        } catch (_: Exception) { 0 }
    }

    private fun extractBoolean(data: String, key: String): Boolean {
        return try {
            val map = gson.fromJson(data, Map::class.java)
            (map[key] as? Boolean) ?: false
        } catch (_: Exception) { false }
    }

    private fun extractString(data: String, key: String): String? {
        return try {
            val map = gson.fromJson(data, Map::class.java)
            map[key] as? String
        } catch (_: Exception) { null }
    }

    private fun trackEvent(event: String, data: String) {
        // In production, send to analytics backend
        // For now, log locally
        android.util.Log.d("BridgeService", "Event: $event, Data: $data")
    }

    private fun syncProgress(gameId: String?, score: Int) {
        // Sync game progress to backend
        // This would call the website's API to save progress
    }

    private fun syncAuth(userId: String, token: String) {
        val prefs = YTPlayablesApplication.instance.getSharedPreferences(
            YTPlayablesApplication.PREFS_NAME, android.content.Context.MODE_PRIVATE
        )
        prefs.edit()
            .putString(YTPlayablesApplication.KEY_USER_ID, userId)
            .putString(YTPlayablesApplication.KEY_USER_TOKEN, token)
            .apply()
    }

    private fun syncPushToken(token: String) {
        // Sync push notification token with backend
    }

    override fun onDestroy() {
        super.onDestroy()
    }
}