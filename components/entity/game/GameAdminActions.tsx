import { Stack } from '@mui/material';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import { useContext, useEffect, useState } from 'react';
import GameManageDialog from './GameManageDialog';
import GameRoleManageDialog from './GameRoleManageDialog';
import { isSoulHasRole } from 'hooks/utils';
import { SelectedGameContext } from 'contexts/SelectedGame';
import ConditionalButton from 'components/layout/ConditionalButton';

/**
 * Game Admin Actions
 */
export default function GameAdminActions({ sx }: any): JSX.Element {
  const { accountSoul } = useContext(DataContext);
  const { game } = useContext(SelectedGameContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const [isSoulAdmin, setIsSoulAdmin] = useState(false);

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
          showDialog?.(<GameManageDialog dao={game} onClose={closeDialog} />)
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
            <GameRoleManageDialog dao={game} onClose={closeDialog} />,
          )
        }
      >
        Manage Roles
      </ConditionalButton>
    </Stack>
  );
}
