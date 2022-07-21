import axios from 'axios';

/**
 * Hook to work with subgraph.
 */
export default function useSubgraph() {
  let findSouls = async function (
    ids?: Array<string>,
    owners?: Array<string>,
    first?: number,
    skip?: number,
  ) {
    const fixedOwners = owners
      ? owners.map((owner) => owner.toLowerCase())
      : undefined;
    const response = await makeSubgraphQuery(
      getFindSoulsQuery(ids, fixedOwners, first, skip),
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

  return {
    findSouls,
    findGames,
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
  first?: number,
  skip?: number,
) {
  let idsFilter = ids ? `id_in: ["${ids.join('","')}"]` : '';
  let ownersFilter = owners ? `owner_in: ["${owners.join('","')}"]` : '';
  let filterParams = `where: {${idsFilter}, ${ownersFilter}}`;
  let paginationParams = `first: ${first}, skip: ${skip}`;
  return `{
      souls(${filterParams}, ${paginationParams}) {
        id
        owner
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
  let filterParams = `where: {${idsFilter}, ${typeFilter}}`;
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
    }
  }`;
}
