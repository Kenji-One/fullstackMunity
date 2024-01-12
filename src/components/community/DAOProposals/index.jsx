/* eslint-disable import/no-anonymous-default-export */
// import { useState } from "react";
import { Box } from "@mui/material";
import LoadmoreShowLess from "../../LoadmoreShowLess";
import CustomCard from "../../CustomCard";

export default function DAOProposals(props) {
  const { DAOContent, areNFTs } = props;

  return (
    <Box className={`${!areNFTs ? "blur-[10px] pb-4" : ""}`}>
      <LoadmoreShowLess
        classNames={`grid mob:grid-cols-1 lap:grid-cols-2 gap-[22px] `}
        nav={"merch"}
        areNFTs={areNFTs}
        data={DAOContent}
        initialItems={4}
        step={4}
        renderItem={(item) => (
          <CustomCard
            isDAOCard={true}
            title={item.label}
            cardImg={item.image}
            titleFontSize="24px"
            username={item.username}
            text={item.text}
            state={item.state}
            yes={item.yes}
            no={item.no}
            abstain={item.abstain}
            cardClassNames="lap:p-6 mob:p-4 border border-solid"
            cardSX={{ borderColor: "primary.border" }}
            titleSX={{ letterSpacing: "-0.48px;" }}
          />
        )}
      />
    </Box>
  );
}
