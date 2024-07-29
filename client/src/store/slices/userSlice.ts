import {createSlice} from "@reduxjs/toolkit"
import {UserState} from "../types/userTypes.ts"
import {
    getAllUsersHandler,
    getMeHandler,
    loginFuncHandler,
    signUpFuncHandler
} from "../handlers/userHandlers.ts"

const initialState: UserState = {
    curUser: {},
    profileUser: {},
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
        signUpFuncHandler(builder)
        getMeHandler(builder)
        getAllUsersHandler(builder)
    }
})

export const {logoutFunc} = userSlice.actions
export default userSlice.reducer

