import ChainsData from 'components/web3/chains/ChainsData';

//Export NFT Helper
export const ChainHelper = {
  /**
   * Get Chain Data by Chain ID
   * @param {*} chain
   * @param {*} key
   * @returns
   */
  get(chain: string, key: any) {
    return ChainsData[chain]?.[key];
  },

  /**
   *
   */
  allChains() {
    return Object.keys(ChainsData);
  },

  /**
   *
   */
  allChainsData() {
    return Object.values(ChainsData);
  },
};

export default ChainHelper;
