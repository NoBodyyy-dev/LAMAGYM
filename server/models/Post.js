const {model, Schema} = require("mongoose")

const Post = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    userName: {type: String, required: true},
    subId: {type: Schema.Types.ObjectId, ref: "Sub", required: false},
    body: {type: String, required: true, trim: true},
    image: {type: String, default: ""},
    tags: {type: Array(String), default: []},
    comments: {type: Array(Schema.Types.ObjectId), ref: "Comment", default: []},
    countLikes: {type: Number, default: 0, min: 0},
}, {timestamps: true})

module.exports = model("Post", Post)
