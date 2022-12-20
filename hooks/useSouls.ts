import { normalizeGraphEntity } from 'helpers/metadata';
import useSubgraph from './useSubgraph';

/**
 * Hooks for fetching souls
 */
export default function useSouls() {
  const { findSouls } = useSubgraph();

  async function getSouls(
    ids?: Array<string>,
    owners?: Array<string>,
    type?: string,
    first = 10,
    skip = 0,
  ): Promise<Array<any>> {
    const subgraphSouls = await findSouls(ids, owners, type, first, skip);
    return subgraphSouls.map((subgraphSoul: any) =>
      normalizeGraphEntity(subgraphSoul),
    );
  }

  return {
    getSouls,
  };
}
