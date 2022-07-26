// import { WorkOutlineOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import GameAdminActions from '../game/GameAdminActions';
import EntityImage from '../entity/EntityImage';
import AddressHash from 'components/web3/AddressHash';

/**
 * A component with project details.
 */
export default function ProjectDetail({ project, sx }: any) {
  if (project) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          ...sx,
        }}
      >
        <Box>
          <EntityImage item={project} />
          <GameAdminActions game={project} sx={{ mt: 2, width: 164 }} />
        </Box>
        <Box sx={{ mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          <Typography variant="h4">{project.name}</Typography>
          <Typography variant="body2">
            <AddressHash address={project.id} />
          </Typography>
          <Typography sx={{ mt: 1 }}>{project.uriData?.description}</Typography>
        </Box>
      </Box>
    );
  }
  return <></>;
}
