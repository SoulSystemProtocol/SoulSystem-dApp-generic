import { Stack, SxProps } from '@mui/material';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import { SelectedSoulContext } from 'contexts/SelectedSoul';
import { SelectedGameContext } from 'contexts/SelectedGame';
import { useContext, useEffect, useState } from 'react';
import GameManageDialog from './GameManageDialog';
import GameRoleManageDialog from './GameRoleManageDialog';
import { isSoulHasRole } from 'hooks/utils';
import ConditionalButton from 'components/layout/ConditionalButton';
import { useRouter } from 'next/router';

/**
 * Game Admin Actions
 */
export default function GameAdminActions({ sx }: { sx: SxProps }): JSX.Element {
  const { accountSoul } = useContext(DataContext);
  const { game } = useContext(SelectedGameContext);
  const { soul } = useContext(SelectedSoulContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const [isSoulAdmin, setIsSoulAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsSoulAdmin(
      accountSoul && game && isSoulHasRole(game, accountSoul.id, 'admin'),
    );
  }, [accountSoul, game]);

  if (!game) return <></>;
  return (
    <Stack direction="column" spacing={1} sx={{ ...sx }}>
      <ConditionalButton
        disabled={!isSoulAdmin}
        size="small"
        variant="outlined"
        onClick={() =>
          // showDialog?.(<GameManageDialog soul={soul} game={game} />)
          router.push('/soul/edit/' + soul.owner)
        }
      >
        Edit
      </ConditionalButton>
      <ConditionalButton
        disabled={!isSoulAdmin}
        size="small"
        variant="outlined"
        onClick={() =>
          showDialog?.(
            <GameRoleManageDialog game={game} onClose={closeDialog} />,
          )
        }
      >
        Manage Roles
      </ConditionalButton>
    </Stack>
  );
}
