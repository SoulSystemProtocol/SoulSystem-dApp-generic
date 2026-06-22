import { useQuery } from '@apollo/client';
import SoulByHashQuery from 'queries/SoulByHashQuery';
import { normalizeGraphEntity } from 'helpers/metadata';
import { useEffect, useContext, useMemo } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import { useHydratedSoulMetadataState } from './useSoulMetadata';

/**
 * Fetch Single Soul by Hash
 */
export function getSoulByOwnerQueryOptions(hash?: string | null) {
  const normalizedHash = hash?.trim().toLowerCase() ?? '';

  return {
    ssr: false,
    skip: !normalizedHash,
    variables: { hash: normalizedHash },
  };
}

export default function useSoulByOwner(hash?: string | null): {
  soul: any;
  loading: boolean;
  metadataLoading: boolean;
  error: any;
  isOwned: boolean;
} {
  const { account } = useContext(Web3Context);
  const { data, loading, error } = useQuery(
    SoulByHashQuery,
    getSoulByOwnerQueryOptions(hash),
  );
  const rawSoul = data?.souls?.[0] || null;
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
