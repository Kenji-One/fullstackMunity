import { useSelector } from "react-redux";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import styles from "./toggle.module.scss";
import { styled } from "@mui/material/styles";

const StyledTBG = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: 2,
    border: 0,
  },
}));

export const CustomToggleButton = ({
  sx,
  size = "normal",
  items,
  value,
  onChange,
  classNames,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const bgColor =
    theme === "light" ? "rgba(16, 17, 27, 0.10)" : "rgba(255, 255, 255, 0.10);";

  return (
    <Box sx={{ backgroundColor: bgColor, ...sx }} className={classNames}>
      <StyledTBG
        value={value}
        exclusive
        onChange={(_, newValue) => onChange(newValue)}
        aria-label="toggle-button"
        sx={{
          "& .MuiButtonBase-root.Mui-selected": {
            backgroundColor: "transparent",
          },
        }}
        classes={{
          root: styles.myButtonRoot, // Use your custom class name
        }}
      >
        {items.map(({ value, comp, title }, index) => (
          <ToggleButton
            className={styles[`btn-${size}`] + " toggleBtn"}
            key={`${index}`}
            value={value}
          >
            {comp || (
              <Typography className={styles[`title-${size}`]}>
                {title}
              </Typography>
            )}
          </ToggleButton>
        ))}
      </StyledTBG>
    </Box>
  );
};
