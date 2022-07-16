package com.kobe.listmov;


/**
 * Created by hp on 12/23/2016.
 */

import android.app.Activity;
import android.app.ProgressDialog;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.Toast;

import com.kobe.listmov.printingutils.DeviceListActivity;
import com.kobe.listmov.printingutils.UnicodeFormat;
import com.kobe.listmov.zqprinterlib.SWZQPrinter;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.ByteBuffer;
import java.util.Set;
import java.util.UUID;

//import com.zendmoney.PrintPicture;



public class DeviceListMainActivity extends Activity {

    protected static final String TAG = "TAG";
    private BluetoothAdapter mBluetoothAdapter;

    private UUID applicationUUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    private ProgressDialog mBluetoothConnectProgressDialog;
    private BluetoothSocket mBluetoothSocket;
    BluetoothDevice mBluetoothDevice;
    private static final int REQUEST_ENABLE_BT = 2;
    private ArrayAdapter<String> mPairedDevicesArrayAdapter;

    private static final int REQUEST_CONNECT_DEVICE = 1;

    private ImageView mImageView;


    /////////////////////////////////////////////////////////////////////////////
    static Boolean isConnected;
    String titleToPrint;
    String messageToPrint;
    String barcodeString = "ITIS/BLUETOOTH/PRINT?PREVIEW";
    SWZQPrinter PrinterService = null;
    Thread mBlutoothConnectThread;
    Set<BluetoothDevice> mPairedDevices;
    /////////////////////////////////////////////////////////////////////////////



