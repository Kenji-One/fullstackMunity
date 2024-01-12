import { useRouter } from "next/router";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

export default function NoNFTs(props) {
  const router = useRouter();
  return (
    <Box
      sx={{
        transform: "translateX(-50%)",
        backgroundColor: "primary.reversed",
      }}
      className="absolute top-14 left-1/2 z-20 w-full h-full lap:max-w-[892px] lap:max-h-[762px] tab:max-w-[550px] tab:max-h-[425px] mob:max-w-[310px] mob:max-h-[364px] lap:p-20 mob:p-4 text-center flex items-center justify-center flex-col"
    >
      {/* Image */}

      <Image
        src={"/images/NonftsLight.png"}
        alt="no access"
        className="w-full lap:max-w-[500px] mob:max-w-[200px] h-auto lap:mb-8 mob:mb-4"
        width={500}
        height={400}
      />

      {/* Text */}
      <Typography
        variant="h3"
        sx={{ color: "primary.main" }}
        className="lap:!mb-[52px] mob:!mb-6"
      >
        You don’t own the NFT to access this community
      </Typography>

      {/* Button */}
      <Button
        variant="contained"
        sx={{
          color: "primary.black",
          backgroundColor: "background.secondaryBtn",
        }}
        onClick={() => router.push("/single")}
      >
        Buy the NFT
      </Button>
    </Box>
  );
}
