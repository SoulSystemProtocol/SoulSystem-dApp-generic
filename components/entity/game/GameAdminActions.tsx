import { Stack, SxProps } from '@mui/material';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import { SelectedSoulContext } from 'contexts/SelectedSoul';
import { SelectedGameContext } from 'contexts/SelectedGame';
import { useContext, useEffect, useState } from 'react';
import GameManageDialog from './GameManageDialog';
import GameRoleManageDialog from './GameRoleManageDialog';
import { isSoulHasRole } from 'hooks/utils';
import { useRouter } from 'next/router';
import TooltipButton from 'components/layout/TooltipButton';

/**
 * Game Admin Actions
 */
export default function GameAdminActions({
  sx,
}: {
  sx?: SxProps;
}): JSX.Element {
  const { accountSoul } = useContext(DataContext);
  const { game } = useContext(SelectedGameContext);
  const { soul } = useContext(SelectedSoulContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAdmin(
      accountSoul && game && isSoulHasRole(game, accountSoul.id, 'admin'),
    );
  }, [accountSoul, game]);

  if (!game) return <></>;
  return (
    <Stack direction="column" spacing={1} sx={{ ...sx }}>
      <TooltipButton
        disabled={!isAdmin}
        sx={{ width: '100%' }}
        tooltip={isAdmin ? 'Edit Info' : 'Admin Only'}
        size="small"
        variant="outlined"
        onClick={() => router.push('/soul/edit/' + soul.owner)}
      >
        Edit
      </TooltipButton>
      {/* Moved to Roles Tab
      <TooltipButton
        disabled={!isAdmin}
        sx={{ width: '100%' }}
        tooltip={
          isAdmin
            ? 'Mint & Burn Role NFTs'
            : 'Mint & Burn Role NFTs (Admin Only)'
        }
        size="small"
        variant="outlined"
        onClick={() =>
          showDialog?.(
            <GameRoleManageDialog game={game} onClose={closeDialog} />,
          )
        }
      >
        Manage Roles
      </TooltipButton> */}
    </Stack>
  );
}
