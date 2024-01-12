import * as assets from "../../../public";

export const ChainIds = {
  Ethereum: 11155111,
  Polygon: 80001,
};

export const availableChains = {
  [ChainIds.Ethereum]: {
    chainName: "Ethereum Mainnet Test",
    rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/2aUvl36AwoIdzsS64jsHiO9QE5t8Ftyh"],
    decimals: 18,
    symbol: "ETH",
    icon: assets.tokens.ETH,
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
  },
  [ChainIds.Polygon]: {
    chainName: "Polygon Test",
    rpcUrls: ["https://polygon-mumbai.g.alchemy.com/v2/SQJNaaxbCt0gWB9xXbeDxshDKj2NOqth"],
    decimals: 18,
    symbol: "MATIC",
    icon: assets.tokens.MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};

export const defaultChain = ChainIds.Ethereum;


// export const ChainIds = {
//   Ethereum: 1,
//   Polygon: 137,
// };

// export const availableChains = {
//   [ChainIds.Ethereum]: {
//     chainName: "Ethereum Mainnet",
//     rpcUrls: ["https://mainnet.infura.io/v3/84842078b09946638c03157f83405213"],
//     decimals: 18,
//     symbol: "ETH",
//     icon: assets.tokens.ETH,
//     blockExplorerUrls: ["https://etherscan.io/"],
//   },
//   [ChainIds.Polygon]: {
//     chainName: "Polygon",
//     rpcUrls: ["https://polygon.llamarpc.com/"],
//     decimals: 18,
//     symbol: "MATIC",
//     icon: assets.tokens.MATIC,
//     blockExplorerUrls: ["https://polygonscan.com/"],
//   },
// };

// export const defaultChain = ChainIds.Ethereum;
