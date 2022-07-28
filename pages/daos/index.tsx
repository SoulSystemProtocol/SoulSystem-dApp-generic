import { Box, Button, Pagination, Typography } from '@mui/material';
import Dao from 'classes/Dao';
import DaoList from 'components/dao/DaoList';
import DaoManageDialog from 'components/dao/DaoManageDialog';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';

/**
 * Page for a list of mDAOs
 */
// eslint-disable-next-line prettier/prettier
export default function DaosPage({ }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { handleError } = useError();
  const { getDaos } = useDao();
  const [daos, setDaos] = useState<Array<Dao> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCount, setCurrentPageCount] = useState(1);
  const pageSize = 16;

  async function loadData(page = currentPage, pageCount = currentPageCount) {
    try {
      // Update states
      setCurrentPage(page);
      setCurrentPageCount(pageCount);
      setDaos(null);
      // Load daos by page params
      const daos = await getDaos(undefined, pageSize, (page - 1) * pageSize);
      setDaos(daos);
      // Add next page to pagination if possible
      if (page == pageCount && daos.length === pageSize) {
        setCurrentPageCount(pageCount + 1);
      }
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    loadData(1, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let title = process.env.NEXT_PUBLIC_APP_NAME + ' — mDAOs';
  return (
    <Layout title={title}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5">MentorDAOs</Typography>
          <Typography variant="subtitle1">
            Mentor DAOs consist of a mentor and mentees that work on bounties
            together, as a team.
          </Typography>
        </Box>
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
      <DaoList daos={daos} sx={{ mt: 1 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { md: 'space-between' },
          alignItems: { md: 'center' },
          mt: 3,
        }}
      >
        <Pagination
          color="primary"
          sx={{ mt: { xs: 2, md: 0 } }}
          count={currentPageCount}
          page={currentPage}
          onChange={(_, page) => loadData(page)}
        />
      </Box>
    </Layout>
  );
}
