import { useQuery } from '@apollo/client';
import { normalizeGraphEntity } from 'helpers/metadata';
import SoulsByIdQuery from 'queries/SoulsByIdQuery';
import { useEffect, useState } from 'react';

/**
 * Fetch Multiple Souls by IDs
 */
export default function useSoulsById(
  ids: string[] | null,
  first?: number,
  skip?: number,
): any {
  const [souls, setSouls] = useState<Array<any> | null>(null);
  const { data, loading, error } = useQuery(SoulsByIdQuery, {
    variables: { ids, first, skip },
  });

  useEffect(() => {
    if (loading) {
      setSouls(null);
    } else if (error) {
      setSouls(null);
      console.error('Soul query failed', { data, error });
    } else {
      try {
        setSouls(data?.souls?.map((soul: any) => normalizeGraphEntity(soul)));
      } catch (error) {
        console.error(error);
      }
    }
  }, [data, error, loading]);

  return {
    souls,
    loading,
    error,
  };
}
