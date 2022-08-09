import { Web3Context } from 'contexts/web3';
import contractAbi from 'contracts/abi/extMDAO.json';
import WrongNetworkError from 'errors/WrongNetworkError';
import { Contract } from 'ethers';
import { useContext } from 'react';

/**
 * Hook for work with dao ext contract.
 */
export default function useDaoExtContract() {
  const { provider, isNetworkChainIdCorrect } = useContext(Web3Context);

  function getContract(address: string, signerOrProvider: any) {
    return new Contract(address, contractAbi, signerOrProvider);
  }

  async function applyToTask(
    contractAddress: string,
    taskAddr: string,
    uri: string,
  ) {
    if (!isNetworkChainIdCorrect) {
      throw new WrongNetworkError();
    }
    return await getContract(
      contractAddress,
      provider?.getSigner(),
    ).applyToTask(taskAddr, uri);
  }

  return {
    applyToTask,
  };
}
