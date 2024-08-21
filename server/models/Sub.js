const {Schema, model} = require("mongoose")

const Sub = new Schema({
    creatorId: {type: Schema.Types.ObjectId, ref: "User"},
    creatorName: {type: String, required: true},
    title: {type: String, required: true, maxLength: 24},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: 100},
    level: {type: Number, required: true, min: 1},
}, {timestamps: true})

module.exports = model("Sub", Sub)
