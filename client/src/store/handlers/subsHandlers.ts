import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {buySubFunc, createSubFunc, getUserSubs, updateSubFunc} from "../actions/subsAction"
import {SubState} from "../types/subTypes"

export const getUserSubsHandler = (builder: ActionReducerMapBuilder<SubState>) => {
    builder
        .addCase(getUserSubs.pending,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (state: SubState, _) => {
                state.isLoadingSubs = true
                state.isSuccess = false
            })
        .addCase(getUserSubs.rejected,
            (state: SubState, action) => {
                state.isLoadingSubs = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.error.message!)
            })
        .addCase(getUserSubs.fulfilled,
            (state: SubState, action) => {
                state.isLoadingSubs = false
                state.isSuccess = true
                state.subs = action.payload
            })
}

export const createSubHandler = (builder: ActionReducerMapBuilder<SubState>) => {
    builder
        .addCase(createSubFunc.pending,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (state: SubState, _) => {
                state.isLoadingSubs = true
                state.isSuccess = false
            })
        .addCase(createSubFunc.rejected,
            (state: SubState, action) => {
                state.isLoadingSubs = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.error.message!)
            })
        .addCase(createSubFunc.fulfilled,
            (state: SubState, action) => {
                state.isLoadingSubs = false
                state.isSuccess = true
                state.subs = [...state.subs, action.payload]
            })
}

export const updateSubHandler = (builder: ActionReducerMapBuilder<SubState>) => {
    builder
        .addCase(updateSubFunc.pending,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (state: SubState, _) => {
                state.isLoadingSubs = true
                state.isSuccess = false
            })
        .addCase(updateSubFunc.rejected,
            (state: SubState, action) => {
                state.isLoadingSubs = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.error.message!)
            })
        .addCase(updateSubFunc.fulfilled,
            (state: SubState) => {
                state.isLoadingSubs = false
                state.isSuccess = true
            })
}

export const buySubHandler = (builder: ActionReducerMapBuilder<SubState>) => {
    builder
        .addCase(buySubFunc.pending,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (state: SubState, _) => {
                state.isLoadingSubs = true
                state.isSuccess = false
            })
        .addCase(buySubFunc.rejected,
            (state: SubState, action) => {
                state.isLoadingSubs = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.error.message!)
            })
        .addCase(buySubFunc.fulfilled,
            (state: SubState, action) => {
                state.isLoadingSubs = false
                state.isSuccess = true
                state.subs = [...state.subs, action.payload]
            })
}

