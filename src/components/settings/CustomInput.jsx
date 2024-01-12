import { Box, Typography, TextField } from "@mui/material";
const CustomInput = ({
  label,
  inputName,
  type,
  handleChange,
  placeholder = "",
  value,
  inputBoxClasses = "",
  inputProps = {}, // Additional input props
  inputBoxSX = {},
  available,
}) => {
  return (
    <Box
      className={inputBoxClasses}
      sx={{
        marginBottom: "24px",
        width: "100%",
        ...inputBoxSX,
      }}
    >
      <Box className="mb-[8px] flex items-center justify-between gap-4">
        <Typography
          sx={{
            fontSize: "14px",
            lineHeight: "normal",
            color: "text.primary",
            fontWeight: "400 !important",
          }}
          className="uppercase"
        >
          {label}
        </Typography>
        {available && (
          <Typography
            sx={{
              fontSize: "14px",
              lineHeight: "normal",
              color: "text.primary",
            }}
          >
            {available} available
          </Typography>
        )}
      </Box>

      {type === "textarea" ? (
        <TextField
          rows={4}
          placeholder={placeholder}
          name={inputName}
          value={value || ""}
          onChange={handleChange}
          className="w-full !pl-0"
          InputProps={inputProps}
          multiline
        />
      ) : (
        <TextField
          type={type}
          variant="outlined"
          placeholder={placeholder}
          fullWidth
          InputLabelProps={{
            shrink: false,
          }}
          name={inputName}
          value={value || ""}
          onChange={handleChange}
          InputProps={inputProps}
        />
      )}
    </Box>
  );
};

export default CustomInput;
