// import {
//   default as WalletConnect,
//   default as WalletConnectProvider,
// } from '@walletconnect/web3-provider';
// import { ethers } from 'ethers';
import { createContext, useEffect, useState } from 'react';
import { getChainData } from 'components/web3/chains/ChainsData';
import {
  analyticsAccountDisconnect,
  analyticsAccountConnect,
} from 'utils/analytics';
import { EthereumClient, modalConnectors } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import {
  configureChains,
  createClient,
  useAccount,
  WagmiConfig,
  useNetwork,
  useProvider,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { polygonMumbai } from '@wagmi/core/chains';
import { validateEnv } from 'hooks/utils';
// import { InjectedConnector } from 'wagmi/connectors/injected';

//Validate Env
validateEnv('NEXT_PUBLIC_ALCHEMY_KEY');
validateEnv('NEXT_PUBLIC_WALLETCONNECT_PROJECTID');

const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || '',
    }),
    // walletConnectProvider({
    //   projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID || '',
    // }),
    publicProvider(),
  ],
);

const wagmiClient = createClient({
  autoConnect: true,
  // connectors: [new InjectedConnector({ chains }) as any],
  connectors: modalConnectors({
    appName: process.env.NEXT_PUBLIC_APP_NAME || '',
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

interface IWeb3Context {
  isReady: any;
  account: any;
  networkChainId: any;
  isNetworkChainIdCorrect: boolean;
  curChainData: any;
  provider: any;
}

export const Web3Context = createContext<Partial<IWeb3Context>>({});

export function Web3Provider({ children }: { children: any }) {
  const [isReady, setIsReady] = useState(false);
  const [curChainData, setCurChainData] = useState<any>({});
  const [networkChainId, setNetworkChainId] = useState<number | null>(null);
  const [isNetworkChainIdCorrect, setIsNetworkChainCorrect] =
    useState<boolean>(false);

  //WGMI
  const { address: account } = useAccount();
  const { chain } = useNetwork();

  /// Workaround for the hydration problem
  useEffect(() => setIsReady(true), []);

  useEffect(() => setNetworkChainId(Number(chain?.id)), [chain]);

  useEffect(() => {
    //Analytics Wallet Connect Event
    account ? analyticsAccountConnect(account) : analyticsAccountDisconnect();
  }, [account]);

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
  const provider = useProvider({
    chainId: polygonMumbai.id,
  });

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Web3Context.Provider
          value={{
            isReady,
            account,
            networkChainId,
            isNetworkChainIdCorrect,
            curChainData,
            provider,
          }}
        >
          {children}
        </Web3Context.Provider>
      </WagmiConfig>
      <Web3Modal
        projectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
