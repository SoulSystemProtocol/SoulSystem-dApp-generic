import {
  Box,
  Button,
  Card,
  CardContent,
  Link as MuiLink,
  Typography,
} from '@mui/material';
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
          <TaskApplications task={task} sx={{ mt: 2 }} />
        </CardContent>
      </Card>
    );
  }
  return <></>;
}

function TaskHeader({ task, sx }: any) {
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
      <Box>
        <Button
          onClick={() =>
            showDialog?.(<TaskApplyDialog task={task} onClose={closeDialog} />)
          }
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
}

function TaskApplications({ task, sx }: any) {
  if (task.nominations.length > 0) {
    return (
      <Card variant="outlined" sx={{ ...sx }}>
        <CardContent sx={{ p: '16px !important' }}>
          <Typography variant="body2" gutterBottom>
            Applications:
          </Typography>
          {task.nominations.map((nomination: any, index: number) => (
            <Link
              key={index}
              href={`/daos/${nomination.nominated.id}`}
              passHref
            >
              <MuiLink underline="none">
                <Typography variant="body2" gutterBottom>
                  {nomination.nominated.name}
                </Typography>
              </MuiLink>
            </Link>
          ))}
        </CardContent>
      </Card>
    );
  }
  return <></>;
}
