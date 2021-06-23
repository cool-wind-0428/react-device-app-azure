import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMessages = createAsyncThunk('productApp/messages/getMessages', async params => {
	const response = await axios.get('/api/product-app/messages', { params });
	const data = await response.data;

	return data;
});

export const removeMessages = createAsyncThunk(
	'productApp/messages/removeMessages',
	async (messageIds, { dispatch, getState }) => {
		const response = await axios.post('/api/product-app/remove-messages', { messageIds });
		const data = await response.data;

		dispatch(getMessages());

		return data;
	}
);

const messagesAdapter = createEntityAdapter({});

export const { selectAll: selectMessages, selectById: selectMessageById } = messagesAdapter.getSelectors(
	state => state.productApp.messages
);

const messagesSlice = createSlice({
	name: 'productApp/messages',
	initialState: messagesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setMessagesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getMessages.fulfilled]: messagesAdapter.setAll
	}
});

export const { setMessagesSearchText } = messagesSlice.actions;

export default messagesSlice.reducer;
