import {createSlice} from "@reduxjs/toolkit"
import {BlogState} from "../types/blogTypes.ts"
import {createPostHandler, getAllPostsHandler} from "../handlers/blogHandlers"

const initialState: BlogState = {
    posts: [],
    isLoadingPosts: false,
    isMessagePost: false,
    isSuccess: false,
    error: "",
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers(builder) {
        createPostHandler(builder);
        getAllPostsHandler(builder);
    }
});

export default blogSlice.reducer
