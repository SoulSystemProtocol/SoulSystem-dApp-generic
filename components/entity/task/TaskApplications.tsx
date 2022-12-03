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
import { useContext } from 'react';
import TaskApplyDialog from './TaskApplyDialog';
import TaskApplication from './TaskApplication';
import ConditionalButton from 'components/layout/ConditionalButton';
import { Stack } from '@mui/system';

export default function TaskApplications({ task, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);

  console.warn('[DEV] Task Item', task);
  return (
    <Box sx={{ ...sx }}>
      <Divider sx={{ mb: 1 }} />
      <Stack direction="row">
        <Typography variant="h5">Applications:</Typography>
        <ConditionalButton
          sx={{ ml: 'auto' }}
          disabled={
            !accountSoul ||
            (task.stage !== null &&
              (task.stage < CLAIM_STAGE.open ||
                task.stage > CLAIM_STAGE.closed))
          }
          size="small"
          variant="outlined"
          onClick={() =>
            showDialog?.(<TaskApplyDialog task={task} onClose={closeDialog} />)
          }
        >
          Apply
        </ConditionalButton>
      </Stack>
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
    </Box>
  );
}
