import { GAME_TYPE } from 'constants/contracts';
import GameDetail from 'components/dao/GameDetail';
import DaoTabs from 'components/dao/DaoTabs';
import ProjectTabs from 'components/project/ProjectTabs';
import useSoulByHash from 'hooks/useSoulByOwner';
import Loading from 'components/layout/Loading';
// import useError from 'hooks/useError';

/**
 * Single Game View
 */
export default function GameView({
  item: game,
  sx,
}: {
  item: any;
  sx: any;
}): JSX.Element {
  const { soul, loading, error } = useSoulByHash(game?.id);

  if (loading) return <Loading />;
  return (
    <>
      <GameDetail item={game} soul={soul} />
      {game?.role == GAME_TYPE.mdao && <DaoTabs item={game} sx={sx} />}
      {game?.role == GAME_TYPE.project && <ProjectTabs item={game} sx={sx} />}
    </>
  );
}
