export type PostType = {
    _id: string,
    userId: string,
    userName: string,
    body: string,
    images: string[],
    tags: string[],
    countLikes: number,
    created: string,
}

export type BlogState = {
    posts: PostType[],
    isLoadingPosts: boolean,
    isMessagePost: boolean,
    isSuccess: boolean,
    error: string,
}