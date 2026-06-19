import { useQuery } from '@apollo/client';
import { normalizeGraphEntity } from 'helpers/metadata';
import { useState, useEffect, useContext } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import SoulByIdQuery from 'queries/SoulByIdQuery';
import { scheduleSoulMetadataHydration } from 'services/indexer/metadataHydration';

/**
 * Fetch Single Soul by Id
 */
export default function useSoulById(id: string): any {
  const [soul, setSoul] = useState<any | null>(null);
  const [isOwned, setIsOwned] = useState<boolean>(false);
  const { account } = useContext(Web3Context);
  const { data, loading, error } = useQuery(SoulByIdQuery, {
    ssr: false,
    variables: { id },
  });

  useEffect(() => {
    let isCurrent = true;

    function setHydratedSoul() {
      const rawSoul = data?.soul || null;
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
      setHydratedSoul();
      setIsOwned(
        !!account && data?.soul?.owner?.toLowerCase() == account.toLowerCase(),
      );
    }

    return () => {
      isCurrent = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading, account]);

  return {
    soul,
    loading,
    error,
    isOwned,
  };
}
