import { Box, Stack, Typography, Button } from '@mui/material';
import GameAdminActions from 'components/entity/game/GameAdminActions';
import EntityImage from '../EntityImage';
import AddressHash from 'components/web3/AddressHash';
import FundDialogButton from 'components/web3/FundDialogButton';
import GameMembershipActions from 'components/entity/game/GameMembershipActions';
import SoulDescription from 'components/entity/soul/SoulDescription';
import SocialLinks from 'components/entity/soul/SocialLinks';
import Link from 'components/utils/Link';
import { SelectedSoulContext } from 'contexts/SelectedSoul';
import { useContext, useEffect, useState } from 'react';
import { nameEntity } from 'helpers/utils';
import { SelectedGameContext } from 'contexts/SelectedGame';
import { soulName } from 'utils/soul';
import NativeBalanceDisplay from 'components/web3/NativeBalanceDisplay';
import DevFundMsg from 'components/layout/DevFundMsg';
import { getChainData } from 'components/web3/chains/ChainsData';

/**
 * Game Detail Page
 */
export default function GameDetail({ sx }: any): JSX.Element {
  const { soul } = useContext(SelectedSoulContext);
  const { game } = useContext(SelectedGameContext);
  const [name, setName] = useState<string>('');

  useEffect(() => setName(soulName(soul)), [soul]);

  // if (!game) return <></>;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        mb: { xs: 1, md: 2 },
        ...sx,
      }}
    >
      <Box
        sx={{
          margin: '0 auto',
          flexGrow: 0,
        }}
      >
        <EntityImage item={soul} />
        <GameAdminActions sx={{ mt: 2, width: 164 }} />
      </Box>

      <Stack
        direction="column"
        spacing={1}
        sx={{ flexGrow: 1, mt: { xs: 2, md: 0 }, ml: { md: 4 } }}
      >
        <Typography variant="h1">{name}</Typography>
        <AddressHash address={soul.owner} sx={{ float: 'right' }} />
        <Typography variant="body2" color="text.secondary">
          Balance: {game?.id && <NativeBalanceDisplay address={game.id} />}
        </Typography>

        {!!process.env.NEXT_PUBLIC_FEATURE_DEV && (
          <Typography variant="caption" color="text.secondary">
            Role: {soul?.role}
          </Typography>
        )}
        <SoulDescription soul={soul} sx={{ mt: 1 }} />
        <SocialLinks key="SocialLinks" soul={soul} sx={{ mt: 2 }} />

        <Stack key="buttons" direction="row" spacing={2} sx={{ mt: 2 }}>
          <GameMembershipActions dao={game} />
          <FundDialogButton
            text={`Fund ${nameEntity(game?.role)}`}
            address={game?.id}
          />
          {process.env.NEXT_PUBLIC_FEATURE_RULES == 'true' && (
            <Link href={`/game/${game?.id}/rules/manage`}>
              <Button size="small" variant="outlined">
                Rules
              </Button>
            </Link>
          )}
        </Stack>
        {getChainData()?.live == false && <DevFundMsg />}
      </Stack>
    </Box>
  );
}
