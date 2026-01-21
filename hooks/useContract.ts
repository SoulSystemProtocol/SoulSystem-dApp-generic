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
import { ActionRepoTrackerUp } from '../typechain-types/contracts/ActionRepoTrackerUp';
import { SoulUpgradable } from '../typechain-types/contracts/SoulUpgradable';
import { GameUpgradable } from '../typechain-types/contracts/GameUpgradable';
import { CourtExt } from '../typechain-types/contracts/extensions/CourtExt';
import { MicroDAOExt } from '../typechain-types/contracts/extensions/MicroDAOExt';
import { ProjectExt } from '../typechain-types/contracts/extensions/ProjectExt';
import { RuleExt } from '../typechain-types/contracts/extensions/RuleExt';
import { TaskUpgradable } from '../typechain-types/contracts/TaskUpgradable';
import { useSigner } from 'wagmi';
import { APP_CONFIGS } from 'constants/app';

/**
 * Hook for workin with contracts.
 */
export default function useContract() {
  const { account, provider, isNetworkChainIdCorrect } =
    useContext(Web3Context);
  const { data: signer, isError, isLoading } = useSigner();

  /// Common Validations
  function validateChain() {
    //Validate
    if (!APP_CONFIGS.WEB3_ENABLED) throw new NoWalletError();
    if (!account) {
      console.error('[DEBUG] Not ready -- is Wallet Connected?', {
        account,
        isError,
        isLoading,
      });
      throw new NoWalletError();
    }
    if (!isNetworkChainIdCorrect) throw new WrongNetworkError();
    // if(isLoading)
    // if(isError)
  }

  /// Hub Contract
  function getContractHub(): HubUpgradable {
    validateChain();
    if (!signer) throw new Error('Signer not avaliable');
    const address = process.env.NEXT_PUBLIC_HUB_CONTRACT_ADDRESS;
    return new Contract(String(address), ABI_Hub, signer) as HubUpgradable;
  }

  /// Action Repo Contract (history)
  function getContractActions(): ActionRepoTrackerUp {
    validateChain();
    if (!signer) throw new Error('Signer not avaliable');
    const address = process.env.NEXT_PUBLIC_ACTION_REPO_CONTRACT_ADDRESS;
    return new Contract(
      String(address),
      ABI_Action,
      signer,
    ) as ActionRepoTrackerUp;
  }

  /* [TBD]
  /// Data Repo Contract
  function getContractData() {
    validateChain();
    if (!signer) throw new Error('Signer not avaliable');
    const address = process.env.NEXT_PUBLIC_DATA_REPO_CONTRACT_ADDRESS;
    return new Contract(String(address), ABI_Action, signer);
  }
  */

  /// SBT Contract
  function getContractSoul(): SoulUpgradable {
    validateChain();
    if (!signer) throw new Error('Signer not avaliable');
    const address = process.env.NEXT_PUBLIC_SOUL_CONTRACT_ADDRESS;
    return new Contract(String(address), ABI_Soul, signer) as SoulUpgradable;
  }

  /// Game Contract
  function getContractGame(address: string): GameUpgradable {
    validateChain();
    if (!signer) throw new Error('Signer not avaliable');
    return new Contract(address, ABI_Game, signer) as GameUpgradable;
  }

  /// Game Extension: Court
  function getContractGameCourt(address: string): CourtExt {
    validateChain();
    if (!signer) throw new Error('Signer not avaliable');
    return new Contract(address, ABI_extCourt, signer) as CourtExt;
  }

  /// Game Extension: mDAO
  function getContractGameMDAO(address: string): MicroDAOExt {
    validateChain();
    if (!signer) throw new Error('Signer not avaliable');
    return new Contract(address, ABI_extMDAO, signer) as MicroDAOExt;
  }

  /// Game Extension: Project
  function getContractGameProject(address: string): ProjectExt {
    validateChain();
    if (!signer) throw new Error('Signer not avaliable');
    return new Contract(address, ABI_extProject, signer) as ProjectExt;
  }

  /// Game Extension: Rules
  function getContractGameRules(address: string): RuleExt {
    validateChain();
    if (!signer) throw new Error('Signer not avaliable');
    return new Contract(address, ABI_extRules, signer) as RuleExt;
  }

  /// Task Contract
  function getContractTask(address: string): TaskUpgradable {
    validateChain();
    if (!signer) throw new Error('Signer not avaliable');
    return new Contract(address, ABI_Task, signer) as TaskUpgradable;
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
