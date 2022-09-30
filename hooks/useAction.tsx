import useSubgraph from 'hooks/useSubgraph';
import { hexStringToJson } from 'utils/converters';

/**
 * Hook for work with actions.
 */
export default function useAction() {
  const { findActionEntities } = useSubgraph();

  /**
   * Get action for specified guid.
   *
   * @param {string} guid Action guid.
   * @returns {Promise.<Action>} A action or null if action not found.
   */
  let getAction = async function (guid: string) {
    const actions = await getActions([guid]);
    return actions && actions.length > 0 ? actions[0] : null;
  };

  /**
   * Get actions.
   *
   * @param {Array.<string>} guids If not null, then the function returns the actions for the specified guids.
   * @returns {Promise.<Array.<Action>>} A list with actions.
   */
  let getActions = async function (guids: string[] = []) {
    const actionEntities = await findActionEntities(guids);
    // return actionEntities.map((action: any) => {
    //   action.metadata = hexStringToJson(action.uriData);
    //   return action;
    // })}
    let actions = [];
    console.log('[DEBUG] actionEntities', actionEntities);
    for (const action of actionEntities) {
      try {
        action.metadata = hexStringToJson(action.uriData);
        actions.push(action);
      } catch (error) {
        continue;
      }
    }
    return actions;
  };

  return {
    getActions,
    getAction,
  };
}
