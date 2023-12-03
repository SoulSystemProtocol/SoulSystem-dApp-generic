import { useQuery } from '@apollo/client';
import SoulByHashQuery from 'queries/SoulByHashQuery';
import { normalizeGraphEntity } from 'helpers/metadata';
import { useState, useEffect, useContext } from 'react';
import { Web3Context } from 'contexts/Web3Context';

/**
 * Fetch Single Soul by Hash
 */
export default function useSoulByOwner(hash: string): {
  soul: any;
  loading: boolean;
  error: any;
  isOwned: boolean;
} {
  const [soul, setSoul] = useState<any | null>(null);
  const [isOwned, setIsOwned] = useState<boolean>(false);
  const { account } = useContext(Web3Context);
  const { data, loading, error } = useQuery(SoulByHashQuery, {
    variables: { hash },
  });

  useEffect(() => {
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
        setSoul(data?.souls ? normalizeGraphEntity(data.souls[0]) : null);
        setIsOwned(
          !!account &&
          data?.souls?.[0]?.owner?.toLowerCase() == account.toLowerCase(),
        );
      } catch (e) {
        console.error(e);
      }
    }
  }, [data, error, loading, account]);

  return {
    soul,
    loading,
    error,
    isOwned,
  };
}
