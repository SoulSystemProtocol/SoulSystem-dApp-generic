import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import ProcByHashQuery from 'queries/ProcByHashQuery';

/**
 * Fetch Single Game by Hash
 */
export default function useProcByAddr(address: string): any {
  const [item, setItem] = useState<any | null>(null);
  const { data, loading, error } = useQuery(ProcByHashQuery, {
    variables: { id: address },
  });

  useEffect(() => {
    if (loading) {
      setItem(null);
    } else if (error) {
      setItem(null);
      console.error('Task query failed', { data, error });
    } else {
      setItem(data?.claim ? data.claim : null);
    }
  }, [data, error, loading]);

  return { proc: item, error, loading };
}
