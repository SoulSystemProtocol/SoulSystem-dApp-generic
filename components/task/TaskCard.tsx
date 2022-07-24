import {
  Box,
  Card,
  CardContent,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import Link from 'next/link';
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
            <Typography variant="h6">{task.name}</Typography>
          </MuiLink>
        </Link>
        {task.uriData.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {task.uriData.description}
          </Typography>
        )}
      </Box>
      {/* Task stage */}
      <Box>
        <Typography variant="body2" color="text.secondary">
          {taskStageToString(task)}
        </Typography>
      </Box>
    </Box>
  );
}
