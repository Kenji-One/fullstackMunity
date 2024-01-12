/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import { Box } from "@mui/material";
import ImageSharpIcon from "@mui/icons-material/ImageSharp";
import Card from "../../Card";
import ChangeImageBtns from "../ChangeImageBtns";

export default function ChangeImage({
  isCover,
  title,
  imgPLaceholder,
  btnText,
  text,
  imgBox = "max-w-[100px]",
  row = true,
  border = true,
  // pl = "lap:pl-[6px]",
  containedCSS = "",
  cardStyles = "",
  addSX = {},
}) {
  const [avatar, setAvatar] = useState(null);

  // Placeholder function for API upload
  // const handleUpdateAvatar = (image) => {
  //   // Implement your API logic here to update the avatar
  //   console.log("Updating avatar:", image);
  // };

  // Placeholder function for API delete
  const handleDeleteAvatar = () => {
    // Implement your API logic here to delete the avatar
    console.log("Deleting avatar");
    setAvatar(null);
  };

  // Placeholder function for handling file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Implement logic to update avatar state and call API if needed
    setAvatar(file);
  };
  let bgImage = isCover
    ? `linear-gradient(180deg, rgba(45, 49, 55, 0.62) 0%, rgba(45, 49, 55, 0.00) 100%), url(${
        avatar ? URL.createObjectURL(avatar) : imgPLaceholder
      }), lightgray 50% / cover no-repeat`
    : {};
  return (
    <Card
      title={title}
      classNames={cardStyles} // Add any custom styles for this specific card
      addSX={addSX}
    >
      {/* Avatar Section */}
      <Box
        className={` flex ${
          row
            ? "items-center gap-x-6 flex-wrap gap-y-4 justify-center"
            : "flex-col gap-3"
        }`}
      >
        {/* Avatar Image */}
        <Box
          className={`${border && "border-2"} border-solid w-full ` + imgBox}
          sx={{ borderColor: "text.primary", background: bgImage }}
        >
          {!isCover && (
            <img
              src={avatar ? URL.createObjectURL(avatar) : imgPLaceholder} // Replace 'placeholder-image-url' with an actual placeholder image URL
              alt="Avatar"
              className={"w-full object-cover max-w-[100px] h-[100px]"}
            />
          )}
        </Box>

        {/* Avatar Controls */}
        <Box className={`flex flex-col ${row ? "flex-[1_0_260px]" : ""}`}>
          {/* Buttons Row */}

          <ChangeImageBtns
            icon={<ImageSharpIcon />}
            containedCSS={containedCSS}
            btnText={btnText}
            handleFileChange={handleFileChange}
            onClickDelete={handleDeleteAvatar}
            accept={"image/png, image/jpeg, image/jpg, image/gif"}
            text={text}
          />
        </Box>
      </Box>
    </Card>
  );
}
