import { GAME_TYPE } from 'constants/contracts';
import GameDetail from 'components/entity/game/GameDetail';
import GameTabs from 'components/entity/game/GameTabs';
import ProjectTabs from 'components/entity/game/ProjectTabs';
import { SelectedGameContext } from 'contexts/SelectedGame';
import { useContext } from 'react';
import Loading from 'components/layout/Loading';
import useError from 'hooks/useError';
import { Box, SxProps, Typography } from '@mui/material';
import EntityPosts from '../post/EntityPosts';

/**
 * Single Game View
 */
export default function GameView({ sx }: { sx?: SxProps }): JSX.Element {
  const { handleError } = useError();
  const { game, loading, error } = useContext(SelectedGameContext);
  if (error) {
    handleError(
      { message: '404: Failed to load Game Entity', game, error },
      true,
    );
    return <>Failed to Load Entity</>;
  }
  if (loading) return <Loading />;
  return (
    <Box sx={sx}>
      <GameDetail />
      <Box>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Announcements
        </Typography>
        <EntityPosts
          item={game}
          types={['post', 'comment']}
          sx={{ mb: 5, mt: 1 }}
        />
      </Box>
      {game?.role == GAME_TYPE.mdao && <GameTabs item={game} />}
      {game?.role == GAME_TYPE.project && <ProjectTabs item={game} />}
    </Box>
  );
}
