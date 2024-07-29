const {Schema, model} = require('mongoose');

const Comment = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    postId: {type: Schema.Types.ObjectId, ref: "Post"},
    text: {type: String, required: true, trim: true},
})

module.exports = model("Comment", Comment);