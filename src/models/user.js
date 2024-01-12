const mongoose = require("mongoose");
const socialSchema = require("./social").schema; // If socials are separate, remove this line
const communitySchema = require("./community").schema; // Assuming you have this in a separate file
const keySchema = require("./key").schema; // Assuming you have this in a separate file

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  is_verified: { type: Boolean, default: false },
  address: String,
  join_date: { type: Date, default: Date.now },
  about: String,
  socials: [socialSchema], // If socials are separate, change to a reference
  communities: [communitySchema], // If communities are separate, change to a reference
  keys: [keySchema], // If keys are separate, change to a reference
});

module.exports = mongoose.model("User", userSchema);
