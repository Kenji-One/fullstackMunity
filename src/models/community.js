const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: String,
  description: String,
  community_avatar: String,
  community_banner: String,
  community_category: String,
  merch: {
    url: String,
    is_active: Boolean,
  },
  dao_proposals: {
    url: String,
    is_active: Boolean,
  },
  articles: {
    url: String,
    is_active: Boolean,
  },
  giveaway: {
    url: String,
    is_active: Boolean,
  },
  social_posts: {
    url: String,
    is_active: Boolean,
  },
    
  files: {[fileSchema], is_active: Boolean,},
  roadmaps: {
    type: String, // monthly or quarterly
    roadmaps_details: [
      {
        title: String,
        date: Date,
        description: String,
        points: [
          {
            point: String,
          },
        ],
        achieved: Boolean,
        category_id: Number,
      },
    ],
  },
  minting_price: Number,
  key_quantity: Number,
  key: {
    image: String,
    name: String,
    chain: String,
    description: String,
    quantity: Number,
    price: Number,
  },
  users_joined: Number,
  keys_left: Number,
});
module.exports = mongoose.model("Community", communitySchema);
