import { useState } from "react";
import { Box, Switch, Typography } from "@mui/material";
// import axios from "axios";

export default function ControlledSwitches({ label, isPro }) {
  const [checked, setChecked] = useState(true);

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };
  const handleSwitchChange = async (event) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);
    console.log(label + ": " + newChecked);
    // try {
    //   // Assuming you have a function or library for making HTTP requests (e.g., axios)
    //   // Replace 'axios.post' with the actual method for making a POST request
    //   await axios.post(apiUrl, { label, checked: newChecked });
    //   console.log("POST request sent successfully!");
    // } catch (error) {
    //   console.error("Error sending POST request:", error.message);
    // }
  };

  return (
    <Box className="flex items-center justify-between gap-4">
      {label && (
        <Box className="flex items-center gap-4">
          <Typography
            sx={{
              fontSize: "16.5px",
              lineHeight: "120%",
              color: "text.primary",
            }}
          >
            {label}
          </Typography>
          {isPro && (
            <Typography
              className="uppercase !py-[4px] !px-[8px]"
              sx={{
                fontSize: "14px",
                lineHeight: "normal",
                color: "text.primary",
                backgroundColor: "#34A4E0",
              }}
            >
              PRO FEATURE
            </Typography>
          )}
        </Box>
      )}

      <Switch
        checked={checked}
        onChange={handleSwitchChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Box>
  );
}
