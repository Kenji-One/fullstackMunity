import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { ethers } from "ethers";
// import Web3Modal from "web3modal";
// import * as UAuthWeb3Modal from "@uauth/web3modal";
// import { BrowserProvider } from "ethers";
import { ChainIds, availableChains } from "./chains";
import { clearLocalItems, getLocalItem, setLocalItem } from "../base";

const Web3Modal = dynamic(() => import("web3modal"), { ssr: false });
const UAuthWeb3Modal = dynamic(() => import("@uauth/web3modal"), {
  ssr: false,
});

const Web3Context = createContext(null);

// const web3Modal = new Web3Modal({
//   cacheProvider: true,
//   providerOptions: { connector: UAuthWeb3Modal.connector },
// });

export const useWeb3Context = () => {
  const web3Context = useContext(Web3Context);
  const { onChainProvider } = web3Context;
  return useMemo(() => {
    return { ...onChainProvider };
  }, [onChainProvider]);
};

export const Web3ContextProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [chainId, setChainId] = useState(ChainIds.Ethereum);
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);
  useEffect(() => {
    const initWeb3Modal = async () => {
      const Web3Modal = (await import("web3modal")).default;
      const UAuthWeb3Modal = (await import("@uauth/web3modal")).default;

      const newWeb3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: { connector: UAuthWeb3Modal.connector },
      });

      UAuthWeb3Modal.registerWeb3Modal(newWeb3Modal);
      setWeb3Modal(newWeb3Modal);
    };

    initWeb3Modal();
  }, []);
  const hasCachedProvider = useCallback(() => {
    if (!web3Modal) return false;
    UAuthWeb3Modal.registerWeb3Modal(web3Modal);
    return !!web3Modal.cachedProvider;
  }, []);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }
    clearLocalItems();
    setConnected(false);
    setProvider(null);
    setAddress("");
    setChainId(ChainIds.Ethereum);
  }, [web3Modal]);

  const _initListeners = useCallback(
    (rawProvider) => {
      if (!rawProvider.on) {
        return;
      }
      rawProvider.on("accountsChanged", async () => {
        setTimeout(() => window.location.reload(), 1);
      });

      rawProvider.on("chainChanged", async (chain) => {
        let newChainId;
        // On mobile chain comes in as a number but on web it comes in as a hex string
        if (typeof chain === "number") {
          newChainId = chain;
        } else {
          newChainId = parseInt(chain, 16);
        }
        if (!Object.keys(availableChains).includes("" + newChainId)) {
          setProvider(null);
          disconnect();
        } else connect(newChainId);
      });

      rawProvider.on("network", (_newNetwork, oldNetwork) => {
        if (!oldNetwork) return;
        window.location.reload();
      });
    },
    [disconnect]
  );

  const switchChain = useCallback(async (targetChain) => {
    const chainId = "0x" + targetChain.toString(16);
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
      return true;
    } catch (e) {
      if (e.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId,
                chainName: availableChains[targetChain].chainName,
                nativeCurrency: {
                  symbol: availableChains[targetChain].symbol,
                  decimals: availableChains[targetChain].decimals,
                },
                blockExplorerUrls:
                  availableChains[targetChain].blockExplorerUrls,
                rpcUrls: availableChains[targetChain].rpcUrls,
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error(addError);
          return false;
        }
      } else {
        console.error(e);
        return false;
      }
    }
  }, []);

  const connect = useCallback(
    async (targetChain = ChainIds.Ethereum) => {
      if (!Object.keys(availableChains).includes("" + targetChain)) {
        web3Modal.clearCachedProvider();
        const switched = await switchChain(ChainIds.Ethereum);
        if (!switched) {
          console.error(
            "Unable to connect. Please change network using provider."
          );
          return;
        }
      }

      let rawProvider = await web3Modal.connect();

      _initListeners(rawProvider);
      let connectedProvider = new BrowserProvider(rawProvider, "any");
      let connectedChainId = await connectedProvider
        .getNetwork()
        .then((network) =>
          typeof network.chainId === "number"
            ? network.chainId
            : parseInt(network.chainId)
        );

      if (connectedChainId !== targetChain) {
        web3Modal.clearCachedProvider();
        const switched = await switchChain(targetChain);
        if (!switched) {
          console.error(
            "Unable to connect. Please change network using provider."
          );
          return;
        }
      }

      rawProvider = await web3Modal.connect();

      _initListeners(rawProvider);
      connectedProvider = new BrowserProvider(rawProvider, "any");
      connectedChainId = await connectedProvider
        .getNetwork()
        .then((network) =>
          typeof network.chainId === "number"
            ? network.chainId
            : parseInt(network.chainId)
        );

      const connectedAddress = await (
        await connectedProvider.getSigner()
      ).getAddress();

      setChainId(connectedChainId);
      setAddress(connectedAddress);
      setProvider(connectedProvider);
      setConnected(true);
      setLocalItem("connected_chain", connectedChainId);
      setLocalItem("connected_address", connectedAddress);
      setLocalItem("connected_state", true);

      return connectedProvider;
    },
    [_initListeners, switchChain]
  );

  useEffect(() => {
    if (web3Modal && getLocalItem("connected_state")) {
      connect(+getLocalItem("connected_chain", ChainIds.Ethereum));
    }
  }, [connect, web3Modal]);

  const onChainProvider = useMemo(
    () => ({
      connect,
      disconnect,
      provider,
      connected,
      address,
      chainId,
      web3Modal,
      hasCachedProvider,
      switchChain,
    }),
    [
      connect,
      disconnect,
      provider,
      connected,
      address,
      chainId,
      web3Modal,
      hasCachedProvider,
      switchChain,
    ]
  );

  return (
    <Web3Context.Provider value={{ onChainProvider }}>
      {children}
    </Web3Context.Provider>
  );
};
