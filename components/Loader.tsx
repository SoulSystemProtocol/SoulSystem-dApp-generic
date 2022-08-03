/**
 * Component for displaying loading state.
 */
import { Grid, Typography } from '@mui/material';

export default function Loader({ data, sx }: any) {
  return (
    <Grid item xs={12}>
      <Typography>Loading...</Typography>
    </Grid>
  );
}
