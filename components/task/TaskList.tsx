import { Grid, Typography } from '@mui/material';
import TaskCard from './TaskCard';

/**
 * Component: a list of tasks.
 */
export default function TaskList({ tasks: items, sx }: any) {
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
          {items.map((task: any, index: number) => (
            <Grid key={index} item xs={12}>
              <TaskCard task={task} />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
