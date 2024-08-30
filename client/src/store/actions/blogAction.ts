import {createAsyncThunk} from "@reduxjs/toolkit/react";
import api from "../api.ts";

export const createPostFunc = createAsyncThunk(
    "post/createPost", async (payload: {
        body: string,
        tags: string[],
        image: string,
    }, thunkAPI) => {
        try {
            const response = await api.post("post/createPost", payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const createCommentFunc = createAsyncThunk(
    "post/createComment", async (payload: {text: string, postId: string}, thunkAPI) => {
        try {
            console.log("<<>>" ,payload.postId);
            
            const response = await api.post(`comment/createComment/${payload.postId}`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const getAllPostsFunc = createAsyncThunk(
    "post/getAllPosts", async (page: number, thunkAPI) => {
        try {
            const response = await api.get(`post/all/${page}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response);
            
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const getAllTags = createAsyncThunk(
    "post/getAllTags", async (_, thunkAPI) => {
        try {
            const response = await api.get(`post/tags`)
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const getPostCommentsFunc = createAsyncThunk(
    "blog/getPostCommentsFunc", async (id: string, thunkAPI) => {
        try {
            const response = await api.get(`comment/getPostComment/${id}`, {})
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const getUserPostsFunc = createAsyncThunk(
    "user/getUserPosts", async (payload: {
        username: string,
        page: number
    }, thunkAPI) => {
        try {
            const response = await api.get(`post/posts/${payload.username}/${payload.page}`)
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
