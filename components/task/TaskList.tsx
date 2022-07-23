import { Grid, Typography } from '@mui/material';
import TaskCard from './TaskCard';

/**
 * A component with a list of tasks.
 */
export default function TaskList({ tasks, sx }: any) {
  return (
    <Grid container spacing={2} sx={{ ...sx }}>
      {!tasks && (
        <Grid item xs={12}>
          <Typography>Tasks are loading...</Typography>
        </Grid>
      )}
      {tasks?.length === 0 && (
        <Grid item xs={12}>
          <Typography>No tasks</Typography>
        </Grid>
      )}
      {tasks?.length > 0 && (
        <>
          {tasks.map((task: any, index: number) => (
            <Grid key={index} item xs={12}>
              <TaskCard task={task} />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
