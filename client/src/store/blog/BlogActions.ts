import { createAsyncThunk } from "@reduxjs/toolkit/react";
import api from "../api";

export const getUserProfile = createAsyncThunk(
    "blog/getUserProfile",
    async (username: string, thunkAPI) => {
        try {
            const profileUserRes = await api.get(`users/filter?key=username&value=${username}`)

            if (profileUserRes.status !== 200) {
                return thunkAPI.rejectWithValue(profileUserRes.data);
            }
            let userPostsRes = await api.get(`users/${profileUserRes.data.users[0].id}/posts`)

            if (userPostsRes.status !== 200) {
                return thunkAPI.rejectWithValue(userPostsRes.data);
            }

            return [profileUserRes.data.users[0], userPostsRes.data.posts]
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getPostComments = createAsyncThunk(
    "blog/getPostComments",
    async (postId: number, thunkAPI) => {
        try {
            const commentsPostRes = await api.get(`comments/post/${postId}`)
            if (commentsPostRes.status !== 200) {
                return thunkAPI.rejectWithValue(commentsPostRes.data);
            }
            console.log(commentsPostRes);

            return commentsPostRes.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getSubs = createAsyncThunk(
    "blog/getSubs",
    async (profileId: number, thunkAPI) => {
        try {
            const res = SUBS.filter((sub) => {
                if (sub.profileId == profileId) {
                    return sub
                }
            })

            // return res.data
            return res
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const subOnUser = createAsyncThunk(
    "blog/subOnUser",
    async (profileId: number, thunkAPI) => {
        try {
            const resSub = await api.get(`users/subs/${profileId}`)

            if (resSub.status !== 200) {
                return thunkAPI.rejectWithValue(resSub.data);
            }

            return resSub.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const SUBS = [
    {
        id: 1,
        profileId: 15,
        title: 'bimbim',
        description: '(((hehehe)))',
        price: 2,
        image: 'hehhe',
    },
    {
        id: 2,
        profileId: 15,
        title: 'hoho',
        description: 'ufufufu',
        price: 2,
        image: 'hehhe',
    },
    {
        id: 3,
        profileId: 1,
        title: 'lululala',
        description: 'w;ksvlknn',
        price: 2,
        image: 'hehhe',
    }
]