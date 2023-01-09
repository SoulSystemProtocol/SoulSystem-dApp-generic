import {
  default as WalletConnect,
  default as WalletConnectProvider,
} from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { createContext, useEffect, useRef, useState } from 'react';
import Web3Modal from 'web3modal';
import { getChainData } from 'components/web3/chains/ChainsData';
import {
  analyticsAccountDisconnect,
  analyticsCatchErrorEvent,
  analyticsAccountConnect,
} from 'utils/analytics';

interface IWeb3Context {
  isReady: any;
  defaultProvider: any;
  provider: any;
  account: any;
  networkChainId: any;
  isNetworkChainIdCorrect: boolean;
  connectWallet: Function;
  disconnectWallet: Function;
  switchNetwork: Function;
  getBalance: (account: string) => Promise<string>;
  curChainData: any;
}

export const Web3Context = createContext<Partial<IWeb3Context>>({});

export function Web3Provider({ children }: { children: any }) {
  const web3ModalRef = useRef<Web3Modal | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [instance, setInstance] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [curChainData, setCurChainData] = useState<any>({});
  const [defaultProvider, setDefaultProvider] = useState<any>(null);
  const [account, setAccount] = useState<any>(null);
  const [networkChainId, setNetworkChainId] = useState<number | null>(null);
  const [isNetworkChainIdCorrect, setIsNetworkChainCorrect] =
    useState<boolean>(false);

  async function initContext(): Promise<void> {
    if (!web3ModalRef.current) return;
    try {
      // Show web3 modal or autoconnect
      const instance = await web3ModalRef.current.connect();
      // Define data
      setIsReady(false);
      const provider = new ethers.providers.Web3Provider(instance, 'any');
      const accounts = await provider.listAccounts();
      const network = await provider.getNetwork();
      const networkChainId = network?.chainId;
      // Add listeners if the user has changed the chain or account
      instance.addListener('chainChanged', async (chainId: any) =>
        setNetworkChainId(Number(chainId)),
      );
      instance.addListener('accountsChanged', (accounts: any) => {
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          console.log('Wallet Disconnected');
          setAccount(null);
          // setProvider(null); //Or maybe this...
        }
      });

      // Update states
      setInstance(instance);
      setProvider(provider);
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }
      setNetworkChainId(Number(networkChainId));
    } catch (error: any) {
      console.error(error);
      analyticsCatchErrorEvent(error, { type: 'web3_init' });
    } finally {
      setIsReady(true);
    }
  }

  async function clearContext(): Promise<void> {
    try {
      setIsReady(false);
      // Disconnect provider
      if (instance instanceof WalletConnectProvider) {
        instance.disconnect();
      }
      // Remove listeners
      instance?.removeAllListeners('chainChanged');
      instance?.removeAllListeners('accountsChanged');
      // Clear providers
      web3ModalRef.current?.clearCachedProvider();
      localStorage.removeItem('walletconnect');
      // Clear states
      setInstance(null);
      setProvider(null);
      setAccount(null);
      setNetworkChainId(null);
      setIsNetworkChainCorrect(false);
    } catch (error: any) {
      console.error(error);
      analyticsCatchErrorEvent(error, { type: 'clear_context' });
    } finally {
      setIsReady(true);
    }
  }

  const connectWallet = () => initContext();

  const disconnectWallet = () => clearContext();

  async function switchNetwork() {
    try {
      await instance.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID_HEX }],
      });
    } catch (error: any) {
      console.error(error);
      analyticsCatchErrorEvent(error, { type: 'switch_network' });
      if (
        error?.code === 4902 ||
        error?.message?.toLowerCase()?.includes('unrecognized chain id')
      ) {
        addNetwork();
      }
    }
  }

  // TODO: Test this
  //Network Add
  async function addNetwork() {
    const chainData = getChainData(
      process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID_HEX,
    );
    console.log('Supported Chain Data', chainData);
    try {
      await instance.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID_HEX,
            // chainId: chainData?.key,
            // rpcUrls: [process.env.NEXT_PUBLIC_NETWORK_RPC_URL],
            rpcUrls: [chainData.rpc],
            // chainName: process.env.NEXT_PUBLIC_NETWORK_NAME,
            chainName: chainData.name,
            nativeCurrency: {
              // name: process.env.NEXT_PUBLIC_NETWORK_CURRENCY_NAME,
              name: chainData.native,
              // symbol: process.env.NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL,
              symbol: chainData.native,
              decimals: parseInt(
                // process.env.NEXT_PUBLIC_NETWORK_CURRENCY_DECIMALS || '',
                chainData.decimals,
              ),
            },
            blockExplorerURLs: [
              // process.env.NEXT_PUBLIC_NETWORK_BLOCK_EXPLORER_URL,
              chainData.blockExplorerURL,
            ],
          },
        ],
      });
    } catch (error: any) {
      console.error(error);
      analyticsCatchErrorEvent(error, { type: 'add_chain' });
    }
  }

  /**
   * Get Native Balance for Address
   */
  const getBalance = async function (address: string): Promise<string> {
    if (!ethers.utils.isAddress(address)) {
      console.error('Not a Valid Address', address);
      analyticsCatchErrorEvent(new Error('Not a Valid Address'), {
        type: 'invalid address',
      });
      return '';
    }
    const balance = await defaultProvider.getBalance(address);
    return ethers.utils.formatEther(balance);
  };

  useEffect(() => {
    // Init default provider
    const rpcProvider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_NETWORK_RPC_URL,
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
              [process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID || '']:
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
    //Set Chain Data
    setCurChainData(
      getChainData(networkChainId ? networkChainId.toString() : ''),
    );
    //Check if supported chain
    setIsNetworkChainCorrect(
      !!networkChainId &&
        networkChainId?.toString() === process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID,
    );
  }, [networkChainId]);

  useEffect(() => {
    //Analytics Wallet Connect Event
    account ? analyticsAccountConnect(account) : analyticsAccountDisconnect();
  }, [account]);

  return (
    <Web3Context.Provider
      value={{
        isReady,
        defaultProvider,
        provider,
        account,
        networkChainId,
        isNetworkChainIdCorrect,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        getBalance,
        curChainData,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
