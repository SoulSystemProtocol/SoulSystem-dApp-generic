import { Box, Grid, Typography } from '@mui/material';
import { PROC_STAGE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import { useContext } from 'react';
import TaskApplyDialog from './TaskApplyDialog';
import TaskApplication from './TaskApplication';
import ConditionalButton from 'components/layout/ConditionalButton';
import { SxProps } from '@mui/material';

/**
 * Task Applications
 */
export default function TaskApplications({
  task,
  sx,
}: {
  task: any;
  sx?: SxProps;
}): JSX.Element {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);

  console.warn('[DEV] TaskApplications() Task Item:', task);
  return (
    <Box sx={{ sm: 12 }}>
      <ConditionalButton
        sx={{ ml: 'auto' }}
        disabled={
          !accountSoul ||
          (task.stage !== null &&
            (task.stage < PROC_STAGE.open || task.stage > PROC_STAGE.closed))
        }
        size="small"
        variant="outlined"
        onClick={() =>
          showDialog?.(<TaskApplyDialog task={task} onClose={closeDialog} />)
        }
      >
        Apply
      </ConditionalButton>
      <Grid container spacing={2} sx={{ ...sx }}>
        {task.nominations.length > 0 ? (
          <>
            {task.nominations.map((nomination: any) => (
              <Grid item key={nomination.id} xs={12}>
                <TaskApplication
                  key={'n' + nomination.id}
                  task={task}
                  nomination={nomination}
                />
              </Grid>
            ))}
          </>
        ) : (
          <Grid item xs={12}>
            <Typography variant="body2">No applications</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
