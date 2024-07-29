import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {BlogState} from "../types/blogTypes";
import {createPostFunc, getAllPostsFunc} from "../actions/blogAction";

export const createPostHandler = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(createPostFunc.pending,
            (state: BlogState, _) => {
                state.isMessagePost = true
                state.isSuccess = false
            })
        .addCase(createPostFunc.rejected,
            (state: BlogState, action) => {
                state.isMessagePost = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.error.message!)
            })
        .addCase(createPostFunc.fulfilled,
            (state: BlogState, _) => {
                state.isMessagePost = false;
                state.isSuccess = true;
            })
}

export const getAllPostsHandler = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(getAllPostsFunc.pending,
            (state: BlogState, _) => {
                state.isLoadingPosts = true
                state.isSuccess = false
            })
        .addCase(getAllPostsFunc.rejected,
            (state: BlogState, action) => {
                state.isLoadingPosts = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.error.message!)
            })
        .addCase(getAllPostsFunc.fulfilled,
            (state: BlogState, action) => {
                state.isLoadingPosts = false
                state.isSuccess = true
                state.posts = action.payload.posts
            })
}