import { Box, Card, CardContent, Typography } from '@mui/material';
import EntityImage from 'components/entity/EntityImage';
import Link from 'components/utils/Link';
import TaskCardDetails from './TaskCardDetails';

/**
 * A card with task
 */
export default function TaskCard({ task }: any): JSX.Element {
  if (!task) return <></>;
  return (
    <Card variant="outlined">
      <CardContent sx={{ p: '16px !important' }}>
        <TaskHeader task={task} />
      </CardContent>
    </Card>
  );
}

/**
 *
 */
function TaskHeader({ task, sx }: any): JSX.Element {
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
          <Link href={`/soul/${task.id}`} sx={{ color: '#f8f8f8' }}>
            <Typography variant="body1">{task.name}</Typography>
          </Link>
          {task?.metadata?.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {task.metadata.description}
            </Typography>
          )}
        </Box>
      </Box>
      {/* Task stage */}
      <TaskCardDetails task={task} />
    </Box>
  );
}
