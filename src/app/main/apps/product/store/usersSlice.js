import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('productApp/users/getUsers', async () => {
	const response = await axios.get('/api/product-app/users');
	const data = await response.data;

	return data;
});

export const removeUsers = createAsyncThunk(
	'productApp/users/removeUsers',
	async (userIds, { dispatch, getState }) => {
		const response = await axios.post('/api/product-app/remove-users', { userIds });
		const data = await response.data;

		dispatch(getUsers());

		return data;
	}
);

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectMessageById } = usersAdapter.getSelectors(
	state => state.productApp.users
);

const usersSlice = createSlice({
	name: 'productApp/users',
	initialState: usersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setUsersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getUsers.fulfilled]: usersAdapter.setAll
	}
});

export const { setUsersSearchText } = usersSlice.actions;

export default usersSlice.reducer;
