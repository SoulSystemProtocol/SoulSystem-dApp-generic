import { useQuery } from '@apollo/client';
import { normalizeGraphEntity } from 'helpers/metadata';
import { useEffect, useContext, useMemo } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import SoulByIdQuery from 'queries/SoulByIdQuery';
import { useHydratedSoulMetadataState } from './useSoulMetadata';

/**
 * Fetch Single Soul by Id
 */
export default function useSoulById(id: string): any {
  const { account } = useContext(Web3Context);
  const { data, loading, error } = useQuery(SoulByIdQuery, {
    ssr: false,
    variables: { id },
  });
  const rawSoul = data?.soul || null;
  const { soul: hydratedSoul, isHydrating: metadataLoading } =
    useHydratedSoulMetadataState(rawSoul);
  const soul = useMemo(
    () => (loading || error ? null : normalizeGraphEntity(hydratedSoul)),
    [error, hydratedSoul, loading],
  );
  const isLoading = loading || metadataLoading;
  const isOwned =
    !isLoading &&
    !error &&
    !!account &&
    rawSoul?.owner?.toLowerCase() == account.toLowerCase();

  useEffect(() => {
    if (error) console.error('Soul query failed', { data, error });
  }, [data, error]);

  return {
    soul,
    loading: isLoading,
    metadataLoading,
    error,
    isOwned,
  };
}
