import NFTCreationForm from "./NFTCreationForm";

const NFTCreationApp = ({ handleAddNFT, theme }) => {
  return (
    <div>
      <NFTCreationForm theme={theme} onSave={handleAddNFT} />
    </div>
  );
};

export default NFTCreationApp;
