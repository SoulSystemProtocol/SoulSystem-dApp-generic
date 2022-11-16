import { Stack, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import GameAdminActions from 'components/game/GameAdminActions';
import EntityImage from '../entity/EntityImage';
import AddressHash from 'components/web3/AddressHash';
import AccountBalance from 'components/web3/AccountBalance';
import FundDialogButton from 'components/web3/FundDialogButton';
import GameMembershipActions from 'components/game/GameMembershipActions';
import { GAME_TYPE } from 'constants/contracts';
import SoulDescription from 'components/soul/SoulDescription';
import SocialLinks from 'components/soul/SocialLinks';
import Link from 'components/utils/Link';

/**
 * Game Detail Page
 */
export default function GameDetail({ item: game, soul, sx }: any): JSX.Element {
  if (game) {
    console.log('Game game:', game, soul);
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          ...sx,
        }}
      >
        <Box>
          <EntityImage item={soul} />
          <GameAdminActions item={game} sx={{ mt: 2, width: 164 }} />
        </Box>
        <Box sx={{ flexGrow: 1, mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          <AddressHash address={game.id} sx={{ float: 'right' }} />
          <Typography variant="h1">{game.name}</Typography>
          <Typography color="text.secondary" variant="body2">
            Balance: <AccountBalance address={game.id} />{' '}
            {process.env.NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL}
          </Typography>

          <>({game.role})</>
          <Typography sx={{ mt: 1 }}>{game?.metadata?.description}</Typography>
          <SoulDescription soul={soul} sx={{ mt: 1 }} />
          <SocialLinks key="SocialLinks" soul={soul} sx={{ mt: 2 }} />
          <Stack key="buttons" direction="row" spacing={2} sx={{ mt: 2 }}>
            {game.role == GAME_TYPE.mdao && (
              <GameMembershipActions dao={game} />
            )}
            <FundDialogButton address={game.id} />
            <Link href={`/game/${game.id}/rules/manage`}>
              <Button>Rules</Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    );
  }
  return <></>;
}
