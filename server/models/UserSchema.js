const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  followersCount: Number,
  iFollowedFor: Array,
  mySubs: Array,
  purSubs: Array,
});

module.exports = userSchema;
