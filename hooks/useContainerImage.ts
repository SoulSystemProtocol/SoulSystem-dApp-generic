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
    console.warn('useContainerImage() ', {
      id,
      data,
      img: data?.soulAssocs[0]?.bEnd?.uriImage,
    });
    setImageSrc(data?.soulAssocs[0]?.bEnd?.uriImage);
  }, [data, error, id]);

  return imageSrc;
}
