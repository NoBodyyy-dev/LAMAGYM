import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit"
import {ChatState} from "../types/chatTypes"

const initialState: ChatState = {
    chatRooms: [],
    curChatRoom: {
        messages: [],
        participants: []
    },
    messages: [],
    sidebarUsers: [],
    error: "",
    isSuccess: false,
    isLoadingChat: false,
    isLoadingMessages: false
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSidebarUsers: (state, action) => {
            state.sidebarUsers = action.payload
        }
    },
});

export const {setSidebarUsers} = chatSlice.actions
export default chatSlice.reducer
