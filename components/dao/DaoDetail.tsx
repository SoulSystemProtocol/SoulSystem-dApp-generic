// import { Save, SchoolOutlined } from '@mui/icons-material';
// import { LoadingButton } from '@mui/lab';
import { Stack, Typography, Link as MuiLink } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import GameAdminActions from 'components/game/GameAdminActions';
import EntityImage from '../entity/EntityImage';
import AddressHash from 'components/web3/AddressHash';
import AccountBalance from 'components/web3/AccountBalance';
import FundDialogButton from 'components/web3/FundDialogButton';
import GameMembershipActions from 'components/game/GameMembershipActions';
import { GAME_TYPE } from 'constants/contracts';

/**
 * Component: DAO details.
 */
export default function DaoDetail({ item, sx }: any) {
  if (item) {
    console.log('DAO Item:', item);
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
          <GameAdminActions game={item} sx={{ mt: 2, width: 164 }} />
        </Box>
        <Box sx={{ flexGrow: 1, mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          <AddressHash address={item.id} sx={{ float: 'right' }} />
          <Typography variant="h1">
            {item.name} ({item.role})
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Balance: <AccountBalance address={item.id} />{' '}
            {process.env.NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL}
          </Typography>
          <Typography sx={{ mt: 1 }}>{item.uriData?.description}</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {item.role == GAME_TYPE.mdao && (
              <GameMembershipActions dao={item} />
            )}
            <FundDialogButton address={item.id} />
            <Link href={`/game/${item.id}/rules/manage`} passHref>
              <MuiLink underline="none">Rules</MuiLink>
            </Link>
          </Stack>
        </Box>
      </Box>
    );
  }
  return <></>;
}
