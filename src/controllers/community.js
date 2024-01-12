// controllers/communityController.js
const Community = require("../models/community");

export async function getAllCommunities() {
  try {
    const communities = await Community.find({});
    res.status(200).json({ success: true, data: communities });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getCommunityById(req) {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }
    res.status(200).json({ success: true, data: community });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function createCommunity(req) {
  try {
    const newCommunity = new Community(req.body);
    await newCommunity.save();
    console.log("created community:", newCommunity);
    res.status(201).json({ success: true, data: newCommunity });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export async function updateCommunity(req) {
  try {
    const community = await Community.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }
    res.status(200).json({ success: true, data: community });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export async function deleteCommunity(req) {
  try {
    const deletedCommunity = await Community.findByIdAndDelete(req.params.id);
    if (!deletedCommunity) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }
    res.status(204).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
