import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { feedState } from "./feedTypes";
import { getFeedPosts } from "./feedActions";
import { getPostComments } from "../blog/BlogActions";


export const getFeedPostsHandlers = (builder: ActionReducerMapBuilder<feedState>) => {
    builder
        .addCase(getFeedPosts.pending, (state) => {
            state.isLoadingFeed = true;
            state.isSuccess = false;
            state.error = '';
        })
        .addCase(getFeedPosts.rejected, (state) => {
            state.isLoadingFeed = false;
            state.isSuccess = false;
            // state.error = action.error.message;
        })
        .addCase(getFeedPosts.fulfilled, (state, action) => {
            state.isLoadingFeed = false;
            state.isSuccess = true;
            state.error = '';
            state.posts = [... state.posts, ...action.payload.posts];
        });
};

export const getPostCommentsHandler = (builder: ActionReducerMapBuilder<feedState>) => {
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