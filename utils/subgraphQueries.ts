import { indexer } from 'services/indexer/client';

/** @deprecated Use indexer.getSoulById from services/indexer/client. */
export const getSoulById = async (id: string): Promise<any> => {
  return indexer.getSoulById(id);
};

/** @deprecated Use indexer.getSoulByOwner from services/indexer/client. */
export const getSoulByHash = async (hash: string): Promise<any> => {
  return indexer.getSoulByOwner(hash);
};
