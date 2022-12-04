import { Grid, Typography } from '@mui/material';
import GridCard from 'components/GridCard';
import { soulCardProcessedContent } from 'utils/cardContents';

/**
 * Component: a list of souls.
 */
export default function SoulList({ souls, sx, roles }: any) {
  return (
    <Grid container spacing={2} sx={{ ...sx }}>
      {!souls && (
        <Grid item xs={12}>
          <Typography>Loading...</Typography>
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
            <Grid item key={String(index)} xs={12} lg={6}>
              <GridCard {...soulCardProcessedContent(soul, roles?.[soul.id])} />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
