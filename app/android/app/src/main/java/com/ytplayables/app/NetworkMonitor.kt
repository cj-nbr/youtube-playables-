package com.ytplayables.app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.util.Log

class NetworkMonitor : BroadcastReceiver() {

    companion object {
        const val TAG = "NetworkMonitor"
        const val ACTION_NETWORK_CHANGE = "com.ytplayables.app.NETWORK_CHANGE"
    }

    override fun onReceive(context: Context, intent: Intent) {
        val isOnline = isNetworkAvailable(context)
        Log.d(TAG, "Network state changed: online=$isOnline")

        if (isOnline) {
            // Trigger background refresh
            val refreshIntent = Intent(context, BridgeService::class.java)
            refreshIntent.action = BridgeService.ACTION_BRIDGE_EVENT
            refreshIntent.putExtra(BridgeService.EXTRA_EVENT, "network_restored")
            context.startService(refreshIntent)
        }
    }

    fun isNetworkAvailable(context: Context): Boolean {
        val cm = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val network = cm.activeNetwork ?: return false
        val caps = cm.getNetworkCapabilities(network) ?: return false
        return caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }
}