import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit"
import {ChatState} from "../types/chatTypes"
import {getChatMessagesHandler, getChatRoomsHandler} from "../handlers/chatHandlers.ts";

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
    extraReducers(builder: ActionReducerMapBuilder<ChatState>) {
        getChatRoomsHandler(builder)
        getChatMessagesHandler(builder)
    }
});

export const {setSidebarUsers} = chatSlice.actions
export default chatSlice.reducer
