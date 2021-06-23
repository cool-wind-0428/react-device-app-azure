import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTodos = createAsyncThunk('productApp/todos/getTodos', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().productApp.todos.routeParams;
	const response = await axios.get('/api/todo-app/todos', {
		params: routeParams
	});
	const data = await response.data;

	return { data, routeParams };
});

export const addTodo = createAsyncThunk('productApp/todos/addTodo', async (todo, { dispatch, getState }) => {
	const response = await axios.post('/api/todo-app/new-todo', todo);
	const data = await response.data;

	dispatch(getTodos());

	return data;
});

export const updateTodo = createAsyncThunk('productApp/todos/updateTodo', async (todo, { dispatch, getState }) => {
	const response = await axios.post('/api/todo-app/update-todo', todo);
	const data = await response.data;

	dispatch(getTodos());

	return data;
});

export const removeTodo = createAsyncThunk('productApp/todos/removeTodo', async (todoId, { dispatch, getState }) => {
	const response = await axios.post('/api/todo-app/remove-todo', todoId);
	const data = await response.data;

	dispatch(getTodos());

	return data;
});

const todosAdapter = createEntityAdapter({});

export const { selectAll: selectTodos, selectById: selectTodosById } = todosAdapter.getSelectors(
	state => state.productApp.todos
);

const todosSlice = createSlice({
	name: 'productApp/todos',
	initialState: todosAdapter.getInitialState({
		searchText: '',
		orderBy: '',
		orderDescending: false,
		routeParams: {},
		todoDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		group: ''
	}),
	reducers: {
		setTodosSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		setGroup: {
			reducer: (state, action) => { console.log('---', action.payload)
				state.group = action.payload;
			}
		},
		toggleOrderDescending: (state, action) => {
			state.orderDescending = !state.orderDescending;
		},
		changeOrder: (state, action) => {
			state.orderBy = action.payload;
		},
		openNewTodoDialog: (state, action) => {
			state.todoDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewTodoDialog: (state, action) => {
			state.todoDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditTodoDialog: (state, action) => {
			state.todoDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditTodoDialog: (state, action) => {
			state.todoDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[updateTodo.fulfilled]: todosAdapter.upsertOne,
		[addTodo.fulfilled]: todosAdapter.addOne,
		[getTodos.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			todosAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
			state.group = '';
		}
	}
});

export const {
	setTodosSearchText,
	setGroup,
	toggleOrderDescending,
	changeOrder,
	openNewTodoDialog,
	closeNewTodoDialog,
	openEditTodoDialog,
	closeEditTodoDialog
} = todosSlice.actions;

export default todosSlice.reducer;
