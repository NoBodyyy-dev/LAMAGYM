const Router = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {createChat, getUserChats} = require("../controllers/messageController")

const messageRouter = new Router();

messageRouter.post("/createChat", authMiddleware, createChat)

messageRouter.get("/getUserChats", authMiddleware, getUserChats)

module.exports = messageRouter;
