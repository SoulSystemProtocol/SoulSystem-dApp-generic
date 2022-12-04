import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { getSoulsByRole } from 'hooks/utils';
import { SelectedGameContext } from 'contexts/SelectedGame';
import GameApplicationGridCard from './GameApplicationGridCard';

/**
 * List of game applications
 */
export default function GameApplications({ sx }: any): JSX.Element {
  const { game } = useContext(SelectedGameContext);
  if (!game) return <></>;

  //All Current Members
  const members = getSoulsByRole(game, 'member');
  //Applications that aren't members
  let applications = game?.nominations?.filter((nomination: any) => {
    return !members.includes(nomination?.nominated?.id?.toString());
  });

  return (
    <Grid container spacing={2} sx={{ ...sx }}>
      {!game.nominations && (
        <Grid item xs={12}>
          <Typography>Loading...</Typography>
        </Grid>
      )}
      {applications?.length === 0 ? (
        <Grid item xs={12}>
          <Typography>No Pending Applications</Typography>
        </Grid>
      ) : (
        <Grid item xs={12}>
          {applications.map((nomination: any, index: number) => (
            <GameApplicationGridCard
              key={index}
              game={game}
              nomination={nomination}
            />
          ))}
        </Grid>
      )}
    </Grid>
  );
}
