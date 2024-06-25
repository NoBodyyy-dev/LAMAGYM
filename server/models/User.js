const {Schema, model} = require("mongoose")

const emailMatch = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const User = new Schema({
    username: {type: String, required: true, trim: true},
    email: {type: String, required: true, match: emailMatch, trim: true},
    password: {type: String, required: true, trim: true},
    image: {type: String, trim: true, default: ""},
    countSubscribers: {type: Number, required: true, default: 0, min: 0},
    subOn: [{type: Schema.Types.ObjectId, ref: "User"}],
    banned: {type: Boolean, required: true, default: false},
    reports: [{type: Schema.Types.ObjectId, ref: "Report"}],
    tags: [{type: String, trim: true}]
})

module.exports = model("User", User)
