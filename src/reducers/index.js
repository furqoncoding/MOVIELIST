import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import itemsReducer from "../screens/MAIN/ITEMS/reducer";
export default combineReducers({

  form: formReducer,
  itemsReducer
  
});
