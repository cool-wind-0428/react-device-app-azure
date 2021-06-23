import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getUser = createAsyncThunk('customersApp/users/getUser', async params => {
	const response = await axios.get('/api/customers-app/user', { params });
	const data = await response.data;

	return data === undefined ? null : data;
});

export const getUsers = createAsyncThunk('customersApp/users/getUsers', async () => {
	const response = await axios.get('/api/customers-app/users');
	const data = await response.data;

	return data;
});

export const saveUser = createAsyncThunk('customersApp/users/saveUser', async ( form, { dispatch, getState } ) => {
	const response = await axios.post('/api/customers-app/user/save', form);
	const data = await response.data;
	console.log(data);

	dispatch(showMessage({ message: 'Data saved' }));
	dispatch(getUsers());
});

export const updateUser = createAsyncThunk('customersApp/users/updateUser', async ( form, { dispatch, getState } ) => {
	const response = await axios.post('/api/customers-app/user/update', form);
	const data = await response.data;
	console.log(data);

	dispatch(getUsers())
});

export const removeUsers = createAsyncThunk('customersApp/users/removeUsers', async (ids, { dispatch, getState }) => {
	const response = await axios.post('/api/customers-app/remove-users', { ids });
	const data = await response.data;
	console.log(data);

	dispatch(getUsers());
});

const customersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUserById } = customersAdapter.getSelectors(
	state => state.customersApp.users
);

const customersSlice = createSlice({
	name: 'customersApp/users',
	initialState: customersAdapter.getInitialState({
		searchText: '',
		addUserDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		userProfileDialog: {
			type: 'edit',
			props: {
				open: false
			},
			data: null
		}
	}),

	reducers: {
		setUsersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openUserDialog: (state, action) => {
			state.addUserDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeUserDialog: (state, action) => {
			state.addUserDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openUserProfileDialog: (state, action) => {
			state.addUserDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeUserProfileDialog: (state, action) => {
			state.addUserDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[getUsers.fulfilled]: customersAdapter.setAll
	}
});

export const {
	setUsersSearchText,
	openUserDialog,
	closeUserDialog,
	openUserProfileDialog,
	closeUserProfileDialog
} = customersSlice.actions;

export default customersSlice.reducer;
