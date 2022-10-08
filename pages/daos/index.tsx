import { useContext } from 'react';
import { Button } from '@mui/material';
import { DialogContext, IDialogParams } from 'contexts/dialog';
import { DataContext } from 'contexts/data';
import { getPageTitle } from '../../utils';
import DaoManageDialog from 'components/dao/DaoManageDialog';
import Layout from 'components/layout/Layout';
import DAOListGQ from 'components/soul/DAOListGQ';
import { hexStringToJson } from 'utils/converters';
import { resolveLink } from 'utils/metadata';
import { GAME_NAME, GAME_DESC } from 'constants/contracts';
import { gameCardContent } from 'utils/cardContents';

const CONF = {
  PAGE_TITLE: GAME_NAME.dao,
  TITLE: GAME_NAME.dao,
  SUBTITLE: GAME_DESC.dao,
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
      Create DAO
    </Button>
  );

  const daosListProps = {
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
      <DAOListGQ {...daosListProps} />
    </Layout>
  );
}
