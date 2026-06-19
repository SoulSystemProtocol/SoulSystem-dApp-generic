import { useQuery } from '@apollo/client';
import SoulByHashQuery from 'queries/SoulByHashQuery';
import { normalizeGraphEntity } from 'helpers/metadata';
import { useState, useEffect, useContext } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import { scheduleSoulMetadataHydration } from 'services/indexer/metadataHydration';

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
  error: any;
  isOwned: boolean;
} {
  const [soul, setSoul] = useState<any | null>(null);
  const [isOwned, setIsOwned] = useState<boolean>(false);
  const { account } = useContext(Web3Context);
  const { data, loading, error } = useQuery(
    SoulByHashQuery,
    getSoulByOwnerQueryOptions(hash),
  );

  useEffect(() => {
    let isCurrent = true;

    function setHydratedSoul() {
      const rawSoul = data?.souls?.[0] || null;
      if (isCurrent) setSoul(rawSoul ? normalizeGraphEntity(rawSoul) : null);

      scheduleSoulMetadataHydration(rawSoul, (hydratedSoul) => {
        if (isCurrent) setSoul(normalizeGraphEntity(hydratedSoul));
      });
    }

    if (loading) {
      setSoul(null);
      setIsOwned(false);
    } else if (error) {
      setSoul(null);
      setIsOwned(false);
      console.error('Soul query failed', { data, error });
    } else {
      try {
        // console.log('[DEV] Soul query Return:', { hash, data });
        setHydratedSoul();
        setIsOwned(
          !!account &&
            data?.souls?.[0]?.owner?.toLowerCase() == account.toLowerCase(),
        );
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      isCurrent = false;
    };
  }, [data, error, loading, account]);

  return {
    soul,
    loading,
    error,
    isOwned,
  };
}
