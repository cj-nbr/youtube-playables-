package com.ytplayables.app

import android.content.Context
import android.content.SharedPreferences
import android.util.Log

class PreferenceManager private constructor() {

    companion object {
        private const val TAG = "PreferenceManager"
        private const val PREFS_NAME = "ytplayables_prefs"
        private var instance: PreferenceManager? = null

        fun getInstance(): PreferenceManager {
            return instance ?: synchronized(this) {
                instance ?: PreferenceManager().also { instance = it }
            }
        }

        private val prefs: SharedPreferences
            get() = YTPlayablesApplication.instance.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

        fun getBoolean(key: String, default: Boolean): Boolean = prefs.getBoolean(key, default)

        fun setBoolean(key: String, value: Boolean) {
            prefs.edit().putBoolean(key, value).apply()
        }

        fun getString(key: String, default: String): String = prefs.getString(key, default) ?: default

        fun setString(key: String, value: String) {
            prefs.edit().putString(key, value).apply()
        }

        fun getInt(key: String, default: Int): Int = prefs.getInt(key, default)

        fun setInt(key: String, value: Int) {
            prefs.edit().putInt(key, value).apply()
        }

        fun getLong(key: String, default: Long): Long = prefs.getLong(key, default)

        fun setLong(key: String, value: Long) {
            prefs.edit().putLong(key, value).apply()
        }

        fun getStringSet(key: String, default: Set<String>): Set<String> = prefs.getStringSet(key, default) ?: default

        fun setStringSet(key: String, value: Set<String>) {
            prefs.edit().putStringSet(key, value).apply()
        }

        fun remove(key: String) {
            prefs.edit().remove(key).apply()
        }

        fun clear() {
            prefs.edit().clear().apply()
        }

        fun getAll(): Map<String, *> = prefs.all

        // App-specific helpers
        fun isFirstLaunch(): Boolean = getBoolean("first_launch", true)

        fun setFirstLaunch(launch: Boolean) {
            setBoolean("first_launch", launch)
        }

        fun getAppVersion(): String = getString("app_version", "1.0.0")

        fun setAppVersion(version: String) {
            setString("app_version", version)
        }

        fun getLastSyncTimestamp(): Long = getLong("last_sync", 0)

        fun setLastSyncTimestamp(timestamp: Long) {
            setLong("last_sync", timestamp)
        }

        fun getCacheSize(): Long = getLong("cache_size", 0)

        fun setCacheSize(size: Long) {
            setLong("cache_size", size)
        }

        fun isDarkMode(): Boolean = getBoolean("dark_mode", true)

        fun setDarkMode(enabled: Boolean) {
            setBoolean("dark_mode", enabled)
        }

        fun isNotificationsEnabled(): Boolean = getBoolean("notifications_enabled", true)

        fun setNotificationsEnabled(enabled: Boolean) {
            setBoolean("notifications_enabled", enabled)
        }

        fun isSoundEnabled(): Boolean = getBoolean("sound_enabled", true)

        fun setSoundEnabled(enabled: Boolean) {
            setBoolean("sound_enabled", enabled)
        }

        fun isVibrationEnabled(): Boolean = getBoolean("vibration_enabled", true)

        fun setVibrationEnabled(enabled: Boolean) {
            setBoolean("vibration_enabled", enabled)
        }

        fun isDataSaver(): Boolean = getBoolean("data_saver", false)

        fun setDataSaver(enabled: Boolean) {
            setBoolean("data_saver", enabled)
        }

        fun getLanguage(): String = getString("language", "en")

        fun setLanguage(lang: String) {
            setString("language", lang)
        }
    }
}