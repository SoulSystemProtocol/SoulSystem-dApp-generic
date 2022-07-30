import axios from 'axios';
import { IS_GAMES_CREATED_BY_NOT_HUB_DISABLED } from 'constants/features';

/**
 * Hook to work with subgraph.
 */
export default function useSubgraph() {
  let findSouls = async function (
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

  let findGames = async function (
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

  let findClaims = async function (
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

  return {
    findSouls,
    findGames,
    findClaims,
  };
}

async function makeSubgraphQuery(query: string) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_SUBGRAPH_API || '',
      {
        query: query,
      },
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
        uriData
        uriImage
        uriFirstName
        uriLastName
      }
    }`;
}

function getFindGamesQuery(
  ids?: Array<string>,
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
      uri
      uriData
      roles {
        id
        roleId
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
      
    }
  }`;

  //TODO: Add This
  // posts {
  //   id
  //   author {
  //     id
  //     owner
  //   }
  //   entityRole
  //   uri
  // }
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
      uri
      uriData
      type
      game {
        name
        uriData
      }
      roles {
        id
        roleId
        souls
        soulsCount
      }
      nominations {
        id
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
        author {
          id
          owner
        }
        entityRole
        uri
      }
    }
  }`;
}
