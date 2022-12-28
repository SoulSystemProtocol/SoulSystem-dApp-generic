import React from 'react';
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from './Logos';
import { isNumber, toHex } from 'helpers/utils';

//Chain Data Interface
export interface ChainData {
  key: string;
  name: string;
  icon: JSX.Element;
  native: string;
  nId: string;
  live?: boolean;
  supported: boolean;
  blockExplorerURL?: any;
  faucetURL?: string;
  chain_id?: any;
  chain_id_hex?: any;
  rpc?: any;
  currency_name?: any;
  currency_symbol?: any;
  decimals?: any;
  openSeaUrl?: string;
  wrapped?: string;
  ERC20?: {
    address: string;
    label: string;
    decimals?: number;
  }[]; //Whitelisted ERC20 Tokens
}

/**
 * Fetch Chain Data Function
 * Default to Default Chain
 */
export const getChainData = (chainId?: string | number): any => {
  //Normalize
  if (!!chainId && isNumber(chainId)) chainId = toHex(Number(chainId));
  if (!!chainId) return ChainsData[chainId];
  if (!!process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID_HEX)
    return ChainsData[process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID_HEX];
  console.error('Chain Data Missing', {
    chainId,
    envChain: process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID_HEX,
  });
  return {};
};

//Chain Data Object
export const ChainsData: { [key: string]: ChainData } = {
  '0x1': {
    key: '0x1',
    name: 'Ethereum Mainnet',
    icon: <ETHLogo />,
    native: 'ETH',
    nId: 'ND-2H0ETHMainNet',
    live: true,
    supported: false,
    blockExplorerURL: 'https://etherscan.io/',
    openSeaUrl: 'https://opensea.io/assets/',
    wrapped: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  },
  '0x3': {
    key: '0x3',
    name: 'Ropsten Testnet',
    icon: <ETHLogo />,
    native: 'ETH',
    nId: '',
    live: false,
    supported: false,
    blockExplorerURL: 'https://ropsten.etherscan.io/',
  },
  '0x4': {
    key: '0x4',
    name: 'Rinkeby Testnet',
    icon: <ETHLogo />,
    native: 'rETH',
    nId: '',
    live: false,
    supported: true,
    blockExplorerURL: 'https://rinkeby.etherscan.io/',
    openSeaUrl: 'https://testnets.opensea.io/assets/',
  },
  '0x2a': {
    key: '0x2a',
    name: 'Kovan Testnet',
    icon: <ETHLogo />,
    native: 'KoETH',
    nId: '',
    live: false,
    supported: false,
    blockExplorerURL: 'https://kovan.etherscan.io/',
  },
  '0x5': {
    key: '0x5',
    name: 'Goerli Testnet',
    icon: <ETHLogo />,
    native: 'GöETH',
    nId: '',
    live: false,
    supported: false,
    blockExplorerURL: 'https://goerli.etherscan.io/',
  },
  // '0x539': {
  //   key: '0x539',
  //   name: 'Local Chain',
  //   icon: <ETHLogo />,
  //   native: 'ETH',
  //   live: false,
  //   supported: false,
  //   rpcUrl: 'http://127.0.0.1:7545',
  // },
  '0x38': {
    key: '0x38',
    name: 'Binance',
    icon: <BSCLogo />,
    native: 'BNB',
    nId: 'ND-2H0BSCMainNet',
    live: true,
    supported: false,
    rpc: 'https://bsc-dataseed.binance.org/',
    blockExplorerURL: 'https://bscscan.com/',
    wrapped: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  },
  '0x61': {
    key: '0x61',
    name: 'Binance Smart Chain Testnet',
    icon: <BSCLogo />,
    native: 'BNB',
    nId: 'ND-2H0BSCTestNet',
    live: false,
    supported: false,
    rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    blockExplorerURL: 'https://testnet.bscscan.com/',
  },
  '0x89': {
    key: '0x89',
    name: 'Polygon',
    icon: <PolygonLogo />,
    native: 'MATIC',
    nId: 'ND-2H0MaticMainNet',
    live: true,
    supported: false,
    blockExplorerURL: 'https://explorer-mainnet.maticvigil.com/',
    rpc: 'https://rpc-mainnet.maticvigil.com/',
    wrapped: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    openSeaUrl: 'https://opensea.io/assets/matic/',
  },
  '0x13881': {
    key: '0x13881',
    name: 'Mumbai',
    icon: <PolygonLogo />,
    native: 'MATIC',
    nId: '',
    live: false,
    supported: false,
    blockExplorerURL: 'https://mumbai.polygonscan.com/',
    faucetURL: 'https://faucet.polygon.technology/',
    chain_id: 80001,
    chain_id_hex: 0x13881,
    rpc: 'https://rpc-mumbai.maticvigil.com/',
    // rpc: 'https://rpc-mumbai.matic.today/',
    decimals: 18,
    ERC20: [
      { address: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB', label: 'LINK' },
    ],
  },
  '0xa86a': {
    key: '0xa86a',
    name: 'Avalanche',
    icon: <AvaxLogo />,
    native: 'AVAX',
    nId: '',
    live: true,
    supported: false,
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorerURL: 'https://cchain.explorer.avax.network/',
  },
  '0xa869': {
    key: '0xa869',
    name: 'Avalanche Testnet',
    icon: <AvaxLogo />,
    native: 'AVAX',
    nId: '',
    live: false,
    supported: true,
    blockExplorerURL: 'https://testnet.snowtrace.io/',
  },
  // '???': {
  //   name: 'Optimism Kovan',
  //   faucetURL: 'https://optimismfaucet.xyz/',
  // },
};

export default ChainsData;
