const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({
  name: String,
  url: { type: String, required: true },
  icon: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// If socials are a separate model
module.exports = socialSchema;
