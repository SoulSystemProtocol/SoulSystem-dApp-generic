import { ChainsData, ChainData } from 'components/web3/chains/ChainsData';

//Export NFT Helper
export const ChainHelper = {
  /**
   * Get Chain Data by Chain ID
   */
  get(chain: string, key: keyof ChainData): any {
    return ChainsData[chain]?.[key];
  },

  /**
   *
   */
  allChains(): string[] {
    return Object.keys(ChainsData);
  },

  /**
   *
   */
  allChainsData(): any[] {
    return Object.values(ChainsData);
  },
};

export default ChainHelper;
