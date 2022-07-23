import { Card, CardContent, Typography } from '@mui/material';

/**
 * A component with a card with task.
 */
export default function TaskCard({ task }: any) {
  if (task) {
    return (
      <Card variant="outlined">
        <CardContent sx={{ p: '16px !important' }}>
          <Typography>{task.name}</Typography>
          {task.uriData.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {task.uriData.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  }

  return <></>;
}
