import { combineReducers } from "redux";
import products from './products/reducers';

const rootReducer = combineReducers({
  products,
  
});

export default rootReducer;