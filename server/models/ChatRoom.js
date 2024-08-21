const {Schema, model} = require('mongoose');

const ChatRoom = new Schema({
    participants: {type: Array(Schema.Types.ObjectId), ref: 'User'},
    messages: {type: Array(Schema.Types.ObjectId), ref: 'Message', default: []},
}, {timestamps: true});

module.exports = model("ChatRoom", ChatRoom);