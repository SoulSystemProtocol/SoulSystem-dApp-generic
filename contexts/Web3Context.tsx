import { createContext, useEffect, useState } from 'react';
import { getChainData } from 'components/web3/chains/ChainsData';
import {
  analyticsAccountDisconnect,
  analyticsAccountConnect,
} from 'utils/analytics';
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import {
  configureChains,
  createClient,
  useAccount,
  WagmiConfig,
  useNetwork,
  // useProvider,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
// import { polygonMumbai } from '@wagmi/core/chains';
// import { aurora } from '@wagmi/core/chains'; //No such. Myabe update WAGMI?
import { Chain } from '@wagmi/core/chains';
export const aurora: Chain = {
  id: 1313161554,
  name: 'Aurora',
  network: 'aurora',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://mainnet.aurora.dev/'] },
  },
  blockExplorers: {
    default: { name: 'AuroraScan', url: 'https://aurorascan.dev' },
  },

  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11907934,
  //   },
  // },
}

import { validateEnv } from 'hooks/utils';
// import { InjectedConnector } from 'wagmi/connectors/injected';

const { chains, provider } = configureChains(
  // [polygonMumbai],
  [aurora],
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
  connectors: w3mConnectors({
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID || '',
    chains,
  }),
  provider,
});

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

  //Validate Env
  validateEnv('NEXT_PUBLIC_ALCHEMY_KEY', process.env.NEXT_PUBLIC_ALCHEMY_KEY);
  validateEnv(
    'NEXT_PUBLIC_WALLETCONNECT_PROJECTID',
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID,
  );

  //WGMI
  const { address: account } = useAccount();
  const { chain } = useNetwork();
  // const provider = useProvider({
  //   chainId: polygonMumbai.id,
  // });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);

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
