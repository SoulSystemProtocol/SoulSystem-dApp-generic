import { Box, Button, Typography } from '@mui/material';
import DaoManageDialog from 'components/dao/DaoManageDialog';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import { useContext } from 'react';
import Layout from '../../components/layout/Layout';

/**
 * Page for a list of mDAOs
 */
export default function DaosPage({}: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);

  return (
    <Layout title="MentorDAO — Mentor DAOs">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Mentor DAOs</Typography>
        {accountSoul && (
          <Button
            onClick={() =>
              showDialog?.(<DaoManageDialog onClose={closeDialog} />)
            }
            variant="outlined"
          >
            Create DAO
          </Button>
        )}
      </Box>
    </Layout>
  );
}
