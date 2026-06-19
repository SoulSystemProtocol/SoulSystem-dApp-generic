import { useQuery } from '@apollo/client';
import { normalizeGraphEntity } from 'helpers/metadata';
import SoulsByIdQuery from 'queries/SoulsByIdQuery';
import { useEffect, useState } from 'react';
import { hydrateSoulsMetadata } from 'services/indexer/metadataHydration';

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
    ssr: false,
    variables: { ids, first, skip },
  });

  useEffect(() => {
    let isCurrent = true;

    async function setHydratedSouls() {
      const hydratedSouls = data?.souls
        ? await hydrateSoulsMetadata(data.souls)
        : [];
      if (isCurrent) {
        setSouls(hydratedSouls.map((soul: any) => normalizeGraphEntity(soul)));
      }
    }

    if (loading) {
      setSouls(null);
    } else if (error) {
      setSouls(null);
      console.error('Soul query failed', { data, error });
    } else {
      try {
        setHydratedSouls();
      } catch (error) {
        console.error(error);
      }
    }

    return () => {
      isCurrent = false;
    };
  }, [data, error, loading]);

  return {
    souls,
    loading,
    error,
  };
}
