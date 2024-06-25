const {Schema, model} = require("mongoose")

const Report = new Schema({
    reportName: {type: String},
    reportedUsers: {type: Schema.Types.ObjectId, ref: "User"},
})

module.exports = model("Report", Report)
