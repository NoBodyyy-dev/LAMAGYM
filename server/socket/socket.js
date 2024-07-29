const {Server} = require("socket.io")

const User = require("../models/User");
const {clientUrl} = require("../config/config");

const io = new Server({
    cors: clientUrl
})

io.on("connection", (socket) => {
    console.log(`Connection ${socket.id}`)

    socket.on("userOnline", async (userId) => {
        const userOnline = await User.findOneAndUpdate({_id: userId}, {
            isOnline: true
        })
        console.log(userOnline)
    })
})

module.exports = io;