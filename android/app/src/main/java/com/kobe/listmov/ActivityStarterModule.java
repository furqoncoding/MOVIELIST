package com.kobe.listmov;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

//import com.facebook.react.bridge.;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.kobe.listmov.printingutils.DeviceListActivity;


import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import android.widget.Toast;

import android.content.res.AssetManager;

/**
 * Expose Java to JavaScript.
 */
public class ActivityStarterModule extends ReactContextBaseJavaModule {

    ActivityStarterModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ActivityStarter";
    }

    @ReactMethod
    public void show(String message) {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_LONG).show();
    }

    private static DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = null;


    @Override
    public void initialize() {
        super.initialize();
        eventEmitter = getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }

    /**
     * @return the name of this module. This will be the name used to {@code require()} this module
     * from JavaScript.
     */


    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("MyEventName", "MyEventValue");
        return constants;
    }

    private AssetManager asset;
    @ReactMethod
    public void navigateToExample(ReadableMap readableMap) {

        Activity activity = getCurrentActivity();
        if (activity != null) {
            Intent intent = new Intent(activity, DeviceListActivity.class);

            intent.putExtra("tanggal_hari_ini",readableMap.getString("tanggal_hari_ini"));
            intent.putExtra("waktu_hari_ini",readableMap.getString("waktu_hari_ini"));

            intent.putExtra("merchant_name",readableMap.getString("merchant_name"));
            intent.putExtra("nama_sender",readableMap.getString("nama_sender"));

            intent.putExtra("tgl_hbd_sender",readableMap.getString("tgl_hbd_sender"));
            intent.putExtra("id_number_sender",readableMap.getString("id_number_sender"));
            intent.putExtra("phone_number_sender",readableMap.getString("phone_number_sender"));
            intent.putExtra("name_beneficiary",readableMap.getString("name_beneficiary"));
            intent.putExtra("id_number_beneficiary",readableMap.getString("id_number_beneficiary"));
            intent.putExtra("tgl_hbd_beneficiary",readableMap.getString("tgl_hbd_beneficiary"));
            intent.putExtra("phone_number_beneficiary",readableMap.getString("phone_number_beneficiary"));
            intent.putExtra("address_beneficiary",readableMap.getString("address_beneficiary"));
            intent.putExtra("account_bank_beneficiary",readableMap.getString("account_bank_beneficiary"));
            intent.putExtra("bank_account_beneficiary",readableMap.getString("bank_account_beneficiary"));
            intent.putExtra("bank_name_beneficiary",readableMap.getString("bank_name_beneficiary"));

            intent.putExtra("amount_hkd",readableMap.getString("amount_hkd"));
            intent.putExtra("collect_hkd",readableMap.getString("collect_hkd"));
            intent.putExtra("fee_hkd",readableMap.getString("fee_hkd"));
            intent.putExtra("collect_idr",readableMap.getString("collect_idr"));
            intent.putExtra("fee_idr",readableMap.getString("fee_idr"));

            intent.putExtra("rate_hkd_to_idr",readableMap.getString("rate_hkd_to_idr"));

            activity.startActivity(intent);



//            String merchant_name = readableMap.getString("merchant_name");
//            String nama_sender = readableMap.getString("nama_sender");

//            String tgl_hbd_sender = readableMap.getString("tgl_hbd_sender");
//            String id_number_sender = readableMap.getString("id_number_sender");
//            String phone_number_sender = readableMap.getString("phone_number_sender");
//            String name_beneficiary = readableMap.getString("name_beneficiary");
//            String id_number_beneficiary = readableMap.getString("id_number_beneficiary");
//            String tgl_hbd_beneficiary = readableMap.getString("tgl_hbd_beneficiary");
//            String phone_number_beneficiary = readableMap.getString("phone_number_beneficiary");
//            String address_beneficiary = readableMap.getString("address_beneficiary");
//            String account_bank_beneficiary = readableMap.getString("account_bank_beneficiary");
//            String bank_account_beneficiary = readableMap.getString("bank_account_beneficiary");
//            String bank_name_beneficiary = readableMap.getString("bank_name_beneficiary");
//            Toast.makeText(getReactApplicationContext(), nama_sender, Toast.LENGTH_LONG).show();
        }

    }



//    @ReactMethod
//    void navigateToExample() {
//        Activity activity = getCurrentActivity();
//        if (activity != null) {
//            Intent intent = new Intent(activity, Main_PrinterActivity.class);
//            activity.startActivity(intent);
//        }
//    }

    @ReactMethod
    void dialNumber(@Nonnull String number) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + number));
            activity.startActivity(intent);
        }
    }

    @ReactMethod
    void getActivityName(@Nonnull Callback callback) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            callback.invoke(activity.getClass().getSimpleName());
        }
    }

    @ReactMethod
    void getActivityNameAsPromise(@Nonnull Promise promise) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            promise.resolve(activity.getClass().getSimpleName());
        }
    }

    @ReactMethod
    void callJavaScript() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            MainApplication application = (MainApplication) activity.getApplication();
            ReactNativeHost reactNativeHost = application.getReactNativeHost();
            ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
            ReactContext reactContext = reactInstanceManager.getCurrentReactContext();

            if (reactContext != null) {
                CatalystInstance catalystInstance = reactContext.getCatalystInstance();
                WritableNativeArray params = new WritableNativeArray();
                params.pushString("Hello, JavaScript!");
                catalystInstance.callFunction("JavaScriptVisibleToJava", "alert", params);
            }
        }
    }

    /**
     * To pass an object instead of a simple string, create a {@link WritableNativeMap} and populate it.
     */
    static void triggerAlert(@Nonnull String message) {
        eventEmitter.emit("MyEventValue", message);
    }
}

