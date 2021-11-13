package com.androidnativemodules.nativeModules

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule


class HelloModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName() = MODULE_NAME

    private val eventEmitter by lazy {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
    }

    private fun emit(message: String) {
        val result = WritableNativeMap().apply {
            putString("data", message)
        }
        eventEmitter.emit(EVENT_RESULT_TAG, result)
    }

    @ReactMethod
    fun helloWorld() {
        emit("Hello World")
    }

    companion object {
        private const val MODULE_NAME = "Module"
        private const val EVENT_RESULT_TAG = "EVENT_RESULT"
    }
}