import {createAsyncThunk} from "@reduxjs/toolkit/react";
import api from "../api";
import {FieldData} from "../types/userTypes.ts"

export const loginFunc = createAsyncThunk(
    "user/loginFunc", async (payload: FieldData, thunkAPI) => {
        try {
            const response = await api.post("user/login", payload, {withCredentials: true});
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const signUpFunc = createAsyncThunk(
    "user/signUpFunc", async (payload: FieldData, thunkAPI) => {
        try {
            const response = await api.post("user/register", payload, {withCredentials: true});
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const getMe = createAsyncThunk(
    "user/getMe", async (_, thunkAPI) => {
        try {
            const response = await api.get("user/refresh", {withCredentials: true})
            console.log("<<<<<<<", response.data.accessToken)
            if (response.status === 200) {
                const getUser = await api.get("user/me", {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${response.data.accessToken}`
                    }
                });
                return {userData: getUser.data, tokens: response.data}
            } else return thunkAPI.rejectWithValue(response.data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const getCurrentUserInfoFunc = createAsyncThunk(
    "user/getCurrentUserInfo", async (userId: string, thunkAPI) => {
        try {
            const response = await api.get(`user/profile/${userId}`)
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const getAllUsersFunc = createAsyncThunk(
    "user/getAllUsers", async (_, thunkAPI) => {
        try {
            const response = await api.get("user/all")
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
