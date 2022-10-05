import { gql, useQuery } from '@apollo/client';
import DaoDetail from 'components/dao/DaoDetail';
import DaoTabs from 'components/dao/DaoTabs';
import ProjectTabs from 'components/project/ProjectTabs';
import Layout from 'components/layout/Layout';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPageTitle } from 'utils';
import { GAME_TYPE } from 'constants/contracts';
import { hexStringToJson } from 'utils/converters';

function normalizeGraphGameEntity(subgraphGame: any) {
  return {
    ...subgraphGame,
    uriData: hexStringToJson(subgraphGame.uriData),
  };
}

/**
 * Component: Single Game Page
 */
// eslint-disable-next-line prettier/prettier
export default function GameDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { handleError } = useError();
  const { getDaoById } = useDao();
  const [game, setGame] = useState<any | null>(null);
  const query = gql`
    query GetGameSingle($id: ID!) {
      game(id: $id) {
        id
        name
        type
        role
        uri
        uriData
        roles {
          id
          roleId
          name
          souls
          soulsCount
        }
        nominations {
          id
          createdDate
          nominator {
            id
          }
          nominated {
            id
          }
        }
        posts {
          id
          createdDate
          entityRole
          author {
            id
            owner
          }
          uri
          metadata
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(query, {
    variables: { id: slug },
  });

  useEffect(() => {
    if (error) console.error('Game query failed', { data, error });
    else console.log('[DEV] Game query ', data.game);

    setGame(data?.game ? normalizeGraphGameEntity(data.game) : null);
  }, [data, error]);

  return (
    <Layout title={getPageTitle(!!game ? game.name : '')}>
      <DaoDetail item={game} />
      {game?.role == GAME_TYPE.mdao && <DaoTabs item={game} sx={{ mt: 4 }} />}
      {game?.role == GAME_TYPE.project && (
        <ProjectTabs item={game} sx={{ mt: 4 }} />
      )}
    </Layout>
  );
}
