import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit"
import {createSubHandler, getUserSubsHandler, updateSubHandler} from "../handlers/subsHandlers.ts";
import {SubState} from "../types/subTypes.ts";

const initialState: SubState = {
    subs: [],
    isLoadingSubs: false,
    isSuccess: false,
    error: "",
}

const subsSlice = createSlice({
    name: "subs",
    initialState,
    reducers: {},
    extraReducers(builder: ActionReducerMapBuilder<SubState>) {
        getUserSubsHandler(builder);
        createSubHandler(builder);
        updateSubHandler(builder);
    }
})

export default subsSlice.reducer;