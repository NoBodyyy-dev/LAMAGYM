const ChatRoom = require('../models/ChatRoom');

const getChatRoom = async (currentUserId) => {
    if (currentUserId) {
        let currentUserChatRoom = await ChatRoom.find({
            participants: {$all: [currentUserId]}
        }).sort({updatedAt: -1}).populate('messages').populate('participants')

        return currentUserChatRoom.map((chat) => {
            const countUnseenMsg = chat?.messages?.reduce((prev, curr) => {
                const msgByUserId = curr?.senderId?.toString()
                if (msgByUserId !== currentUserId) {
                    return prev + (curr?.seen ? 0 : 1)
                } else {
                    return prev
                }

            }, 0)

            return {
                _id: chat?._id,
                participants: chat.participants,
                unseenMsg: countUnseenMsg,
                lastMsg: chat.messages[chat?.messages?.length - 1]
            }
        })
    } else {
        return []
    }
}

module.exports = getChatRoom