import { createSlice } from "@reduxjs/toolkit"
import { USER_STATE } from "./USER_TYPES"
import { getAllUsersHandler, getCurrentUserInfoFuncHandler, loginFuncHandler } from "./UserHandlers"

const initialState: USER_STATE = {
    curUser: {},
    isLoading: false,
    isLoadingSearchUsers: false,
    isSuccess: false,
    error: '',
    token: localStorage.getItem('token') ?? '',
    allUsers: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutFunc(state) {
            state.curUser = {};
            state.error = '';
            state.isLoading = false;
            state.isSuccess = false;
            state.token = '';
            localStorage.removeItem('token');
        }
    },
    extraReducers(builder) {
        loginFuncHandler(builder)
        getCurrentUserInfoFuncHandler(builder)
        getAllUsersHandler(builder)
    }
})

export const { logoutFunc } = userSlice.actions
export default userSlice.reducer

