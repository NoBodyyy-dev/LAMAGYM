const {Schema, model} = require('mongoose');

const ChatRoom = new Schema({
    members: {type: Array(Schema.Types.ObjectId), ref: "User", length: {min: 2}}
})

module.exports = model("ChatRoom", ChatRoom);