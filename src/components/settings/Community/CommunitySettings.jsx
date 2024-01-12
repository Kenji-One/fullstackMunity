/* eslint-disable import/no-anonymous-default-export */
import { Box } from "@mui/material";
import ChangeImage from "../Profile/ChangeImage";
import CustomForm from "../CustomForm";
import SettingsBox from "../SettingsBoxMain";
import ToggleInput from "./ToggleInput";
import Card from "../../Card";
import ChannelsCard from "./Channels/ChannelsCard";
import WhiteList from "./Whitelist/WhiteList";

//icons
// import AddIcon from "@mui/icons-material/Add";

const handleFormSubmit = async (formData) => {
  // Implement your custom API logic here using formData
  console.log("Form submitted with data:", formData);
};

// const apiUrl = "your-api-endpoint"; // Replace with your actual API URL

const CommunitySettingsFormConfig = [
  {
    label: "Community Name",
    name: "communityName",
    type: "text",
    rowSpan: true,
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
    placeholder: "Write description here..",
    rowSpan: true,
  },
];

const CommunitySettingsTogglesConfig = [
  {
    label: "Access Key NFTs",
    isPro: false,
  },
  {
    label: "Merch",
    isPro: false,
  },
  {
    label: "DAO Proposals",
    isPro: false,
  },
  {
    label: "Articles",
    isPro: false,
  },
  {
    label: "Files",
    isPro: true,
  },
  {
    label: "Giveaways",
    isPro: false,
  },
  {
    label: "Roadmap",
    isPro: false,
  },
  {
    label: "Social Posts",
    isPro: false,
  },
];

export default function CommunitySettings() {
  return (
    <SettingsBox>
      <Box className="flex flex-col mob:gap-4 tab:gap-6 desk:gap-8">
        <CustomForm
          title="General Information"
          formConfig={CommunitySettingsFormConfig}
          // apiUrl={apiUrl}
          onSubmit={handleFormSubmit}
          cardStyles="mob:p-3 tab:p-4 lap:px-3 lap:py-4 desk:p-6"
        />

        <Card
          childrenStyles="flex flex-col gap-6"
          title={"Features"}
          addSX={{
            display: {
              mob: "none",
              tab: "block",
            },
          }}
        >
          {CommunitySettingsTogglesConfig.map((item, index) => (
            <ToggleInput key={index} label={item.label} isPro={item.isPro} />
          ))}
        </Card>

        <WhiteList
          addSX={{
            display: {
              mob: "none",
              tab: "block",
            },
          }}
        />
      </Box>
      <Box className="flex flex-col mob:gap-4 tab:gap-6 desk:gap-8">
        <ChangeImage
          isCover={true}
          title={"Community Banner"}
          btnText={"Update cover"}
          text={"File format: JPEG, PNG, GIF (Recommended 1816x300, max 10MB)"}
          imgPLaceholder={"/images/communityBackground.png"}
          imgBox="h-[129px] !bg-center !bg-cover"
          row={false}
          border={false}
          pl="w-full"
          containedCSS="w-full"
          cardStyles="mob:p-3 tab:p-4 lap:px-3 lap:py-4 desk:p-6"
        />
        <ChangeImage
          title={"Community Avatar"}
          btnText={"Update avatar"}
          text={"Must be JPEG, PNG, or GIF and cannot exceed 10MB."}
          imgPLaceholder={"/images/communityAvatarTesting.png"}
          cardStyles="mob:p-3 tab:p-4 lap:px-3 lap:py-4 desk:p-6"
          containedCSS="mob:w-full mob-sm1:w-auto"
        />
        {/* <Card title={"Channels"}>
          <Box className="flex flex-col gap-6 mob:mb-6 tab:mb-8">
            {CommunitySettingsChannelsConfig.map((item, index) => (
              <Channel
                key={index}
                label={item.label}
                isActive={item.isActive}
              />
            ))}
          </Box>
          <Box className="w-full text-center mob:mb-6 tab:mb-8">
            <BtnChange icon={<AddIcon />}>Add a Channel</BtnChange>
          </Box>
          <UpgradeCard />
        </Card> */}
        <ChannelsCard />
        <Card
          childrenStyles="flex flex-col gap-6"
          title={"Features"}
          addSX={{
            display: {
              mob: "block",
              tab: "none",
            },
          }}
        >
          {CommunitySettingsTogglesConfig.map((item, index) => (
            <ToggleInput key={index} label={item.label} isPro={item.isPro} />
          ))}
        </Card>
        <WhiteList
          addSX={{
            display: {
              mob: "block",
              tab: "none",
            },
          }}
        />
      </Box>
    </SettingsBox>
  );
}
