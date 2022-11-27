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
      // console.log('[DEV] Soul query Return:', { id, data });
      setSoul(data?.soul ? normalizeGraphEntity(data.soul) : null);
      setIsOwned(
        !!account && data?.soul?.owner?.toLowerCase() == account.toLowerCase(),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading, account]);

  return {
    soul,
    loading,
    error,
    isOwned,
  };
}
