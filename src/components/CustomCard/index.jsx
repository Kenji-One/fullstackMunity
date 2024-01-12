/* eslint-disable import/no-anonymous-default-export */
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Typography, Box, Button, Link } from "@mui/material";
import YesNoAbstainRow from "../community/YesNoAbstainRow";

export default function CustomCard({
  title,
  price,
  minted = true,
  lastSale,
  buttonText,
  backgroundImg = false,
  cardImg = "",
  buttonVariant = "text",
  showIcon = true,
  titleFontSize = "18px",
  titleColor = "primary.main",
  url = "#",
  link = false,
  cardClassNames = "",
  // cardStyle = "normal",
  buttonStyle = {}, // Additional styles for the button
  cardSX = {}, // Additional styles for the Card
  titleSX = {},
  isDAOCard = false,
  username = "",
  text = "",
  state,
  yes = {},
  no = {},
  abstain = {},
}) {
  const backgroundStyle = backgroundImg
    ? `linear-gradient(180deg, rgba(16, 17, 27, 0.00) 0%, rgba(16, 17, 27, 0.80) 100%), url(${cardImg})`
    : {};
  return (
    <Box
      className={"flex flex-col items-start !bg-no-repeat " + cardClassNames}
      sx={{
        color: titleColor,
        background: backgroundStyle,
        ...cardSX,
      }}
    >
      {!backgroundImg &&
        (!isDAOCard ? (
          <Box className="w-full">
            <img
              src={cardImg}
              alt={title}
              className="w-full h-auto object-cover"
            />
          </Box>
        ) : (
          <Box className="w-full flex items-center justify-between gap-2 mb-3">
            <Box className="flex items-center gap-[12px]">
              <img src={cardImg} alt={title} className="w-8 h-8 object-cover" />
              <Typography fontSize="16.5px" fontWeight="400">
                {username}
              </Typography>
            </Box>

            <Typography
              color="primary.main"
              lineHeight={"normal !important"}
              className={`uppercase ml-auto py-[5px] px-[8px] ${
                state === "closed" ? "bg-[#34A4E0]" : ""
              }`}
            >
              {state}
            </Typography>
          </Box>
        ))}
      <Typography
        fontSize={titleFontSize}
        fontWeight={`${backgroundImg ? "500  !important" : "400 !important"}`}
        className="!mt-[12px]"
        lineHeight={"normal"}
        sx={{ ...titleSX }}
      >
        {title}
      </Typography>
      {price && (
        <Typography
          fontSize="18px"
          fontWeight="400 !important"
          lineHeight={"normal"}
          className="!mt-4"
        >
          Price: {price}
        </Typography>
      )}
      {!minted && (
        <Typography
          fontSize="18px"
          className="!mt-4 uppercase"
          lineHeight={"normal"}
        >
          Not Minted
        </Typography>
      )}
      {lastSale && (
        <Typography
          fontSize="14px"
          fontWeight={300}
          lineHeight={"normal"}
          className="!mt-4 "
          sx={{ color: "text.secondary" }}
        >
          Last Sale: {lastSale}
        </Typography>
      )}
      {/* Conditional rendering for DAO content */}
      {text !== "" && (
        <Box className="mt-3">
          <Typography
            fontSize="18px"
            color="text.secondary"
            lineHeight={"normal"}
          >
            {text}
          </Typography>
          {/* Yes/No/Abstain Rows */}
          {isDAOCard && (
            <Box className="mt-6 flex flex-col gap-3">
              <YesNoAbstainRow {...yes} type="Yes" />
              <YesNoAbstainRow {...no} type="NO" />
              <YesNoAbstainRow {...abstain} type="Abstain" />
            </Box>
          )}
        </Box>
      )}
      {!link && !isDAOCard && (
        <Button
          variant={buttonVariant}
          startIcon={showIcon && <ShoppingBasketIcon />}
          className={`${
            buttonVariant === "text" ? "!underline" : ""
          } !mt-4 mob:!p-0 mob:!px-[5px] tab:!py-[6px] tab:!px-[8px]`}
          sx={{
            fontSize: "16.5px",
            fontWeight: 300,
            color: "#1877A9",
            ...buttonStyle,
          }}
        >
          {buttonText}
        </Button>
      )}
      {link && (
        <Link
          underline="none"
          variant={buttonVariant}
          className={`!mt-6 !px-6 !py-4 `}
          sx={{
            fontSize: "16.5px",
            fontWeight: 400,
            lineHeight: "19.8px",
            color: "primary.black",
            ...buttonStyle,
          }}
          href={url}
        >
          {buttonText}
        </Link>
      )}
    </Box>
  );
}
