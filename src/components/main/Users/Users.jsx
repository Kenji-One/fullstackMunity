import { Box } from "@mui/material";
import FormHeading from "../../settings/Community/NFTCreation/FormHeading";
import LoadmoreShowLess from "../../LoadmoreShowLess";
import SingleCommunity from "../../Card/SingleCommunity";

export default function Users({ usersData }) {
  return (
    <Box className="mob:px-4 tab:px-8 lap:px-[52px]">
      <FormHeading
        text={"POPULAR USERS"}
        number={"03."}
        classNames="border-t mob:pt-4 tab:pt-6"
        titleSX={{
          fontSize: { mob: "20px", tab: "24px" },
          letterSpacing: "-0.48px",
          color: "text.primary",
        }}
      />
      <LoadmoreShowLess
        classNames={`grid mob:gap-6 lap:gap-8 mob:mt-6 tab:mt-8`}
        // singleClassNames={"max-w-[276px]"}
        data={usersData}
        initialItems={12}
        step={12}
        renderItem={(item) => (
          <SingleCommunity
            title={item.name}
            communityIMG={item.communityIMG}
            verified={true}
            url={item.url}
            imgBoxStyles="mob:h-auto mob-ssm:!h-[343px] mob-sm3:!h-[276px]"
            imgStyles="mob-xs:h-full"
            addSX={{
              "& p": {
                marginBottom: "0 !important",
                marginTop: "16px !important",
              },
            }}
          />
        )}
        addSX={{
          gridTemplateColumns: {
            "mob-xs": "repeat(auto-fit, minmax(236px, 1fr))",
            mob: "1fr",
          },
        }}
      />
    </Box>
  );
}
