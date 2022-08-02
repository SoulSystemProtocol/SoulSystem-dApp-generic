import { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';

import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import { DialogContext } from 'contexts/dialog';
import { DataContext } from 'contexts/data';

import DaoManageDialog from 'components/dao/DaoManageDialog';
import Layout from 'components/layout/Layout';
import PaginatedList from 'components/PaginatedList';
import { APP_CONFIGS } from '../../constants';
import { getPageTitle, getPagination } from '../../utils';
import { DAO_CONF, getCardContent } from './constants';
import Dao from 'classes/Dao';

/**
 * Page for a list of mDAO Games
 */
export default function DaosPage({}: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { handleError } = useError();
  const { getDaos } = useDao();
  const [daos, setDaos] = useState<Array<Dao> | null>(null);

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
    baseRoute: DAO_CONF.ROUTE,
    data: daos,
    loadData,
    renderActions,
    subtitle: DAO_CONF.SUBTITLE,
    title: DAO_CONF.TITLE,
    // card config
    getCardContent,
  };

  return (
    <Layout title={getPageTitle(DAO_CONF.PAGE_TITLE)}>
      <PaginatedList {...daosListProps} />
    </Layout>
  );
}
