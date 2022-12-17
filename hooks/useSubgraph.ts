import axios from 'axios';
// import { DocumentNode, gql, useQuery } from '@apollo/client';
import { IS_GAMES_CREATED_BY_NOT_HUB_DISABLED } from 'constants/features';
import { unionWith } from 'lodash';
import { hexStringToJson } from 'utils/converters';

/**
 * Hook to work with subgraph.
 */
export default function useSubgraph() {
  const findSouls = async function (
    ids?: Array<string>,
    owners?: Array<string>,
    type?: string,
    first?: number,
    skip?: number,
  ) {
    const fixedOwners = owners
      ? owners.map((owner) => owner.toLowerCase())
      : undefined;
    const response = await makeSubgraphQuery(
      getFindSoulsQuery(ids, fixedOwners, type, first, skip),
    );
    return response.souls;
  };

  const findGames = async function (
    ids?: Array<string>,
    type?: string,
    first?: number,
    skip?: number,
  ) {
    const response = await makeSubgraphQuery(
      getFindGamesQuery(ids, type, first, skip),
    );
    return response.games;
  };

  const findClaims = async function (
    ids?: Array<string>,
    type?: string,
    game?: string,
    first?: number,
    skip?: number,
  ) {
    const response = await makeSubgraphQuery(
      getFindClaimsQuery(ids, type, game, first, skip),
    );
    return response.claims;
  };

  const isGamePart = async (gameId: string, sbt: string) => {
    const queryGQL = `
      query GetPart($sbt: ID!, $gameId: ID!) {
        gameParticipants(where: { sbt: $sbt, entity: $gameId }) {
          id
        }
      }
    `;
    const response = await makeSubgraphQuery(queryGQL, { sbt, gameId });
    return response.gameParticipants.length > 0;
  };

  /**
   * Find the Game's rule entities.
   */
  const findGameRules = async function (
    ids: string[],
    containerId?: string,
    actionGuid?: string,
    isPositive?: boolean,
    isNegative?: boolean,
    isEnabled?: boolean,
  ): Promise<Array<any>> {
    const adjustedIds = !!ids.length ? ids.map((id) => id.toLowerCase()) : [];
    const adjustedContainerId = containerId && containerId.toLowerCase(); //TODO: Maybe Don't save game ids as lowercase
    const response = await makeSubgraphQuery(
      findGameRulesQuery(
        adjustedIds,
        adjustedContainerId,
        actionGuid,
        isPositive,
        isNegative,
        isEnabled,
      ),
    );
    return response.gameRules;
  };

  /**
   * Search for Game's Rules
   * /
  let searchGameRulesByQuery = async function (
    containerId: string,
    isPositive?: boolean,
    isNegative?: boolean,
    isEnabled?: boolean,
    searchQuery?: any,
  ): Promise<Array<any>> {
    const response = await makeSubgraphQuery(
      findGameRulesQueryMulti(
        containerId,
        isPositive,
        isNegative,
        isEnabled,
        searchQuery,
      ),
    );
    const unitedResults = unionWith(
      response.result1,
      response.result2,
      response.result3,
      (entity1: any, entity2: any) => entity1.id === entity2.id,
    );
    return unitedResults;
  };

  /**
   * Get Game Rules
   */
  const getGameRules = async function (
    ids: string[],
    containerId: string,
    actionGuid?: any,
    isPositive?: boolean,
    isNegative?: boolean,
    isEnabled?: boolean,
  ): Promise<Array<any>> {
    const gameRules = await findGameRules(
      ids,
      containerId,
      actionGuid,
      isPositive,
      isNegative,
      isEnabled,
    );
    return gameRules.map((ruleEntity: any) => ({
      ...ruleEntity,
      metadata: hexStringToJson(ruleEntity.metadata),
    }));
  };

  /**
   * Find Action entities
   */
  const findActionEntities = async function (
    guids: string[],
  ): Promise<Array<any>> {
    const response = await makeSubgraphQuery(getFindActionEntitiesQuery(guids));
    return response.actions;
  };

  /**
   * Fetch a Specific Soul by ID
   */
  const getSoulById = async (id: string): Promise<any> => {
    const response = await makeSubgraphQuery(SoulByIdQuery(id));
    return response?.soul;
  };

  return {
    getSoulById,
    isGamePart,
    findSouls,
    findGames,
    findClaims,
    findActionEntities,
    getGameRules,
  };
}

