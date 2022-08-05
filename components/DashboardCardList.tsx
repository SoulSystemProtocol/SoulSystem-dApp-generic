import { Grid, Typography } from '@mui/material';
import Loader from './Loader';
import DashboardCard from './DashboardCard';

/**
 * Dashboard Card List component.
 */
export default function DashboardCardList({
  baseRoute,
  data,
  dataAccessor,
  sx,
  loading = false,
}: any) {
  if (!data || loading) return <Loader />;

  return (
    <Grid container spacing={2} sx={{ ...sx }}>
      {!data?.length ? (
        <Grid item xs={12}>
          <Typography>No Results</Typography>
        </Grid>
      ) : (
        <>
          {data.map((dataItem: any, index: number) => {
            //Process Data
            const data = dataAccessor(dataItem);
            console.log('Processed Item:', { data, dataItem });
            return (
              <Grid key={index} item xs={12} md={6}>
                <DashboardCard baseRoute={baseRoute} data={data} />
              </Grid>
            );
          })}
        </>
      )}
    </Grid>
  );
}
