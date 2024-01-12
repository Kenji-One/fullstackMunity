// src/models/file.js
const mongoose = require("mongoose");
if (mongoose.models.Roadmap) {
  module.exports = mongoose.model("Roadmap");
} else {
  const RoadmapSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    points: [
      {
        point: String,
      },
    ],
    achieved: { type: Boolean, default: false },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  });

  module.exports = mongoose.model("Roadmap", RoadmapSchema);
}
