import { AsyncStorage, Alert } from "react-native";
import itemsApi from '../../../api/itemsApi';
import Globals from '../../../fw/globals';

export function itemsFetchDataSuccess(data_items: Object) {
  return {
    type: Globals.ITEMS_FETCH_DATA_SUCCESS,
    data_items
  };
}


export function itemsFetchData(body_items: String) {
  return function(dispatch) {

      // Alert.alert("body_items",body_items)
      // Alert.alert("body_items")

      fetch(Globals.API_LINK + body_items + '?api_key=' + Globals.TOKEN, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
      }).then((response) => response.json())
      .then((data_items) => {

        return dispatch(itemsFetchDataSuccess(data_items));
    
      }).catch((error) => {
        // Alert.alert("GAGAGAGA")
        return dispatch(itemsFetchData());
        throw(error);
      });
  };
}













