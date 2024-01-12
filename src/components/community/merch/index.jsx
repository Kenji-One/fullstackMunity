/* eslint-disable import/no-anonymous-default-export */
// import { useState } from "react";
import { Box, Stack } from "@mui/material";
import LoadmoreShowLess from "../../LoadmoreShowLess";
import CustomCard from "../../CustomCard";

export default function Merch(props) {
  const { merchContentFirstPart, mainMerchContent, areNFTs } = props;

  return (
    <Box className={`${!areNFTs ? "blur-[10px] pb-4" : ""} `}>
      <Stack
        className="mb-8 tab:gap-6 mob:gap-y-[16px]"
        direction={{ mob: "column", tab: "row" }}
        // justifyContent="end"
        alignItems={"center"}
        flexWrap="wrap"
      >
        {merchContentFirstPart.map((item, index) => (
          <Box key={index} className="h-[519px] w-full max-w-[376px]  ">
            <CustomCard
              title={item.label}
              backgroundImg={true}
              titleColor="#fff"
              showIcon={false}
              cardImg={item.image}
              buttonVariant="button"
              buttonText="CHECK SIZES"
              titleFontSize="24px"
              link={true}
              buttonStyle={{ backgroundColor: "#34A4E0" }}
              cardClassNames="h-full w-full mob:px-4 mob:pb-6 tab:pl-6 tab:pb-8 justify-end !bg-center"
            />
          </Box>
        ))}
      </Stack>

      <LoadmoreShowLess
        classNames={`grid gap-6 `}
        nav={"merch"}
        areNFTs={areNFTs}
        data={mainMerchContent}
        initialItems={4}
        step={4}
        renderItem={(item) => (
          <CustomCard
            title={item.label}
            price={item.price}
            cardImg={item.image}
            buttonText="Buy Now"
            titleFontSize="18px"
          />
        )}
        addSX={{
          gridTemplateColumns: {
            // lap: "repeat(auto-fit, minmax(260px, 1fr))",
            "mob-xs": "repeat(auto-fit, minmax(260px, 1fr))",
            mob: "1fr",
          },
        }}
      />
    </Box>
  );
}
