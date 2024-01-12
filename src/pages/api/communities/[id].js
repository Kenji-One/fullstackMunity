import {
  getCommunityById,
  updateCommunity,
  deleteCommunity,
} from "../../../controllers/communityController";
const connectDB = require("../../../utils/database/database");
let isConnected;
if (!isConnected) {
  await connectDB();
  isConnected = true; // Set flag to true after first connection
}
export default async function handler(req, res) {
  if (req.method === "GET") {
    return getCommunityById(req);
  } else if (req.method === "PUT") {
    return updateCommunity(req);
  } else if (req.method === "DELETE") {
    return deleteCommunity(req);
  } else {
    // Handle any other HTTP methods not supported.
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
