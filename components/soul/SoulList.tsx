import { Grid, Typography } from '@mui/material';
import SoulCard from './SoulCard';

/**
 * A component with a list of souls.
 */
export default function SoulList({ souls, sx }: any) {
  return (
    <Grid container spacing={2} sx={{ ...sx }}>
      {!souls && (
        <Grid item xs={12}>
          <Typography>Souls are loading...</Typography>
        </Grid>
      )}
      {souls?.length === 0 && (
        <Grid item xs={12}>
          <Typography>No souls</Typography>
        </Grid>
      )}
      {souls?.length > 0 && (
        <>
          {souls.map((soul: any, index: number) => (
            <Grid key={index} item xs={12}>
              <SoulCard soul={soul} />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
