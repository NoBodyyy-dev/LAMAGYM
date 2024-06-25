export type ReportData = {
    reportName: string,
    reportedUsers: string,
}

export type USER_DATA = Partial<{
    id: string,
    username: string,
    email: string,
    banned: boolean,
    countSubscribers: number,
    reports: ReportData[],
    subOn: string[],
    tags: string[],

}>

export type USER_STATE = {
    curUser?: USER_DATA,
    isLoading: boolean,
    isLoadingSearchUsers: boolean,
    isSuccess: boolean,
    error: string,
    token: string
    allUsers: USER_DATA[]
}

export type USER_LOGIN_DATA = {
    username: string,
    password: string
}

export type RegData = {
    username: string,
    password: string
}