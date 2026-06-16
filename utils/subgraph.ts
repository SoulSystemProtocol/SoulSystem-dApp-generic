import { runIndexerGraphqlQuery } from 'services/indexer/graphqlClient';
import {
  SoulByHashQuery,
  SoulByIdQuery,
} from 'services/indexer/soulSystemGraphqlIndexer';

export { SoulByHashQuery, SoulByIdQuery };

/** @deprecated Use runIndexerGraphqlQuery from services/indexer/graphqlClient. */
export async function runSubgraphQuery(query: string, variables = {}) {
  return runIndexerGraphqlQuery(query, variables);
}
