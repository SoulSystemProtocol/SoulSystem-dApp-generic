import { Contract } from 'ethers';
import { useContext } from 'react';
import { Web3Context } from 'contexts/web3';
//ABIs
import ABI_Game from 'contracts/abi/Game.json';
import ABI_Task from 'contracts/abi/Task.json';
import ABI_Hub from 'contracts/abi/Hub.json';
import ABI_extCourt from 'contracts/abi/extCourt.json';
import ABI_extMDAO from 'contracts/abi/extMDAO.json';
import ABI_extProject from 'contracts/abi/extProject.json';
import ABI_extRules from 'contracts/abi/extRules.json';
import ABI_Soul from 'contracts/abi/Soul.json';
import WrongNetworkError from 'errors/WrongNetworkError';

/**
 * Hook for workin with contracts.
 */
export default function useContract() {
  const { provider, isNetworkChainIdCorrect } = useContext(Web3Context);

  function getContractHub() {
    if (!isNetworkChainIdCorrect) throw new WrongNetworkError();
    const address = process.env.NEXT_PUBLIC_HUB_CONTRACT_ADDRESS;
    return new Contract(String(address), ABI_Hub, provider?.getSigner());
  }

  function getContractGame(address: string) {
    if (!isNetworkChainIdCorrect) throw new WrongNetworkError();
    return new Contract(address, ABI_Game, provider?.getSigner());
  }

  function getContractGameCourt(address: string) {
    if (!isNetworkChainIdCorrect) throw new WrongNetworkError();
    return new Contract(address, ABI_extCourt, provider?.getSigner());
  }

  function getContractGameMDAO(address: string) {
    if (!isNetworkChainIdCorrect) throw new WrongNetworkError();
    return new Contract(address, ABI_extMDAO, provider?.getSigner());
  }

  function getContractGameProject(address: string) {
    if (!isNetworkChainIdCorrect) throw new WrongNetworkError();
    return new Contract(address, ABI_extProject, provider?.getSigner());
  }

  function getContractGameRules(address: string) {
    if (!isNetworkChainIdCorrect) throw new WrongNetworkError();
    return new Contract(address, ABI_extRules, provider?.getSigner());
  }

  function getContractTask(address: string) {
    if (!isNetworkChainIdCorrect) throw new WrongNetworkError();
    return new Contract(address, ABI_Task, provider?.getSigner());
  }

  function getContractSoul(address: string) {
    if (!isNetworkChainIdCorrect) throw new WrongNetworkError();
    return new Contract(address, ABI_Soul, provider?.getSigner());
  }

  return {
    getContractHub,
    getContractGame,
    getContractGameCourt,
    getContractGameMDAO,
    getContractGameProject,
    getContractGameRules,
    getContractTask,
    getContractSoul,
  };
}
