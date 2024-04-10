import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { USER_STATE } from "./USER_TYPES";
import { getAllUsersFunc, getCurrentUserInfoFunc, loginFunc } from "./userActions";

export const loginFuncHandler = (builder: ActionReducerMapBuilder<USER_STATE>) => {
    builder
        .addCase(loginFunc.pending,
            (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(loginFunc.rejected,
            (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
            }
        )
        .addCase(loginFunc.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.error = '';
                state.curUser = action.payload;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token)
            }
        )
}

export const getCurrentUserInfoFuncHandler = (builder: ActionReducerMapBuilder<USER_STATE>) => {
    builder
        .addCase(getCurrentUserInfoFunc.pending,
            (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(getCurrentUserInfoFunc.rejected,
            (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
            }
        )
        .addCase(getCurrentUserInfoFunc.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.error = '';
                state.curUser = action.payload;
            }
        )
}

export const getAllUsersHandler = (builder: ActionReducerMapBuilder<USER_STATE>) => {
    builder
        .addCase(getAllUsersFunc.pending,
            (state) => {
                state.isLoadingSearchUsers = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(getAllUsersFunc.rejected,
            (state, action) => {
                state.isLoadingSearchUsers = false
                state.isSuccess = false
                state.error = action.error.message!
            }
        )
        .addCase(getAllUsersFunc.fulfilled,
            (state, action) => {
                state.isLoadingSearchUsers = false;
                state.isSuccess = true;
                state.error = '';
                state.allUsers = action.payload.users
                
            }
        )
}