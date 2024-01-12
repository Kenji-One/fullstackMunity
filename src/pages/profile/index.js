/* eslint-disable import/no-anonymous-default-export */
import { Box } from "@mui/material";
import Banner from "../../components/community/communityBG/Banner";
import Profile from "../../components/Profile/Profile";

export default function ProfilePage() {
  return (
    <Box className="relative overflow-hidden">
      <Banner bannerIMG={"/images/profileBanner.png"} height="320px" />
      <Profile />
    </Box>
  );
}
