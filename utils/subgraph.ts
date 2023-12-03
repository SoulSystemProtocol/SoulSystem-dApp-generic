import axios from 'axios';

/**
 * Basic Soul Fetch by ID
 */
export function SoulByIdQuery(id: string) {
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
      tags
      attrs {
        id
        role
        bEnd
      }
    }
  }`;
}

/**
 * Basic Soul Fetch by hash
 */
export function SoulByHashQuery(hash: string) {
  return `{ 
    souls(where: { owner: "${hash}" }) {
      id
      owner
      type
      role
      uri
      metadata
      uriImage
      name
      tags
      attrs {
        id
        role
        bEnd
      }
    }
  }`;
}

/**
 * Run a GQL string query against the subgraph.
 */
export async function runSubgraphQuery(query: string, variables = {}) {
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
