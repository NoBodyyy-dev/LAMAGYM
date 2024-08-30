import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {UserState} from "../types/userTypes";
import {
    buySubFunc,
    getAllUsersFunc,
    getMe,
    getUserProfileFunc,
    loginFunc, logoutFunc,
    signUpFunc, subOnUserFunc, unsubOnUserFunc, updateMeFunc
} from "../actions/userActions";

export const signUpFuncHandler = (builder: ActionReducerMapBuilder<UserState>): void => {
    builder
        .addCase(signUpFunc.pending,
            (state: UserState) => {
                state.isLoading = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(signUpFunc.rejected,
            (state: UserState, action): void => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.payload)
            }
        )
        .addCase(signUpFunc.fulfilled,
            (state: UserState, action): void => {
                console.log("HAHAHAHAH")
                state.isLoading = false;
                state.isSuccess = true;
                state.error = '';
                state.curUser = action.payload.userData;
                state.token = action.payload.tokens.accessToken;
                localStorage.setItem('token', action.payload.tokens.accessToken)
            }
        )

}

export const loginFuncHandler = (builder: ActionReducerMapBuilder<UserState>): void => {
    builder
        .addCase(loginFunc.pending,
            (state: UserState) => {
                state.isLoading = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(loginFunc.rejected,
            (state: UserState, action): void => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.payload)
            }
        )
        .addCase(loginFunc.fulfilled,
            (state: UserState, action): void => {
                state.isLoading = false;
                state.isSuccess = true;
                state.error = '';
                state.curUser = action.payload.userData;
                localStorage.setItem('token', action.payload.tokens.accessToken)
            }
        )
}

export const logoutFuncHandler = (builder: ActionReducerMapBuilder<UserState>): void => {
    builder
        .addCase(logoutFunc.pending,
            (state: UserState) => {
                state.isLoading = true
            })
        .addCase(logoutFunc.rejected,
            (state: UserState, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
            })
        .addCase(logoutFunc.fulfilled,
            (state: UserState) => {
                state.curUser = {};
                state.error = '';
                state.isLoading = false;
                state.isSuccess = false;
                state.token = '';
                localStorage.clear();
            })
}

export const updateMeHandler = (builder: ActionReducerMapBuilder<UserState>): void => {
    builder
        .addCase(updateMeFunc.pending,
            (state: UserState) => {
                state.isLoading = true
            }
        )
        .addCase(updateMeFunc.rejected,
            (state: UserState, action): void => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.payload)
            }
        )
        .addCase(updateMeFunc.fulfilled,
            (state: UserState, action): void => {
                state.isSuccess = true;
                state.isLoading = false;
                state.error = '';
                state.curUser = action.payload
            }
        )
}

export const subOnUserHandler = (builder: ActionReducerMapBuilder<UserState>): void => {
    builder
        .addCase(subOnUserFunc.pending,
            (state: UserState) => {
                state.isLoading = true
            }
        )
        .addCase(subOnUserFunc.rejected,
            (state: UserState, action): void => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.payload)
            }
        )
        .addCase(subOnUserFunc.fulfilled,
            (state: UserState, action): void => {
                state.isSuccess = true;
                state.isLoading = false;
                state.error = '';
                state.profileUser!.countSubscribers!++;
                state.curUser?.subsOnUsers?.push(action.payload);
            }
        )
}

export const unsubOnUserHandler = (builder: ActionReducerMapBuilder<UserState>): void => {
    builder
        .addCase(unsubOnUserFunc.pending,
            (state: UserState) => {
                state.isLoading = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(unsubOnUserFunc.rejected,
            (state: UserState, action): void => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.payload)
            }
        )
        .addCase(unsubOnUserFunc.fulfilled,
            (state: UserState, action): void => {
                state.isLoading = false;
                state.isSuccess = true;
                state.error = '';
                state.profileUser!.countSubscribers!--;
                state.curUser?.subsOnUsers?.filter((id => id.toString() !== action.payload));
            }
        )
}

export const getMeHandler = (builder: ActionReducerMapBuilder<UserState>): void => {
    builder
        .addCase(getMe.pending,
            (state: UserState) => {
                state.isLoading = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(getMe.rejected,
            (state: UserState, action): void => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.payload)
            }
        )
        .addCase(getMe.fulfilled,
            (state: UserState, action): void => {
                state.isSuccess = true;
                state.error = '';
                state.curUser = action.payload.userData;
                localStorage.setItem('token', action.payload.tokens.accessToken)
                state.isLoading = false;
            }
        )
}

export const getUserProfileFuncHandler = (builder: ActionReducerMapBuilder<UserState>): void => {
    builder
        .addCase(getUserProfileFunc.pending,
            (state: UserState): void => {
                state.isLoading = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(getUserProfileFunc.rejected,
            (state: UserState, action): void => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.payload)
            }
        )
        .addCase(getUserProfileFunc.fulfilled,
            (state: UserState, action): void => {
                state.isSuccess = true;
                state.error = '';
                state.profileUser = action.payload.userData;
                state.isLoading = false;
            }
        )
}

export const getAllUsersHandler = (builder: ActionReducerMapBuilder<UserState>): void => {
    builder
        .addCase(getAllUsersFunc.pending,
            (state: UserState): void => {
                state.isLoadingSearchUsers = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(getAllUsersFunc.rejected,
            (state: UserState, action): void => {
                state.isLoadingSearchUsers = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.payload)
            }
        )
        .addCase(getAllUsersFunc.fulfilled,
            (state: UserState, action): void => {
                state.isLoadingSearchUsers = false;
                state.isSuccess = true;
                state.error = '';
                state.allUsers = action.payload
            }
        )
}

export const buySubHandler = (builder: ActionReducerMapBuilder<UserState>) => {
    builder
        .addCase(buySubFunc.pending,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (state: UserState, _) => {
                state.isLoading = true
            })
        .addCase(buySubFunc.rejected,
            (state: UserState, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.error.message!)
            })
        .addCase(buySubFunc.fulfilled,
            (state: UserState, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.curUser?.purchasedSubs?.push(action.payload._id)
                console.log(state.curUser)
            })
}