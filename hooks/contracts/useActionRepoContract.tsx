// eslint-disable-next-line import/extensions
import { Web3Context } from 'contexts/web3';
import { useContext } from 'react';
import useContract from 'hooks/useContract';

/** DEPRECATED - use useContract directly
 * Hook for ActionRepo Contract.
 */
export default function useActionRepoContract() {
  const { account, isNetworkChainIdCorrect } = useContext(Web3Context);
  const { getContractActions } = useContract();

  /**
   * Add an action.
   *
   * @param {{subject: string,  verb: string, object: string, tool: string}} action Action object.
   * @param {string} uri URI.
   * @returns Transaction.
   */
  async function addAction(action: any, uri: string) {
    return await getContractActions().actionAdd(action, uri);
  }

  return {
    addAction,
  };
}
