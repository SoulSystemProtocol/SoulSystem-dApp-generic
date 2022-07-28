import { Grid, Typography } from '@mui/material';
import DaoCard from './DaoCard';

/**
 * A component with a list of daos.
 */
export default function DaoList({ daos: items, sx }: any) {
  return (
    <Grid container spacing={2} sx={{ ...sx }}>
      {!items && (
        <Grid item xs={12}>
          <Typography>Loading...</Typography>
        </Grid>
      )}
      {items?.length === 0 && (
        <Grid item xs={12}>
          <Typography>No Results</Typography>
        </Grid>
      )}
      {items?.length > 0 && (
        <>
          {items.map((dao: any, index: number) => (
            <Grid key={index} item xs={12} md={6}>
              <DaoCard dao={dao} />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
