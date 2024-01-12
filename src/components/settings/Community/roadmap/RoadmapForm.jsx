// RoadmapForm.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import RoadmapItem from "./RoadmapItem";
import BtnChange from "../../BtnChange";
import AddIcon from "@mui/icons-material/Add";

const RoadmapForm = () => {
  const [monthly, setMonthly] = useState("Monthly");
  const [roadmapData, setRoadmapData] = useState([
    {
      title: "",
      date: "",
      description: "",
      points: [""],
      achieved: false,
    },
  ]);

  const handleSwitchChange = () => {
    setMonthly((prev) => (prev === "Monthly" ? "Quarterly" : "Monthly"));
  };

  const handleRoadmapChange = (index, field, value, pointIndex) => {
    // console.log(index, field, value);
    const updatedRoadmap = [...roadmapData];
    if (field === "point") {
      // If the field is a point, update it with the given value
      const updatedValue = [...updatedRoadmap[index].points];
      updatedValue[pointIndex] = value;
      updatedRoadmap[index].points = updatedValue;
    } else {
      // If the field is not a point, update it directly
      updatedRoadmap[index][field] = value;
    }
    setRoadmapData(updatedRoadmap);
  };

  const handleToggleAchieved = (index, newAchieved) => {
    const updatedRoadmap = [...roadmapData];
    updatedRoadmap[index].achieved = newAchieved;
    setRoadmapData(updatedRoadmap);
  };

  const handleAddPoint = (index) => {
    const updatedRoadmap = [...roadmapData];
    updatedRoadmap[index].points.push("");
    setRoadmapData(updatedRoadmap);
  };

  const handleDeletePoint = (roadmapIndex, pointIndex) => {
    const updatedRoadmap = [...roadmapData];
    updatedRoadmap[roadmapIndex].points.splice(pointIndex, 1);
    setRoadmapData(updatedRoadmap);
  };

  const handleDeleteItem = (index) => {
    const updatedRoadmap = [...roadmapData];
    updatedRoadmap.splice(index, 1);
    setRoadmapData(updatedRoadmap);
  };

  const handleAddNewRoadmap = () => {
    setRoadmapData((prev) => [
      ...prev,
      {
        title: "",
        date: "",
        description: "",
        points: ["Point #1"],
        achieved: false,
      },
    ]);
  };

  const handleSaveRoadmap = () => {
    // Implement API request to save the roadmap data
    console.log("Saving Roadmap:", roadmapData);
  };

  return (
    <Box>
      <Box className="flex items-center justify-between mt-8 mb-[29.5px] gap-4 flex-wrap">
        <Typography
          fontSize={{ mob: "18px", tab: "24px" }}
          fontWeight={"400 !important"}
          letterSpacing={"-0.48px"}
          lineHeight={"120%"}
          className=""
          color={"text.primary"}
        >
          Roadmap
        </Typography>

        <ToggleButtonGroup
          value={monthly}
          exclusive
          onChange={handleSwitchChange}
          sx={{
            borderRadius: "0",
            padding: "2px",
            backgroundColor: "background.primaryBtn",
            "& .MuiButtonBase-root": {
              border: "none",
              color: "text.primary",
            },
            "& .MuiButtonBase-root.Mui-selected": {
              backgroundColor: "text.primary",
              color: "primary.reversed",
              fontWeight: "300",
            },
          }}
        >
          <ToggleButton value="Monthly">Monthly</ToggleButton>
          <ToggleButton value="Quarterly">Quarterly</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {roadmapData.map((data, index) => (
        <RoadmapItem
          key={index}
          index={index}
          data={data}
          onChange={handleRoadmapChange}
          onDeletePoint={handleDeletePoint}
          onDeleteItem={handleDeleteItem}
          onToggleAchieved={handleToggleAchieved}
          onAddPoint={handleAddPoint}
        />
      ))}

      <Box className="flex justify-center gap-6 mob:mt-3 tab:mt-4 lap:mt-6 flex-wrap">
        <BtnChange
          icon={<AddIcon fontSize="small" />}
          onClick={handleAddNewRoadmap}
        >
          Add New Item
        </BtnChange>
        <BtnChange onClick={handleSaveRoadmap}>Save</BtnChange>
      </Box>
    </Box>
  );
};

export default RoadmapForm;
