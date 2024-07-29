const {Schema, model} = require("mongoose")

const Sub = new Schema({
    creatorId: {type: Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true, maxLength: 24},
    description: {type: String, required: true, maxLength: 64},
    price: {type: Number, required: true, min: 100},
    level: {type: Number, required: true, min: 1},
    subAction: {type: String || Number, required: true, default: "1m"},
})

module.exports = model("Sub", Sub)
