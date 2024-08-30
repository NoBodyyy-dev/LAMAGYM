import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit"
import {BlogState} from "../types/blogTypes.ts"
import {
    createCommentHandler,
    createPostHandler,
    getAllPostsHandler,
    getAllTagsHandler,
    getPostCommentsHandler,
    getUserPostsHandler
} from "../handlers/blogHandlers"
import { createCommentFunc } from "../actions/blogAction.ts";

const initialState: BlogState = {
    posts: [],
    userPosts: [],
    comments: [],
    isLoadingPosts: false,
    tags: [],
    isLoadingTags: false,
    isMessagePost: false,
    isSuccess: false,
    error: "",
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers(builder: ActionReducerMapBuilder<BlogState>) {
        createPostHandler(builder);
        createCommentHandler(builder);
        getAllTagsHandler(builder);
        getAllPostsHandler(builder);
        getUserPostsHandler(builder);
    }
});

export default blogSlice.reducer
