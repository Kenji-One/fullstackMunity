// import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SideBarContent from "../../components/LiveChat/SideBarContent";
import SideBar from "../../components/sidebar";
import styles from "./community.module.scss";
import Userprofile from "../../components/community/userprofile";
import Banner from "../../components/community/communityBG/Banner";
// const connectDB = require("../../utils/database/database");
// let isConnected;
// if (!isConnected) {
//   await connectDB();
//   isConnected = true; // Set flag to true after first connection
// }
// var MongoClient = require("mongodb").MongoClient;

// MongoClient.connect(
//   "mongodb://mycluster0.mongodb.net:27017/myDb?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
//   {
//     auth: {
//       user: MONGO_DB_USER,
//       password: MONGO_DB_PASSWORD,
//     },
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );
const CommunityPage = () => {
  // const [communityData, setCommunityData] = useState(null);

  // useEffect(() => {
  //   // Define the function inside useEffect
  //   const fetchCommunityData = async () => {
  //     try {
  //       const response = await fetch("/api/communities");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       console.log("data:", data);
  //       setCommunityData(data);
  //     } catch (error) {
  //       console.error("Failed to fetch community data:", error);
  //     }
  //   };

  //   // Call the function
  //   fetchCommunityData();
  // }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount

  const channels = [
    { title: "Articles", badge: 2 },
    { title: "Upcoming Events", badge: 150 },
    { title: "Great news", badge: 200 },
    { title: "DAO Proposals", badge: 0 },
  ];
  const communityBackground = "/images/profileBanner.png";
  return (
    <Box>
      <Box className={styles["container"]}>
        <Box className={styles["main"] + " relative overflow-hidden"}>
          <Banner bannerIMG={communityBackground} />
          <Userprofile />
        </Box>

        <SideBar>
          <SideBarContent title={"General"} chats={channels} />
        </SideBar>
      </Box>
    </Box>
  );
};

export default CommunityPage;
