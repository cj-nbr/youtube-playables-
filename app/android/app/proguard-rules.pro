-keepattributes Signature
-keepattributes *Annotation*
-keep class com.ytplayables.app.** { *; }
-keep class com.ytplayables.app.BridgeInterface { *; }
-keep class com.google.android.gms.ads.** { *; }
-keep class com.google.firebase.messaging.** { *; }
-keep class kotlinx.coroutines.** { *; }
-keep class okhttp3.** { *; }
-keep class com.google.gson.** { *; }
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
}