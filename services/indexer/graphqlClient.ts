import axios from 'axios';
import type { IndexerVariables } from './types';

export async function runIndexerGraphqlQuery<TData>(
  query: string,
  variables: IndexerVariables = {},
): Promise<TData> {
  const endpoint =
    process.env.NEXT_PUBLIC_INDEXER_GRAPHQL_URL ||
    process.env.NEXT_PUBLIC_SUBGRAPH_API;

  if (!endpoint) {
    throw new Error(
      'Indexer GraphQL endpoint is not configured. Set NEXT_PUBLIC_INDEXER_GRAPHQL_URL.',
    );
  }

  try {
    const response = await axios.post(endpoint, { query, variables });

    if (response.data.errors) {
      throw new Error(JSON.stringify(response.data.errors));
    }

    return response.data.data as TData;
  } catch (error: any) {
    throw new Error(
      `Could not query the indexer: ${error?.message ?? 'Unknown error'}`,
    );
  }
}
