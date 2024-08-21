const {Schema, model} = require("mongoose")

const Tag = new Schema({
    tag: String
})

module.exports = model("Tag", Tag)