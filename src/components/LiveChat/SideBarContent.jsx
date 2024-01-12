import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SideBarContent({ title, chats }) {
  const [expanded, setExpanded] = useState(true);
  const handleAccordionChange = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <Accordion
      expanded={expanded}
      onChange={handleAccordionChange}
      className="border-none !p-0 !border-0 !shadow-none"
      sx={{
        backgroundColor: "#10111B",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "primary.reversed" }} />}
        aria-controls="panel-content"
        id="panel-header"
        sx={{
          padding: "0",
          paddingLeft: { mob: "16px", tab: "0" },
          ".MuiAccordionSummary-content": {
            order: 2,
            margin: "0 !important",
          },
          ".MuiAccordionSummary-expandIconWrapper": {
            marginRight: "12px",
            order: 1,
          },
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: "18px",
            fontWeight: "400 !important",
            lineHeight: "normal",
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0" }}>
        {chats.map((channel, index) => (
          <Box
            className="flex items-center justify-between gap-4 mob:py-6 tab:py-8 border-b border-solid mob:px-4 tab:px-0"
            key={index}
            sx={{ borderColor: "rgba(255, 255, 255, 0.10)" }}
          >
            <Box className="flex items-center">
              <Box className="mob:mr-3 tab:mr-8 lap:mr-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                >
                  <path
                    d="M12.0837 3.625L9.66699 25.375"
                    stroke="#F4F4F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.3337 3.625L16.917 25.375"
                    stroke="#F4F4F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.22949 10.875H25.9795"
                    stroke="#F4F4F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.02051 18.125H24.7705"
                    stroke="#F4F4F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: { mob: "22px", tab: "24px" },
                  // fontWeight: "400 !important",
                  lineHeight: "120%",
                  letterSpacing: "-0.48px",
                }}
              >
                {channel.title}
              </Typography>
            </Box>
            <Typography
              className="py-[6px] px-[12px]"
              sx={{
                backgroundColor: "#34A4E0",
                color: "#10111B",
                fontSize: "14px",
              }}
            >
              {channel.badge > 99 ? "99+" : channel.badge}
            </Typography>
          </Box>
        ))}
        <Typography></Typography>
      </AccordionDetails>
    </Accordion>
  );
}
