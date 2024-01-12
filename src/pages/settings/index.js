/* eslint-disable import/no-anonymous-default-export */
import { Box } from "@mui/material";
import SettingsNav from "../../components/settings/Navigation";

export default function Settings() {
  // const Settings = [
  //   { title: "PROFILE", icon: "" },
  //   { title: "COMMUNITY", icon: "" },
  // ];

  return (
    <Box>
      <Box>
        <Box className=" relative overflow-hidden">
          <SettingsNav />
        </Box>
      </Box>
    </Box>
  );
}
