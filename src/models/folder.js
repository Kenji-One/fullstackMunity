// src/models/folder.js
const mongoose = require("mongoose");
const FileSchema = require("./file"); // Assuming you have a separate File model

const FolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  files: [FileSchema], // Embedding the File schema directly into the Folder schema
});

module.exports = FolderSchema;
