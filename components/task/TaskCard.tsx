import {
  Box,
  Button,
  Card,
  CardContent,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import Link from 'next/link';
import { useContext } from 'react';
import TaskApplyDialog from './TaskApplyDialog';
/**
 * A component with a card with task.
 */
export default function TaskCard({ task }: any) {
  if (task) {
    return (
      <Card variant="outlined">
        <CardContent sx={{ p: '16px !important' }}>
          <TaskHeader task={task} />
        </CardContent>
      </Card>
    );
  }
  return <></>;
}

function TaskHeader({ task, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...sx,
      }}
    >
      {/* Task data */}
      <Box>
        <Link href={`/tasks/${task.id}`} passHref>
          <MuiLink underline="none">
            <Typography>{task.name}</Typography>
          </MuiLink>
        </Link>
        {task.uriData.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {task.uriData.description}
          </Typography>
        )}
      </Box>
      {/* Task actions */}
      {accountSoul && (
        <Box>
          <Button
            onClick={() =>
              showDialog?.(
                <TaskApplyDialog task={task} onClose={closeDialog} />,
              )
            }
          >
            Apply as DAO
          </Button>
        </Box>
      )}
    </Box>
  );
}
