import { useQuery } from '@apollo/client';
import DaoDetail from 'components/dao/DaoDetail';
import DaoTabs from 'components/dao/DaoTabs';
import ProjectTabs from 'components/project/ProjectTabs';
// import useError from 'hooks/useError';
import { useEffect, useState } from 'react';
import { GAME_TYPE } from 'constants/contracts';
import { hexStringToJson } from 'utils/converters';
import queryGameSingle from 'queries/GameSingleQuery';

function normalizeGraphEntity(subgraphEntity: any) {
  return {
    ...subgraphEntity,
    metadata: hexStringToJson(subgraphEntity.uriData),
  };
}

/**
 * Component: Single Game View
 */
// eslint-disable-next-line prettier/prettier
export default function GameView({ id }: any): JSX.Element {
  // const { handleError } = useError();
  const [game, setGame] = useState<any | null>(null);

  const { data, loading, error } = useQuery(queryGameSingle, {
    variables: { id },
  });

  useEffect(() => {
    if (error) console.error('Game query failed', { data, error });
    else console.log('[DEV] Game query Return:', data);
    setGame(data?.game ? normalizeGraphEntity(data.game) : null);
  }, [data, error]);

  return (
    <>
      <DaoDetail item={game} />
      {game?.role == GAME_TYPE.mdao && <DaoTabs item={game} sx={{ mt: 4 }} />}
      {game?.role == GAME_TYPE.project && (
        <ProjectTabs item={game} sx={{ mt: 4 }} />
      )}
    </>
  );
}
