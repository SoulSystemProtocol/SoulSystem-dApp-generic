import { Grid, Typography } from '@mui/material';
import DaoCard from './DaoCard';

/**
 * A component with a list of daos.
 */
export default function DaoList({ daos, sx }: any) {
  return (
    <Grid container spacing={2} sx={{ ...sx }}>
      {!daos && (
        <Grid item xs={12}>
          <Typography>DAOs are loading...</Typography>
        </Grid>
      )}
      {daos?.length === 0 && (
        <Grid item xs={12}>
          <Typography>No DAOs</Typography>
        </Grid>
      )}
      {daos?.length > 0 && (
        <>
          {daos.map((dao: any, index: number) => (
            <Grid key={index} item xs={12}>
              <DaoCard dao={dao} />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
