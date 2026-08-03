package com.ytplayables.app

import android.content.Context
import android.util.Log
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.initialization.InitializationStatus
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener
import com.google.android.gms.ads.rewarded.RewardedAd
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback
import com.google.android.gms.ads.appopen.AppOpenAd
import com.google.android.gms.ads.LoadAdError

class AdManager private constructor() {

    companion object {
        private const val TAG = "AdManager"
        private var instance: AdManager? = null

        const val ADMOB_APP_ID = "ca-app-pub-3940200000000000~0000000000"
        const val BANNER_AD_UNIT = "ca-app-pub-3940200000000000/6211145144"
        const val INTERSTITIAL_AD_UNIT = "ca-app-pub-3940200000000000/1033173712"
        const val REWARDED_AD_UNIT = "ca-app-pub-3940200000000000/5220797133"
        const val APP_OPEN_AD_UNIT = "ca-app-pub-3940200000000000/9274758374"

        @Volatile
        private var rewardedAd: RewardedAd? = null
        @Volatile
        private var interstitialAd: InterstitialAd? = null
        @Volatile
        private var appOpenAd: AppOpenAd? = null

        fun getInstance(): AdManager {
            return instance ?: synchronized(this) {
                instance ?: AdManager().also { instance = it }
            }
        }

        fun initialize(context: Context) {
            MobileAds.initialize(context, OnInitializationCompleteListener { _: InitializationStatus -> })
            loadRewardedAd(context)
            loadInterstitialAd(context)
            loadAppOpenAd(context)
        }

        fun loadRewardedAd(context: Context) {
            RewardedAd.load(context, REWARDED_AD_UNIT, AdRequest.Builder().build(),
                object : RewardedAdLoadCallback() {
                    override fun onAdFailedToLoad(error: com.google.android.gms.ads.LoadAdError) {
                        Log.w(TAG, "Rewarded ad failed to load: ${error.message}")
                    }

                    override fun onAdLoaded(ad: RewardedAd) {
                        rewardedAd = ad
                        Log.d(TAG, "Rewarded ad loaded")
                    }
                })
        }

        fun loadInterstitialAd(context: Context) {
            InterstitialAd.load(context, INTERSTITIAL_AD_UNIT, AdRequest.Builder().build(),
                object : InterstitialAdLoadCallback() {
                    override fun onAdFailedToLoad(error: com.google.android.gms.ads.LoadAdError) {
                        Log.w(TAG, "Interstitial ad failed to load: ${error.message}")
                    }

                    override fun onAdLoaded(ad: InterstitialAd) {
                        interstitialAd = ad
                        Log.d(TAG, "Interstitial ad loaded")
                    }
                })
        }

        fun loadAppOpenAd(context: Context) {
            AppOpenAd.load(context, APP_OPEN_AD_UNIT, AdRequest.Builder().build(),
                AppOpenAd.APP_OPEN_AD_ORIENTATION_PORTRAIT,
                object : AppOpenAd.AppOpenAdLoadCallback() {
                    override fun onAdFailedToLoad(error: com.google.android.gms.ads.LoadAdError) {
                        Log.w(TAG, "App open ad failed to load: ${error.message}")
                    }

                    override fun onAdLoaded(ad: AppOpenAd) {
                        appOpenAd = ad
                        Log.d(TAG, "App open ad loaded")
                    }
                })
        }

        fun showRewardedAd(activity: android.app.Activity, callback: (Boolean, Int) -> Unit) {
            val ad = rewardedAd
            if (ad == null) {
                loadRewardedAd(activity.applicationContext)
                callback(false, 0)
                return
            }
            ad.fullScreenContentCallback = object : com.google.android.gms.ads.FullScreenContentCallback() {
                override fun onAdDismissedFullScreenContent() {
                    rewardedAd = null
                    loadRewardedAd(activity.applicationContext)
                }
                override fun onAdFailedToShowFullScreenContent(error: com.google.android.gms.ads.AdError) {
                    rewardedAd = null
                    callback(false, 0)
                }
                override fun onAdShowedFullScreenContent() {}
            }
            ad.show(activity) { rewardItem ->
                val rewardAmount = rewardItem.amount
                callback(true, rewardAmount)
            }
        }

        fun showInterstitialAd(activity: android.app.Activity, callback: (Boolean) -> Unit) {
            val ad = interstitialAd
            if (ad == null) {
                loadInterstitialAd(activity.applicationContext)
                callback(false)
                return
            }
            ad.fullScreenContentCallback = object : com.google.android.gms.ads.FullScreenContentCallback() {
                override fun onAdDismissedFullScreenContent() {
                    interstitialAd = null
                    loadInterstitialAd(activity.applicationContext)
                }
                override fun onAdFailedToShowFullScreenContent(error: com.google.android.gms.ads.AdError) {
                    interstitialAd = null
                    callback(false)
                }
                override fun onAdShowedFullScreenContent() {}
            }
            ad.show(activity)
            callback(true)
        }

        fun showAppOpenAd(activity: android.app.Activity, callback: (Boolean) -> Unit) {
            val ad = appOpenAd
            if (ad == null) {
                loadAppOpenAd(activity.applicationContext)
                callback(false)
                return
            }
            ad.fullScreenContentCallback = object : com.google.android.gms.ads.FullScreenContentCallback() {
                override fun onAdDismissedFullScreenContent() {
                    appOpenAd = null
                    loadAppOpenAd(activity.applicationContext)
                }
                override fun onAdFailedToShowFullScreenContent(error: com.google.android.gms.ads.AdError) {
                    appOpenAd = null
                    callback(false)
                }
                override fun onAdShowedFullScreenContent() {}
            }
            ad.show(activity)
            callback(true)
        }

        fun createBannerAd(context: Context, adContainer: android.view.ViewGroup): AdView {
            val adView = AdView(context)
            adView.setAdSize(AdSize.BANNER)
            adView.adUnitId = BANNER_AD_UNIT
            adContainer.addView(adView)
            adView.loadAd(AdRequest.Builder().build())
            return adView
        }

        fun isAdLoaded(): Boolean = rewardedAd != null || interstitialAd != null
    }
}