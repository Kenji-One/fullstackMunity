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
import { BrowserProvider } from "ethers";
import { ChainIds, availableChains } from "./chains";
import { clearLocalItems, getLocalItem, setLocalItem } from "../base";
import { MUNITY_CONFIG } from "./addresses";
import { getResponseFromUri, uploadFileToIPFS, uploadJSONToIPFS } from "../pinata/tools";

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

  //========================== CONTRACT =========================

  function isBoolean(param) {
    return typeof param === 'boolean';
  }

  const getMunityContract = async () => {
    if (address !== "") {
      try {
        // const provider = new ethers.BrowserProvider(MUNITY_CONFIG[ChainIds.Ethereum].rpcUrl);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const munityContract = new ethers.Contract(
          MUNITY_CONFIG[ChainIds.Ethereum].address,
          MUNITY_CONFIG[ChainIds.Ethereum].abi,
          signer
        );
        // console.log("munityContract",munityContract);
        // console.log("munityContract",await munityContract.owner());
        return munityContract;
      } catch (error) {
        console.error("Error ", error);
        return null;
      }
    }
  };

  const getMunityContractToRead = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const munityContract = new ethers.Contract(
        MUNITY_CONFIG[ChainIds.Ethereum].address,
        MUNITY_CONFIG[ChainIds.Ethereum].abi,
        provider
      );
      return munityContract;
    } catch (error) {
      console.error("Error ", error);
      return null;
    }
  };

  //   useEffect(() => {
  //   getMunityContract()
  // }, [address])

  //================== STATES =============================
  const [contractState, setContractState] = useState({
    name: null,
    symbol: null,
    communityFee: null,
    communityFeeRecipient: null,
  });

  const [ownerAddress, setOwnerAddress] = useState(null);
  const [isAddressOwner, setIsAddressOwner] = useState(false);

  useEffect(() => {
    setIsAddressOwner(
      address &&
        ownerAddress &&
        address.toLocaleLowerCase() === ownerAddress.toLocaleLowerCase()
        ? true
        : false
    );
  }, [address, ownerAddress]);

  //================== READS =============================

  //royaltyInfo

  const getContractState = async () => {
    const contract = await getMunityContractToRead();
    if (contract) {
      const owner = await contract.owner();
      setOwnerAddress(owner.toLowerCase());

      const contractName = await contract.name();
      const symbol = await contract.symbol();
      const communityFee = await contract.getCommunityFee();
      const communityFeeRecipient = await contract.getPlatformFeeRecipient();

      setContractState({
        name: contractName,
        symbol: symbol,
        communityFee: communityFee.toString(),
        communityFeeRecipient: communityFeeRecipient.toLowerCase(),
      });
    }
  };

  const getCommunityURI = async (communityId) => {
    if (Number(communityId) == 0) return null;
    const contract = await getMunityContractToRead();
    if (contract) {
      const uri = await contract.uri(String(communityId));
      console.log(uri);
      return uri;
    } else {
      return null;
    }
  };

  const isUserWhiteListed = async (communityId, userAddres) => {
    const contract = await getMunityContractToRead();
    if (contract) {
      const response = await contract.isWhiteListed(
        String(communityId),
        userAddres
      );
      return response;
    } else {
      return false;
    }
  };

  const getUserCommunityMinting = async (communityId, userAddres) => {
    //ERROR
    const contract = await getMunityContractToRead();
    if (contract) {
      const noOfMinting = await contract.getMinting(
        userAddres,
        String(communityId)
      );
      console.log(noOfMinting.toString());
      return noOfMinting.toString();
    } else {
      return "0";
    }
  };

  const getCommunityDetails = async (communityId) => {
    const contract = await getMunityContractToRead();
    if (contract) {
      const res = await contract.getCommunityDetails(String(communityId));
      const uri = await contract.uri(String(communityId));
      const uriData = await getResponseFromUri(uri);

      console.log({
        communityData:uriData,
        price: res[0].toString(),
        supply: res[1].toString(),
        discount: res[2].toString(),
        creator: res[3].toLowerCase(),
      });
      return {
        communityData:uriData,
        price: res[0].toString(),
        supply: res[1].toString(),
        discount: res[2].toString(),
        creator: res[3].toLowerCase(),
      };
    } else {
      return {
        communityData:null,
        price: null,
        supply: null,
        discount: null,
        creator: null,
      };
    }
  };

  const getUserCommunityBalance = async (communityId, userAddres) => {
    const contract = await getMunityContractToRead();
    if (contract) {
      const totalNoOfNft = await contract.balanceOf(
        userAddres,
        String(communityId)
      );
      console.log(totalNoOfNft.toString());
      return totalNoOfNft.toString();
    } else {
      return "0";
    }
  };

  const getBatchUserCommunityBalance = async (userAddresses, communityIds) => {
    const contract = await getMunityContractToRead();
    if (contract) {
      if (
        !(
          userAddresses.length > 0 &&
          userAddresses.length === communityIds.length
        )
      ) {
        console.log("Invalid array of parameters provided");
        return [];
      }
      let totalNoOfNft = await contract.balanceOfBatch(
        userAddresses,
        communityIds
      );
      totalNoOfNft = totalNoOfNft.map((number, i) => {
        return {
          address: userAddresses[i],
          communityId: communityIds[i],
          balance: number.toString(),
        };
      });
      console.log(totalNoOfNft);
      return totalNoOfNft;
    } else {
      return [];
    }
  };


  

  //================== WRITES =============================

  const registerCommunity = async (nftName,nftImageFile,bannerImageFile,price, supply, discount) => {
    try {
      if (!nftImageFile || !bannerImageFile) {
        throw new Error("Provide nftImageFile and bannerImageFile");
      }
      if (!nftName || !price || !supply || !discount) {
        throw new Error("Provide nftImageFile and bannerImageFile");
      }
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }
      const nftImageFileRes = await uploadFileToIPFS(nftImageFile);
      
      if (!nftImageFileRes.success) {
        throw new Error("Error Uploading NFT Image");
      }

      const bannerImageFileRes = await uploadFileToIPFS(bannerImageFile);
      
      if (!bannerImageFileRes.success) {
        throw new Error("Error Uploading NFT Banner Image");
      }
      
      const nftJSON = {
        
        "name":`${nftName}`,
        "description":`${description}`,
        "image":`${nftImageFileRes.pinataURL}`,
        "bannerImage":`${bannerImageFileRes.pinataURL}`,
      }
      
      
      
      const NFTuriLinkRes = await uploadJSONToIPFS(nftJSON)
      
      if (!NFTuriLinkRes.success) {
        throw new Error("Error Uploading NFT URI JSON");
      }

      const tx = await contract.registerCommunity(
        price,
        supply,
        discount,
        NFTuriLinkRes.pinataURL
      );
      await tx.wait();

      return true;
    } catch (err) {
      console.error(err.message);
      return false;
    } finally {
    }
  };

  const buyCommunityNft = async (communityId, tokenAmountsToBuy, payAmount) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }
      const tx = await contract.buy(communityId, tokenAmountsToBuy, {
        value: payAmount,
      });
      await tx.wait();

      return true;
    } catch (err) {
      console.error(err.message);
      return false;
    } finally {
    }
  };

  const addMoreCommunitySupply = async (communityId, tokenAmountsToAdd) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }
      if (Number(tokenAmountsToAdd) <= 0) {
        throw new Error("Amount cant be zero or less");
      }
      const tx = await contract.addSupply(communityId, tokenAmountsToAdd);
      await tx.wait();

      return true;
    } catch (err) {
      console.error(err.message);
      return false;
    } finally {
    }
  };

  const addMoreCommunityWhiteListings = async (communityId, addressesArray) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }

      const tx = await contract.addWhiteListing(communityId, addressesArray);
      await tx.wait();

      return true;
    } catch (err) {
      console.error(err.message);
      // console.log(err.reason);
      return false;
    } finally {
    }
  };

  const removeCommunityWhiteListings = async (communityId, addressesArray) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }

      const tx = await contract.removeWhiteListing(communityId, addressesArray);
      await tx.wait();

      return true;
    } catch (err) {
      console.error(err.message);
      // console.log(err.reason);
      return false;
    } finally {
    }
  };

  const changeCommunityDiscount = async (communityId, discount) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }

      if (Number(discount) > 1000) {
        throw new Error("Invalid community discount");
      }

      const tx = await contract.changeDiscount(communityId, discount);
      await tx.wait();

      return true;
    } catch (err) {
      console.error(err.message);
      // console.log(err.reason);
      return false;
    } finally {
    }
  };

  const changeCommunityTokenPrice = async (communityId, newPriceInWei) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }

      if (Number(newPriceInWei) <= 0) {
        throw new Error("Invalid community newPrice");
      }

      const tx = await contract.changePrice(communityId, newPriceInWei);
      await tx.wait();

      return true;
    } catch (err) {
      console.error(err.message);
      // console.log(err.reason);
      return false;
    } finally {
    }
  };


  const setNewRoyaltyInfo = async (_receiver, _royaltyFeesInBipsImWei) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }

      if (Number(_royaltyFeesInBipsImWei) < 0) {
        throw new Error("Invalid community newPrice");
      }

      const tx = await contract.setRoyaltyInfo(_receiver, _royaltyFeesInBipsImWei);
      await tx.wait();

      return true;
    } catch (err) {
      console.error(err.message);
      // console.log(err.reason);
      return false;
    } finally {
    }
  };

