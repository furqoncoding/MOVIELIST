import { AsyncStorage } from "react-native";


export default {

		"merchant_name": AsyncStorage.getItem('merchant_name'),
	    "nama_sender": AsyncStorage.getItem('nama_sender'),
	    "tgl_hbd_sender": AsyncStorage.getItem('tgl_hbd_sender'),
	    "id_number_sender": AsyncStorage.getItem('id_number_sender'),
	    "phone_number_sender": AsyncStorage.getItem('phone_number_sender'),

	    "name_beneficiary": AsyncStorage.getItem('name_beneficiary'),
	    "id_number_beneficiary": AsyncStorage.getItem('id_number_beneficiary'),
	    "tgl_hbd_beneficiary": AsyncStorage.getItem('tgl_hbd_beneficiary'),
	    "phone_number_beneficiary": AsyncStorage.getItem('phone_number_beneficiary'),
	    "address_beneficiary": AsyncStorage.getItem('address_beneficiary'),
	    "account_bank_beneficiary": AsyncStorage.getItem('account_bank_beneficiary'),
	    "bank_account_beneficiary": AsyncStorage.getItem('bank_account_beneficiary'),
	    "bank_name_beneficiary": AsyncStorage.getItem('bank_name_beneficiary'),
	    "rate_hkd_to_idr": AsyncStorage.getItem('rate_hkd_to_idr')
	
};




