/* eslint-disable import/no-anonymous-default-export */
import { Box, Typography, Button } from "@mui/material";
import Card from "../../../Card";
import LinkedAccount from "./LinkedAccount";

export default function LinkAccount({ linkedAccounts }) {
  return (
    <Card
      title={"Linked Accounts"}
      classNames="mob:p-3 tab:p-4 lap:px-3 lap:py-4 desk:p-6" // Add any custom styles for this specific card
    >
      <Box>
        <Typography
          fontSize={"16.5px"}
          sx={{ lineHeight: "120%" }}
          color={"text.primary"}
          className="!mb-6 "
        >
          These are your external accounts that are currently connected to
          Beacons.
        </Typography>
        <Box className="flex flex-col mob:gap-3 tab:gap-4">
          {linkedAccounts.map(
            (item, index) =>
              item.isConnected && (
                <Box key={index} className="">
                  {/* Render your component using the provided renderItem function */}
                  {LinkedAccount(item)}
                </Box>
              )
          )}
        </Box>
        <Button
          variant="contained"
          sx={{
            padding: "16px 24px",
            fontSize: "16.5px",
            fontWeight: "400",
            "&.MuiButtonBase-root.lightBlue": {
              backgroundColor: "#34A4E0",
            },
            lineHeight: "120%",
            color: "#10111B",
          }}
          className="w-full uppercase !mt-8 lightBlue"
        >
          LINK NEW ACCOUNT
        </Button>
      </Box>
    </Card>
  );
}
