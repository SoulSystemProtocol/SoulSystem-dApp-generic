import { SchoolOutlined } from '@mui/icons-material';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GAME_ROLE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import useDao from 'hooks/useDao';
import { useContext, useEffect, useState } from 'react';
import DaoManageDialog from './DaoManageDialog';
import DaoRoleManageDialog from './DaoRoleManageDialog';

/**
 * A component with DAO details.
 */
export default function DaoDetail({ dao, sx }: any) {
  if (dao) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          ...sx,
        }}
      >
        <Box>
          <DaoImage dao={dao} />
          <DaoAdminActions dao={dao} sx={{ mt: 2, width: 164 }} />
        </Box>
        <Box sx={{ mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          <Typography variant="h4">{dao.name}</Typography>
          <Typography sx={{ mt: 1 }}>{dao.uriData?.description}</Typography>
        </Box>
      </Box>
    );
  }

  return <></>;
}

function DaoImage({ dao, sx }: any) {
  return (
    <Box sx={{ ...sx }}>
      <Avatar
        sx={{
          width: 164,
          height: 164,
          borderRadius: '24px',
        }}
        src={dao?.uriData?.image}
      >
        <SchoolOutlined />
      </Avatar>
    </Box>
  );
}

function DaoAdminActions({ dao, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { isSoulHasRole } = useDao();
  const [isSoulAdmin, setIsSoulAdmin] = useState(false);

  useEffect(() => {
    setIsSoulAdmin(false);
    if (accountSoul && dao) {
      setIsSoulAdmin(isSoulHasRole(dao, accountSoul.id, GAME_ROLE.admin.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountSoul, dao]);

  if (isSoulAdmin) {
    return (
      <Stack direction="column" spacing={1} sx={{ ...sx }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() =>
            showDialog?.(<DaoManageDialog dao={dao} onClose={closeDialog} />)
          }
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() =>
            showDialog?.(
              <DaoRoleManageDialog dao={dao} onClose={closeDialog} />,
            )
          }
        >
          Manage Roles
        </Button>
      </Stack>
    );
  } else {
    return <></>;
  }
}
