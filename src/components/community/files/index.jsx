/* eslint-disable import/no-anonymous-default-export */
// import { useState } from "react";
import { Box } from "@mui/material";
import LoadmoreShowLess from "../../LoadmoreShowLess";
import FileCard from "../fileCard";
import NoFiles from "../noData/noFiles";
import nofiles from "../../../../public/images/nofiles.png";
export default function Files(props) {
  const { filesContent, areFiles, areNFTs } = props;

  return (
    <Box className={`${!areNFTs ? "blur-[10px] pb-4 h-[972px]" : ""}`}>
      {areFiles ? (
        <LoadmoreShowLess
          classNames={`grid mob:grid-cols-1 lap:grid-cols-2 mob:gap-3 tab:gap-6 `}
          nav={"files"}
          data={filesContent}
          initialItems={8}
          step={8}
          renderItem={(item) => (
            <FileCard title={item.label} size={item.size} />
          )}
        />
      ) : (
        <NoFiles image={nofiles} text="Files is empty" />
      )}
    </Box>
  );
}
