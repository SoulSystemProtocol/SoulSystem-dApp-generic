import { Web3Context } from 'contexts/Web3Context';
import WrongNetworkError from 'errors/WrongNetworkError';
import { Contract } from 'ethers';
import { useContext } from 'react';
import contractAbi from 'contracts/abi/Soul.json';

/**
 * Hook for work with soul contract.
 */
export default function useSoulContract() {
  const { provider, isNetworkChainIdCorrect } = useContext(Web3Context);

  function getContract(signerOrProvider: any) {
    return new Contract(
      process.env.NEXT_PUBLIC_SOUL_CONTRACT_ADDRESS || '',
      contractAbi,
      signerOrProvider,
    );
  }

  async function mint(tokenUri: string) {
    if (!isNetworkChainIdCorrect) {
      throw new WrongNetworkError();
    }
    return getContract(provider?.getSigner()).mint(tokenUri);
  }

  async function update(tokenId: string, tokenUri: string) {
    if (!isNetworkChainIdCorrect) {
      throw new WrongNetworkError();
    }
    return getContract(provider?.getSigner()).update(tokenId, tokenUri);
  }

  return {
    mint,
    update,
  };
}
