import {
  default as WalletConnect,
  default as WalletConnectProvider,
} from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { createContext, useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";

interface IWeb3Context {
  isReady: any;
  defaultProvider: any;
  provider: any;
  account: any;
  networkChainId: any;
  isNetworkChainIdCorrect: any;
  connectWallet: Function;
  disconnectWallet: Function;
  switchNetwork: Function;
}

export const Web3Context = createContext<Partial<IWeb3Context>>({});

export function Web3Provider({ children }: any) {
  const web3ModalRef = useRef<Web3Modal | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [instance, setInstance] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [defaultProvider, setDefaultProvider] = useState<any>(null);
  const [account, setAccount] = useState<any>(null);
  const [networkChainId, setNetworkChainId] = useState<any>(null);
  const [isNetworkChainIdCorrect, setIsNetworkChainCorrect] =
    useState<any>(null);

  async function initContext() {
    if (!web3ModalRef.current) {
      return;
    }
    try {
      // Show web3 modal or autoconnect
      const instance = await web3ModalRef.current.connect();
      // Define data
      setIsReady(false);
      const provider = new ethers.providers.Web3Provider(instance, "any");
      const accounts = await provider.listAccounts();
      const network = await provider.getNetwork();
      const networkChainId = network?.chainId;
      // Add listeners if the user has changed the chain or account
      instance.addListener("chainChanged", (chainId: any) =>
        setNetworkChainId(chainId)
      );
      instance.addListener("accountsChanged", (accounts: any) => {
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });
      // Update states
      setInstance(instance);
      setProvider(provider);
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }
      setNetworkChainId(networkChainId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsReady(true);
    }
  }

  async function clearContext() {
    try {
      setIsReady(false);
      // Disconnect provider
      if (instance instanceof WalletConnectProvider) {
        instance.disconnect();
      }
      // Remove listeners
      instance?.removeAllListeners("chainChanged");
      instance?.removeAllListeners("accountsChanged");
      // Clear providers
      web3ModalRef.current?.clearCachedProvider();
      localStorage.removeItem("walletconnect");
      // Clear states
      setInstance(null);
      setProvider(null);
      setAccount(null);
      setNetworkChainId(null);
      setIsNetworkChainCorrect(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsReady(true);
    }
  }

  async function connectWallet() {
    initContext();
  }

  async function disconnectWallet() {
    clearContext();
  }

  async function switchNetwork() {
    try {
      await instance.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID_HEX }],
      });
    } catch (error: any) {
      console.error(error);
      if (
        error?.code === 4902 ||
        error?.message?.toLowerCase()?.includes("unrecognized chain id")
      ) {
        addNetwork();
      }
    }
  }

  // TODO: Test it
  async function addNetwork() {
    try {
      await instance.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID_HEX,
            rpcUrls: [process.env.NEXT_PUBLIC_NETWORK_RPC_URL],
            chainName: process.env.NEXT_PUBLIC_NETWORK_NAME,
            nativeCurrency: {
              name: process.env.NEXT_PUBLIC_NETWORK_CURRENCY_NAME,
              symbol: process.env.NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL,
              decimals: parseInt(
                process.env.NEXT_PUBLIC_NETWORK_CURRENCY_DECIMALS || ""
              ),
            },
            blockExplorerUrls: [
              process.env.NEXT_PUBLIC_NETWORK_BLOCK_EXPLORER_URL,
            ],
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Init default provider
    const rpcProvider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_NETWORK_RPC_URL
    );
    // TODO: Test that default provider is work
    setDefaultProvider(rpcProvider);
    // Config web3 modal and try autoconnect
    if (!web3ModalRef.current) {
      // Config Web3Modal
      const providerOptions = {
        walletconnect: {
          package: WalletConnect,
          options: {
            rpc: {
              [process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID || ""]:
                process.env.NEXT_PUBLIC_NETWORK_RPC_URL,
            },
          },
        },
      };
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
      });
      web3ModalRef.current = web3Modal;
      // Connect wallet if cached provider exists
      if (web3ModalRef.current.cachedProvider) {
        initContext();
      } else {
        setIsReady(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isChainIdCorrect =
      networkChainId?.toString() === process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID;
    const isChainIdHexCorrect =
      networkChainId?.toString() ===
      process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID_HEX;
    setIsNetworkChainCorrect(isChainIdCorrect || isChainIdHexCorrect);
  }, [networkChainId]);

  return (
    <Web3Context.Provider
      value={{
        isReady: isReady,
        defaultProvider: defaultProvider,
        provider: provider,
        account: account,
        networkChainId: networkChainId,
        isNetworkChainIdCorrect: isNetworkChainIdCorrect,
        connectWallet: connectWallet,
        disconnectWallet: disconnectWallet,
        switchNetwork: switchNetwork,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
