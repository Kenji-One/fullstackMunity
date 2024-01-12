/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import { Box } from "@mui/material";
import NoNFTs from "../noData/noNFTs";
import ContentTabs from "../../ContentTabs/ContentTabs";
import CustomTabPanel from "../../ContentTabs/CustomTabPanel";
// import {
//   merchTestImg1,
//   merchTestImg2,
//   merchTestImg3,
//   merchTestImg4,
//   merchTestImg5,
//   merchTestImg6,
//   merchTestImg7,
// } from "../../../../public";
// import userImageTest from "../../../assets/images/userImageTest.png";
// import userImgArticles from "../../../assets/images/userimgArticles.jpeg";
// import articlesImg1Test from "../../../assets/images/articlesImg1Test.jpeg";

// Import custom tab content components
// import Accesskeys from "../accesskeys";
import Merch from "../merch";
import DAOProposals from "../DAOProposals";
import Articles from "../articles";
import Files from "../files";
import RoadMap from "../roadMap";

const navTabs = [
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

const merchContent = [
  {
    label: "Skyborne - GenesiS APOCAL...",
    image: "/images/merchTestImg1.png",
    price: "169 USD",
    style: "normal",
  },
  {
    label: "Skyborne - GenesiS APOCAL...",
    image: "/images/merchTestImg2.png",
    price: "169 USD",
    style: "normal",
  },
  {
    label: "Skyborne - GenesiS APOCAL...",
    image: "/images/merchTestImg3.png",
    price: "169 USD",
    style: "normal",
  },
  {
    label: "Skyborne - GenesiS APOCAL...",
    image: "/images/merchTestImg4.png",
    price: "169 USD",
    style: "normal",
  },
];
const merchContentFirstPart = [
  {
    label: "2023 CHAMPIONSHIPS KIT PRO JERSEY",
    image: "/images/merchTestImg5.png",
    style: "bgImage",
    url: "",
  },
  {
    label: "2023 COLLECTIONS: SWEATSHIRT STYLE JACKET",
    image: "/images/merchTestImg6.png",
    style: "bgImage",
    url: "",
  },
  {
    label: "2023 COLLECTIONS: JACKET COAT STYLE",
    image: "/images/merchTestImg7.png",
    style: "bgImage",
    url: "",
  },
];

const DAOContent = [
  {
    username: "0xCff5...8D6e",
    label: "Add Metis Chain support for MAI Bridging",
    text: "Proposal: Add Metis Chain support for MAI Bridging --MAI and Stargate-- MAI is currently listed on Stargate on Optimism, Arbitrum, Polygon, Ethereum...",
    image: "/images/userImageTest.png",
    yes: { percent: "93.41%", amount: "7.3M veSTG", checked: true },
    no: { percent: "3.84%", amount: "7.3M veSTG", checked: false },
    abstain: { percent: "2.75%", amount: "7.3M veSTG", checked: false },
    state: "closed",
  },
  {
    username: "0xCff5...8D6e",
    label: "Add Metis Chain support for MAI Bridging",
    text: "Proposal: Add Metis Chain support for MAI Bridging --MAI and Stargate-- MAI is currently listed on Stargate on Optimism, Arbitrum, Polygon, Ethereum...",
    image: "/images/userImageTest.png",
    yes: { percent: "93.41%", amount: "7.3M veSTG", checked: true },
    no: { percent: "3.84%", amount: "7.3M veSTG", checked: false },
    abstain: { percent: "2.75%", amount: "7.3M veSTG", checked: false },
    state: "closed",
  },
  {
    username: "0xCff5...8D6e",
    label: "Add Metis Chain support for MAI Bridging",
    text: "Proposal: Add Metis Chain support for MAI Bridging --MAI and Stargate-- MAI is currently listed on Stargate on Optimism, Arbitrum, Polygon, Ethereum...",
    image: "/images/userImageTest.png",
    yes: { percent: "93.41%", amount: "7.3M veSTG", checked: true },
    no: { percent: "3.84%", amount: "7.3M veSTG", checked: false },
    abstain: { percent: "2.75%", amount: "7.3M veSTG", checked: false },
    state: "closed",
  },
  {
    username: "0xCff5...8D6e",
    label: "Add Metis Chain support for MAI Bridging",
    text: "Proposal: Add Metis Chain support for MAI Bridging --MAI and Stargate-- MAI is currently listed on Stargate on Optimism, Arbitrum, Polygon, Ethereum...",
    image: "/images/userImageTest.png",
    yes: { percent: "93.41%", amount: "7.3M veSTG", checked: true },
    no: { percent: "3.84%", amount: "7.3M veSTG", checked: false },
    abstain: { percent: "2.75%", amount: "7.3M veSTG", checked: false },
    state: "closed",
  },
  {
    username: "0xCff5...8D6e",
    label: "Add Metis Chain support for MAI Bridging",
    text: "Proposal: Add Metis Chain support for MAI Bridging --MAI and Stargate-- MAI is currently listed on Stargate on Optimism, Arbitrum, Polygon, Ethereum...",
    image: "/images/userImageTest.png",
    yes: { percent: "93.41%", amount: "7.3M veSTG", checked: true },
    no: { percent: "3.84%", amount: "7.3M veSTG", checked: false },
    abstain: { percent: "2.75%", amount: "7.3M veSTG", checked: false },
    state: "closed",
  },
  {
    username: "0xCff5...8D6e",
    label: "Add Metis Chain support for MAI Bridging",
    text: "Proposal: Add Metis Chain support for MAI Bridging --MAI and Stargate-- MAI is currently listed on Stargate on Optimism, Arbitrum, Polygon, Ethereum...",
    image: "/images/userImageTest.png",
    yes: { percent: "93.41%", amount: "7.3M veSTG", checked: true },
    no: { percent: "93.41%", amount: "7.3M veSTG", checked: "false" },
    abstain: { percent: "93.41%", amount: "7.3M veSTG", checked: "false" },
    state: "closed",
  },
];
const articlesContent = [
  {
    username: "Frances Swann",
    label: "16 little UI design rules that make a big impact",
    text: "Punks2023 is the debut collection from Unfungible Labs. 10,000 pixel art NFTs, inspired by the original CryptoPunks...",
    image: "/images/articlesImg1Test.jpeg",
    userImg: "/images/userimgArticles.jpeg",
    date: "Mar 14",
    url: "#",
  },
  {
    username: "Frances Swann",
    label: "16 little UI design rules that make a big impact",
    text: "Punks2023 is the debut collection from Unfungible Labs. 10,000 pixel art NFTs, inspired by the original CryptoPunks...",
    image: "/images/articlesImg1Test.jpeg",
    userImg: "/images/userimgArticles.jpeg",
    date: "Mar 14",
    url: "#",
  },
  {
    username: "Frances Swann",
    label: "16 little UI design rules that make a big impact",
    text: "Punks2023 is the debut collection from Unfungible Labs. 10,000 pixel art NFTs, inspired by the original CryptoPunks...",
    image: "/images/articlesImg1Test.jpeg",
    userImg: "/images/userimgArticles.jpeg",
    date: "Mar 14",
    url: "#",
  },
  {
    username: "Frances Swann",
    label: "16 little UI design rules that make a big impact",
    text: "Punks2023 is the debut collection from Unfungible Labs. 10,000 pixel art NFTs, inspired by the original CryptoPunks...",
    image: "/images/articlesImg1Test.jpeg",
    userImg: "/images/userimgArticles.jpeg",
    date: "Mar 14",
    url: "#",
  },
  {
    username: "Frances Swann",
    label: "16 little UI design rules that make a big impact",
    text: "Punks2023 is the debut collection from Unfungible Labs. 10,000 pixel art NFTs, inspired by the original CryptoPunks...",
    image: "/images/articlesImg1Test.jpeg",
    userImg: "/images/userimgArticles.jpeg",
    date: "Mar 14",
    url: "#",
  },
  {
    username: "Frances Swann",
    label: "16 little UI design rules that make a big impact",
    text: "Punks2023 is the debut collection from Unfungible Labs. 10,000 pixel art NFTs, inspired by the original CryptoPunks...",
    image: "/images/articlesImg1Test.jpeg",
    userImg: "/images/userimgArticles.jpeg",
    date: "Mar 14",
    url: "#",
  },
  {
    username: "Frances Swann",
    label: "16 little UI design rules that make a big impact",
    text: "Punks2023 is the debut collection from Unfungible Labs. 10,000 pixel art NFTs, inspired by the original CryptoPunks...",
    image: "/images/articlesImg1Test.jpeg",
    userImg: "/images/userimgArticles.jpeg",
    date: "Mar 14",
    url: "#",
  },
];
const filesContent = [
  {
    label: "Summer Pack 2022-2023",
    size: "204.02 MB",
  },
  {
    label: "Summer Pack 2022-2023",
    size: "204.02 MB",
  },
  {
    label: "Summer Pack 2022-2023",
    size: "204.02 MB",
  },
  {
    label: "Summer Pack 2022-2023",
    size: "204.02 MB",
  },
  {
    label: "Summer Pack 2022-2023",
    size: "204.02 MB",
  },
  {
    label: "Summer Pack 2022-2023",
    size: "204.02 MB",
  },
  {
    label: "Summer Pack 2022-2023",
    size: "204.02 MB",
  },
  {
    label: "Summer Pack 2022-2023",
    size: "204.02 MB",
  },
  {
    label: "Summer Pack 2022-2023",
    size: "204.02 MB",
  },
  {
    label: "Summer Pack 2022-2023",
    size: "204.02 MB",
  },
];
const roadContent = [
  {
    label: "Born of a new idea!",
    text: "Lorem ipsum dolor sit amet consectetur. Aliquam malesuada amet quisque mi libero tempor est erat. Ullamcorper diam risus fermentum volutpat vitae arcu et. Ultrices in sed eget aliquet sed ornare quam. Vestibulum ullamcorper lacus viverra vitae integer eget massa nunc mattis.",
    year: "2023 Q1",
    progress: "ACHIEVED",
    starTexts: [
      { text: "Registering a company in UK & US." },
      { text: "Aliquam malesuada amet quisque mi libero tempor est erat." },
      { text: "Ultrices in sed eget aliquet sed ornare quam." },
      {
        text: "ullamcorper lacus viverra vitae integer eget massa nunc mattis.",
      },
    ],
  },
  {
    label: "Born of a new idea!",
    text: "Lorem ipsum dolor sit amet consectetur. Aliquam malesuada amet quisque mi libero tempor est erat. Ullamcorper diam risus fermentum volutpat vitae arcu et. Ultrices in sed eget aliquet sed ornare quam. Vestibulum ullamcorper lacus viverra vitae integer eget massa nunc mattis.",
    year: "2023 Q1",
    progress: "IN PROGRESS",
    starTexts: [
      { text: "Registering a company in UK & US." },
      { text: "Aliquam malesuada amet quisque mi libero tempor est erat." },
      { text: "Ultrices in sed eget aliquet sed ornare quam." },
      {
        text: "ullamcorper lacus viverra vitae integer eget massa nunc mattis.",
      },
    ],
  },
  {
    label: "Born of a new idea!",
    text: "Lorem ipsum dolor sit amet consectetur. Aliquam malesuada amet quisque mi libero tempor est erat. Ullamcorper diam risus fermentum volutpat vitae arcu et. Ultrices in sed eget aliquet sed ornare quam. Vestibulum ullamcorper lacus viverra vitae integer eget massa nunc mattis.",
    year: "2023 Q1",
    progress: "IN PROGRESS",
    starTexts: [
      { text: "Registering a company in UK & US." },
      { text: "Aliquam malesuada amet quisque mi libero tempor est erat." },
      { text: "Ultrices in sed eget aliquet sed ornare quam." },
      {
        text: "ullamcorper lacus viverra vitae integer eget massa nunc mattis.",
      },
    ],
  },
  {
    label: "Born of a new idea!",
    text: "Lorem ipsum dolor sit amet consectetur. Aliquam malesuada amet quisque mi libero tempor est erat. Ullamcorper diam risus fermentum volutpat vitae arcu et. Ultrices in sed eget aliquet sed ornare quam. Vestibulum ullamcorper lacus viverra vitae integer eget massa nunc mattis.",
    year: "2023 Q1",
    progress: "ACHIEVED",
    starTexts: [
      { text: "Registering a company in UK & US." },
      { text: "Aliquam malesuada amet quisque mi libero tempor est erat." },
      { text: "Ultrices in sed eget aliquet sed ornare quam." },
      {
        text: "ullamcorper lacus viverra vitae integer eget massa nunc mattis.",
      },
    ],
  },
];

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function Usernavigation(props) {
  const [value, setValue] = useState(0);
  const [areNFTs] = useState(true);
  const [areFiles] = useState(true);
  const { theme } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <ContentTabs
        value={value}
        handleChange={handleChange}
        navTabs={navTabs}
        a11yProps={a11yProps}
        classNames={"lap:px-10 mb-6 border border-solid border-t-0"}
        addSX={{
          "& .MuiTabs-scroller": { maxWidth: "916px", margin: "0 auto" },
        }}
      />
      {/* Use the CustomTabPanel component with the imported components */}
      {/* <CustomTabPanel value={value} index={0} className=" relative">
        <Accesskeys
          accessKeys={accessKeysContent}
          areNFTs={areNFTs}
          theme={theme}
        />
        {!areNFTs ? <NoNFTs theme={theme} /> : ""}
      </CustomTabPanel> */}
      <CustomTabPanel value={value} index={0} className=" relative">
        <Merch
          merchContentFirstPart={merchContentFirstPart}
          mainMerchContent={merchContent}
          areNFTs={areNFTs}
        />
        {!areNFTs ? <NoNFTs theme={theme} /> : ""}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} className=" relative">
        <DAOProposals DAOContent={DAOContent} areNFTs={areNFTs} />
        {!areNFTs ? <NoNFTs theme={theme} /> : ""}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} className=" relative">
        <Articles ArticlesContent={articlesContent} areNFTs={areNFTs} />
        {!areNFTs ? <NoNFTs theme={theme} /> : ""}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3} className=" relative">
        <Files
          filesContent={filesContent}
          areFiles={areFiles}
          areNFTs={areNFTs}
        />
        {!areNFTs ? <NoNFTs theme={theme} /> : ""}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5} className=" relative">
        <RoadMap roadContent={roadContent} areNFTs={areNFTs} />
        {!areNFTs ? <NoNFTs theme={theme} /> : ""}
      </CustomTabPanel>
    </Box>
  );
}
