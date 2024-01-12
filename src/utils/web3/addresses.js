import { ChainIds } from "./chains";

export const addresses = {
  [ChainIds.Ethereum]: {
    name: "Ethereum Mainnet",
    addresses: {
      DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      WMATIC: "0x7c9f4c87d911613fe9ca58b579f737911aad2d43",
    },
  },
  [ChainIds.Polygon]: {
    name: "Polygon Mainnet",
    addresses: {
      DAI: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
      USDC: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      WETH: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      WMATIC: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    },
  },
};
