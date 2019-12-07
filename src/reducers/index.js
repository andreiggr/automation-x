import { combineReducers } from 'redux';
import data from './data';
import selectedProduct from './selectedProduct';

export default combineReducers({
	data,
	selectedProduct
});
