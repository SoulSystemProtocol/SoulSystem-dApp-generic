import { Web3Context } from 'contexts/web3';
import contractAbi from 'contracts/abi/Game.json';
import WrongNetworkError from 'errors/WrongNetworkError';
import { Contract } from 'ethers';
import { useContext } from 'react';

/**
 * Hook for work with game contract.
 */
export default function useGameContract() {
  const { provider, isNetworkChainIdCorrect } = useContext(Web3Context);

  function getContract(address: string, signerOrProvider: any) {
    return new Contract(address, contractAbi, signerOrProvider);
  }

  async function setUri(contractAddress: string, uri: string) {
    if (!isNetworkChainIdCorrect) {
      throw new WrongNetworkError();
    }
    return await getContract(
      contractAddress,
      provider?.getSigner(),
    ).setContractURI(uri);
  }

  async function assignRole(
    contractAddress: string,
    token: string,
    role: string,
  ) {
    if (!isNetworkChainIdCorrect) {
      throw new WrongNetworkError();
    }
    return await getContract(
      contractAddress,
      provider?.getSigner(),
    ).roleAssignToToken(token, role);
  }

  async function removeRole(
    contractAddress: string,
    token: string,
    role: string,
  ) {
    if (!isNetworkChainIdCorrect) {
      throw new WrongNetworkError();
    }
    return await getContract(
      contractAddress,
      provider?.getSigner(),
    ).roleRemoveFromToken(token, role);
  }

  return {
    setUri,
    assignRole,
    removeRole,
  };
}