    @Override
    protected void onCreate(Bundle mSavedInstanceState) {
        super.onCreate(mSavedInstanceState);
        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if (mBluetoothAdapter == null) {
            Toast.makeText( DeviceListMainActivity.this, "Message1", Toast.LENGTH_SHORT).show();
        } else {
            if (!mBluetoothAdapter.isEnabled()) {
                Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT);
                finish();
            } else {
                requestWindowFeature(Window.FEATURE_INDETERMINATE_PROGRESS);
                setContentView(R.layout.bluetooth_device_list);
                setResult(Activity.RESULT_CANCELED);
                mPairedDevicesArrayAdapter = new ArrayAdapter<String>(this, R.layout.bluetooth_device_name);
                ListView mPairedListView = (ListView) findViewById(R.id.paired_devices);
                mPairedListView.setAdapter(mPairedDevicesArrayAdapter);
                mPairedListView.setOnItemClickListener(mDeviceClickListener);
                mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
                Set<BluetoothDevice> mPairedDevices = mBluetoothAdapter.getBondedDevices();
                if (mPairedDevices.size() > 0) {
                    findViewById(R.id.title_paired_devices).setVisibility(View.VISIBLE);
                    for (BluetoothDevice mDevice : mPairedDevices) {
                        mPairedDevicesArrayAdapter.add(mDevice.getName() + "\n" + mDevice.getAddress());
                    }
                } else {
                    String mNoDevices = "None Paired";//getResources().getText(R.string.none_paired).toString();
                    mPairedDevicesArrayAdapter.add(mNoDevices);
                }
            }
        }


    }

    private void ListPairedDevices() {
        mPairedDevices = mBluetoothAdapter
                .getBondedDevices();
        if (mPairedDevices.size() > 0) {
            for (BluetoothDevice mDevice : mPairedDevices) {
                Log.v(TAG, "PairedDevices: " + mDevice.getName() + "  "
                        + mDevice.getAddress());
            }
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mBluetoothAdapter != null) {
            mBluetoothAdapter.cancelDiscovery();
        }
    }



















    public static byte intToByteArray(int value) {
        byte[] b = ByteBuffer.allocate(4).putInt(value).array();

        for (int k = 0; k < b.length; k++) {
            System.out.println("Selva  [" + k + "] = " + "0x"
                    + UnicodeFormat.byteToHex(b[k]));
        }

        return b[3];
    }

    private Handler mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            mBluetoothConnectProgressDialog.dismiss();
            Toast.makeText(DeviceListMainActivity.this, "Device connected", Toast.LENGTH_LONG).show();
            PrintWithZQPrinter();
        }

    };

    private void PrintWithZQPrinter() {
        if (isConnected) {
            int returnvalue = SWZQPrinter.AB_SUCCESS;
            Bitmap bm = null;
            try {
                bm = BitmapFactory.decodeResource(getResources(), R.drawable.icon_print);
                returnvalue = PrinterService.PrintBitmap1D76(bm, 0);
                PrinterService.LineFeed(1);
            } catch (IOException e) {
                e.printStackTrace();
            }
            returnvalue = PrinterService.PrintText(titleToPrint
                    , SWZQPrinter.ALIGNMENT_CENTER,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT);
            PrinterService.LineFeed(1);
            returnvalue = PrinterService.PrintText(messageToPrint
                    , SWZQPrinter.ALIGNMENT_LEFT, SWZQPrinter.FT_DEFAULT,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT);
            PrinterService.LineFeed(1);

            byte[] dataBarcode = new byte[0];
            try {

                dataBarcode = barcodeString.getBytes(System.getProperty("file.encoding"));
                int returnvalueFinal = SWZQPrinter.AB_SUCCESS;
                returnvalueFinal = PrinterService.PrintBarcode(dataBarcode, dataBarcode.length,
                        SWZQPrinter.BCS_Code39, 50, 3,
                        SWZQPrinter.ALIGNMENT_CENTER,
                        SWZQPrinter.BC_TEXT_BELOW);

                PrinterService.LineFeed(3);

                if (returnvalueFinal == SWZQPrinter.AB_SUCCESS) {

                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            Toast.makeText(DeviceListMainActivity.this, "check printer & bluetooth", Toast.LENGTH_SHORT).show();
        }
    }









    private OnItemClickListener mDeviceClickListener = new OnItemClickListener() {
        public void onItemClick(AdapterView<?> mAdapterView, View mView, int mPosition, long mLong) {

            try {

                mBluetoothAdapter.cancelDiscovery();
                String mDeviceInfo = ((TextView) mView).getText().toString();
                String mDeviceAddress = mDeviceInfo.substring(mDeviceInfo.length() - 17);
                Log.v(TAG, "Device_Address " + mDeviceAddress);
                Log.v(TAG, "Coming incoming address " + mDeviceAddress);
                mBluetoothDevice = mBluetoothAdapter.getRemoteDevice(mDeviceAddress);
                mBluetoothConnectProgressDialog = ProgressDialog.show( DeviceListMainActivity.this,
                        "Print proccess ...", mBluetoothDevice.getName() + " : "
                                + mBluetoothDevice.getAddress(), true, false);
                Thread mBlutoothConnectThread = new Thread();
                mBlutoothConnectThread.start();

                mBluetoothSocket = mBluetoothDevice.createRfcommSocketToServiceRecord(applicationUUID);
                mBluetoothSocket.connect();




                ////////////////////////////////////////////////////////////////////////////////
                Thread t = new Thread() {

                    public void run() {
                        try {

                            OutputStream cetak = mBluetoothSocket.getOutputStream();
                            final byte[] printformat = new byte[]{0x1B,0x21,0x03};

                            String batas = "------------------------------------------\n";

                            String JUDUL = "";
                            JUDUL = "                 VIP Online \n";
                            JUDUL = JUDUL +"           "+ getIntent().getExtras().getString("tanggal_hari_ini") + "  -  " + getIntent().getExtras().getString("waktu_hari_ini") +"\n";
                            JUDUL = JUDUL + "\n\n";


                            String BILL = JUDUL + "CASH TO BANK    \n";
                            BILL = BILL + "Merchant Name: "+getIntent().getExtras().getString("merchant_name")+"\n";
                            BILL = BILL + batas;
                            BILL = BILL + "SENDER \n";

                            BILL = BILL + batas;
                            BILL = BILL + "Name         : "+getIntent().getExtras().getString("nama_sender")+"\n";
                            BILL = BILL + "Birth Date   : "+getIntent().getExtras().getString("tgl_hbd_sender")+"\n";
                            BILL = BILL + "ID Number    : "+getIntent().getExtras().getString("id_number_sender")+"\n";
                            BILL = BILL + "Phone Number : "+getIntent().getExtras().getString("phone_number_sender")+"\n";
                            BILL = BILL + batas;
                            BILL = BILL + "BENEFICIARY \n";
                            BILL = BILL + batas;
                            BILL = BILL + "Name         : "+getIntent().getExtras().getString("name_beneficiary")+"\n";
                            BILL = BILL + "ID Number    : "+getIntent().getExtras().getString("id_number_beneficiary")+"\n";
                            BILL = BILL + "Birth Date   : "+getIntent().getExtras().getString("tgl_hbd_beneficiary")+"\n";
                            BILL = BILL + "Phone Number : "+getIntent().getExtras().getString("phone_number_beneficiary")+"\n";
                            BILL = BILL + "Address      : "+getIntent().getExtras().getString("address_beneficiary")+"\n";
                            BILL = BILL + "Account Bank : "+getIntent().getExtras().getString("account_bank_beneficiary")+"\n";
                            BILL = BILL + "Bank Account : "+getIntent().getExtras().getString("bank_account_beneficiary")+"\n";
                            BILL = BILL + "Bank Name    : "+getIntent().getExtras().getString("bank_name_beneficiary")+"\n";
                            BILL = BILL + batas;
                            BILL = BILL + "Amount   (HKD)  : "+getIntent().getExtras().getString("amount_hkd")+".00"+"\n";
                            BILL = BILL + "Fee      (HKD)  : "+getIntent().getExtras().getString("fee_hkd")+".00"+"\n";
                            BILL = BILL + "Collect  (HKD)  : "+getIntent().getExtras().getString("collect_hkd")+".00"+"\n";
                            BILL = BILL + "\n";
                            BILL = BILL + "Fee      (IDR)  : "+getIntent().getExtras().getString("fee_idr")+"\n";
                            BILL = BILL + "Collect  (IDR)  : "+getIntent().getExtras().getString("collect_idr")+"\n";
                            BILL = BILL + "\n";
                            BILL = BILL + "Rate    HKD-IDR : "+getIntent().getExtras().getString("rate_hkd_to_idr")+".00"+"\n";
                            BILL = BILL + batas;
                            BILL = BILL + "\n";
                            BILL = BILL + "   ["+ "z" +"]"+"\n";
                            BILL = BILL + "Zendmoney"+"\n";
                            BILL = BILL + "\n\n";

                            cetak.write(printformat);
                            cetak.write(BILL.getBytes());




                        } catch (Exception e) {
                            e.printStackTrace();
                        }

                    }
                };

                t.start();

                ///////////////////////////////////////////////////////////////////////////////////

                mBluetoothConnectProgressDialog.dismiss();
                mBluetoothAdapter.disable();
                Toast.makeText( DeviceListMainActivity.this, "Print Sukses", Toast.LENGTH_SHORT).show();
                try {
                    if (mBluetoothSocket != null)
                        mBluetoothSocket.close();
                } catch (Exception e) {
                    Log.e("Tag", "Exe ", e);
                }
                setResult(RESULT_CANCELED);
                finish();

            } catch (Exception ex) {

            }

        }
    };

}
