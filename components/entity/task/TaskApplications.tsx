import { Box, Grid, Stack, Typography } from '@mui/material';
import { PROC_STAGE_REV } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import { useContext, useEffect, useState } from 'react';
import TaskApplyDialog from './TaskApplyDialog';
import TaskApplication from './TaskApplication';
import { SxProps } from '@mui/material';
import TooltipButton from '../../layout/TooltipButton';
import { nameEntity } from 'helpers/utils';

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
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    setIsDisabled(
      !accountSoul ||
        (task.stage !== null &&
          (task.stage < PROC_STAGE_REV.open ||
            task.stage >= PROC_STAGE_REV.closed)),
    );
  }, [task, accountSoul]);

  console.warn('[DEV] TaskApplications() Task Item:', task);
  return (
    <Box sx={{ sm: 12 }}>
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Applications
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Apply to work on this {nameEntity('task')}
          </Typography>
        </Box>
        <TooltipButton
          sx={{ ml: 'auto' }}
          disabled={isDisabled}
          size="small"
          tooltip={
            task.stage < PROC_STAGE_REV.open
              ? nameEntity('task') + 'not yet open'
              : task.stage >= PROC_STAGE_REV.closed
              ? nameEntity('task') + ' closed'
              : !accountSoul
              ? 'First, connect your wallet and mint your identity'
              : null
          }
          variant="contained"
          onClick={() =>
            showDialog?.(<TaskApplyDialog task={task} onClose={closeDialog} />)
          }
        >
          Submit Application
        </TooltipButton>
      </Stack>
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
