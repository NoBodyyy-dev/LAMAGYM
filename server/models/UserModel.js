const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    // required: true,
    unique: true,
    trim: true,
    default: "Anon",
  },
  email: {
    type: String,
    unique: true,
    // required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: { type: String },
  followersCount: Number,
  iFollowedFor: Array,
  mySubs: Array,
  purSubs: Array,
});

module.exports = model("User", UserSchema);
