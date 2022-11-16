import { useQuery } from '@apollo/client';
import { normalizeGraphEntity } from 'helpers/metadata';
import { useState, useEffect, useContext } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import SoulByIdQuery from 'queries/SoulByIdQuery';

/**
 * Fetch Single Soul by Id
 */
export default function useSoulById(id: string): any {
  const [soul, setSoul] = useState<any | null>(null);
  const [isOwned, setIsOwned] = useState<boolean>(false);
  const { account } = useContext(Web3Context);
  const { data, loading, error } = useQuery(SoulByIdQuery, {
    variables: { id },
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
      // console.log('[DEV] Soul query Return:', data);
      setSoul(data?.souls ? normalizeGraphEntity(data.souls[0]) : null);
      setIsOwned(
        !!account &&
          data?.souls?.[0]?.owner?.toLowerCase() == account.toLowerCase(),
      );
    }
  }, [data, error, loading, account]);

  return {
    soul,
    loading,
    error,
    isOwned,
  };
}
