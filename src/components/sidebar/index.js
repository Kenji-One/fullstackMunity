/* eslint-disable import/no-anonymous-default-export */
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleLiveChat } from "../../utils/store/reducers";
import MenuOpenSharpIcon from "@mui/icons-material/MenuOpenSharp";
import OpenInFullSharpIcon from "@mui/icons-material/OpenInFullSharp";
import styles from "./sidebar.module.scss";
import Image from "next/image";

export default ({ children }) => {
  const dispatch = useDispatch();
  const { showLiveChat } = useSelector((state) => state.app);

  const toggleSidebar = () => dispatch(toggleLiveChat(!showLiveChat));

  return (
    <Box className={styles["sidebar"] + " z-30"} data-collapse={!showLiveChat}>
      <Box
        className={styles["top"] + " mob:!p4 tab:!p-6"}
        onClick={toggleSidebar}
        sx={{ flexDirection: showLiveChat ? "row" : "column" }}
      >
        <Box
          className={
            styles["toggle"] + " lap:!flex items-center justify-center"
          }
          onClick={toggleSidebar}
          style={{
            marginBottom: !showLiveChat ? "1rem" : "0",
            display: !showLiveChat ? "none" : "flex",
          }}
        >
          <MenuOpenSharpIcon sx={{ fontSize: 24, color: "#fff" }} />
        </Box>

        <Typography
          color="secondary"
          className={styles["collapsedTitle"]}
          sx={{ display: showLiveChat ? "none" : "flex" }}
        >
          <span className={styles["dot"]}>•</span>&nbsp;Live Chat
        </Typography>
        <Typography
          color="secondary"
          className={styles["title"]}
          onClick={toggleSidebar}
          sx={{ display: !showLiveChat ? "none" : "block" }}
        >
          Live Chat
        </Typography>
        <Box
          className={styles["toggle"] + " flex items-center justify-center"}
          onClick={toggleSidebar}
          style={{
            display: !showLiveChat ? "none" : "flex",
          }}
        >
          <OpenInFullSharpIcon sx={{ fontSize: 24, color: "#fff" }} />
        </Box>
      </Box>
      <Box
        sx={{ display: showLiveChat ? "block" : "none" }}
        className="mob:px-0 tab:px-8 lap:px-10"
      >
        {children}
      </Box>
    </Box>
  );
};
