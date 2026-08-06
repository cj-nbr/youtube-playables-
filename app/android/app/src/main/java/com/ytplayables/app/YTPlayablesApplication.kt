package com.ytplayables.app

import android.app.Application
import android.content.Context
import android.content.SharedPreferences
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Build
import android.util.Log
import androidx.work.Configuration
import androidx.work.WorkManager
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.initialization.InitializationStatus
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener

class YTPlayablesApplication : Application(), Configuration.Provider {

    companion object {
        const val TAG = "YTPlayablesApp"
        const val PREFS_NAME = "ytplayables_prefs"
        const val KEY_IS_APP = "is_app"
        const val KEY_PLATFORM = "platform"
        const val KEY_BASE_URL = "base_url"
        const val KEY_FAVORITES = "favorites"
        const val KEY_RECENT = "recent_games"
        const val KEY_USER_TOKEN = "user_token"
        const val KEY_USER_ID = "user_id"
        const val KEY_USERNAME = "username"
        const val KEY_COINS = "coins"
        const val KEY_SETTINGS = "app_settings"
        const val BASE_URL = "https://playables.caloriecalculatorfree.com"

        @Volatile
        lateinit var instance: YTPlayablesApplication
            private set
    }

    private lateinit var workManager: WorkManager
    private lateinit var prefs: SharedPreferences

    override fun onCreate() {
        super.onCreate()
        instance = this

        prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

        try {
            MobileAds.initialize(this, OnInitializationCompleteListener { _: InitializationStatus -> })
        } catch (e: Exception) {
            Log.w(TAG, "MobileAds initialization failed: ${e.message}")
        }

        workManager = WorkManager.getInstance(this)

        markAsApp()
        scheduleBackgroundRefresh()
    }

    fun markAsApp() {
        prefs.edit()
            .putBoolean(KEY_IS_APP, true)
            .putString(KEY_PLATFORM, "android")
            .putString(KEY_BASE_URL, BASE_URL)
            .apply()
    }

    fun isApp(): Boolean = prefs.getBoolean(KEY_IS_APP, false)

    fun getBaseUrl(): String = prefs.getString(KEY_BASE_URL, BASE_URL) ?: BASE_URL

    fun getFavorites(): Set<String> = prefs.getStringSet(KEY_FAVORITES, emptySet()) ?: emptySet()

    fun addFavorite(gameId: String) {
        val current = getFavorites().toMutableSet()
        current.add(gameId)
        prefs.edit().putStringSet(KEY_FAVORITES, current).apply()
    }

    fun removeFavorite(gameId: String) {
        val current = getFavorites().toMutableSet()
        current.remove(gameId)
        prefs.edit().putStringSet(KEY_FAVORITES, current).apply()
    }

    fun isFavorite(gameId: String): Boolean = getFavorites().contains(gameId)

    fun getRecentGames(): List<String> {
        val json = prefs.getString(KEY_RECENT, "[]") ?: "[]"
        return try {
            com.google.gson.Gson().fromJson(json, Array<String>::class.java).toList()
        } catch (_: Exception) {
            emptyList()
        }
    }

    fun addRecentGame(gameId: String) {
        var current = getRecentGames().toMutableList()
        current.remove(gameId)
        current.add(0, gameId)
        if (current.size > 20) current = current.take(20).toMutableList()
        prefs.edit()
            .putString(KEY_RECENT, com.google.gson.Gson().toJson(current))
            .apply()
    }

    fun getCoins(): Int = prefs.getInt(KEY_COINS, 0)

    fun addCoins(amount: Int) {
        prefs.edit().putInt(KEY_COINS, getCoins() + amount).apply()
    }

    fun getSettings(): Map<String, Any> {
        val json = prefs.getString(KEY_SETTINGS, "{}") ?: "{}"
        return try {
            com.google.gson.Gson().fromJson(json, Map::class.java) as Map<String, Any>
        } catch (_: Exception) {
            emptyMap()
        }
    }

    fun saveSetting(key: String, value: Any) {
        val settings = getSettings().toMutableMap()
        settings[key] = value
        prefs.edit()
            .putString(KEY_SETTINGS, com.google.gson.Gson().toJson(settings))
            .apply()
    }

    fun isOnline(): Boolean {
        val cm = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val network = cm.activeNetwork ?: return false
        val caps = cm.getNetworkCapabilities(network) ?: return false
        return caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }

    private fun scheduleBackgroundRefresh() {
        // Background work for cache refresh is configured via WorkManager
        // Actual scheduling happens from the activity or repository layer
    }

    override val workManagerConfiguration: Configuration
        get() = Configuration.Builder()
            .setMinimumLoggingLevel(android.util.Log.DEBUG)
            .build()
}