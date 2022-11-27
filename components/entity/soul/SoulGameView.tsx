import useError from 'hooks/useError';
import GameView from '../game/GameView';
import useGameByHash from 'hooks/useGameByHash';
import Loading from 'components/layout/Loading';
// import useError from 'hooks/useError';

/**
 * Single Game Display
 */
export default function SoulGameView({ soul, sx }: any): JSX.Element {
  const { handleError } = useError();
  const { game, error, loading } = useGameByHash(soul?.owner);

  if (error) {
    handleError({ message: 'Failed to load Game', game, soul, error }, false);
    return <></>;
  }
  if (loading) return <Loading />;
  if (!game) return <></>;
  return <GameView item={game} sx={sx} />;
}
