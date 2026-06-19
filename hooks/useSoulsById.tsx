import { useQuery } from '@apollo/client';
import { normalizeGraphEntity } from 'helpers/metadata';
import SoulsByIdQuery from 'queries/SoulsByIdQuery';
import { useEffect, useMemo } from 'react';
import { useHydratedSoulsMetadata } from './useSoulMetadata';

/**
 * Fetch Multiple Souls by IDs
 */
export default function useSoulsById(
  ids: string[] | null,
  first?: number,
  skip?: number,
): any {
  const { data, loading, error } = useQuery(SoulsByIdQuery, {
    ssr: false,
    variables: { ids, first, skip },
  });
  const hydratedSouls = useHydratedSoulsMetadata(data?.souls || []);
  const souls = useMemo(
    () =>
      loading || error
        ? null
        : hydratedSouls.map((soul: any) => normalizeGraphEntity(soul)),
    [error, hydratedSouls, loading],
  );

  useEffect(() => {
    if (error) console.error('Soul query failed', { data, error });
  }, [data, error]);

  return {
    souls,
    loading,
    error,
  };
}
