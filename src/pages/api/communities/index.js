import { getAllCommunities, createCommunity } from "@/controllers/community";
const connectDB = require("../../../utils/database/database");
let isConnected;
if (!isConnected) {
  await connectDB();
  isConnected = true; // Set flag to true after first connection
}
export default async function handler(req, res) {
  if (req.method === "GET") {
    return getAllCommunities();
  } else if (req.method === "POST") {
    return createCommunity(req);
  } else {
    // Handle any other HTTP methods not supported.
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
