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
    "user/signUpFunc", async (payload: {
        username: string,
        email: string,
        password: string,
        image: string
    }, thunkAPI) => {
        try {
            const response = await api.post("user/register", payload, {withCredentials: true});
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const logoutFunc = createAsyncThunk(
    "user/logoutFunc", async (_, thunkAPI) => {
        try {
            const response = await api.post("user/logout", {}, { withCredentials: true })
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const buySubFunc = createAsyncThunk(
    "sub/buySubFunc", async (subId: string, thunkAPI) => {
        try {
            const response = await api.post("sub/buy", {subId: subId}, {
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


export const subOnUserFunc = createAsyncThunk(
    "user/subOnUserFunc", async (userName: string, thunkAPI) => {
        try {
            const response = await api.post("user/subOnUser", {userName: userName}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const unsubOnUserFunc = createAsyncThunk(
    "user/unsubOnUserFunc", async (userName: string, thunkAPI) => {
        try {
            const response = await api.post("user/unsubOnUser", {userName: userName}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

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

export const updateMeFunc = createAsyncThunk(
    "user/updateMe", async (payload: {
        _id: string,
        image: string | null,
    }, thunkAPI) => {
        try {
            const response = await api.put(`user/updateUser/`, payload, {
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

export const getUserProfileFunc = createAsyncThunk(
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
            const response = await api.get("user/all", {
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