const {Server} = require("socket.io")
const express = require("express")

const User = require("../models/User");
const Message = require("../models/Message");
const ChatRoom = require("../models/ChatRoom");
const {validateAccessToken} = require("../utils/jwt")
const {clientUrl} = require("../config/config")
const getChatRoom = require("../helpers/getChatRoom")
const http = require("node:http");
const APIError = require("../utils/error");
const mongoose = require("mongoose");

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: clientUrl,
        credentials: true
    }
})

const onlineUsers = new Set()

io.on("connection", async (socket) => {
    console.log(`Connect ${socket.id}`);
    const token = socket.handshake.auth.token;
    const user = await validateAccessToken(token);

    if (user === null) return APIError.UnauthorizedError();

    socket.join(user.id);
    onlineUsers.add(user.id.toString())

    io.emit("onlineUser", Array.from(onlineUsers));

    socket.on("message-page", async (userId) => {
        const userDetails = await User
            .findOne()
            .where("_id").equals(userId)
            .select("-password");

        const userDetToObject = userDetails.toObject();
        const payload = {
            ...userDetToObject,
            isOnline: onlineUsers.has(userId),
        };
        socket.emit("message-user", payload);

        const getChatRoomMessages = await ChatRoom.findOne({
            participants: {$all: [user.id, new mongoose.Types.ObjectId(userId)]}
        })
            .populate("messages")
            .sort("-updatedAt");
        console.log(getChatRoomMessages)

        socket.emit("message", getChatRoomMessages.messages);
    });

    socket.on("new message", async (data) => {
        const chatRoom = await ChatRoom.findOne({
            participants: {$all: [data.senderId, data.receiverId]}
        });

        const message = new Message({
            text: data.text,
            senderId: user.id,
            receiverId: data.senderId,
        });
        const saveMessage = await message.save();

        const updateChatRoom = await ChatRoom.updateOne({_id: chatRoom._id}, {
            $push: {messages: saveMessage._id}
        });

        const getChatRoomMessages = await ChatRoom.findOne({
            participants: {$all: [data.senderId, data.receiverId]}
        })
            .populate("messages")
            .sort("-updatedAt");

        io.to(data.senderId).emit("message", getChatRoomMessages.messages || []);
        io.to(data.receiverId).emit("message", getChatRoomMessages.messages || []);

        const senderChatRoom = await getChatRoom(data.senderId);
        const receiverChatRoom = await getChatRoom(data.receiverId);

        io.to(data.senderId).emit("chatRoom", senderChatRoom);
        io.to(data.receiverId).emit("chatRoom", receiverChatRoom);
    });

    socket.on("sidebar", async (currentUserId) => {
        const chatRoom = await getChatRoom(currentUserId);
        socket.emit("chatRoom", chatRoom);
    });

    socket.on("createChat", async (userId) => {
        const findChatRoom = await ChatRoom.findOne({
            participants: {$all: [user.id, userId]}
        })

        if (findChatRoom === null || !findChatRoom._id) {
            const createChatRoom = await ChatRoom.create({
                participants: [user.id, userId]
            })

            io.to(userId.senderId).emit("message", createChatRoom.messages || []);
            io.to(userId.receiverId).emit("message", createChatRoom.messages || []);

            const senderChatRoom = await getChatRoom(user.id);
            const receiverChatRoom = await getChatRoom(userId);

            io.to(user.id).emit("chatRoom", senderChatRoom);
            io.to(userId).emit("chatRoom", receiverChatRoom);
        }
    })

    socket.on("seen", async (receiverId) => {
        let chatRoom = await ChatRoom
            .findOne()
            .where("participants").equals({$all: [user.id, receiverId]});
        const chatRoomMessagesId = chatRoom.messages || [];
        const updateMessages = await Message.updateMany(
            {_id: {$in: chatRoomMessagesId}, receiverId: receiverId},
            {$set: {seen: true}}
        );

        const conversationSender = await getChatRoom(user?._id?.toString());
        const conversationReceiver = await getChatRoom(receiverId);

        io.to(user?._id?.toString()).emit('conversation', conversationSender);
        io.to(receiverId).emit('conversation', conversationReceiver);
    });

    socket.on("disconnect", () => {
        onlineUsers.delete(String(user.id));
        console.log("disconnect user", socket.id);
    });
});

module.exports = {app, server};