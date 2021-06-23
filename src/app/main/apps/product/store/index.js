import { combineReducers } from '@reduxjs/toolkit';
import product from './productSlice';
import products from './productsSlice';
import dialog from './dialogSlice';
import messages from './messagesSlice';
import users from './usersSlice';
import filters from './filtersSlice';
import folders from './foldersSlice';
import labels from './labelsSlice';
import todos from './todosSlice';
import descriptions from './descriptionsSlice';

const reducer = combineReducers({
	products,	
	product,
	dialog,
	messages,
	users,
	todos,
	folders,
	labels,
	filters,
	descriptions,
});

export default reducer;
