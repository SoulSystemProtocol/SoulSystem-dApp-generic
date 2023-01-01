import { useQuery } from '@apollo/client';
import SoulContainerQuery from 'queries/SoulContainerQuery';
import { useEffect, useState } from 'react';

/**
 * Related Soul
 */
export default function useContainerEntity(id: string): {
  containerImageSrc: string;
  containerName: string;
  soul: any;
  loading: boolean;
  error: any;
} {
  const { data, loading, error } = useQuery(SoulContainerQuery, {
    variables: { id },
  });
  const [imageSrc, setImageSrc] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setImageSrc(data?.soulAssocs[0]?.bEnd?.uriImage);
    setName(data?.soulAssocs[0]?.bEnd?.name);
  }, [data, error, id]);

  return {
    containerImageSrc: imageSrc,
    containerName: name,
    soul: data?.soulAssocs[0]?.bEnd,
    loading,
    error,
  };
}
