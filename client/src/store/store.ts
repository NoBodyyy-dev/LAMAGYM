import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import blogSlice from "./slices/blogSlice.ts";

export const store = configureStore({
    reducer: {
        user: userSlice,
        blog: blogSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch