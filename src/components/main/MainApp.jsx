import { useRouter } from "next/router";

import { Box } from "@mui/material";

//Sections
import Hero from "./Hero";
import Categories from "./Categories/Categories";
import Popular from "./Popular";
import Users from "./Users/Users";

export default function MainApp() {
  const router = useRouter();
  const communityData = {
    name: "Grow your Agency",
    communityImg: "/images/profileBanner.png",
    owner: "Imangadzhi",
    ownerURL: "/profile",
    Url: "/community",
    slots: "204",
    verified: true,
  };
  const categoryData = [
    {
      name: "Trending",
      link: "/community",
      communityQuantity: "1.2M",
      categoryIMG: "/images/CategoryTrending.png",
    },
    {
      name: "Top",
      link: "/community",
      communityQuantity: "1.6M",
      categoryIMG: "/images/CategoryClone.png",
    },
    {
      name: "Art",
      link: "/community",
      communityQuantity: "2.2M",
      categoryIMG: "/images/CategoryArt.png",
    },
    {
      name: "Games",
      link: "/community",
      communityQuantity: "3.5M",
      categoryIMG: "/images/CategoryGames.png",
    },
    {
      name: "Music",
      link: "/community",
      communityQuantity: "1.4M",
      categoryIMG: "/images/CategoryMusic.png",
    },
    {
      name: "Photography",
      link: "/community",
      communityQuantity: "2.1M",
      categoryIMG: "/images/CategoryPhotography.png",
    },
    {
      name: "Collectibles",
      link: "/community",
      communityQuantity: "1.2M",
      categoryIMG: "/images/CategoryCollectibles.png",
    },
    {
      name: "Virtual World",
      link: "/community",
      communityQuantity: "5.3M",
      categoryIMG: "/images/CategoryVirtualWorld.png",
    },
  ];

  const popularsData = [
    {
      title: "Iman Gadzhi Community",
      communityIMG: "/images/community01.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },
    {
      title: "Grow your agency",
      communityIMG: "/images/community02.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },
    {
      title: "Iman Gadzhi Community",
      communityIMG: "/images/community01.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },
    {
      title: "Grow your agency",
      communityIMG: "/images/community02.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },
    {
      title: "Iman Gadzhi Community",
      communityIMG: "/images/community01.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },
    {
      title: "Grow your agency",
      communityIMG: "/images/community02.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },
    {
      title: "Iman Gadzhi Community",
      communityIMG: "/images/community01.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },
    {
      title: "Grow your agency",
      communityIMG: "/images/community02.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },
  ];
  const usersData = [
    {
      name: "Rodger Struck",
      communityIMG: "/images/user1.jpeg",
      url: "#",
    },
    {
      name: "Alex Buckmaster",
      communityIMG: "/images/user2.jpeg",
      url: "#",
    },
    {
      name: "Dennis Callis",
      communityIMG: "/images/user3.jpeg",
      url: "#",
    },
    {
      name: "Ricky Smith",
      communityIMG: "/images/user4.jpeg",
      url: "#",
    },
    {
      name: "Paula Mora",
      communityIMG: "/images/user5.jpeg",
      url: "#",
    },
    {
      name: "Frances Swann",
      communityIMG: "/images/user6.jpeg",
      url: "#",
    },
    {
      name: "Rhonda Rhodes",
      communityIMG: "/images/user7.jpeg",
      url: "#",
    },
    {
      name: "Mary Freund",
      communityIMG: "/images/user8.jpeg",
      url: "#",
    },
    {
      name: "Stephanie Sharkey",
      communityIMG: "/images/user9.jpeg",
      url: "#",
    },
    {
      name: "Kurt Bates",
      communityIMG: "/images/user10.jpeg",
      url: "#",
    },
    {
      name: "David Elson",
      communityIMG: "/images/user11.jpeg",
      url: "#",
    },
    {
      name: "Jerry Helfer",
      communityIMG: "/images/user12.jpeg",
      url: "#",
    },
  ];
  const categoryGamingData = [
    {
      title: "Grow your agency",
      communityIMG: "/images/community02.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },

    {
      title: "Grow your agency",
      communityIMG: "/images/community02.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },

    {
      title: "Grow your agency",
      communityIMG: "/images/community02.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },

    {
      title: "Grow your agency",
      communityIMG: "/images/community02.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },
    {
      title: "Grow your agency",
      communityIMG: "/images/community02.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },

    {
      title: "Grow your agency",
      communityIMG: "/images/community02.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },

    {
      title: "Grow your agency",
      communityIMG: "/images/community02.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },

    {
      title: "Grow your agency",
      communityIMG: "/images/community02.png",
      users: "12k+",
      slotsLeft: "2,102",
      url: "#",
    },
  ];

  return (
    <Box>
      <Hero communityData={communityData} navigate={router} />
      <Categories categoryData={categoryData} navigate={router} />
      <Popular
        sectionTitle={"POPULAR COMMUNITIES"}
        sectionNum={"02."}
        popularsData={popularsData}
      />
      <Users usersData={usersData} />
      <Popular
        sectionTitle={"CATEGORY: GAMING"}
        sectionNum={"04."}
        popularsData={categoryGamingData}
      />
    </Box>
  );
}
