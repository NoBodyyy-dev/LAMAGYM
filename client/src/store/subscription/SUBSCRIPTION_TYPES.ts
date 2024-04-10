export type SUB_STATE = {
    subArray: Array<SUB_ITEM>,
}

export type SUB_ITEM = {
    id: number,
    userId: number,
    title: string,
    description: string,
    price: number,
    image: string,
}