import { Contract } from 'ethers';
import { useContext } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import ABI_Game from 'contracts/abi/Game.json';
import ABI_Task from 'contracts/abi/Task.json';
import ABI_Hub from 'contracts/abi/Hub.json';
import ABI_extCourt from 'contracts/abi/extCourt.json';
import ABI_extMDAO from 'contracts/abi/extMDAO.json';
import ABI_extProject from 'contracts/abi/extProject.json';
import ABI_extRules from 'contracts/abi/extRules.json';
import ABI_Soul from 'contracts/abi/Soul.json';
import ABI_Action from 'contracts/abi/ActionRepo.json';
import WrongNetworkError from 'errors/WrongNetworkError';
import NoWalletError from 'errors/NoWalletError';

/**
 * Hook for workin with contracts.
 */
export default function useContract() {
  const { account, provider, isNetworkChainIdCorrect, isReady } = useContext(Web3Context);

  /// Common Validations
  function validateChain() {
    if (!isReady){
      console.error("[DEBUG] Not ready -- is Wallet Connected?", account);
      throw new NoWalletError();
    }
    if (!isNetworkChainIdCorrect) throw new WrongNetworkError();
  }

  /// Hub Contract
  function getContractHub() {
    validateChain();
    const address = process.env.NEXT_PUBLIC_HUB_CONTRACT_ADDRESS;
    return new Contract(String(address), ABI_Hub, provider?.getSigner());
  }

  /// Action Repo Contract (history)
  function getContractActions() {
    validateChain();
    const address = process.env.NEXT_PUBLIC_ACTION_REPO_CONTRACT_ADDRESS;
    return new Contract(String(address), ABI_Action, provider?.getSigner());
  }

  /* [TBD]
  /// Data Repo Contract
  function getContractData() {
    validateChain();
    const address = process.env.NEXT_PUBLIC_DATA_REPO_CONTRACT_ADDRESS;
    return new Contract(String(address), ABI_Action, provider?.getSigner());
  }
  */

  /// SBT Contract
  function getContractSoul() {
    validateChain();
    const address = process.env.NEXT_PUBLIC_SOUL_CONTRACT_ADDRESS;
    return new Contract(String(address), ABI_Soul, provider?.getSigner());
  }

  /// Game Contract
  function getContractGame(address: string) {
    validateChain();
    return new Contract(address, ABI_Game, provider?.getSigner());
  }

  /// Game Extension: Court
  function getContractGameCourt(address: string) {
    validateChain();
    return new Contract(address, ABI_extCourt, provider?.getSigner());
  }

  /// Game Extension: mDAO
  function getContractGameMDAO(address: string) {
    validateChain();
    return new Contract(address, ABI_extMDAO, provider?.getSigner());
  }

  /// Game Extension: Project
  function getContractGameProject(address: string) {
    validateChain();
    return new Contract(address, ABI_extProject, provider?.getSigner());
  }

  /// Game Extension: Rules
  function getContractGameRules(address: string) {
    validateChain();
    return new Contract(address, ABI_extRules, provider?.getSigner());
  }

  /// Task Contract
  function getContractTask(address: string) {
    validateChain();
    return new Contract(address, ABI_Task, provider?.getSigner());
  }

  return {
    validateChain,
    getContractActions,
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
