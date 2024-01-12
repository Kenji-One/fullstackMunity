/* eslint-disable import/no-anonymous-default-export */
import { Typography, Box } from "@mui/material";
import FolderZipOutlinedIcon from "@mui/icons-material/FolderZipOutlined";
import Card from "../Card";

export default ({ title, size }) => {
  return (
    <Card childrenStyles="flex flex-wrap justify-between items-center mob:gap-3 tab:gap-4 lap:gap-6">
      <Box
        className="mob:w-12 mob:h-12 tab:w-14 tab:h-14 flex items-center justify-center"
        sx={{ backgroundColor: "background.iconBtn" }}
      >
        <FolderZipOutlinedIcon
          className="mob:!w-[18px] mob:!h-[18px] tab:!w-6 tab:!h-6"
          sx={{ color: "text.primary" }}
        />
      </Box>
      <Typography
        fontSize={{
          mob: "14px",
          tab: "18px",
        }}
        fontWeight={"400 !important"}
        lineHeight={"normal !important"}
        color={"text.primary"}
      >
        {title}
      </Typography>
      <Typography
        className="!ml-auto justify-self-end"
        fontSize={{
          mob: "14px",
          tab: "18px",
        }}
        fontWeight={"400 !important"}
        lineHeight={"normal !important"}
        color={"text.tertiary"}
      >
        {size}
      </Typography>
    </Card>
  );
};
