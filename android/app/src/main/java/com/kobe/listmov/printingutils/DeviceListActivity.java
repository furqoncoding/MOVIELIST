package com.kobe.listmov.printingutils;


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
//import android.support.v7.app.AppCompatActivity;
import 	androidx.appcompat.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.kobe.listmov.R;

import com.kobe.listmov.zqprinterlib.SWZQPrinter;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.ByteBuffer;
import java.util.Set;
import java.util.UUID;

/**
 * Created by Apple on 18/11/15.
 */

public class DeviceListActivity extends AppCompatActivity implements Runnable {


    private static final int REQUEST_CONNECT_DEVICE = 1;
    private static final int REQUEST_ENABLE_BT = 2;
    private static final String TAG = "Device List";

    static Boolean isConnected = false;
//    static Boolean statusConnected = false;

    BluetoothDevice mBluetoothDevice;
    Set<BluetoothDevice> mPairedDevices;

    String titleToPrint;
    String messageToPrint;

    String barcodeString = "ITIS/BLUETOOTH/PRINT?PREVIEW";

    Thread mBlutoothConnectThread;
    SWZQPrinter PrinterService = null;
    private BluetoothAdapter mBluetoothAdapter;
    private ArrayAdapter<String> mPairedDevicesArrayAdapter;

    private UUID applicationUUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");

    private ProgressDialog mBluetoothConnectProgressDialog;
    private BluetoothSocket mBluetoothSocket;

