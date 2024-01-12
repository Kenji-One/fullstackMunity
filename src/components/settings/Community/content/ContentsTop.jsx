import { Box, Typography, Button, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import BtnChange from "../../BtnChange";
import AddIcon from "@mui/icons-material/Add";
import CustomInput from "../../CustomInput";

export default function ContentsTop({
  title,
  label,
  placeholder,
  isNumber = false,
  value,
  onChange,
  onClick,
  HasCreateButton = false,
  handleCreateNFT,
  theme,
  quantity,
  handleChangeQuantity,
}) {
  const svgFillColor = theme === "light" ? "#10111B" : "white";
  return (
    <Box className="mob:mt-6 tab:mt-8 lap:mt-10 flex flex-col items-start mb-8">
      <Box className="flex items-center justify-between gap-4 w-full !mb-8 flex-wrap">
        <Typography
          sx={{
            color: "text.primary",
            fontSize: "24px",
            lineHeight: "120%",
          }}
        >
          {title}
        </Typography>
        {HasCreateButton && (
          <BtnChange icon={<AddIcon />} onClick={handleCreateNFT}>
            Create NFT
          </BtnChange>
        )}
      </Box>
      <Box className="!mb-8 w-full">
        {isNumber ? (
          <Box className="flex flex-wrap items-center gap-6">
            <Box className="w-full max-w-[352px]">
              <Box
                sx={{
                  color: "text.primary",
                  fontSize: "14px",
                  lineHeight: "normal",
                }}
                className="!mb-[8px]"
              >
                {label}
              </Box>
              <TextField
                value={value}
                onChange={onChange}
                type="number"
                className="w-full max-w-[352px]"
                InputLabelProps={{
                  shrink: false,
                }}
                placeholder={"Enter Amount.."}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="!ml-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5.7501 7.58331L9.72507 5.81664C9.90007 5.74164 10.1001 5.74164 10.2668 5.81664L14.2418 7.58331C14.5918 7.74164 14.9167 7.31664 14.6751 7.01664L10.5084 1.92498C10.2251 1.57498 9.75841 1.57498 9.47508 1.92498L5.30841 7.01664C5.07508 7.31664 5.4001 7.74164 5.7501 7.58331Z"
                          fill={svgFillColor}
                        />
                        <path
                          d="M5.74981 12.4167L9.73312 14.1833C9.90812 14.2583 10.1081 14.2583 10.2748 14.1833L14.2581 12.4167C14.6081 12.2583 14.9331 12.6833 14.6915 12.9833L10.5248 18.075C10.2415 18.425 9.7748 18.425 9.49147 18.075L5.3248 12.9833C5.0748 12.6833 5.39148 12.2583 5.74981 12.4167Z"
                          fill={svgFillColor}
                        />
                        <path
                          d="M9.81648 7.90831L6.3748 9.62498C6.06647 9.77498 6.06647 10.2166 6.3748 10.3666L9.81648 12.0833C9.93314 12.1416 10.0748 12.1416 10.1914 12.0833L13.6331 10.3666C13.9414 10.2166 13.9414 9.77498 13.6331 9.62498L10.1914 7.90831C10.0664 7.84998 9.93314 7.84998 9.81648 7.90831Z"
                          fill={svgFillColor}
                        />
                      </svg>
                      <Typography
                        sx={{
                          lineHeight: "118%",
                          fontWeight: "400 !important",
                          fontSize: "16.5px",
                          color: "text.primary",
                        }}
                      >
                        &nbsp;ETH
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-input": {
                    paddingLeft: "12px !important",
                    width: "100%",
                  },
                }}
              />
            </Box>
            <CustomInput
              label="QUANTITY"
              placeholder={"Enter Amount.."}
              inputBoxClasses="max-w-[352px] !m-0"
              type="number"
              inputName={"quantity"}
              value={quantity}
              handleChange={handleChangeQuantity}
            />
          </Box>
        ) : (
          <>
            <Typography
              sx={{
                color: "text.primary",
                fontSize: "14px",
                lineHeight: "normal",
              }}
              className="!mb-[8px]"
            >
              {label}
            </Typography>
            <TextField
              type="url"
              className="w-full max-w-[352px]"
              InputLabelProps={{
                shrink: false,
              }}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          </>
        )}
      </Box>
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          padding: "16px 24px",
          fontSize: "16px",
          fontWeight: "400 !important",
          "&.MuiButtonBase-root.lightBlue": {
            backgroundColor: "#34A4E0",
          },
          lineHeight: "150%",
          color: "#10111B",
        }}
        className="!uppercase lightBlue"
      >
        Save
      </Button>
    </Box>
  );
}
