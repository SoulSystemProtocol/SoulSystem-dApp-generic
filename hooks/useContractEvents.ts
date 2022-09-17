import axios from 'axios';
import { Contract, ethers } from 'ethers';
import { Web3Context } from "contexts/web3";
import { useContext, useEffect, useState } from "react";

/**
 * Hook for Contract Events
 */
export default function useContractEvents() {
  const { provider, networkChainId } = useContext(Web3Context);
  const [chainData, setChainData] = useState(null);
  const [contractAddr, setContractAddr] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [abi, setABI] = useState(null);

  const chainHelper = {
    chainsData: {
      '1': {//Ethereum
        key: process.env.NEXT_PUBLIC_SCAN_KEY_ETH,
        url: 'https://api.etherscan.io',
      },
      '?': {//Polygon
        key: process.env.NEXT_PUBLIC_SCAN_KEY_POLYGON,
        url: 'https://api.polygonscan.com/',
      },
      '80001': {//Mumbai
        key: process.env.NEXT_PUBLIC_SCAN_KEY_MUMBAI,
        url: 'https://api-testnet.polygonscan.com',
      }
    },
    contracts: [
      {
        value: process.env.NEXT_PUBLIC_HUB_CONTRACT_ADDRESS,
        label: 'Hub',
        chain: 80001,
      },
      {
        value: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        label: 'USDC (ETH)',
        chain: 1, 
      },
    ],
  };

  useEffect(() => {
    try{
      let newChainData = getChainData(networkChainId);
      console.log("Setting Chain Data", newChainData);
      setChainData(newChainData);
    }
    catch(error){ 
      console.error("[CAUGHT]", error); 
      //TODO: User Message?
    }

    let chainContracts = chainHelper.contracts.filter((contract) => contract.chain == networkChainId);
    // console.log("chainContracts", chainContracts[0]);

    //Known Contracts on Current Chain
    setContracts(chainContracts);
    setContractAddr(chainContracts[0]?.value || null)

  }, [networkChainId]);
  
  useEffect(() => {
    console.log("contract Changed", contractAddr);
    //Update ABI
    setABI(null);
    if(!!contractAddr) getABI(contractAddr).then((newABI) => setABI(newABI)).catch((error) => console.error("[CAUGHT] Error Fetching ABI", error));
  }, [contractAddr, chainData]);

  /**
   *  Fetch API Data For Chain
   */
   const getChainData = (chainId: number) => {
    //Validate
    if (chainId.toString() in chainHelper.chainsData){
      // console.log("chainId", chainId);
      //Get Chain Data
      // let chainData = chainHelper.chainsData?.[chainId.toString()];
      // console.log("Chain Data", {chainId, chainId, chainData} );
      return chainHelper.chainsData[chainId.toString()];
    }
    else throw new Error(`No Data For Chain ID:${chainId}`);
  }
  
  /**
   * Check if Contract is a Proxy
   */  
   const isProxy = async (contractAddress: string | undefined) => {
    //Validate
    if(chainData === null) throw new Error("Unknown API for current chain");
    //[DEV] Default Contract Address
    if(!contractAddress) contractAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; //USDC (Proxy ABI -- Missing Transfer Event in ABI... :o )
    //Construct Call URL
    let url = `${chainData.url}/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${chainData.key}`;
    const response = await axios.post(url);
    let isProxy = !!response.data?.result[0]?.Proxy;
    // if(isProxy) console.log("Proxy Contract Source: ", response.data);
    if(isProxy) console.log("Proxy Implementation: ", response.data?.result[0]?.Implementation);
    // console.log("isProxy", isProxy);
    return isProxy ? response.data?.result[0]?.Implementation : false;
  }//isProxy()

  /**
   * Get Contract ABI from block scan API
   */
   const getABI = async (contractAddress: string) => {
    //Validate
    // if(typeof chainData !== 'object') throw new Error("Unknown API for current chain");
    if(chainData === null) throw new Error("Unknown API for current chain");
    //Check if Proxy
    let isProxyContract = await isProxy(contractAddress);
    if(isProxyContract) contractAddress = isProxyContract;
    // if(isProxyContract) console.warn("[FYI] " + contractAddress + " IS A PROXY CONTRACT FOR:", isProxyContract);

    // console.warn("chainData", chainData);
    //Construct Call URL
    let url = `${chainData.url}/api?module=contract&action=getabi&address=${contractAddress}&apikey=${chainData.key}`;
    // console.log("Send API CALL", {chainData, url})

    //Run API Call
    try {
      const response = await axios.post(url);
      if (response.data.errors) {
        console.error(`Error on Etherscan API Call:`, response.data.errors);
        throw new Error(
          `Error on Etherscan API Call: ${JSON.stringify(response.data.errors)}`,
        );
      }
      // console.log("Result", response.data);
      return response.data.result;
    } catch (error: any) {
      throw new Error(
        `Error on Etherscan API Call: ${JSON.stringify(error.message)}`,
      );
    }
  }//getABI()


  /**
   * Extract Events From ABI String
   */
  const extractEvents = (abi: string) => JSON.parse(abi).filter((item: object) => item.type == 'event');
  
  
  return {
    chainHelper,
    chainData,
    contractAddr,
    contracts,
    abi,
    isProxy, 
    getABI,
    extractEvents,
    setContractAddr,
  };
}