/**
 * Run a GQL string query against the subgraph.
 */
async function makeSubgraphQuery(query: string, variables = {}) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_SUBGRAPH_API || '',
      { query, variables },
    );
    if (response.data.errors) {
      throw new Error(
        `Error making subgraph query: ${JSON.stringify(response.data.errors)}`,
      );
    }
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      `Could not query the subgraph: ${JSON.stringify(error.message)}`,
    );
  }
}

/**
 * Basic Soul Fetc by ID
 */
function SoulByIdQuery(id: string) {
  return `{ 
    soul(id: ${id}) {
      id
      owner
      type
      role
      uri
      metadata
      uriImage
      name
      attrs {
        id
        role
        bEnd
      }
    }
  }`;
}

function getFindSoulsQuery(
  ids?: Array<string>,
  owners?: Array<string>,
  type?: string,
  first?: number,
  skip?: number,
) {
  let idsFilter = ids ? `id_in: ["${ids.join('","')}"]` : '';
  let ownersFilter = owners ? `owner_in: ["${owners.join('","')}"]` : '';
  let typeFilter = type !== undefined ? `type: "${type}"` : '';
  let filterParams = `where: {${idsFilter}, ${ownersFilter}, ${typeFilter}}`;
  let paginationParams = `first: ${first}, skip: ${skip}`;
  return `{
      souls(${filterParams}, ${paginationParams}) {
        id
        owner
        type
        uri
        metadata
        uriImage
        name
        participantGame {
          id
          roles
        }
        participantProc {
          id
          roles
        }
      }
    }`;
}

function getFindGamesQuery(
  ids?: string[],
  type?: string,
  first?: number,
  skip?: number,
) {
  let idsFilter = ids ? `id_in: ["${ids.join('","')}"]` : '';
  let typeFilter = type ? `type: "${type}"` : '';
  let hubFilter = IS_GAMES_CREATED_BY_NOT_HUB_DISABLED
    ? `hub: "${process.env.NEXT_PUBLIC_HUB_CONTRACT_ADDRESS?.toLowerCase()}"`
    : '';
  let filterParams = `where: {${idsFilter}, ${typeFilter}, ${hubFilter}}`;
  let paginationParams = `first: ${first}, skip: ${skip}`;
  return `{
    games(${filterParams}, ${paginationParams}) {
      id
      name
      type
      role
      roles {
        id
        roleId
        name
        souls
        soulsCount
      }
      nominations {
        id
        createdDate
        nominator {
          id
        }
        nominated {
          id
        }
      }
      posts {
        id
        createdDate
        entityRole
        author {
          id
          owner
          name
          uriImage
        }
        uri
        metadata
      }
    }
  }`;
}

function getFindClaimsQuery(
  ids?: Array<string>,
  type?: string,
  game?: string,
  first?: number,
  skip?: number,
) {
  let idsFilter = ids ? `id_in: ["${ids.join('","')}"]` : '';
  let typeFilter = type ? `type: "${type}"` : '';
  let gameFilter = game ? `game: "${game}"` : '';
  let filterParams = `where: {${idsFilter}, ${typeFilter}, ${gameFilter}}`;
  let paginationParams = `first: ${first}, skip: ${skip}`;
  return `{
    claims(${filterParams}, ${paginationParams}) {
      id
      name
      stage
      type
      game {
        id
        name
        type
        role
      }
      roles {
        id
        name
        roleId
        souls
        soulsCount
      }
      nominations {
        id
        uri
        createdDate
        nominator {
          id
          owner
          type
        }
        nominated {
          id
          owner
          type
        }
      }
      posts {
        id
        createdDate
        entityRole
        author {
          id
          owner
          name
          uriImage
        }
        uri
        metadata
      }
    }
  }`;
}

