import { runSubgraphQuery, SoulByIdQuery, SoulByHashQuery } from './subgraph';

/**
 * Fetch a Specific Soul by ID
 */
export const getSoulById = async (id: string): Promise<any> => {
  return runSubgraphQuery(SoulByIdQuery(id)).then((res) => res?.soul);
};

export const getSoulByHash = async (hash: string): Promise<any> => {
  return runSubgraphQuery(SoulByHashQuery(hash)).then((res) => res?.souls[0]);
};
