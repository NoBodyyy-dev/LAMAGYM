import { createSlice } from "@reduxjs/toolkit"
import { BlogState } from "./BlogTypes"
import { getPostCommentsHandler, getSubsHandler, getUserProfileHandler } from "./BlogHandlers"

const initialState: BlogState = {
    profileUser: {},
    posts: [],
    isLoading: false,
    isSuccess: false,
    error: undefined,
    isLoadingComments: false,
    subs: [
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
    ],
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        getUserProfileHandler(builder);
        getPostCommentsHandler(builder);
        getSubsHandler(builder);
    }
})

export const { } = blogSlice.actions
export default blogSlice.reducer

