import { GAME_TYPE } from 'constants/contracts';
import GameDetail from 'components/dao/GameDetail';
import DaoTabs from 'components/dao/DaoTabs';
import ProjectTabs from 'components/project/ProjectTabs';
import useSoulByHash from 'hooks/useSoulByHash';
// import useError from 'hooks/useError';

/**
 * Single Game View
 */
export default function GameView({ item: game }: any): JSX.Element {
  const { soul, loading, error } = useSoulByHash(game?.id);

  // useEffect(() => { console.log('[DEV] Soul of a Game:', { soul, game }); }, [soul]);

  return (
    <>
      <GameDetail item={game} soul={soul} />
      {game?.role == GAME_TYPE.mdao && <DaoTabs item={game} sx={{ mt: 4 }} />}
      {game?.role == GAME_TYPE.project && (
        <ProjectTabs item={game} sx={{ mt: 4 }} />
      )}
    </>
  );
}
