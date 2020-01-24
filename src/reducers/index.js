import { combineReducers } from 'redux';
import data from './data';
import selectedProduct from './selectedProduct';
import activeFilter from './activeFilter';
import searchData from './searchData';
import auth from './auth';

export default combineReducers({
	data,
	selectedProduct,
	activeFilter,
	searchData,
	auth
});
