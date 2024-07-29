export type ReportData = {
    reportName: string,
    reportedUsers: string,
}

export type UserData = Partial<{
    _id: string,
    username: string,
    email: string,
    password: string,
    image: string,
    role: string,
    countSubscribers: number,
    likedPosts: string[],
    subsOwner: string[],
    subsOnUsers: string[],
    purchasedSubs: string[],
    reports: ReportData[],
    tags: string[],
    banned: boolean,
    isOnline: boolean,
}>

export type UserState = {
    curUser?: UserData,
    profileUser?: UserData,
    isLoading: boolean,
    isLoadingSearchUsers: boolean,
    isSuccess: boolean,
    error: string,
    token: string
    allUsers: UserData[]
}

export type FieldData = {
    username: string,
    password: string
    email: string,
}