import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  // TextareaAutosize,
  Button,
  // InputLabel,
} from "@mui/material";
import Card from "../Card";
const CustomForm = ({
  title,
  formConfig,
  apiUrl,
  onSubmit,
  cardStyles = "",
  addSX = {},
}) => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Use the onSubmit prop if provided
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default API function if onSubmit is not provided
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Handle successful API response, e.g., show a success message
          console.log("Data sent successfully!");
        } else {
          // Handle API errors
          console.error("Error sending data to the API");
        }
      }
    } catch (error) {
      // Handle fetch or other errors
      console.error("Error:", error.message);
    }
  };

  return (
    <Card title={title} classNames={cardStyles} addSX={addSX}>
      <Box component="form" noValidate autoComplete="off">
        {/* Dynamic Form Inputs */}
        {formConfig.map((field, index) => (
          <Box
            key={field.name}
            sx={{
              marginBottom: "24px",
              width: "100%",
              "@media (min-width: 500px)": {
                width: field.rowSpan ? "100%" : "calc(50% - 8px)",
                display: "inline-block",
                marginRight: index % 2 === 0 ? "16px" : "0",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                lineHeight: "normal",
                color: "text.primary",
              }}
              className="uppercase !mb-[8px]"
            >
              {field.label}
            </Typography>
            {field.type === "textarea" ? (
              <TextField
                rows={4}
                placeholder={field.placeholder}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full !pl-0"
                multiline
              />
            ) : (
              <TextField
                variant="outlined"
                fullWidth
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            )}
          </Box>
        ))}

        {/* Submit Button */}
        <Box sx={{}} className="!mt-3 text-right">
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="lightBlue"
            sx={{
              padding: "16px 24px",
              fontSize: "16px",
              fontWeight: "400 !important",
              "&.MuiButtonBase-root.lightBlue": {
                backgroundColor: "#34A4E0",
              },
              lineHeight: "120%",
              color: "#10111B",
              textTransform: "uppercase",
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default CustomForm;
