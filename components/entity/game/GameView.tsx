import { GAME_TYPE } from 'constants/contracts';
import GameDetail from 'components/entity/game/GameDetail';
import DaoTabs from 'components/entity/game/DaoTabs';
import ProjectTabs from 'components/entity/game/ProjectTabs';
import { SelectedGameContext } from 'contexts/SelectedGame';
import { useContext } from 'react';
import Loading from 'components/layout/Loading';
import useError from 'hooks/useError';
import { Box, SxProps } from '@mui/material';

/**
 * Single Game View
 */
export default function GameView({ sx }: { sx?: SxProps }): JSX.Element {
  const { handleError } = useError();
  const { game, loading, error } = useContext(SelectedGameContext);
  if (error) {
    handleError({ message: '404: Failed to load Game', game, error }, true);
    return <>Failed to Load Entity</>;
  }
  if (loading) return <Loading />;
  // if (!game) return <>Failed to Load Entity</>;
  return (
    <Box sx={sx}>
      <GameDetail />
      {game?.role == GAME_TYPE.mdao && <DaoTabs item={game} />}
      {game?.role == GAME_TYPE.project && <ProjectTabs item={game} />}
    </Box>
  );
}
