/* eslint-disable import/no-anonymous-default-export */
// import { useState } from "react";
import { Box } from "@mui/material";
import LoadmoreShowLess from "../../LoadmoreShowLess";
import RoadMapCard from "../roadMapCard";
export default function RoadMap(props) {
  const { roadContent, areNFTs } = props;

  return (
    <Box className={`${!areNFTs ? "blur-[10px] pb-4" : ""}`}>
      <LoadmoreShowLess
        classNames={`grid grid-cols-1`}
        nav={"roads"}
        data={roadContent}
        initialItems={2}
        step={2}
        renderItem={(item) => (
          <RoadMapCard
            title={item.label}
            text={item.text}
            year={item.year}
            progress={item.progress}
            starTexts={item.starTexts}
          />
        )}
      />
    </Box>
  );
}
