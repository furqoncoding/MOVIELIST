import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import itemsReducer from "../screens/KLINK/ITEMS/reducer";
export default combineReducers({

  form: formReducer,
  itemsReducer
  
});
