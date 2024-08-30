import {UserData} from "./userTypes.ts";

export type MessageType = {
    _id: string;
    senderId: string,
    receiverId: string,
    createdAt: string,
    updatedAt: string,
}

export type ChatRoom = {
    participants: string[],
    messages: string[],
}

export type ChatState = {
    messages: MessageType[],
    chatRooms: ChatRoom[],
    curChatRoom?: ChatRoom,
    sidebarUsers: UserData[],
    isSuccess: boolean,
    isLoadingChat: boolean,
    isLoadingMessages: boolean
    error: string
}