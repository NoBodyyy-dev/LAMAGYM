import { PostType } from "../blog/BlogTypes";

export type feedState = {
    posts: PostType[],
    page: number,
    isLoadingFeed: boolean,
    isLoadingComments: boolean,
    isSuccess: boolean,
    error: string,
}