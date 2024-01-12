import Card from "../../../Card";
import { Box, Typography } from "@mui/material";
import FolderZipOutlinedIcon from "@mui/icons-material/FolderZipOutlined";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconBtn from "../../IconBtn";

const FileSingle = ({ file, onDelete }) => {
  const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
  return (
    <Card childrenStyles="flex items-center gap-4 justify-between flex-wrap">
      <Box className="flex items-center mob:gap-4 tab:gap-6 flex-wrap">
        <Box
          className="mob:w-12 mob:h-12 tab:w-14 tab:h-14 flex items-center justify-center"
          sx={{ backgroundColor: "background.iconBtn" }}
        >
          <FolderZipOutlinedIcon sx={{ color: "text.primary" }} />
        </Box>
        <Typography
          sx={{
            fontSize: "18px",
            color: "text.primary",
            fontWeight: "normal",
          }}
        >
          {file.name}
        </Typography>
      </Box>
      <Box className="flex items-center gap-4 ml-auto">
        <Typography
          sx={{
            // fontWeight: "400 !important",
            fontSize: "18px",
            color: "text.secondary",
            fontWeight: "normal",
          }}
        >
          {fileSizeInMB} MB
        </Typography>
        {/* <IconButton color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton> */}
        <IconBtn
          icon={<DeleteOutlineIcon fontSize="small" />}
          onClick={onDelete}
        />
      </Box>
    </Card>
  );
};

export default FileSingle;
