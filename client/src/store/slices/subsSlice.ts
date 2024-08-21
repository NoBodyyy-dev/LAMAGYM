import {createSlice} from "@reduxjs/toolkit"
import {getUserSubsHandler} from "../handlers/subsHandlers.ts";

const initialState = {
    subs: [],
    isLoadingSubs: false,
    isSuccess: false,
    error: "",
}

const subsSlice = createSlice({
    name: "subs",
    initialState,
    reducers: {},
    extraReducers(builder) {
        getUserSubsHandler(builder)
    }
})

export default subsSlice.reducer;