// haveAccess:boolean 
  const setApprovalForAll = async (_operator, haveAccess) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }
      if (!isBoolean(haveAccess)) {
        throw new Error("Invalid access parameter");
      }

      const tx = await contract.setApprovalForAll(_operator, haveAccess);
      await tx.wait();

      return true;
    } catch (err) {
      console.error(err.message);
      // console.log(err.reason);
      return false;
    } finally {
    }
  };

  
//================== TEST CODE =================
  // useEffect(() => {
  //   const adds = [
  //     "0x808f0597D8B83189ED43d61d40064195F71C0D15",
  //     "0xf3545A1eaD63eD1A6d8b6E63d68D937cdBf1aeE4",
  //   ];
  //   // const ids = ["1","1"]
  //   if (address !== "") {
  //     getCommunityDetails("1");
  //   }
  // }, [address]);

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
      //======= READ FUNCTIONS =====
      contractState,
      ownerAddress,
      isAddressOwner,
      getContractState,
      getCommunityURI,
      isUserWhiteListed,
      getUserCommunityMinting,
      getCommunityDetails,
      getUserCommunityBalance,
      getBatchUserCommunityBalance,
      //======= WRITE FUNCTIONS =====
      registerCommunity,
      buyCommunityNft,
      addMoreCommunitySupply,
      addMoreCommunityWhiteListings,
      removeCommunityWhiteListings,
      changeCommunityTokenPrice,
      changeCommunityDiscount,
      setNewRoyaltyInfo,
      setApprovalForAll

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
        //======= READ FUNCTIONS =====
        contractState,
        ownerAddress,
        isAddressOwner,
        getContractState,
        getCommunityURI,
        isUserWhiteListed,
        getUserCommunityMinting,
        getCommunityDetails,
        getUserCommunityBalance,
        getBatchUserCommunityBalance,
        //======= WRITE FUNCTIONS =====
        registerCommunity,
        buyCommunityNft,
        addMoreCommunitySupply,
        addMoreCommunityWhiteListings,
        removeCommunityWhiteListings,
        changeCommunityTokenPrice,
        changeCommunityDiscount,
        setNewRoyaltyInfo,
        setApprovalForAll
  
      
    ]
  );

  return (
    <Web3Context.Provider value={{ onChainProvider }}>
      {children}
    </Web3Context.Provider>
  );
};
