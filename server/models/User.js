const {Schema, model} = require("mongoose")

const emailMatch = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const User = new Schema({
    username: {type: String, required: true, trim: true},
    email: {type: String, required: true, match: emailMatch, trim: true},
    password: {type: String, required: true, trim: true},
    image: {type: String, trim: true, default: "/undefind-logo.png"},
    role: {type: String, trim: true, enum: ["User", "Admin"], default: "User"},
    countSubscribers: {type: Number, required: true, default: 0, min: 0},
    likedPosts: {type: Array(Schema.Types.ObjectId), ref: "Post", default: []},
    subsOwner: {type: Array(Schema.Types.ObjectId), ref: "Sub", default: []},
    subsOnUsers: {type: Array(Schema.Types.ObjectId), ref: "User", default: []},
    purchasedSubs: {type: Array(Schema.Types.ObjectId), ref: "Sub", default: []},
    reports: {type: Array(Schema.Types.ObjectId), ref: "Report", default: []},
    tags: {type: Array(String), trim: true, default: []},
    banned: {type: Boolean, required: true, default: false},
    isOnline: {type: Boolean, default: false},
})

module.exports = model("User", User)
