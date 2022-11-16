import { Web3Context } from 'contexts/Web3Context';
import contractAbi from 'contracts/abi/Game.json';
import WrongNetworkError from 'errors/WrongNetworkError';
import { Contract } from 'ethers';
import { useContext } from 'react';

/**
 * Hook for work with game contract.
 */
export default function useGameContract() {
  const { provider, isNetworkChainIdCorrect } = useContext(Web3Context);

  function getGameContract(address: string) {
    if (!isNetworkChainIdCorrect) {
      throw new WrongNetworkError();
    }
    return new Contract(address, contractAbi, provider?.getSigner());
  }

  async function leave(contractAddress: string) {
    return await getGameContract(contractAddress).leave();
  }

  async function nominate(
    contractAddress: string,
    tokenId: string,
    uri: string,
  ) {
    return await getGameContract(contractAddress).nominate(tokenId, uri);
  }

  async function assignRole(
    contractAddress: string,
    token: string,
    role: string,
  ) {
    return await getGameContract(contractAddress).roleAssignToToken(
      token,
      role,
    );
  }

  async function removeRole(
    contractAddress: string,
    token: string,
    role: string,
  ) {
    return await getGameContract(contractAddress).roleRemoveFromToken(
      token,
      role,
    );
  }

  /* DEPRECATED
  async function setUri(contractAddress: string, uri: string) {
    return await getGameContract(contractAddress).setContractURI(uri);
  }
  */

  return {
    getGameContract,
    // setUri,
    leave,
    nominate,
    assignRole,
    removeRole,
  };
}
