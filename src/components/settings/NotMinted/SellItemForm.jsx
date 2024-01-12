import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CustomInput from "../CustomInput";
import SingleFee from "./SingleFee";
import BlueBtn from "../../Buttons/BlueBtn";

const ethToUsdRate = 3000; // Example static conversion rate. Replace with a dynamic fetch in production.

const SellItemForm = ({ onSubmit, theme }) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const munityFeePercentage = 2.5; // Assuming a fixed percentage fee
  const creatorRoyaltyPercentage = 2.0; // Assuming a fixed percentage fee
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [ethInUsd, setEthInUsd] = useState(0);
  const svgFillColor = theme === "light" ? "#10111B" : "white";

  useEffect(() => {
    // Update the ETH to USD conversion whenever the price in ETH changes
    setEthInUsd((parseFloat(price) * ethToUsdRate).toFixed(2) * quantity);
  }, [price, quantity]);

  const svgIconETH = (
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
  );

  useEffect(() => {
    const calculateTotalEarnings = () => {
      const priceNum = parseFloat(price);
      if (!isNaN(priceNum) && quantity > 0) {
        const munityFee = (priceNum * munityFeePercentage) / 100;
        const creatorRoyalty = (priceNum * creatorRoyaltyPercentage) / 100;
        const earnings = (priceNum - munityFee - creatorRoyalty) * quantity;
        setTotalEarnings(earnings.toFixed(2));
      }
    };
    calculateTotalEarnings();
  }, [quantity, price]);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "24px",
        height: { mob: "100%", tab: "auto" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <CustomInput
        label={"Quantity"}
        type="number"
        value={quantity}
        inputName="sellingQuantity"
        handleChange={handleQuantityChange}
        available={100}
      />
      <CustomInput
        label={"Price per item"}
        placeholder="Amount"
        type="text"
        value={price}
        inputName="sellingPrice"
        handleChange={handlePriceChange}
        inputProps={{
          startAdornment: (
            <InputAdornment position="start" className="!ml-4">
              {svgIconETH}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              className="!mr-[4px]"
              sx={{ color: "text.primary" }}
            >
              ${ethInUsd}
            </InputAdornment>
          ),
        }}
        inputBoxSX={{ "& input": { paddingLeft: "2px !important" } }}
      />

      {/* Fees and Total Earnings display */}
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography
          sx={{
            fontSize: "14px",
            lineHeight: "normal",
            color: "text.primary",
            fontWeight: "400 !important",
          }}
          className="uppercase !mb-4"
        >
          Fees
        </Typography>

        <SingleFee
          feeName={"Munity Fee"}
          fee={munityFeePercentage.toFixed(2)}
        />
        <SingleFee
          feeName={"Creator Royalty"}
          fee={creatorRoyaltyPercentage.toFixed(2)}
        />
        <SingleFee
          feeName={"Total Earnings"}
          fee={totalEarnings}
          icon={svgIconETH}
          cost={ethInUsd}
          haveBorder={false}
        />
      </Box>
      <BlueBtn
        type="submit"
        color="#10111B"
        bgColor="#34A4E0"
        classNames="!ml-auto mob:!mt-auto tab:!mt-8"
      >
        Complete Listing
      </BlueBtn>
    </Box>
  );
};

export default SellItemForm;
