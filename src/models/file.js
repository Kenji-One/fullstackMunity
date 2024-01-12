// src/models/file.js
const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  file_name: {
    type: String,
    required: true,
  },
  file_size: Number,
  file_type: String,
  file: { type: Buffer, required: true }, // URL to the file stored in AWS S3
  // upload_date: {
  //   type: Date,
  //   default: Date.now,
  // },
  file_folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder", // Assuming you have a Folder schema
  },
  community_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community", // Assuming you have a Community schema
  },
});

module.exports = FileSchema; // Note that we are not compiling this schema with mongoose.model
