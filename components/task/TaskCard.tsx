import { Card, CardContent, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

/**
 * A component with a card with task.
 */
export default function TaskCard({ task }: any) {
  if (task) {
    return (
      <Card variant="outlined">
        <CardContent sx={{ p: '16px !important' }}>
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
        </CardContent>
      </Card>
    );
  }

  return <></>;
}
