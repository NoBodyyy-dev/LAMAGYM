import { createSlice } from "@reduxjs/toolkit";
import { feedState } from "./feedTypes";
import { getFeedPostsHandlers, getPostCommentsHandler } from "./feedHandlers";

const initialState: feedState = {
    posts: [],
    page: 1,
    isLoadingFeed: false,
    isLoadingComments: false,
    isSuccess: false,
    error: '',
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        increment(state) {
            if (state.page != 15) state.page += 1;
        },
        decrement: (state) => {
            if (state.page != 1) state.page -= 1;
        },
    },
    extraReducers(builder) {
        getFeedPostsHandlers(builder);
        getPostCommentsHandler(builder)
    },
})



export const { increment, decrement } = feedSlice.actions

export default feedSlice.reducer