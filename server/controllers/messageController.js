const APIError = require("../utils/error");

const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');
const User = require('../models/User');
const {catchErrors} = require("../utils/utils")

const controller = {}

// Chat
controller.createChat = async (req, res, next) => {
    try {
        catchErrors(req, res, next);

        const user = req.user
        const {userId} = req.body;
        const findUser = await User.findOne({_id: userId})

        if (!findUser) return next(APIError.NotFound(`Пользователь ${userId} не найден`))

        const findChat = await ChatRoom.findOne({
            members: {$all: [user.id, userId]},
        })
        if (findChat) return res.json(findChat)
        const createChat = await ChatRoom.create({
            members: [user.id, userId],
        })

        return res.json(createChat)
    } catch (e) {
        next(e)
    }
}

controller.getUserChats = async (req, res, next) => {
    try {
        const user = req.user;
        const findUserChats = await ChatRoom.find({
            members: {$in: [user.id]},
        })

        return res.json(findUserChats)
    } catch (e) {
        next(e)
    }
}

controller.findChat = async (req, res, next) => {
    try {
        const user = req.user;
        const {secondUserId} = req.params;
        const findChat = await ChatRoom.findOne({
            members: {$all: [user.id, secondUserId]}
        })

        return res.json(findChat);
    } catch (e) {
        next(e)
    }
}

// Messages
controller.createMessage = async (req, res, next) => {
    try {
        catchErrors(req, res, next)

        const user = req.user;
        const {chatId, text} = req.body
        const createMessage = await Message.create({
            senderId: user.id,
            chatId: chatId,
            text: text,
        });

        return res.json(createMessage)
    } catch (e) {
        next(e);
    }
}

controller.updateMessage = async (req, res, next) => {
    try {
        catchErrors(req, res, next)

        const user = req.user;
        const {text} = req.body
        const {messageId} = req.params
        const findMessage = await Message.findOne({_id: messageId})

        if (findMessage.senderId === user.id) {
            findMessage.text = text;
            await findMessage.save()

            return res.json(findMessage)
        } else return APIError.ForbiddenError(`Пользователь ${user.id} не является автором сообщения ${findMessage.senderId}`)
    } catch (e) {
        next(e)
    }
}

controller.deleteMessage = async (req, res, next) => {
    try {
        const user  = req.user;
        const {messageId} = req.params
        const findMessage = await Message.findOne({_id: messageId})

        if (findMessage.senderId === user.id) {
            await Message.deleteOne({_id: messageId})
            return APIError.OK("Сообщение успешно удалено")
        } else return APIError.ForbiddenError(`Пользователь ${user.id} не является автором сообщения ${findMessage.senderId}`)
    } catch (e) {
        next(e)
    }
}
controller.getChatMessages = async (req, res, next) => {
    try {
        const findChatMessages = await Message.find({chatId: req.params.chatId})
        return res.json(findChatMessages)
    } catch (e) {
        next(e);
    }
}

module.exports = controller
