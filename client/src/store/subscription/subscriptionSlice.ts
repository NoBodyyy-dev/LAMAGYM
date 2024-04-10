import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { SUB_STATE, SUB_ITEM } from "./SUBSCRIPTION_TYPES";

const initialState: SUB_STATE = {
    subArray: [
        {
            id: 1,
            userId: 15,
            title: 'bimbim',
            description: '(((hehehe)))',
            price: 2,
            image: 'hehhe',
        },
        {
            id: 2,
            userId: 15,
            title: 'hoho',
            description: 'ufufufu',
            price: 2,
            image: 'hehhe',
        },
        {
            id: 3,
            userId: 1,
            title: 'lululala',
            description: 'w;ksvlknn',
            price: 2,
            image: 'hehhe',
        }
    ],
}

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {

    },
})

export const { } = subscriptionSlice.actions
export default subscriptionSlice.reducer

