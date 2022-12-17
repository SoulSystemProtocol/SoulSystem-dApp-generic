import { GAME_TYPE } from 'constants/contracts';
import useGameContract from './contracts/useGameContract';
import useSubgraph from './useSubgraph';
import { getById } from './utils';

/**
 * Hook for work with DAOs.
 *
 * TODO: Move neccessary functions to hook useGame().
 */
export default function useDao() {
  // const { assignRole, removeRole } = useGameContract();
  const { findGames } = useSubgraph();

  async function getDaos(
    ids?: Array<string>,
    first = 10,
    skip = 0,
  ): Promise<Array<object>> {
    const subgraphGames = await findGames(ids, GAME_TYPE.mdao, first, skip);
    // console.log('DAO subgraphGames', subgraphGames, ids);
    return subgraphGames;
  }

  function getSoulsByRole(dao: any, roleId: string): Array<string> {
    return (
      dao.roles?.find((element: any) => element?.roleId === roleId)?.souls || []
    );
  }

  return {
    // createDao: async (name: string, metadataUrl: string) =>
    // makeGame(GAME_TYPE.mdao, name, metadataUrl),
    // editDao: async (id: string, metadataUrl: string) => setUri(id, metadataUrl),
    getDaos,
    getDaoById: (id: string) => getById(id, getDaos), //DEPRECATE! 
    getSoulsByRole,
    isSoulHasRole: (dao: any, soul: string, roleId: string): boolean =>
      getSoulsByRole(dao, roleId).includes(soul),
    // leave,
    // applyToJoin,
    // assignRoleToSoul: assignRole,
    // removeRoleToSoul: removeRole,
  };
}
