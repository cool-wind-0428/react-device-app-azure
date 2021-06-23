import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getProduct = createAsyncThunk('productApp/product/getProduct', async params => {
	const response = await axios.get('/api/product-app/product', { params });
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveProduct = createAsyncThunk('productApp/product/saveProduct', async ( {form}, { dispatch, getState } ) => {
	const response = await axios.post('/api/product-app/product/save', form);
	const data = await response.data;

	console.log(data);
});

export const updateProduct = createAsyncThunk('productApp/product/updateProduct', async ( {form, routeParams}, { dispatch, getState } ) => {
	const response = await axios.post('/api/product-app/product/update', form);
	const data = await response.data;
	console.log(data);

	dispatch(getProduct(routeParams))
});

const productAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = productAdapter.getSelectors(
	state => state.productApp.product
);

const productSlice = createSlice({
	name: 'productApp/product',
	initialState: null,
	reducers: {
		resetProduct: () => null,
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					uid: Math.floor(Math.random() * 1000000),
					name: '',
					address: '',
					categories: [],		
				}
			})
		},
	},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => action.payload,
		[saveProduct.fulfilled]: (state, action) => action.payload
	}
});

export const { 
	newProduct, 
	resetProduct,	
} = productSlice.actions;

export default productSlice.reducer;
