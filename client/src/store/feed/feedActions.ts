import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const getFeedPosts = createAsyncThunk(
    "feed/getFeedPosts",
    async (pageNum: number, thunkAPI) => {
        try {
            let limit = 5 + pageNum;
            let res = await api.get(`posts?limit=${limit}`);
            if (res.status !== 200) {
                return thunkAPI.rejectWithValue(res.data);
            }

            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const getPostComments = createAsyncThunk(
    "feed/getPostComments",
    async (postId: number, thunkAPI) => {
        try {
            const commentsPostRes = await api.get(`comments/post/${postId}`)
            if (commentsPostRes.status !== 200) {
                return thunkAPI.rejectWithValue(commentsPostRes.data);
            }

            return commentsPostRes.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)