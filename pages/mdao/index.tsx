import { useContext } from 'react';
import { Button } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import { DataContext } from 'contexts/data';
import { getPageTitle } from '../../utils';
import DaoManageDialog from 'components/dao/DaoManageDialog';
import Layout from 'components/layout/Layout';
import SoulListGQ from 'components/soul/DAOListGQ';
import { GAME_NAME, GAME_DESC } from 'constants/contracts';
import { gameCardContent } from 'utils/cardContents';

const CONF = {
  PAGE_TITLE: GAME_NAME.mdao,
  TITLE: GAME_NAME.mdao,
  SUBTITLE: GAME_DESC.mdao,
};

/**
 * Page for a list of mDAO Games
 */
export default function DaosPage({}: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  // const { handleError } = useError();

  const renderActions = accountSoul && (
    <Button
      onClick={() => showDialog?.(<DaoManageDialog onClose={closeDialog} />)}
      variant="outlined"
    >
      Create Service
    </Button>
  );

  const daosListProps = {
    variables: {
      type: 'GAME',
      role: 'MDAO',
    },
    getCardContent: gameCardContent,
    renderActions,
    subtitle: CONF.SUBTITLE,
    title: CONF.TITLE,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <SoulListGQ {...daosListProps} />
    </Layout>
  );
}
