import { Box } from "@mui/material";
import SideBarContent from "../../components/LiveChat/SideBarContent";
import SideBar from "../../components/sidebar";
import styles from "./community.module.scss";
import Userprofile from "../../components/community/userprofile";
import Banner from "../../components/community/communityBG/Banner";

const CommunityPage = () => {
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
