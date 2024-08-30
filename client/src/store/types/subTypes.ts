export type SubType = {
    _id: string,
    creatorId: string,
    title: string,
    description: string,
    price: number,
    level: number,
    subAction: string | number,
}

export type SubState = {
    subs: SubType[],
    isLoadingSubs: boolean,
    isSuccess: boolean,
    error?: string,
}

export type GetSubType = {
    _id: string,
    image: string,
    role: string
}