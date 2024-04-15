const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageScheme = new Schema({
  user: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

module.exports = messageScheme;
