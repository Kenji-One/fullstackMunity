/* eslint-disable import/no-anonymous-default-export */
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ContentTabs from "../../../ContentTabs/ContentTabs";
import CustomTabPanel from "../../../ContentTabs/CustomTabPanel";
import NoContent from "../../../noContent/NoContent";
import ContentsTop from "./ContentsTop";
import CustomCard from "../../../CustomCard";
import LoadmoreShowLess from "../../../LoadmoreShowLess";
// Import custom tab content components
import NFTCreationApp from "../NFTCreation/NFTCreationApp";
import RoadmapForm from "../roadmap/RoadmapForm";
import FileSection from "../Files/Files";

const navTabs = [
  {
    label: "Access Keys",
    content: "",
  },
  {
    label: "Merch",
    content: "",
  },
  {
    label: "DAO Proposals",
    content: "",
  },
  {
    label: "Articles",
    content: "",
  },
  {
    label: "Files",
    content: "",
  },
  {
    label: "Giveaways",
    content: "",
  },
  {
    label: "Roadmap",
    content: "",
  },
  {
    label: "Social Posts",
    content: "",
  },
];

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function ContentNav() {
  const [value, setValue] = useState(0);
  const [nfts, setNFTs] = useState([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isCreatingNFT, setIsCreatingNFT] = useState(false);
  const { theme } = useSelector((state) => state.app);

  const handleSave = () => {
    console.log("Saving price:", price);
    quantity !== "" && console.log("Saving quantity:", quantity);
    // You can perform further actions, such as sending the value to the server
  };
  const handleAddNFT = (newNFTs) => {
    // Add new NFTs to the state
    console.log(newNFTs);
    setNFTs([...nfts, ...newNFTs]);
    setIsCreatingNFT(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleCreatingContent = () => {
    setIsCreatingNFT(true);
  };

  return (
    <Box className="lap:mr-4 mt-8">
      <ContentTabs
        value={value}
        handleChange={handleChange}
        navTabs={navTabs}
        a11yProps={a11yProps}
        classNames={"border-b "}
      />
      {/* Use the CustomTabPanel component with the imported components */}
      <CustomTabPanel value={value} index={0} className=" relative">
        {!isCreatingNFT &&
          (nfts.length > 0 ? (
            <Box>
              <ContentsTop
                theme={theme}
                title={"Access Key NFTs"}
                label={
                  <Box className="flex items-center gap-[7px]">
                    <Typography
                      sx={{
                        fontWeight: "400 !important",
                        fontSize: "14px",
                        color: "text.primary",
                        lineHeight: "normal",
                      }}
                    >
                      MINTING PRICE
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: "14px",
                        lineHeight: "normal",
                      }}
                    >
                      FOR JOINING COMMUNITY
                    </Typography>
                  </Box>
                }
                onClick={handleSave}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                handleChangeQuantity={(e) => setQuantity(e.target.value)}
                quantity={quantity}
                HasCreateButton={true}
                handleCreateNFT={handleCreatingContent}
                isNumber={true}
              />
              {/* Display NFTs */}

              <LoadmoreShowLess
                classNames={`grid mob:grid-cols-1 tab:grid-cols-2 desk:grid-cols-3 mob:gap-y-6 tab:gap-y-8 gap-x-6`}
                nav={"accessKeys"}
                data={nfts}
                initialItems={12}
                step={12}
                renderItem={(item) => (
                  <CustomCard
                    accessKeySingle={item}
                    title={item.name}
                    cardImg={URL.createObjectURL(item.selectedImage)}
                    buttonText="Buy Now"
                    titleFontSize="18px"
                    minted={false}
                    buttonVariant="text"
                  />
                )}
              />
            </Box>
          ) : (
            <Box>
              <ContentsTop
                title={"Access Key NFTs"}
                theme={theme}
                label={
                  <Box className="flex items-center gap-[7px]">
                    <Typography
                      sx={{
                        fontWeight: "400 !important",
                        color: "text.primary",
                        fontSize: "14px",
                        lineHeight: "normal",
                      }}
                    >
                      MINTING PRICE
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: "14px",
                        lineHeight: "normal",
                      }}
                    >
                      FOR JOINING COMMUNITY
                    </Typography>
                  </Box>
                }
                onClick={handleSave}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                handleChangeQuantity={(e) => setQuantity(e.target.value)}
                quantity={quantity}
                isNumber={true}
              />
              <NoContent
                image={"/images/NoTasks.png"}
                text="You have added no Access Key’s yet."
                btnText={"ADD NOW!"}
                onClick={handleCreatingContent}
                theme={theme}
                darkImage={"/images/NoTasksDark.png"}
              />
            </Box>
          ))}
        {isCreatingNFT && (
          <Box className="mob:mt-6 tab:mt-8 lap:mt-10">
            <Typography
              sx={{
                color: "text.primary",
                fontSize: "24px",
                fontWeight: "400 !important",
                lineHeight: "120%",
              }}
              className="!mb-8"
            >
              Create NFT
            </Typography>
            <NFTCreationApp theme={theme} handleAddNFT={handleAddNFT} />
          </Box>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} className=" relative">
        <ContentsTop
          title={"Merch (23 Items)"}
          label={"Shopify Link"}
          placeholder={"e.g. hhtps://Shopify.com/yourlink"}
          onClick={handleSave}
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} className=" relative">
        <ContentsTop
          title={"Dao Proposals"}
          label={"SNAPSHOT LINK"}
          placeholder={"e.g. hhtps://snapshot.org/yourlink"}
          onClick={handleSave}
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3} className=" relative">
        <ContentsTop
          title={"Articles"}
          label={"MEDIUM ACCOUNT LINK"}
          placeholder={"e.g. hhtps://medium.com/yourlink"}
          onClick={handleSave}
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4} className=" relative">
        <FileSection />
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={5}
        className=" relative"
      ></CustomTabPanel>
      <CustomTabPanel value={value} index={6} className=" relative">
        <RoadmapForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7} className=" relative">
        <ContentsTop
          title={"Social Posts"}
          label={"INSTAGRAM ACCOUNT LINK"}
          placeholder={"e.g. hhtps://instagram.com/yourlink"}
          onClick={handleSave}
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </CustomTabPanel>
    </Box>
  );
}
