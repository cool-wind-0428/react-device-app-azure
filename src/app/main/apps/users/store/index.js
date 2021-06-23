import { combineReducers } from '@reduxjs/toolkit';

import users from './usersSlice';
import invitations from './invitationsSlice';

const reducer = combineReducers({
	users,
	invitations,
});

export default reducer;
