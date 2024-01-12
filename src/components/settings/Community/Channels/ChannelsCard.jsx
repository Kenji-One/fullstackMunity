import { useState } from "react";
import { Box } from "@mui/material";
import BtnChange from "../../BtnChange";
import Card from "../../../Card";
import Channel from "./Channel";
import UpgradeCard from "../../../Pro/UpgradeCard";
import ChannelForm from "./ChannelForm"; // Create a ChannelForm component for the form
import AddIcon from "@mui/icons-material/Add";

const CommunitySettingsChannelsConfig = [
  {
    label: "General Chat",
    isActive: false,
  },
  {
    label: "Announcements",
    isActive: true,
  },
];

export default function ChannelsCard() {
  const [isAddingChannel, setIsAddingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [channels, setChannels] = useState(CommunitySettingsChannelsConfig); // Assuming channels is your array of channels

  const handleAddChannelClick = () => {
    setIsAddingChannel(true);
  };

  const handleSaveChannel = () => {
    // Perform any necessary actions, such as sending a POST request
    // Add the new channel to the channels array
    const newChannel = {
      label: newChannelName,
      isActive: true, // You can adjust this based on your requirements
    };
    setChannels((prevChannels) => [...prevChannels, newChannel]);

    // Reset state
    setIsAddingChannel(false);
    setNewChannelName("");
  };

  const handleDeleteChannel = (label) => {
    // Find the index of the channel with the specified label
    const channelIndex = channels.findIndex(
      (channel) => channel.label === label
    );

    if (channelIndex !== -1) {
      // Create a new array without the channel to be deleted
      const updatedChannels = [
        ...channels.slice(0, channelIndex),
        ...channels.slice(channelIndex + 1),
      ];

      // Set the updated array to the state
      setChannels(updatedChannels);

      // Implement your API logic here to delete the channel permanently
      console.log("Deleting channel " + label);
    } else {
      console.warn("Channel not found with label: " + label);
    }
  };

  const handleCancelForm = () => {
    // Reset state
    setIsAddingChannel(false);
  };

  return (
    <Card title={"Channels"}>
      <Box className="flex flex-col gap-6 ">
        {channels.map((channel, index) => (
          <Channel
            key={index}
            label={channel.label}
            isActive={channel.isActive}
            handleDeleteChannel={handleDeleteChannel}
          />
        ))}
      </Box>
      <ChannelForm
        value={newChannelName}
        onChange={(e) => setNewChannelName(e.target.value)}
        onSave={handleSaveChannel}
        isAddingChannel={isAddingChannel}
        onCancel={handleCancelForm}
      />
      {!isAddingChannel && (
        <Box className="w-full text-center mob:mb-6 tab:mb-8 mob:mt-6 tab:mt-8">
          <BtnChange icon={<AddIcon />} onClick={handleAddChannelClick}>
            Add a Channel
          </BtnChange>
        </Box>
      )}
      <UpgradeCard />
    </Card>
  );
}
