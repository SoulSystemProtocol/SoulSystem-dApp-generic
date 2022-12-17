import { normalizeGraphEntity } from 'helpers/metadata';
import useSubgraph from './useSubgraph';
// import { hexStringToJson } from 'utils/converters';
// import useSoulContract from './contracts/useSoulContract';
// import { getById } from './utils';

/**
 * Hook for work with souls.
 */
export default function useSoul() {
  // const { mint, update } = useSoulContract();
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

  // async function getSoulByOwner(owner: string): Promise<any | null> {
  //   const souls = await getSouls(undefined, [owner]);
  //   return souls.length > 0 ? souls[0] : null;
  // }

  return {
    // createSoul: async (metadataUrl: string) => mint(metadataUrl),
    // editSoul: async (id: string, metadataUrl: string) =>
    //   update(id, metadataUrl),
    // getSoulById: (id: string) => getById(id, getSouls),
    // getSoulByOwner,
    getSouls,
  };
}
