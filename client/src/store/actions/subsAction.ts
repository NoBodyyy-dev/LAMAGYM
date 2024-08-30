import {createAsyncThunk} from "@reduxjs/toolkit/react";
import api from "../api.ts";

export const createSubFunc = createAsyncThunk(
    "sub/createSubFunc", async (payload: {
        title: string,
        description: string,
        price: number,
        level: number,
    }, thunkAPI) => {
        try {
            const response = await api.post("sub/createSub", payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const buySubFunc = createAsyncThunk(
    "sub/buySubFunc", async (subId: string, thunkAPI) => {
        try {
            const response = await api.post("sub/buy", subId, {
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

export const updateSubFunc = createAsyncThunk(
    "sub/updateSubFunc", async (payload, thunkAPI) => {
        try {
            const response = await api.put(`sub/updateSub/${payload.subId}`, payload, {
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

export const getUserSubs = createAsyncThunk(
    "sub/getUserSubs", async (payload: string, thunkAPI) => {
        try {
            const response = await api.get(`sub/subsUser/${payload}`)
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)