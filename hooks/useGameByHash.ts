import { useQuery } from '@apollo/client';
import { normalizeGraphEntity } from 'helpers/metadata';
import { useState, useEffect, useContext } from 'react';
import queryGameSingle from 'queries/GameByHashQuery';

/**
 * Fetch Single Game by Hash
 */
export default function useGameByHash(hash: string): any {
  const [game, setGame] = useState<any | null>(null);
  const { data, loading, error } = useQuery(queryGameSingle, {
    variables: { id: hash },
  });

  useEffect(() => {
    if (loading) {
      setGame(null);
    } else if (error) {
      setGame(null);
      console.error('Game query failed', { data, error });
    } else {
      setGame(data?.game ? normalizeGraphEntity(data.game) : null);
    }
  }, [data, error, loading]);

  return { game };
}
