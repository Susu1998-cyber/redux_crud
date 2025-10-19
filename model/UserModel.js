const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  googleSub: { type: String },
  authProvider: { type: String },
  avatar: { type: String },
  role: { type: String, },
});

module.exports = mongoose.model("User", UserSchema);
