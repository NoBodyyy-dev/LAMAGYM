const {Schema, model} = require("mongoose")

const Message = new Schema({
    senderId: {type: Schema.Types.ObjectId, ref: "User"},
    chatId: {type: Schema.Types.ObjectId, ref: "Chat"},
    text: {type: String, required: true, trim: true},
    created: {type: Date, default: Date.now()},
})

module.exports = model("Message", Message)
