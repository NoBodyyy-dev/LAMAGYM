import {GetSubType} from "./subTypes.ts";

export type PostType = {
    _id: string,
    user: {
        _id: string,
        image: string,
        role: string
    },
    subId: GetSubType,
    userName: string,
    body: string,
    comments: string[],
    image: string,
    tags: string[],
    countLikes: number,
    createdAt: string,
    updatedAt: string
}

export type CommentType = {
    _id: string,
}

export type BlogState = {
    posts: PostType[],
    userPosts: PostType[],
    comments: CommentType[]
    tags: string[],
    isLoadingTags: boolean,
    isLoadingPosts: boolean,
    isMessagePost: boolean,
    isSuccess: boolean,
    error: string,
}

