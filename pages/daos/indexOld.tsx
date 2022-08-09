import { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import { DataContext } from 'contexts/data';
import { APP_CONFIGS } from '../../constants';
import { getPageTitle, getPagination } from '../../utils';
// import Dao from 'classes/Dao';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import DaoManageDialog from 'components/dao/DaoManageDialog';
import Layout from 'components/layout/Layout';
import PaginatedList from 'components/PaginatedList';

const CONF = {
  PAGE_TITLE: 'Teams',
  TITLE: 'Teams',
  SUBTITLE: `Mentor DAOs consist of a mentor and mentees that work on bounties
  together, as a team.`,
  ROUTE: 'daos',
};

const getCardContent = (item: any) => ({
  id: item.id,
  imgSrc: item.uriData.image,
  label: item.uriData.description,
  title: item.name,
  link: `/${CONF.ROUTE}/${item.id}`,
});

/**
 * Page for a list of mDAO Games
 */
export default function DaosPage({}: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { handleError } = useError();
  const { getDaos } = useDao();
  const [daos, setDaos] = useState<Array<object> | null>(null);

  async function loadData(page: any) {
    try {
      // Load daos by page params
      const daos = await getDaos(
        undefined,
        APP_CONFIGS.PAGE_SIZE,
        getPagination(page),
      );

      setDaos(daos);
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    loadData(1);
  }, []);

  const renderActions = accountSoul && (
    <Button
      onClick={() => showDialog?.(<DaoManageDialog onClose={closeDialog} />)}
      variant="outlined"
    >
      Create DAOs
    </Button>
  );

  // Props
  const daosListProps = {
    data: daos,
    loadData,
    renderActions,
    subtitle: CONF.SUBTITLE,
    title: CONF.TITLE,
    // card config
    getCardContent,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <PaginatedList {...daosListProps} />
    </Layout>
  );
}
