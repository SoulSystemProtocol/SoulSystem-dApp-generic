import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { taskStageToString } from 'utils/converters';
import EntityImage from '../entity/EntityImage';

/**
 * A component with project details.
 */
export default function TaskDetail({ item, sx }: any) {
  if (item) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          ...sx,
        }}
      >
        <Box>
          <EntityImage item={item.game} />
        </Box>
        <Box sx={{ mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          <Typography color="text.secondary" variant="body2">
            {taskStageToString(item.stage)}
          </Typography>
          <Typography variant="h4" sx={{ mt: 2.5 }}>
            {item.name}
          </Typography>
          <Typography sx={{ mt: 1 }}>{item.uriData?.description}</Typography>
        </Box>
      </Box>
    );
  }

  return <></>;
}
