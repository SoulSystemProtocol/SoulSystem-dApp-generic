import useError from 'hooks/useError';
import GameView from '../game/GameView';
import Loading from 'components/layout/Loading';
import { SelectedGameContext } from 'contexts/SelectedGame';
import { useContext } from 'react';
import { SelectedSoulContext } from 'contexts/SelectedSoul';

/**
 * Single Game Display
 */
export default function SoulGameView({ sx }: any): JSX.Element {
  const { handleError } = useError();
  const { game, loading, error } = useContext(SelectedGameContext);
  const { soul } = useContext(SelectedSoulContext);

  if (error) {
    handleError(
      { message: '404: Failed to load Game', game, soul, error },
      true,
    );
    return <></>;
  }
  if (loading) return <Loading />;
  if (!game) return <></>;
  return <GameView item={game} sx={sx} />;
}
