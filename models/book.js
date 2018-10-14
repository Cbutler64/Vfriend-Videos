const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, index: {unique: true} },
  password: { type: String, required: true },
  realname: { type: String, required: true },
  photo: { type: String, required: true },
  gender: { type: String, required: true },
  posts: { type: Array},
  friends: {type:Array},
  notifications: {type: Array},
  dateAdded: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
