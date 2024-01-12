const mongoose = require("mongoose");
const RoadmapSchema = require("./roadmap");
const FolderSchema = require("./folder");
const SocialSchema = require("./social");

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  community_avatar: { type: String, required: true },
  community_banner: { type: String, required: true },
  community_category: { type: String, required: true },
  is_verified: { type: Boolean, default: false },
  chain: { type: String, required: true },
  socials: [SocialSchema],

  merch: {
    url: String,
    is_active: { type: Boolean, default: true },
  },
  dao_proposals: {
    url: String,
    is_active: { type: Boolean, default: true },
  },
  articles: {
    url: String,
    is_active: { type: Boolean, default: true },
  },
  giveaway: {
    url: String,
    is_active: { type: Boolean, default: false },
  },
  social_posts: {
    url: String,
    is_active: { type: Boolean, default: false },
  },

  files_tab: {
    data: [FolderSchema],
    is_active: { type: Boolean, default: false },
  },
  roadmaps: {
    type: String, // monthly or quarterly
    is_active: { type: Boolean, default: true },
    data: [RoadmapSchema],
  },
  minting_price: { type: Number, default: 0 },
  key_quantity: { type: Number, default: 100 },
  key: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Key",
    },
  ],
  keys_left: Number,
  users_joined: Number,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Community", communitySchema);
