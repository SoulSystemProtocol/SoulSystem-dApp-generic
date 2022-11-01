import { Web3Context } from 'contexts/Web3Context';
import contractAbi from 'contracts/abi/Hub.json';
import WrongNetworkError from 'errors/WrongNetworkError';
import { Contract } from 'ethers';
import { useContext } from 'react';

/**
 * Hook for work with hub contract.
 */
export default function useHubContract() {
  const { provider, isNetworkChainIdCorrect } = useContext(Web3Context);

  function getContract(signerOrProvider: any) {
    return new Contract(
      process.env.NEXT_PUBLIC_HUB_CONTRACT_ADDRESS || '',
      contractAbi,
      signerOrProvider,
    );
  }

  async function gameMake(gameType: string, name: string, uri: string) {
    if (!isNetworkChainIdCorrect) {
      throw new WrongNetworkError();
    }
    return await getContract(provider?.getSigner()).gameMake(
      gameType,
      name,
      uri,
    );
  }

  return {
    gameMake,
  };
}
