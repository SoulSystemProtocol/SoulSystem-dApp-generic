import { indexer } from 'services/indexer/client';

/** @deprecated Use services/indexer/client directly for new code. */
export default function useSubgraph() {
  return {
    getSoulById: indexer.getSoulById,
    isGamePart: indexer.isGamePart,
    findSouls: (
      ids?: string[],
      owners?: string[],
      type?: string,
      first?: number,
      skip?: number,
    ) => indexer.findSouls({ ids, owners, type, first, skip }),
    findGames: (ids?: string[], type?: string, first?: number, skip?: number) =>
      indexer.findGames({ ids, type, first, skip }),
    findClaims: (
      ids?: string[],
      type?: string,
      game?: string,
      first?: number,
      skip?: number,
    ) => indexer.findClaims({ ids, type, game, first, skip }),
    findActionEntities: indexer.findActionEntities,
    getGameRules: (
      ids: string[],
      containerId: string,
      actionGuid?: string,
      isPositive?: boolean,
      isNegative?: boolean,
      isEnabled?: boolean,
    ) =>
      indexer.getGameRules({
        ids,
        containerId,
        actionGuid,
        isPositive,
        isNegative,
        isEnabled,
      }),
  };
}
