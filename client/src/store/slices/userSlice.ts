import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit"
import {UserState} from "../types/userTypes.ts"
import {
    buySubHandler,
    getAllUsersHandler,
    getMeHandler, getUserProfileFuncHandler,
    loginFuncHandler, logoutFuncHandler,
    signUpFuncHandler, subOnUserHandler, unsubOnUserHandler, updateMeHandler
} from "../handlers/userHandlers.ts"

const initialState: UserState = {
    curUser: {},
    profileUser: {},
    countFollowers: "",
    isLoading: false,
    isLoadingSearchUsers: false,
    isSuccess: false,
    error: '',
    token: localStorage.getItem('token') ?? '',
    allUsers: [],
    onlineUsers: [],
    socketConnection: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setSocketConnection : (state,action)=>{
            state.socketConnection = action.payload
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<UserState>) {
        loginFuncHandler(builder);
        signUpFuncHandler(builder);
        logoutFuncHandler(builder)
        subOnUserHandler(builder);
        unsubOnUserHandler(builder)
        getMeHandler(builder);
        getAllUsersHandler(builder);
        getUserProfileFuncHandler(builder);
        updateMeHandler(builder);
        buySubHandler(builder);
    }
})

export const {setOnlineUsers, setSocketConnection} = userSlice.actions
export default userSlice.reducer

