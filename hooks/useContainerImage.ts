import { useQuery } from '@apollo/client';
import SoulContainerQuery from 'queries/SoulContainerQuery';
import { useEffect, useState } from 'react';

/**
 *
 */
export default function useContainerImage(id: string) {
  const { data, loading, error } = useQuery(SoulContainerQuery, {
    variables: { id },
  });
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    setImageSrc(data?.soulAssocs[0]?.bEnd?.uriImage);
  }, [data, error, id]);

  return imageSrc;
}
