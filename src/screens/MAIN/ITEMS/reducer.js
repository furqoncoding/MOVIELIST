import Globals from '../../../fw/globals';
const initialState = {
  data_items: []

};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {


    case Globals.ITEMS_FETCH_DATA_SUCCESS:
      return { ...state, data_items: action.data_items };


    default:
      return state;
  }
}



