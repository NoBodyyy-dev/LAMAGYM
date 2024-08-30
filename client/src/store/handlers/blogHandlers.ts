import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {BlogState} from "../types/blogTypes";
import {
    createCommentFunc,
    createPostFunc,
    getAllPostsFunc,
    getAllTags,
    getPostCommentsFunc,
    getUserPostsFunc
} from "../actions/blogAction";

export const createPostHandler = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(createPostFunc.pending,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (state: BlogState, _) => {
                state.isMessagePost = true
                state.isSuccess = false
            })
        .addCase(createPostFunc.rejected,
            (state: BlogState, action) => {
                state.isMessagePost = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(state.error)
            })
        .addCase(createPostFunc.fulfilled,
            (state: BlogState, action) => {
                state.isMessagePost = false;
                state.isSuccess = true;
                state.userPosts = [action.payload.post, ...state.userPosts]
            })
}

export const createCommentHandler = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(createCommentFunc.pending,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (state: BlogState, _) => {
                state.isLoadingPosts = true
                state.isSuccess = false
            })
        .addCase(createCommentFunc.rejected,
            (state: BlogState, action) => {
                state.isLoadingPosts = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(state.error)
            })
        .addCase(createCommentFunc.fulfilled,
            (state: BlogState, action) => {
                state.isLoadingPosts = false;
                state.isSuccess = true;
                state.comments = [action.payload.comment, ...state.comments]
                console.log(action);
                
            })
}

export const getAllPostsHandler = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(getAllPostsFunc.pending,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                state.posts = [...action.payload.posts]
                state.isSuccess = true
                console.log(">>>", action)
            })
}

export const getAllTagsHandler = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(getAllTags.pending,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (state: BlogState, _) => {
                state.isLoadingTags = true
                state.isSuccess = false
            })
        .addCase(getAllTags.rejected,
            (state: BlogState, action) => {
                state.isLoadingTags = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.error.message!)
            })
        .addCase(getAllTags.fulfilled,
            (state: BlogState, action) => {
                state.isLoadingTags = false
                state.isSuccess = true
                state.tags = action.payload
            })
}

export const getPostCommentsHandler = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(getPostCommentsFunc.pending,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (state: BlogState, _) => {
                state.isLoadingTags = true
                state.isSuccess = false
            })
        .addCase(getPostCommentsFunc.rejected,
            (state: BlogState, action) => {
                state.isLoadingTags = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.error.message!)
            })
        .addCase(getPostCommentsFunc.fulfilled,
            (state: BlogState, action) => {
                state.isLoadingTags = false
                state.isSuccess = true
                state.comments = action.payload.comments
            })
}

export const getUserPostsHandler = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(getUserPostsFunc.pending,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (state: BlogState, _) => {
                state.isLoadingPosts = true
                state.isSuccess = false
            })
        .addCase(getUserPostsFunc.rejected,
            (state: BlogState, action) => {
                state.isLoadingPosts = false
                state.isSuccess = false
                state.error = action.error.message!
                console.log(action.error.message!)
            })
        .addCase(getUserPostsFunc.fulfilled,
            (state: BlogState, action) => {
                state.isLoadingPosts = false
                state.isSuccess = true
                state.userPosts = action.payload.posts
            })
}