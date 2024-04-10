export type USER_DATA = Partial<{
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string
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