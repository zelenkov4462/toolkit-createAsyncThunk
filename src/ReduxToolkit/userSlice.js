import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: 'users',
	initialState: {
		users: []
	},
	reducers: {
		getUsers(state, action) {
			state.users.push(action.payload)
		}
	}
})

export const {getUsers} = userSlice.actions;
export default userSlice.reducer