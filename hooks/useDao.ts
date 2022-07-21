import Dao from 'classes/Dao';
import { GAME_TYPE } from 'constants/contracts';
import { hexStringToJson } from 'utils/converters';
import useHubContract from './contracts/useHubContract';
import useSubgraph from './useSubgraph';

/**
 * Hook for work with DAOs.
 */
export default function useDao() {
  const { gameMake } = useHubContract();
  const { findGames } = useSubgraph();

  let createDao = async function (
    name: string,
    metadataUrl: string,
  ): Promise<any> {
    return gameMake(GAME_TYPE.mdao, name, metadataUrl);
  };

  let getDaos = async function (
    ids?: Array<string>,
    first = 10,
    skip = 0,
  ): Promise<Array<Dao>> {
    const subgraphGames = await findGames(ids, GAME_TYPE.mdao, first, skip);
    return subgraphGames.map((subgraphGame: any) =>
      convertSubgraphGameToDao(subgraphGame),
    );
  };

  return {
    createDao,
    getDaos,
  };
}

function convertSubgraphGameToDao(subgraphGame: any) {
  return new Dao(
    subgraphGame.id,
    subgraphGame.name,
    subgraphGame.type,
    subgraphGame.uri,
    hexStringToJson(subgraphGame.uriData),
  );
}
