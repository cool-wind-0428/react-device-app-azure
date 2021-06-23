import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFilters = createAsyncThunk('productApp/filters/getFilters', async () => {
	const response = await axios.get('/api/todo-app/filters');
	const data = await response.data;

	return data;
});

const filtersAdapter = createEntityAdapter({});

export const { selectAll: selectFilters, selectById: selectFilterById } = filtersAdapter.getSelectors(
	state => state.productApp.filters
);

const filtersSlice = createSlice({
	name: 'productApp/filters',
	initialState: filtersAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getFilters.fulfilled]: filtersAdapter.setAll
	}
});

export default filtersSlice.reducer;
