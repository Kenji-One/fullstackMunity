const mongoose = require("mongoose");

const keySchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  chain: String,
  description: String,
  quantity: { type: Number, default: 1 },
  price: Number,
  community_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
});

module.exports = mongoose.model("Key", keySchema);
