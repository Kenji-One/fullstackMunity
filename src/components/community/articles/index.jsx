/* eslint-disable import/no-anonymous-default-export */
// import { useState } from "react";
import { Box } from "@mui/material";
import LoadmoreShowLess from "../../LoadmoreShowLess";
import ArticlesCard from "../articlesCard";

export default function Articles(props) {
  const { ArticlesContent, areNFTs } = props;

  return (
    <Box className={`${!areNFTs ? "blur-[10px] pb-4" : ""}`}>
      <LoadmoreShowLess
        classNames={`grid grid-cols-1 mob:gap-4 tab:gap-6 `}
        nav={"articles"}
        areNFTs={areNFTs}
        data={ArticlesContent}
        initialItems={5}
        step={5}
        renderItem={(item) => (
          <ArticlesCard
            title={item.label}
            cardImg={item.image}
            userImg={item.userImg}
            username={item.username}
            text={item.text}
            date={item.date}
            url={item.url}
          />
        )}
      />
    </Box>
  );
}