    private AdapterView.OnItemClickListener mDeviceClickListener = new AdapterView.OnItemClickListener() {

        public void onItemClick(AdapterView<?> mAdapterView, View mView, int mPosition, long mLong) {

            try {

                String mDeviceInfo = ((TextView) mView).getText().toString();
                String mDeviceAddress = mDeviceInfo.substring(mDeviceInfo.length() - 17);
                Log.v(TAG, "Device_Address " + mDeviceAddress);
                Log.v(TAG, "Coming incoming address " + mDeviceAddress);
                mBluetoothDevice = mBluetoothAdapter.getRemoteDevice(mDeviceAddress);
                mBluetoothConnectProgressDialog = ProgressDialog.show(DeviceListActivity.this, "Connecting...", mBluetoothDevice.getName() + " : " + mBluetoothDevice.getAddress(), true, false);
                mBlutoothConnectThread = new Thread(DeviceListActivity.this);
                mBlutoothConnectThread.start();

            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    };
    private Handler mHandler = new Handler() {


        @Override
        public void handleMessage(Message msg) {

            if(getIntent().getExtras().getString("nama_sender").equals( "kosong" ))
            {
                mBluetoothConnectProgressDialog.dismiss();
                Toast.makeText(DeviceListActivity.this, "Device connected", Toast.LENGTH_LONG).show();
                finish();
            }
            else {
                mBluetoothConnectProgressDialog.dismiss();
                PrintWithZQPrinter();
                finish();
            }

        }

    };

    public static byte intToByteArray(int value) {
        byte[] b = ByteBuffer.allocate(4).putInt(value).array();

        for (int k = 0; k < b.length; k++) {
            System.out.println("Selva  [" + k + "] = " + "0x"
                    + UnicodeFormat.byteToHex(b[k]));
        }

        return b[3];
    }

    @Override
    protected void onCreate(Bundle mSavedInstanceState) {
        super.onCreate(mSavedInstanceState);

        setContentView(R.layout.bluetooth_device_list);
        setResult(Activity.RESULT_CANCELED);
        mPairedDevicesArrayAdapter = new ArrayAdapter<String>(this, R.layout.bluetooth_device_name);

        ListView mPairedListView = findViewById(R.id.paired_devices);
        mPairedListView.setAdapter(mPairedDevicesArrayAdapter);
        mPairedListView.setOnItemClickListener(mDeviceClickListener);


//        Toast.makeText(DeviceListActivity.this, getIntent().getExtras().getString("nama_sender"), Toast.LENGTH_LONG).show();

        if(isConnected.equals( false ))
        {
            mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
            if (mBluetoothAdapter == null) {
                Toast.makeText(DeviceListActivity.this, "Error", Toast.LENGTH_LONG).show();
            } else {
                if (mBluetoothAdapter.isEnabled()) {

                    ListPairedDevices();
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
                else{
                    Toast.makeText(DeviceListActivity.this, "Bluetooth not active", Toast.LENGTH_LONG).show();
                    this.onBackPressed();
                }
            }

            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            setTitle("Printer List");
            PrinterService = new SWZQPrinter();
        } else if(getIntent().getExtras().getString("nama_sender").equals( "kosong" )) {
            mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
            if (mBluetoothAdapter == null) {
                Toast.makeText(DeviceListActivity.this, "Error", Toast.LENGTH_LONG).show();
            } else {
                if (mBluetoothAdapter.isEnabled()) {

                    ListPairedDevices();
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
                else{
                    Toast.makeText(DeviceListActivity.this, "Bluetooth not active", Toast.LENGTH_LONG).show();
                    this.onBackPressed();
                }
            }

            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            setTitle("Printer List");
            PrinterService = new SWZQPrinter();
        } else {

            Toast.makeText(DeviceListActivity.this, "Print Sukses", Toast.LENGTH_LONG).show();

//            this.run();
//            mHandler.sendEmptyMessage(0);

            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            setTitle("Printer List");
            PrinterService = new SWZQPrinter();

            PrintWithZQPrinter();

            finish();
        }




//        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
//        if (mBluetoothAdapter == null) {
//            Toast.makeText(DeviceListActivity.this, "Error", Toast.LENGTH_LONG).show();
//        } else {
//            if (mBluetoothAdapter.isEnabled()) {
//
//                ListPairedDevices();
//                if (mPairedDevices.size() > 0) {
//                    findViewById(R.id.title_paired_devices).setVisibility(View.VISIBLE);
//                    for (BluetoothDevice mDevice : mPairedDevices) {
//                        mPairedDevicesArrayAdapter.add(mDevice.getName() + "\n" + mDevice.getAddress());
//                    }
//                } else {
//                    String mNoDevices = "None Paired";//getResources().getText(R.string.none_paired).toString();
//                    mPairedDevicesArrayAdapter.add(mNoDevices);
//                }
//            }
//            else{
//                Toast.makeText(DeviceListActivity.this, "Bluetooth not active", Toast.LENGTH_LONG).show();
//                this.onBackPressed();
//            }
//        }
//
//        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
//        setTitle("Printer List");
//        PrinterService = new SWZQPrinter();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_printer_list, menu);


        return true;

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        int id = item.getItemId();

        if (android.R.id.home == id) {
            finish();
        }

        if (R.id.action_disconnect == id) {
            PrinterService.Disconnect();

        }
        return super.onOptionsItemSelected(item);

    }

    @Override
    protected void onDestroy() {
        // TODO Auto-generated method stub
        super.onDestroy();
        try {
            if (mBluetoothSocket != null)
                mBluetoothSocket.close();

            if (mBluetoothAdapter != null) {
                mBluetoothAdapter.cancelDiscovery();
            }

        } catch (Exception e) {
            Log.e("Tag", "Exe ", e);
        }
    }

    @Override
    public void onBackPressed() {
        try {
            if (mBluetoothSocket != null)
                mBluetoothSocket.close();
        } catch (Exception e) {
            Log.e("Tag", "Exe ", e);
        }
        setResult(RESULT_CANCELED);
        finish();
    }

    public void onActivityResult(int mRequestCode, int mResultCode,
                                 Intent mDataIntent) {
        super.onActivityResult(mRequestCode, mResultCode, mDataIntent);

        switch (mRequestCode) {
            case REQUEST_CONNECT_DEVICE:
                if (mResultCode == Activity.RESULT_OK) {
                    Bundle mExtra = mDataIntent.getExtras();
                    String mDeviceAddress = mExtra.getString("DeviceAddress");
                    Log.v(TAG, "Coming incoming address " + mDeviceAddress);
                    mBluetoothDevice = mBluetoothAdapter
                            .getRemoteDevice(mDeviceAddress);
                    mBluetoothConnectProgressDialog = ProgressDialog.show(this,
                            "Connecting...", mBluetoothDevice.getName() + " : "
                                    + mBluetoothDevice.getAddress(), true, false);
                    Thread mBlutoothConnectThread = new Thread(this);
                    mBlutoothConnectThread.start();
                    // pairToDevice(mBluetoothDevice); This method is replaced by
                    // progress dialog with thread
                }
                break;

            case REQUEST_ENABLE_BT:
                if (mResultCode == Activity.RESULT_OK) {
                    ListPairedDevices();
                    Intent connectIntent = new Intent(DeviceListActivity.this,
                            DeviceListActivity.class);
                    startActivityForResult(connectIntent, REQUEST_CONNECT_DEVICE);
                } else {
                    Toast.makeText(DeviceListActivity.this, "Message", Toast.LENGTH_LONG).show();
                }
                break;
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

    public void run() {
        try {
            int nRet = PrinterService.Connect(mBluetoothDevice.getAddress());
//            Toast.makeText(DeviceListActivity.this, nRet, Toast.LENGTH_LONG).show();
            if (nRet == 0) {
                isConnected = true;
                mHandler.sendEmptyMessage(0);

            } else {
                mBluetoothConnectProgressDialog.dismiss();
                isConnected = false;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void closeSocket(BluetoothSocket nOpenSocket) {
        try {
            nOpenSocket.close();

            mBluetoothConnectProgressDialog.dismiss();

            Log.d(TAG, "SocketClosed");

        } catch (IOException ex) {
            Log.d(TAG, "CouldNotCloseSocket");
        }
    }

    private void PrintWithZQPrinter() {

        if (isConnected.equals( true )) {

            Toast.makeText( DeviceListActivity.this, "Print Success", Toast.LENGTH_LONG ).show();
            int returnvalue = SWZQPrinter.AB_SUCCESS;

            Bitmap bm = null;
            try {
                bm = BitmapFactory.decodeResource(getResources(), R.drawable.icon_print);
                returnvalue = PrinterService.PrintBitmap1D76(bm, 0);
                PrinterService.LineFeed(0);
            } catch (IOException e) {
                e.printStackTrace();
            }

            returnvalue = PrinterService.PrintText("VIP Online\n",
                    SWZQPrinter.ALIGNMENT_CENTER,
                    SWZQPrinter.FT_BOLD_JUDUL,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText(getIntent().getExtras().getString("tanggal_hari_ini") + "  -  " + getIntent().getExtras().getString("waktu_hari_ini"),
                    SWZQPrinter.ALIGNMENT_CENTER,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText( "\n\n",
                    SWZQPrinter.ALIGNMENT_CENTER,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("CASH TO BANK\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD_JUDUL,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Merchant Name : "+getIntent().getExtras().getString("merchant_name")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintSeparator(printSeperator(),
                    SWZQPrinter.ALIGNMENT_CENTER,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("SENDER " +
                            "",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD_JUDUL,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintSeparator(printSeperator(),
                    SWZQPrinter.ALIGNMENT_CENTER,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Name          : "+getIntent().getExtras().getString("nama_sender")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Birth Date    : "+getIntent().getExtras().getString("tgl_hbd_sender")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("ID Number     : "+getIntent().getExtras().getString("id_number_sender")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Phone Number  : "+getIntent().getExtras().getString("phone_number_sender"),
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintSeparator(printSeperator(),
                    SWZQPrinter.ALIGNMENT_CENTER,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("RECEIVER",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD_JUDUL,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintSeparator(printSeperator(),
                    SWZQPrinter.ALIGNMENT_CENTER,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Name          : "+getIntent().getExtras().getString("name_beneficiary")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("ID Number     : "+getIntent().getExtras().getString("id_number_beneficiary")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Birth Date    : "+getIntent().getExtras().getString("tgl_hbd_beneficiary")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Phone Number  : "+getIntent().getExtras().getString("phone_number_beneficiary")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Address       : "+getIntent().getExtras().getString("address_beneficiary")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("City          : "+getIntent().getExtras().getString("city_beneficiary")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Country       : "+getIntent().getExtras().getString("country_beneficiary")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );


            returnvalue = PrinterService.PrintText("Account Bank  : "+getIntent().getExtras().getString("name_beneficiary")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Bank Account  : "+getIntent().getExtras().getString("bank_account_beneficiary")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Bank Name     : "+getIntent().getExtras().getString("bank_name_beneficiary")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );




            returnvalue = PrinterService.PrintText("Funding       : "+getIntent().getExtras().getString("funding")+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Purpose       : "+getIntent().getExtras().getString("purpose"),
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );

            returnvalue = PrinterService.PrintText("\n\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Amount  (HKD) :              "+getIntent().getExtras().getString("amount_hkd")+",00"+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Fee     (HKD) :              "+getIntent().getExtras().getString("fee_hkd")+""+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Collect (HKD) :              "+getIntent().getExtras().getString("collect_hkd")+",00"+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Amount  (IDR) :              "+getIntent().getExtras().getString("amount_idr")+",00"+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Fee     (IDR) :              "+getIntent().getExtras().getString("fee_idr")+",00"+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Donasi        :              "+getIntent().getExtras().getString("donasi")+",00"+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Collect (IDR) :              "+getIntent().getExtras().getString("collect_idr")+",00"+"\n\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );
            returnvalue = PrinterService.PrintText("Rate   HKD-IDR:              "+getIntent().getExtras().getString("rate_hkd_to_idr")+",00"+"\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );




            returnvalue = PrinterService.PrintSeparator(printSeperator(),
                    SWZQPrinter.ALIGNMENT_CENTER,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );





            returnvalue = PrinterService.PrintText("\n\n",
                    SWZQPrinter.ALIGNMENT_LEFT,
                    SWZQPrinter.FT_BOLD,
                    SWZQPrinter.TS_0WIDTH | SWZQPrinter.TS_0HEIGHT
            );




        } else {
            Toast.makeText(DeviceListActivity.this, "check your printer & bluetooth", Toast.LENGTH_SHORT).show();
        }
    }


    private String printSeperator() {

        return "\n-----------------------------------------------------------";

    }

}
