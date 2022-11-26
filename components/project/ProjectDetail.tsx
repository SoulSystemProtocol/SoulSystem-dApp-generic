import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import GameAdminActions from '../entity/game/GameAdminActions';
import EntityImage from '../entity/EntityImage';
import AddressHash from 'components/web3/AddressHash';
import AccountBalance from 'components/web3/AccountBalance';
import FundDialogButton from 'components/web3/FundDialogButton';

/** DEPRECATE
 * Component: project details.
 */
export default function ProjectDetail({ item: project, sx }: any) {
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
        <Box sx={{ flexGrow: 1, mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          <AddressHash address={project.id} sx={{ float: 'right' }} />
          <Typography variant="h4">{project.name}</Typography>
          <Typography color="text.secondary" variant="body2">
            Balance: <AccountBalance address={project.id} />{' '}
            {process.env.NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            {project?.metadata?.description}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <FundDialogButton address={project.id} />
          </Stack>
        </Box>
      </Box>
    );
  }
  return <></>;
}
