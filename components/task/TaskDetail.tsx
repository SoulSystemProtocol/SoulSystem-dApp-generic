import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import EntityImage from '../entity/EntityImage';

/**
 * A component with project details.
 */
export default function TaskDetail({ item, sx }: any) {
  if (item) {
    console.log('Page For Task: ', item);
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          ...sx,
        }}
      >
        <Box>
          <EntityImage item={item} />
          {/* <TaskAdminActions game={item} sx={{ mt: 2, width: 164 }} /> */}
        </Box>
        <Box sx={{ mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          <Typography variant="h4">{item.name}</Typography>
          <Typography sx={{ mt: 1 }}>{item.uriData?.description}</Typography>
        </Box>
      </Box>
    );
  }

  return <></>;
}
