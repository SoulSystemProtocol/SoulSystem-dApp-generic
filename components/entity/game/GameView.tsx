import { GAME_TYPE } from 'constants/contracts';
import GameDetail from 'components/dao/GameDetail';
import DaoTabs from 'components/dao/DaoTabs';
import ProjectTabs from 'components/project/ProjectTabs';
import { SelectedGameContext } from 'contexts/SelectedGame';
import { useContext } from 'react';
import Loading from 'components/layout/Loading';
import useError from 'hooks/useError';
import { Box } from '@mui/material';

/**
 * Single Game View
 */
export default function GameView({ sx }: { sx: any }): JSX.Element {
  const { handleError } = useError();
  const { game, loading, error } = useContext(SelectedGameContext);
  if (error) {
    handleError({ message: '404: Failed to load Game', game, error }, true);
    return <>Failed to Load Entity</>;
  }
  if (loading) return <Loading />;
  if (!game) return <>Failed to Load Entity</>;
  return (
    <Box sx={sx}>
      <GameDetail item={game} sx={{ mb: 5 }} />
      {game?.role == GAME_TYPE.mdao && <DaoTabs item={game} />}
      {game?.role == GAME_TYPE.project && <ProjectTabs item={game} />}
    </Box>
  );
}
