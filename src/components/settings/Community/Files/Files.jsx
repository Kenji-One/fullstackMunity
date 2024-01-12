import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import FileSingle from "./FileSingle";
import BtnChange from "../../BtnChange";

const FileSection = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Update the state with the newly uploaded files
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const handleDeleteFile = (fileToDelete) => {
    // Filter out the file to be deleted from the state
    const updatedFiles = uploadedFiles.filter((file) => file !== fileToDelete);
    setUploadedFiles(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box className="mt-8">
      <Typography
        sx={{
          color: "text.primary",
          fontSize: "24px",
          lineHeight: "120%",
        }}
        className="!mb-8"
      >
        Files
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed",
          borderColor: "text.tertiary",
          // borderRadius: "4px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "32px",
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadOutlinedIcon sx={{ fontSize: 52, color: "text.primary" }} />

        {isDragActive ? (
          <Typography>Drop the files here ...</Typography>
        ) : (
          <Box className="text-center flex flex-col items-center gap-4 mt-4">
            <Typography
              sx={{
                fontSize: "24px",
                color: "text.primary",
                fontWeight: "120%",
                maxWidth: "205px",
                letterSpacing: "-0.48px",
              }}
            >
              Drag & Drop here or
            </Typography>
            <BtnChange>Select File</BtnChange>
          </Box>
        )}
      </Box>
      <Box className="flex flex-col gap-6">
        {uploadedFiles.map((file, index) => (
          <FileSingle
            key={index}
            file={file}
            onDelete={() => handleDeleteFile(file)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FileSection;
