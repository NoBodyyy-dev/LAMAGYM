import {createAsyncThunk} from "@reduxjs/toolkit/react";
import api from "../api.ts";

export const createPostFunc = createAsyncThunk(
    "post/createPost", async (payload, thunkAPI) => {
        try {
            const response = await api.post("post/createPost", payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data)
            return thunkAPI.rejectWithValue(response.data)
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
             if (response.status !== 200) return  thunkAPI.rejectWithValue(response.data);
             return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)


