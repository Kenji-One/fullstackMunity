import { Box } from "@mui/material";
import FormHeading from "../settings/Community/NFTCreation/FormHeading";
import LoadmoreShowLess from "../LoadmoreShowLess";
import SingleCommunity from "../Card/SingleCommunity";

export default function Popular({ sectionTitle, sectionNum, popularsData }) {
  return (
    <Box className="mob:py-8 tab:py-[48px] lap:py-[70px] desk:py-[120px] mob:px-4 tab:px-8 lap:px-[52px]">
      <FormHeading
        text={sectionTitle}
        number={sectionNum}
        classNames="border-t mob:pt-4 tab:pt-6"
        titleSX={{
          fontSize: { mob: "20px", tab: "24px" },
          letterSpacing: "-0.48px",
          color: "text.primary",
        }}
      />
      <LoadmoreShowLess
        classNames={`grid mob:gap-6 tab:gap-8 mob:mt-6 tab:mt-8`}
        data={popularsData}
        initialItems={8}
        step={8}
        renderItem={(item) => (
          <SingleCommunity
            title={item.title}
            communityIMG={item.communityIMG}
            users={item.users}
            verified={true}
            slotsLeft={item.slotsLeft}
            url={item.url}
            imgBoxStyles="mob-xs:h-[243px] mob-sm2:h-[300px] tab:h-[343px]"
            imgStyles="mob-xs:h-full"
          />
        )}
        singleClassNames={"relative border-b border-solid mob:!pb-4 tab:!pb-6"}
        addSingleBoxSX={{
          borderColor: "primary.border",
          "&:hover div.absolute": { width: "100%" },
        }}
        addSX={{
          gridTemplateColumns: {
            lap: "repeat(auto-fit, minmax(343px, 1fr))",
            "mob-xs": "repeat(auto-fit, minmax(300px, 1fr))",
            mob: "1fr",
          },
        }}
      />
    </Box>
  );
}