///
function getFindActionEntitiesQuery(guids: string[]) {
  let queryParams = `first: 100`;
  if (guids !== undefined && guids.length > 0) {
    //   queryParams = `where: {id: ""}`;
    // }
    if (guids.length == 1) {
      queryParams = `where: {id: "${guids[0]}"}`;
    } else if (guids.length > 1) {
      queryParams = `first: 100, where: {id_in: ["${guids.join('","')}"]}`;
    }
  }
  return `{
    actions(${queryParams}) {
      id
      subject
      verb
      object
      tool
      uri
      uriData
      metadata
      rules {
        id
        affected
        uri
        negation
        confirmationRuling
        confirmationEvidence
        confirmationWitness
        effects {
          name
          direction
          value
        }
      }
    }
  }`;
}

///
function findGameRulesQuery(
  ids: string[],
  containerId?: string,
  actionGuid?: string,
  isPositive?: boolean,
  isNegative?: boolean,
  isEnabled?: boolean,
) {
  let idsFilter = !!ids.length ? `id_in: ["${ids.join('","')}"]` : '';
  let gameFilter = containerId ? `game: "${containerId}"` : '';
  let actionGuidFilter = actionGuid ? `about: "${actionGuid}"` : '';
  let isPositiveFilter = isPositive === true ? 'isPositive: true' : '';
  let isNegativeFilter = isNegative === true ? 'isPositive: false' : '';
  let isEnabledFilter = isEnabled === true ? 'isDisabled: false' : '';
  let filterParams = `where: {${idsFilter}, ${gameFilter}, ${actionGuidFilter}, ${isPositiveFilter}, ${isNegativeFilter}, ${isEnabledFilter}}`;
  let paginationParams = `first: 100`;
  return `{
    gameRules(${filterParams}, ${paginationParams}) {
      id
      about {
        id
      }
      ruleId
      affected
      uri
      uriData
      metadata
      negation
      confirmationRuling
      confirmationEvidence
      confirmationWitness
      effects {
        name
        direction
        value
      }
      isPositive
      isDisabled
    }
  }`;
}

///
function findGameRulesQueryMulti(
  containerId: string,
  isPositive?: boolean,
  isNegative?: boolean,
  isEnabled?: boolean,
  searchQuery?: string,
) {
  let gameFilter = containerId ? `game: "${containerId}"` : '';
  let isPositiveFilter = isPositive === true ? 'isPositive: true' : '';
  let isNegativeFilter = isNegative === true ? 'isPositive: false' : '';
  let isEnabledFilter = isEnabled === true ? 'isDisabled: false' : '';
  let searchQueryFilter1 = `aboutSubject_contains_nocase: "${searchQuery}"`;
  let searchQueryFilter2 = `affected_contains_nocase: "${searchQuery}"`;
  let filterParams1 = `where: {${gameFilter}, ${isPositiveFilter},  ${isNegativeFilter}, ${isEnabledFilter}, ${searchQueryFilter1}}`;
  let filterParams2 = `where: {${gameFilter}, ${isPositiveFilter}, ${isNegativeFilter}, ${isEnabledFilter},  ${searchQueryFilter2}}`;
  let paginationParams = `first: 20`;
  let fields = `
    id
    about {
      id
    }
    ruleId
    affected
    uri
    uriData
    metadata
    negation
    confirmationRuling
    confirmationEvidence
    confirmationWitness
    effects {
      name
      direction
      value
    }
  `;
  return `{
    result1: gameRule(${filterParams1}, ${paginationParams}) {
      ${fields}
    }
    result2: gameRule(${filterParams2}, ${paginationParams}) {
      ${fields}
    }
  }`;
}
