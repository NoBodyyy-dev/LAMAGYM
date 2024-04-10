import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,    
}

const modalSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        openModal(state) {
            state.isOpen = true
        },
        closeModal(state) {
            state.isOpen = false
        }
    },
})

export const { } = modalSlice.actions
export default modalSlice.reducer

