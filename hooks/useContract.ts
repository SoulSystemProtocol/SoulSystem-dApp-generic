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
import { HubUpgradable } from '../typechain-types/contracts/HubUpgradable';
import { ActionRepoTrackerUp } from '../typechain-types/ActionRepoTrackerUp';
import { SoulUpgradable } from '../typechain-types/contracts/SoulUpgradable';
import { GameUpgradable } from '../typechain-types/contracts/GameUpgradable';
import { CourtExt } from '../typechain-types/contracts/extensions/CourtExt';
import { MicroDAOExt } from '../typechain-types/contracts/extensions/MicroDAOExt';
import { ProjectExt } from '../typechain-types/contracts/extensions/ProjectExt';
import { RuleExt } from '../typechain-types/contracts/extensions/RuleExt';
import { TaskUpgradable } from '../typechain-types/contracts/TaskUpgradable';

/**
 * Hook for workin with contracts.
 */
export default function useContract() {
  const { account, provider, isNetworkChainIdCorrect, isReady } =
    useContext(Web3Context);

  /// Common Validations
  function validateChain() {
    if (!account) {
      console.error('[DEBUG] Not ready -- is Wallet Connected?', account);
      throw new NoWalletError();
    }
    if (!isNetworkChainIdCorrect) throw new WrongNetworkError();
  }

  /// Hub Contract
  function getContractHub(): HubUpgradable {
    validateChain();
    const address = process.env.NEXT_PUBLIC_HUB_CONTRACT_ADDRESS;
    return new Contract(
      String(address),
      ABI_Hub,
      provider?.getSigner(),
    ) as HubUpgradable;
  }

  /// Action Repo Contract (history)
  function getContractActions(): ActionRepoTrackerUp {
    validateChain();
    const address = process.env.NEXT_PUBLIC_ACTION_REPO_CONTRACT_ADDRESS;
    return new Contract(
      String(address),
      ABI_Action,
      provider?.getSigner(),
    ) as ActionRepoTrackerUp;
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
  function getContractSoul(): SoulUpgradable {
    validateChain();
    const address = process.env.NEXT_PUBLIC_SOUL_CONTRACT_ADDRESS;
    return new Contract(
      String(address),
      ABI_Soul,
      provider?.getSigner(),
    ) as SoulUpgradable;
  }

  /// Game Contract
  function getContractGame(address: string): GameUpgradable {
    validateChain();
    return new Contract(
      address,
      ABI_Game,
      provider?.getSigner(),
    ) as GameUpgradable;
  }

  /// Game Extension: Court
  function getContractGameCourt(address: string): CourtExt {
    validateChain();
    return new Contract(
      address,
      ABI_extCourt,
      provider?.getSigner(),
    ) as CourtExt;
  }

  /// Game Extension: mDAO
  function getContractGameMDAO(address: string): MicroDAOExt {
    validateChain();
    return new Contract(
      address,
      ABI_extMDAO,
      provider?.getSigner(),
    ) as MicroDAOExt;
  }

  /// Game Extension: Project
  function getContractGameProject(address: string): ProjectExt {
    validateChain();
    return new Contract(
      address,
      ABI_extProject,
      provider?.getSigner(),
    ) as ProjectExt;
  }

  /// Game Extension: Rules
  function getContractGameRules(address: string): RuleExt {
    validateChain();
    return new Contract(
      address,
      ABI_extRules,
      provider?.getSigner(),
    ) as RuleExt;
  }

  /// Task Contract
  function getContractTask(address: string): TaskUpgradable {
    validateChain();
    return new Contract(
      address,
      ABI_Task,
      provider?.getSigner(),
    ) as TaskUpgradable;
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
