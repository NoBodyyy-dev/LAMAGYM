import {configureStore} from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import blogSlice from "./slices/blogSlice";
import subsSlice from "./slices/subsSlice";
import chatSlice from "./slices/chatSlice";

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: false,
        }
    ),
    reducer: {
        user: userSlice,
        blog: blogSlice,
        subs: subsSlice,
        chat: chatSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch