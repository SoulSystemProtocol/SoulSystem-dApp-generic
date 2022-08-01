/**
 * Dashboard Card List component.
 */
import { Grid, Typography } from '@mui/material';
import Loader from './Loader';
import DashboardCard from './DashboardCard';

export default function DashboardCardList({
  baseRoute,
  data,
  dataAccessor,
  sx,
}: any) {
  if (!data) return <Loader />;

  return (
    <Grid container spacing={2} sx={{ ...sx }}>
      {!data?.length && (
        <Grid item xs={12}>
          <Typography>No Results</Typography>
        </Grid>
      )}
      {!!data?.length && (
        <>
          {data.map((dataItem: any, index: number) => (
            <Grid key={index} item xs={12} md={6}>
              <DashboardCard
                baseRoute={baseRoute}
                dataItem={dataItem}
                dataAccessor={dataAccessor}
              />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
