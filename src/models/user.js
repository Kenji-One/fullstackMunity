const mongoose = require("mongoose");
const SocialSchema = require("./social");

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  user_avatar: String,
  user_banner: String,
  is_verified: { type: Boolean, default: false },
  address: { type: String, required: true },
  join_date: { type: Date, default: Date.now },
  about: String,
  socials: [SocialSchema],
});

module.exports = mongoose.model("User", UserSchema);
