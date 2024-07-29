const {model, Schema} = require("mongoose")

const Post = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    userName: {type: String, required: true},
    body: {type: String, required: true, trim: true},
    images: {type: Array(String), default: [], maxLength: 10},
    tags: {type: Array(String), default: []},
    countLikes: {type: Number, default: 0, min: 0},
    created: {type: Date, default: Date.now()},
})

module.exports = model("Post", Post)
