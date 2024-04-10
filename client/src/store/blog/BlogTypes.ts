import { USER_DATA } from "../users/USER_TYPES"

export type commentType = {
    id: number,
    body: string,
    postId: number,
    user: {
        id: number,
        username: string
    }
}

export type SubscriptionType = {
    id: number,
    profileId: number,
    title: string,
    description: string,
    price: number,
    image?: string,
}

export type PostType = {
    map(arg0: (post: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode
    id: number,
    title: string,
    body: string,
    userId: number,
    tags: string[],
    reactions: number,
    comments: commentType[],
}

export type BlogState = {
    profileUser: USER_DATA,
    posts: PostType[],
    subs: SubscriptionType[],
    isLoading: boolean,
    isSuccess: boolean,
    error?: string,
    isLoadingComments: boolean,
}