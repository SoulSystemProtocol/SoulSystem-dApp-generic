import Dao from 'classes/Dao';
import { GAME_TYPE } from 'constants/contracts';
import { hexStringToJson } from 'utils/converters';
import useGameContract from './contracts/useGameContract';
import useSubgraph from './useSubgraph';
import { getById } from './utils';

/**
 * Hook for work with DAOs.
 *
 * TODO: Move neccessary functions to hook useGame().
 */
export default function useDao() {
  const {
    // getGameContract,
    // setUri,
    // leave,
    // nominate: applyToJoin,
    assignRole,
    removeRole,
  } = useGameContract();
  const { findGames } = useSubgraph();

  async function getDaos(
    ids?: Array<string>,
    first = 10,
    skip = 0,
  ): Promise<Array<object>> {
    const subgraphGames = await findGames(ids, GAME_TYPE.mdao, first, skip);
    // console.log('DAO subgraphGames', subgraphGames, ids);
    return subgraphGames.map((subgraphGame: any) =>
      convertSubgraphGameToDao(subgraphGame),
    );
  }

  function getSoulsByRole(dao: Dao, roleId: string): Array<string> {
    return (
      dao.roles?.find((element: any) => element?.roleId === roleId)?.souls || []
    );
  }

  return {
    // createDao: async (name: string, metadataUrl: string) =>
    // makeGame(GAME_TYPE.mdao, name, metadataUrl),
    // editDao: async (id: string, metadataUrl: string) => setUri(id, metadataUrl),
    getDaos,
    getDaoById: (id: string) => getById(id, getDaos),
    getSoulsByRole,
    isSoulHasRole: (dao: Dao, soul: string, roleId: string): boolean =>
      getSoulsByRole(dao, roleId).includes(soul),
    // leave,
    // applyToJoin,
    assignRoleToSoul: assignRole,
    removeRoleToSoul: removeRole,
  };
}

function convertSubgraphGameToDao(subgraphGame: any) {
  const metadata = hexStringToJson(subgraphGame.metadata);
  return { ...subgraphGame, uriData: metadata, metadata };
}
