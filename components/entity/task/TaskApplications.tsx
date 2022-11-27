import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { CLAIM_STAGE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import { useContext, useEffect, useState } from 'react';
import TaskApplyDialog from './TaskApplyDialog';
import { nameEntity } from 'hooks/utils';
import TaskApplication from './TaskApplication';

export default function TaskApplications({ task, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);

  return (
    <Box sx={{ ...sx }}>
      <Divider sx={{ mb: 1 }} />
      <Typography variant="h5">Applicants:</Typography>
      <List>
        {task.nominations.length > 0 ? (
          <>
            {task.nominations.map((nomination: any, index: number) => (
              <TaskApplication
                key={index}
                task={task}
                nomination={nomination}
              />
            ))}
          </>
        ) : (
          <ListItem>
            <Typography variant="body2">No applications</Typography>
          </ListItem>
        )}
      </List>
      {/* Button to apply as DAO */}
      {/* {accountSoul &&
        (task.stage === null ||
          (task.stage >= CLAIM_STAGE.open &&
            task.stage < CLAIM_STAGE.closed)) && ( */}
      <Button
        disabled={
          !accountSoul ||
          (task.stage !== null &&
            (task.stage < CLAIM_STAGE.open || task.stage > CLAIM_STAGE.closed))
        }
        size="small"
        variant="outlined"
        onClick={() =>
          showDialog?.(<TaskApplyDialog task={task} onClose={closeDialog} />)
        }
      >
        Apply as a {nameEntity('mdao')}
      </Button>
      {/* )} */}
    </Box>
  );
}
