import { AsyncStorage, Alert } from "react-native";
import { GetWrapperItems } from '../fw/include';

function itemsGetWrapper() {
  var itemsLink = 'https://djawz.com/APITES/get_data.php'
  
  var itemsRequest = GetWrapperItems(itemsLink);
  // var negaraRequest = GetWrapperNegara("bearer ajahsjahjsahdjhsajdhj", negaraLink);
  return itemsRequest;
}

class ItemsApi {
  static getItems() {
      return fetch(itemsGetWrapper()).then(response => {
       
          return response.json();
          Alert.alert("MASUK PAK EKO")
        
      }).catch(error => {
        return error;
      });
  }
}

export default ItemsApi;





































// function negaraWrapper(body: Object) {
  
//   // console.log("--------------")
//   // console.log(body)
//   // console.log("--------------")
  
//   var negaraHeaders = new Headers();

//   negaraHeaders.set('Content-Type','application/json');
//   negaraHeaders.set('Authorization','bearer ' + body);
 


//   var negaraInit = {
//     method: 'GET',
//     headers: negaraHeaders,
//     cache: 'default',
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   };

//   var negaraRequest = new Request('https://zendmoney.com/ZendApi/api/Negara', negaraInit);
//   // https://zendmoney.com/ZendApi/api/Kota
//   return negaraRequest;
// }

// class NegaraApi {
//   static getNegara(body: Object) {
//     return fetch(negaraWrapper(body)).then(response => {

//       if (response.ok) {
//         return response.json();
        
//       }
//     }).catch(error => {
//       return error;
//     });
//   }
// }

// export default NegaraApi;