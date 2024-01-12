import { useState, useEffect } from "react";

import { Typography, Box, TextField, MenuItem, Button } from "@mui/material";
import Card from "../../../Card";
import FormHeading from "./FormHeading";
import ImageSharpIcon from "@mui/icons-material/ImageSharp";
import ChangeImageBtns from "../../ChangeImageBtns";
import CustomInput from "../../CustomInput";
import { getWeiFromEther, uploadFileToIPFS, uploadJSONToIPFS } from "@/utils/pinata/tools";
import { useWeb3Context } from "@/utils";

const NFTCreationForm = ({
  onSave,
  selectedImage,
  editedNFT,
  theme,
  onCloseModal,
  includeImageUpload = true,
}) => {

  const { address, registerCommunity,buyCommunityNft } = useWeb3Context();

  const [formData, setFormData] = useState({
    selectedImage: !includeImageUpload ? selectedImage : null,
    name: "",
    chain: "",
    description: "",
    quantity: "",
  });
  useEffect(() => {
    if (editedNFT) {
      console.log(editedNFT);
      setFormData({
        selectedImage: editedNFT.selectedImage,
        name: editedNFT.name,
        chain: editedNFT.chain,
        description: editedNFT.description,
      });
    }
  }, [editedNFT]);

  const svgFillColor = theme === "light" ? "#10111B" : "white";
  const Chains = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5.7501 7.58331L9.72507 5.81664C9.90007 5.74164 10.1001 5.74164 10.2668 5.81664L14.2418 7.58331C14.5918 7.74164 14.9167 7.31664 14.6751 7.01664L10.5084 1.92498C10.2251 1.57498 9.75841 1.57498 9.47508 1.92498L5.30841 7.01664C5.07508 7.31664 5.4001 7.74164 5.7501 7.58331Z"
            fill={svgFillColor}
          />
          <path
            d="M5.74981 12.4167L9.73312 14.1834C9.90812 14.2584 10.1081 14.2584 10.2748 14.1834L14.2581 12.4167C14.6081 12.2584 14.9331 12.6834 14.6915 12.9834L10.5248 18.075C10.2415 18.425 9.7748 18.425 9.49147 18.075L5.3248 12.9834C5.0748 12.6834 5.39148 12.2584 5.74981 12.4167Z"
            fill={svgFillColor}
          />
          <path
            d="M9.81648 7.90837L6.3748 9.62504C6.06647 9.77504 6.06647 10.2167 6.3748 10.3667L9.81648 12.0834C9.93314 12.1417 10.0748 12.1417 10.1914 12.0834L13.6331 10.3667C13.9414 10.2167 13.9414 9.77504 13.6331 9.62504L10.1914 7.90837C10.0664 7.85004 9.93314 7.85004 9.81648 7.90837Z"
            fill={svgFillColor}
          />
        </svg>
      ),
      name: "ethereum",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5.7501 7.58331L9.72507 5.81664C9.90007 5.74164 10.1001 5.74164 10.2668 5.81664L14.2418 7.58331C14.5918 7.74164 14.9167 7.31664 14.6751 7.01664L10.5084 1.92498C10.2251 1.57498 9.75841 1.57498 9.47508 1.92498L5.30841 7.01664C5.07508 7.31664 5.4001 7.74164 5.7501 7.58331Z"
            fill={svgFillColor}
          />
          <path
            d="M5.74981 12.4167L9.73312 14.1834C9.90812 14.2584 10.1081 14.2584 10.2748 14.1834L14.2581 12.4167C14.6081 12.2584 14.9331 12.6834 14.6915 12.9834L10.5248 18.075C10.2415 18.425 9.7748 18.425 9.49147 18.075L5.3248 12.9834C5.0748 12.6834 5.39148 12.2584 5.74981 12.4167Z"
            fill={svgFillColor}
          />
          <path
            d="M9.81648 7.90837L6.3748 9.62504C6.06647 9.77504 6.06647 10.2167 6.3748 10.3667L9.81648 12.0834C9.93314 12.1417 10.0748 12.1417 10.1914 12.0834L13.6331 10.3667C13.9414 10.2167 13.9414 9.77504 13.6331 9.62504L10.1914 7.90837C10.0664 7.85004 9.93314 7.85004 9.81648 7.90837Z"
            fill={svgFillColor}
          />
        </svg>
      ),
      name: "ethereum",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5.7501 7.58331L9.72507 5.81664C9.90007 5.74164 10.1001 5.74164 10.2668 5.81664L14.2418 7.58331C14.5918 7.74164 14.9167 7.31664 14.6751 7.01664L10.5084 1.92498C10.2251 1.57498 9.75841 1.57498 9.47508 1.92498L5.30841 7.01664C5.07508 7.31664 5.4001 7.74164 5.7501 7.58331Z"
            fill={svgFillColor}
          />
          <path
            d="M5.74981 12.4167L9.73312 14.1834C9.90812 14.2584 10.1081 14.2584 10.2748 14.1834L14.2581 12.4167C14.6081 12.2584 14.9331 12.6834 14.6915 12.9834L10.5248 18.075C10.2415 18.425 9.7748 18.425 9.49147 18.075L5.3248 12.9834C5.0748 12.6834 5.39148 12.2584 5.74981 12.4167Z"
            fill={svgFillColor}
          />
          <path
            d="M9.81648 7.90837L6.3748 9.62504C6.06647 9.77504 6.06647 10.2167 6.3748 10.3667L9.81648 12.0834C9.93314 12.1417 10.0748 12.1417 10.1914 12.0834L13.6331 10.3667C13.9414 10.2167 13.9414 9.77504 13.6331 9.62504L10.1914 7.90837C10.0664 7.85004 9.93314 7.85004 9.81648 7.90837Z"
            fill={svgFillColor}
          />
        </svg>
      ),
      name: "ethereum",
    },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(name, value);
    if (name === "selectedImage") {
      // Handle image selection separately
      const selectedImage = files[0];
      setFormData((prevData) => ({ ...prevData, selectedImage }));

      // Display the chosen image
      const imgElement = document.getElementById("chosenImage");
      if (imgElement) {
        const imageUrl = URL.createObjectURL(selectedImage);
        imgElement.style.backgroundImage = `url(${imageUrl})`;
        imgElement.style.backgroundPosition = "center";
        imgElement.style.backgroundRepeat = "no-repeat";
        imgElement.style.backgroundSize = "cover";
      }
    } else {
      // Handle other inputs
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleDeleteImage = () => {
    // Implement your API logic here to delete the avatar
    console.log("Deleting nft image");
    setFormData((prevData) => ({
      ...prevData,
      selectedImage: null,
    }));
    // clear the chosen image
    const imgElementClear = document.getElementById("chosenImage");
    if (imgElementClear) {
      imgElementClear.style.backgroundImage = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${
        theme === "light" ? "%2310111B" : "white"
      }' stroke-width='2' stroke-dasharray='4%2c 6' stroke-dashoffset='12' stroke-linecap='square'/%3e%3c/svg%3e")`;
    }
  };

  // const handleAddAttribute = () => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     attributes: [
  //       ...prevData.attributes,
  //       { attributetype: "", attributename: "" },
  //     ],
  //   }));
  // };

  // const handleDeleteAttribute = (index) => {
  //   setFormData((prevData) => {
  //     const updatedAttributes = [...prevData.attributes];
  //     updatedAttributes.splice(index, 1); // Remove the attribute at the specified index
  //     return { ...prevData, attributes: updatedAttributes };
  //   });
  // };

  // const handleAttributeChange = (index, attributeName, value) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     attributes: prevData.attributes.map((attr, i) =>
  //       i === index ? { ...attr, [attributeName]: value } : attr
  //     ),
  //   }));
  // };

  const handleSubmit = () => {
    // Perform submission logic here
    console.log("Form submitted!", formData);
    if (editedNFT) {
      // Handle edit logic
      const editedData = {
        ...editedNFT,
        ...formData,
      };
      onSave(editedData);
    } else {
      // Handle create logic
      includeImageUpload ? onSave([formData]) : onSave(formData);
    }
    // Clear all inputs after submitting the form
    setFormData({
      selectedImage: null,
      name: "",
      chain: "",
      description: "",
      quantity: 0,
    });
    // clear the chosen image
    const imgElementClear = document.getElementById("chosenImage");
    if (imgElementClear) {
      imgElementClear.style.backgroundImage = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${
        theme === "light" ? "%2310111B" : "white"
      }' stroke-width='2' stroke-dasharray='4%2c 6' stroke-dashoffset='12' stroke-linecap='square'/%3e%3c/svg%3e")`;
    }
  };
  return (
    <Card
      classNames="mob:p-3 tab:p-4 lap:p-6 mob:mt-8 tab:mt-12 lap:mt-16"
      addSX={{ backgroundColor: "primary.reversed" }}
    >
      <Box
        className={`grid mob:grid-cols-1 mob:gap-4 biggerTab:gap-0 ${
          includeImageUpload && "biggerTab:grid-cols-2"
        } lap:grid-cols-1 lap:gap-4 desk:gap-0 ${
          includeImageUpload && "desk:grid-cols-2"
        }`}
        component="form"
        noValidate
        autoComplete="off"
      >
        {includeImageUpload && (
          <Box className="h-full">
            <FormHeading
              text={"NFT Creation Form"}
              classNames="border-b pb-4 w-full desk:max-w-[450px]"
            />
            <Box
              className="biggerTab:border-r biggerTab:border-solid lap:border-none lap:pr-0 desk:border-r desk:border-solid desk:pr-[39px] biggerTab:pr-[39px] pt-6 flex flex-col"
              sx={{ borderColor: "primary.border" }}
            >
              <Box
                id="chosenImage"
                className="w-full mob:max-w-[320px] mob:self-center tab:max-w-[450px] mob:h-[320px] tab:h-[450px] mob:mb-4 tab:mb-3 imgWithDashedBorder "
                sx={{
                  borderColor: "text.primary",
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${
                    theme === "light" ? "%2310111B" : "white"
                  }' stroke-width='2' stroke-dasharray='4%2c 6' stroke-dashoffset='12' stroke-linecap='square'/%3e%3c/svg%3e")`,
                }}
              ></Box>
              <ChangeImageBtns
                icon={<ImageSharpIcon />}
                // containedCSS={containedCSS}
                btnText={"Select Image"}
                handleFileChange={handleChange}
                onClickDelete={handleDeleteImage}
                accept={
                  "image/png, image/jpeg, image/jpg, image/gif, video/mp4"
                }
                text={"Supported file types : png, jpg, gif, jpeg, mp4"}
                containedCSS="w-full"
                inputName="selectedImage"
              />
            </Box>
          </Box>
        )}
        <Box
          className={`${includeImageUpload && "biggerTab:pl-[33px]"} lap:pl-0 ${
            includeImageUpload && "desk:pl-[33px]"
          }`}
        >
          <FormHeading text={"Details"} onCloseModal={onCloseModal} />

          <Box className="mt-6">
            <CustomInput
              label="Name"
              type="text"
              inputName={"name"}
              value={formData.name}
              handleChange={handleChange}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                lineHeight: "normal",
                color: "text.primary",
              }}
              className="uppercase !mb-[8px]"
            >
              chain
            </Typography>
            <TextField
              fullWidth
              placeholder="Select Chain"
              variant="outlined"
              color="primary"
              select
              name="chain"
              value={formData.chain}
              onChange={handleChange}
              className="flex uppercase !h-[44px]"
              sx={{
                color: "text.primary",
                ".MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  height: "44px !important",
                },
              }}
            >
              {/* Replace with actual chain options */}
              {Chains.map((chain, index) => (
                <MenuItem
                  key={index}
                  value={chain.name}
                  className="gap-3 uppercase"
                >
                  {chain.icon}
                  {chain.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box className="mt-6">
            <CustomInput
              label="Description"
              placeholder="Write description here..."
              type="textarea"
              inputName={"description"}
              value={formData.description}
              handleChange={handleChange}
            />
          </Box>
          <Box className="mt-6">
            <CustomInput
              label="QUANTITY"
              type="number"
              inputName={"quantity"}
              placeholder="Enter quantity here"
              value={formData.quantity}
              handleChange={handleChange}
            />
          </Box>

          {/* Submit Button */}
          <Box
            sx={{}}
            className="flex justify-end gap-3 mob:!mt-8 tab:!mt-12 lap:!mt-16 text-right"
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              className="lightBlue"
              sx={{
                padding: "16px 24px",
                fontSize: "16px",
                fontWeight: "400 !important",
                "&.MuiButtonBase-root.lightBlue": {
                  backgroundColor: "#34A4E0",
                },
                lineHeight: "120%",
                color: "#10111B",
                textTransform: "uppercase",
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default NFTCreationForm;
