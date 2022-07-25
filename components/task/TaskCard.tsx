import {
  Box,
  Card,
  CardContent,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import useError from 'hooks/useError';
import useTask from 'hooks/useTask';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { taskStageToString } from 'utils/converters';

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
  const { getFund } = useTask();
  const { handleError } = useError();
  const [fund, setFund] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      getFund(task.id)
        .then((fund) => setFund(fund))
        .catch((error) => handleError(error, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

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
      {/* Task name and description */}
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
      {/* Task stage */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textTransform: 'capitalize' }}
        >
          {taskStageToString(task)}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textTransform: 'capitalize' }}
        >
          {fund} ETH
        </Typography>
      </Box>
    </Box>
  );
}
