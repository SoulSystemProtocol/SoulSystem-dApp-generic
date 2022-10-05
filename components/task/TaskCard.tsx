import {
  Box,
  Card,
  CardContent,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import EntityImage from 'components/entity/EntityImage';
import useError from 'hooks/useError';
import useTask from 'hooks/useTask';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { taskStageToString } from 'utils/converters';

/**
 * Component: a card with task.
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
      <Box sx={{ display: 'flex' }}>
        <EntityImage
          title={task.game.name}
          item={task.game}
          sx={{ width: '48px', height: '48px', mr: 2.5 }}
        />
        {/* Task name and description */}
        <Box>
          <Link href={`/tasks/${task.id}`} passHref>
            <MuiLink underline="none" sx={{ color: '#f8f8f8' }}>
              <Typography variant="body1">{task.name}</Typography>
            </MuiLink>
          </Link>
          {task.uriData.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {task.uriData.description}
            </Typography>
          )}
        </Box>
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
          {fund} {process.env.NEXT_PUBLIC_NETWORK_CURRENCY_NAME}
        </Typography>
      </Box>
    </Box>
  );
}
