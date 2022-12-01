import { useContext } from 'react';
import { Button } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import { DataContext } from 'contexts/data';
import { getPageTitle } from '../../utils';
import DaoManageDialog from 'components/dao/DaoManageDialog';
import Layout from 'components/layout/Layout';
import { GAME_DESC } from 'constants/contracts';
import { gameCardContent } from 'utils/cardContents';
import { nameEntity } from 'hooks/utils';
import PaginatedList from 'components/PaginatedList';
import SoulsByTypeRoleQuery from 'queries/SoulsByTypeRoleQuery';

const CONF = {
  PAGE_TITLE: nameEntity('dao', true),
  TITLE: nameEntity('dao', true),
  SUBTITLE: GAME_DESC.dao,
};

/**
 * Page for a list of mDAO Games
 */
export default function DaosPage({}: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  // const { handleError } = useError();

  const renderActions = (
    <Button
      disabled={!accountSoul}
      onClick={() => showDialog?.(<DaoManageDialog onClose={closeDialog} />)}
      variant="outlined"
    >
      Create DAO
    </Button>
  );

  const listProps = {
    variables: {
      type: 'GAME',
      role: 'DAO',
    },
    getCardContent: gameCardContent,
    renderActions,
    subtitle: CONF.SUBTITLE,
    title: CONF.TITLE,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <PaginatedList {...listProps} query={SoulsByTypeRoleQuery} />
    </Layout>
  );
}
