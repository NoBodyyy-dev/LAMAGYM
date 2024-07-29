import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {UserState} from "../types/userTypes";
import {getAllUsersFunc, getMe, loginFunc, signUpFunc} from "../actions/userActions";

export const signUpFuncHandler = (builder: ActionReducerMapBuilder<UserState>) => {
    builder
        .addCase(signUpFunc.pending,
            (state: UserState) => {
                state.isLoading = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(signUpFunc.rejected,
            (state: UserState, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.payload)
            }
        )
        .addCase(signUpFunc.fulfilled,
            (state: UserState, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.error = '';
                state.curUser = action.payload.userData;
                state.token = action.payload.tokens.accessToken;
                localStorage.setItem('token', action.payload.tokens.accessToken)
            }
        )

}

export const loginFuncHandler = (builder: ActionReducerMapBuilder<UserState>) => {
    builder
        .addCase(loginFunc.pending,
            (state: UserState) => {
                state.isLoading = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(loginFunc.rejected,
            (state: UserState, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.payload)
            }
        )
        .addCase(loginFunc.fulfilled,
            (state: UserState, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.error = '';
                state.curUser = action.payload.userData;
                localStorage.setItem('token', action.payload.tokens.accessToken)
            }
        )
}

export const getMeHandler = (builder: ActionReducerMapBuilder<UserState>) => {
    builder
        .addCase(getMe.pending,
            (state: UserState) => {
                state.isLoading = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(getMe.rejected,
            (state: UserState, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.payload)
            }
        )
        .addCase(getMe.fulfilled,
            (state: UserState, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.error = '';
                state.curUser = action.payload.userData;
                localStorage.setItem('token', action.payload.tokens.accessToken)
            }
        )
}

export const getAllUsersHandler = (builder: ActionReducerMapBuilder<UserState>) => {
    builder
        .addCase(getAllUsersFunc.pending,
            (state: UserState) => {
                state.isLoadingSearchUsers = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(getAllUsersFunc.rejected,
            (state: UserState, action) => {
                state.isLoadingSearchUsers = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.payload)
            }
        )
        .addCase(getAllUsersFunc.fulfilled,
            (state: UserState, action) => {
                state.isLoadingSearchUsers = false;
                state.isSuccess = true;
                state.error = '';
                state.allUsers = action.payload
            }
        )
}