import { Web3Context } from 'contexts/Web3Context';
import contractAbi from 'contracts/abi/Task.json';
import WrongNetworkError from 'errors/WrongNetworkError';
import { Contract } from 'ethers';
import { useContext } from 'react';

/**
 * Hook for work with dao task contract.
 */
export default function useTaskContract() {
  const { provider, isNetworkChainIdCorrect } = useContext(Web3Context);

  function getContract(address: string, signerOrProvider: any) {
    return new Contract(address, contractAbi, signerOrProvider);
  }

  async function acceptApplicant(contractAddress: string, sbtId: string) {
    if (!isNetworkChainIdCorrect) {
      throw new WrongNetworkError();
    }
    return await getContract(
      contractAddress,
      provider?.getSigner(),
    ).acceptApplicant(sbtId);
  }

  async function deliveryApprove(contractAddress: string, sbtId: string) {
    if (!isNetworkChainIdCorrect) {
      throw new WrongNetworkError();
    }
    return await getContract(
      contractAddress,
      provider?.getSigner(),
    ).deliveryApprove(sbtId);
  }

  async function stageExecusion(
    contractAddress: string,
    tokens: Array<string>,
  ) {
    if (!isNetworkChainIdCorrect) {
      throw new WrongNetworkError();
    }
    return await getContract(
      contractAddress,
      provider?.getSigner(),
    ).stageExecusion(tokens);
  }

  return {
    acceptApplicant,
    deliveryApprove,
    stageExecusion,
  };
}
