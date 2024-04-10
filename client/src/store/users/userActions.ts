import { createAsyncThunk } from "@reduxjs/toolkit/react";
import api from "../api";
import { RegData, USER_DATA } from "./USER_TYPES";

export const loginFunc = createAsyncThunk(
    "user/loginFunc",
    async (userLoginData: USER_DATA, thunkAPI) => {
        try {
            const res = await api.post('auth/login', userLoginData)

            if (res.status !== 200) {
                return thunkAPI.rejectWithValue(res.data)
            }

            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const signUpFunc = createAsyncThunk(
    "user/signUpFunc",
    async (payload: RegData, thunkAPI) => {
        try {
            let res = await api.post("users/add", {

                username: payload.username,
                password: payload.password,

            });

            if (res.status != 200) {
                return thunkAPI.rejectWithValue(res.data);
            }
            console.log(res.data)
            console.log(res)

            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getCurrentUserInfoFunc = createAsyncThunk(
    "user/getCurrentUserInfoFunc",
    async (token: string, thunkAPI) => {
        try {
            const res = await api.get('auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.status !== 200) {
                return thunkAPI.rejectWithValue(res.data);
            }

            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getAllUsersFunc = createAsyncThunk(
    "user/getAllUsersFunc",
    async (query: undefined, thunkAPI) => {
        try {
            const searchRes = await api.get(`users/`)

            if (searchRes.status !== 200) {
                return thunkAPI.rejectWithValue(searchRes.data);
            }

            return searchRes.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)