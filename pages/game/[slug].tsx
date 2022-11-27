import { useQuery } from '@apollo/client';
import Layout from 'components/layout/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPageTitle } from 'utils';
import queryGameSingle from 'queries/GameByHashQuery';
import GameView from 'components/entity/game/GameView';
import { normalizeGraphEntity } from 'helpers/metadata';
import Loading from 'components/layout/Loading';
import Error from 'components/layout/Error';

/**
 * Single Game Page
 */
export default function GameDetailPage(): JSX.Element {
  const router = useRouter();
  const { slug } = router.query;
  // const { handleError } = useError();
  const [game, setGame] = useState<any | null>(null);
  const { data, loading, error } = useQuery(queryGameSingle, {
    variables: { id: slug },
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
  }, [data, error]);

  return (
    <Layout title={getPageTitle(!!game ? game.name : '')}>
      {!!loading ? (
        <Loading />
      ) : !!error ? (
        <Error error={error} />
      ) : (
        <GameView item={game} sx={{ mt: 4 }} />
      )}
    </Layout>
  );
}
