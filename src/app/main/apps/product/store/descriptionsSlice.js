import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDescriptions = createAsyncThunk('productApp/descriptions/descriptions', async () => {
	const response = await axios.get('/api/product-app/descriptions');
	const data = await response.data;

	return { data };
});

const descriptionsAdapter = createEntityAdapter({});

export const { selectAll: selectDescriptions, selectById: selectDescriptionById } = descriptionsAdapter.getSelectors(
	state => state.productApp.descriptions
);

const descriptionsSlice = createSlice({
	name: 'productApp/descriptions',
	initialState: descriptionsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setDescriptionsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getDescriptions.fulfilled]: descriptionsAdapter.setAll
	}
});

export const { setDescriptionsSearchText } = descriptionsSlice.actions;

export default descriptionsSlice.reducer;
