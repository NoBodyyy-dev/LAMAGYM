import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { BlogState } from "./BlogTypes"
import { getPostComments, getSubs, getUserProfile } from "./BlogActions"

export const getUserProfileHandler = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(getUserProfile.pending,
            (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.error = ''
            }
        )
        .addCase(getUserProfile.rejected,
            (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.error = action.error.message!
            }
        )
        .addCase(getUserProfile.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.error = undefined;
                state.profileUser = action.payload[0]
                state.posts = action.payload[1]
            }
        )
}

export const getPostCommentsHandler = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(getPostComments.pending,
            (state) => {
                state.isLoadingComments = true;
            }
        )
        .addCase(getPostComments.rejected,
            (state) => {
                state.isLoadingComments = false;
                state.isSuccess = false;
                // state.error = action.payload
            }
        )
        .addCase(getPostComments.fulfilled,
            (state, action) => {
                state.posts = state.posts.map((post) => {
                    if (post.id == action.payload.comments[0].postId) {
                        post.comments = action.payload.comments;
                    }
                    return post;
                })

                state.isLoadingComments = false;
                state.isSuccess = true;
            }
        )
}

export const getSubsHandler = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(getSubs.pending,
            (state) => {
                state.isLoading = true;
            }
        )
        .addCase(getSubs.rejected,
            (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                // state.error = action.payload
            }
        )
        .addCase(getSubs.fulfilled,
            (state, action) => {
                state.subs = action.payload
                state.isSuccess = true
                state.isLoading = false
            }
        )
}