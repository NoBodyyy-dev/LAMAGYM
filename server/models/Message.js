const {Schema, model} = require("mongoose")

const Message = new Schema({
    senderId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    receiverId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    seen: {type: Boolean, default: false},
    text: {type: String, required: true, trim: true},
}, {timestamps: true})

module.exports = model("Message", Message)
