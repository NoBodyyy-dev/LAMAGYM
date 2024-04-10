import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./users/userSlice";
import BlogSlice from "./blog/BlogSlice";
import feedSlice from "./feed/feedSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        blog: BlogSlice,
        feed: feedSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch