// import { Web3Context } from 'contexts/Web3Context';
// import contractAbi from 'contracts/abi/Game.json';
// import WrongNetworkError from 'errors/WrongNetworkError';
// import { Contract } from 'ethers';
import useContract from 'hooks/useContract';
// import { useContext } from 'react';

/**
 * Hook for work with game contract.
 */
export default function useGameContract() {
  const { getContractGame } = useContract();

  async function assignRole(
    contractAddress: string,
    token: string,
    role: string,
  ) {
    return await getContractGame(contractAddress).roleAssignToToken(
      token,
      role,
    );
  }

  async function removeRole(
    contractAddress: string,
    token: string,
    role: string,
  ) {
    return await getContractGame(contractAddress).roleRemoveFromToken(
      token,
      role,
    );
  }

  return {
    // setUri,
    // leave,
    // nominate,
    assignRole,
    removeRole,
  };
}
