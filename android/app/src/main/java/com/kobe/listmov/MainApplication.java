package com.kobe.listmov;

import android.app.Application;
import android.widget.Toast;
//import android.provider.SyncStateContract;
import com.facebook.react.BuildConfig;
import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.reactlibrary.RNSketchViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.pinmi.react.printer.RNPrinterPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.henninghall.date_picker.DatePickerPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.reactnativecommunity.picker.RNCPickerPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.asterinet.react.bgactions.BackgroundActionsPackage;
import com.zoontek.rnpermissions.RNPermissionsPackage;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.reactnativecommunity.toolbarandroid.ReactToolbarPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.imagepicker.ImagePickerPackage;
import org.reactnative.camera.RNCameraPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import fr.snapp.imagebase64.RNImgToBase64Package;

import com.airbnb.android.react.maps.MapsPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;



public class MainApplication extends Application implements ReactApplication {


    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(

                    new MainReactPackage(),
            new ReactVideoPackage(),
            new RNSketchViewPackage(),
            new VectorIconsPackage(),
            new RNPrinterPackage(),
            new LinearGradientPackage(),
            new DatePickerPackage(),
            new RNAdMobPackage(),
            new RNCPickerPackage(),
            new RNFusedLocationPackage(),
            new RNExitAppPackage(),
            new LocationServicesDialogBoxPackage(),
            new BackgroundTimerPackage(),
            new BackgroundActionsPackage(),
            new RNPermissionsPackage(),
            new RNDateTimePickerPackage(),
            new SafeAreaContextPackage(),
            new ReactToolbarPackage(),
            new GeolocationPackage(),
            new AsyncStoragePackage(),
            new ImagePickerPackage(),
            new RNCameraPackage(),
            new RNViewShotPackage(),
            new RNFetchBlobPackage(),
            new RNImgToBase64Package(),
                    new MapsPackage()


                    ,new ActivityStarterReactPackage()
                    ,new BridgeStarterReactPackage()
//              ,new ElectrodeBridgePackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    ArrayList<String>numberList = new ArrayList<>();
    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
//    get_json();
    }







//  private static String merchant_name = "Warung Sejahtera";
//  public  static  String getMerchant_name() { return merchant_name; }
//  private static String nama_sender = "Furqon Muchammad";
//  public  static  String getNama_sender() { return nama_sender; }
//  private static String tgl_hbd_sender = "2018-03-07";
//  public  static  String getTgl_hbd_sender() { return tgl_hbd_sender; }
//  private static String id_number_sender = "18231";
//  public  static  String getId_number_sender() { return id_number_sender; }
//  private static String phone_number_sender = "02212121";
//  public  static  String getPhone_number_sender() { return phone_number_sender; }
//  private static String name_beneficiary = "JULIANTO WIBOWO";
//  public  static  String getName_beneficiary() { return name_beneficiary; }
//  private static String id_number_beneficiary = "18231";
//  public  static  String getId_number_beneficiary() { return id_number_beneficiary; }
//  private static String tgl_hbd_beneficiary = "1994-08-09";
//  public  static  String getTgl_hbd_beneficiary() { return tgl_hbd_beneficiary; }
//  private static String phone_number_beneficiary = "02212121";
//  public  static  String getPhone_number_beneficiary() { return phone_number_beneficiary; }
//  private static String address_beneficiary = "Jl.a.alala";
//  public  static  String getAddress_beneficiary() { return address_beneficiary; }
//  private static String account_bank_beneficiary = "JULIANTO WBW";
//  public  static  String getAccount_bank_beneficiary() { return account_bank_beneficiary; }
//  private static String bank_account_beneficiary = "12345015151";
//  public  static  String getBank_account_beneficiary() { return bank_account_beneficiary; }
//  private static String bank_name_beneficiary = "Maybank Ind";
//  public  static  String getBank_name_beneficiary() { return bank_name_beneficiary; }
//  private static String rate_hkd_to_idr = "1783.00";
//  public  static  String getRate_hkd_to_idr() { return rate_hkd_to_idr; }

}
