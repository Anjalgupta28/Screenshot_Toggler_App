package com.screenshottogglerapp

import android.app.Activity
import android.view.WindowManager
import android.widget.Toast
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

public class ScreenshotTogglerModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return "ScreenshotToggler" // This is the name used in JS to access the native module
    }

    @ReactMethod
fun setScreenshotEnabled(enabled: Boolean, promise: Promise) {
    try {
        val activity: Activity? = currentActivity
        if (activity != null) {
            activity.runOnUiThread {
                try {
                    if (enabled) {
                        activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE) // Enable screenshots
                    } else {
                        activity.window.addFlags(WindowManager.LayoutParams.FLAG_SECURE)   // Disable screenshots
                    }
                    promise.resolve(true)
                } catch (e: Exception) {
                    promise.reject("UI_ERROR", "UI thread error: ${e.message}")
                }
            }
        } else {
            promise.reject("ACTIVITY_NULL", "Activity is null")
        }
    } catch (e: Exception) {
        promise.reject("ERROR", e.message)
    }
}
}
