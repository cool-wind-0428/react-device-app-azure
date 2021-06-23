import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('productApp/products/getProducts', async () => {
	const response = await axios.get('/api/product-app/products');
	const data = await response.data;

	return data;
});

export const removeProducts = createAsyncThunk('productApp/products/removeProducts', async (productIds, { dispatch, getState }) => {
		const response = await axios.post('/api/product-app/remove-products', { productIds });
		const data = await response.data;
		console.log(data);

		dispatch(getProducts());
	}
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.productApp.products
);

const productsSlice = createSlice({
	name: 'productApp/products',
	initialState: productsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getProducts.fulfilled]: productsAdapter.setAll
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
