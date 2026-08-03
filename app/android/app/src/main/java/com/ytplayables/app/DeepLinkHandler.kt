package com.ytplayables.app

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.util.Log
import androidx.navigation.NavController

class DeepLinkHandler {

    companion object {
        private const val TAG = "DeepLinkHandler"
        const val SCHEME = "ytplayables"
        const val HOST_GAME = "game"
        const val HOST_CATEGORY = "category"
        const val HOST_FAVORITES = "favorites"
        const val HOST_SETTINGS = "settings"

        fun handleUri(context: Context, uri: Uri): Boolean {
            return try {
                when (uri.host) {
                    HOST_GAME -> {
                        val gameId = uri.pathSegments.firstOrNull()
                        if (gameId != null) {
                            val intent = Intent(context, GameActivity::class.java)
                            intent.putExtra("game_id", gameId)
                            intent.putExtra("url", "${YTPlayablesApplication.BASE_URL}/$gameId?isApp=true&platform=android&source=app")
                            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                            context.startActivity(intent)
                            true
                        } else {
                            false
                        }
                    }
                    HOST_CATEGORY -> {
                        val category = uri.pathSegments.firstOrNull()
                        if (category != null) {
                            val intent = Intent(context, MainActivity::class.java)
                            intent.putExtra("category", category)
                            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                            context.startActivity(intent)
                            true
                        } else {
                            false
                        }
                    }
                    HOST_FAVORITES -> {
                        val intent = Intent(context, MainActivity::class.java)
                        intent.putExtra("tab", "favorites")
                        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                        context.startActivity(intent)
                        true
                    }
                    HOST_SETTINGS -> {
                        val intent = Intent(context, MainActivity::class.java)
                        intent.putExtra("tab", "settings")
                        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                        context.startActivity(intent)
                        true
                    }
                    else -> false
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error handling deep link: ${e.message}")
                false
            }
        }

        fun getWebUrl(gameId: String): String {
            return "${YTPlayablesApplication.BASE_URL}/$gameId?isApp=true&platform=android&source=app"
        }

        fun getCategoryUrl(category: String): String {
            return "${YTPlayablesApplication.BASE_URL}/playables?category=$category&isApp=true&platform=android&source=app"
        }

        fun getAppDeepLink(gameId: String): String {
            return "$SCHEME://game/$gameId"
        }
    }
}