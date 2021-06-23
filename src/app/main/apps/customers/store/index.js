import { combineReducers } from '@reduxjs/toolkit';

import users from './customersSlice';
import products from './productsSlice';

const reducer = combineReducers({
	users,
	products,
});

export default reducer;
