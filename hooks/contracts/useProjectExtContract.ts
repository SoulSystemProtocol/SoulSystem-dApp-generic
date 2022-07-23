import { Web3Context } from 'contexts/web3';
import contractAbi from 'contracts/abi/extProject.json';
import WrongNetworkError from 'errors/WrongNetworkError';
import { Contract } from 'ethers';
import { useContext } from 'react';

/**
 * Hook for work with project ext contract.
 */
export default function useProjectExtContract() {
  const { provider, isNetworkChainIdCorrect } = useContext(Web3Context);

  function getContract(address: string, signerOrProvider: any) {
    return new Contract(address, contractAbi, signerOrProvider);
  }

  async function taskMake(contractAddress: string, name: string, uri: string) {
    if (!isNetworkChainIdCorrect) {
      throw new WrongNetworkError();
    }
    return await getContract(contractAddress, provider?.getSigner()).taskMake(
      name,
      uri,
    );
  }

  return {
    taskMake,
  };
}
