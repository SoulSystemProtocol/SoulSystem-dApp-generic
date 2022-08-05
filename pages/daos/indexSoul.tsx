import { useContext } from 'react';
import { Button } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import { DataContext } from 'contexts/data';
// import { APP_CONFIGS } from '../../constants';
import { getPageTitle, getPagination } from '../../utils';
// import Dao from 'classes/Dao';
// import useDao from 'hooks/useDao';
// import useError from 'hooks/useError';
import DaoManageDialog from 'components/dao/DaoManageDialog';
import Layout from 'components/layout/Layout';
// import PaginatedList from 'components/PaginatedList';
import SoulListGQ from 'components/soul/SoulListGQ';
import {
  addressToShortAddress,
  hexStringToJson,
  soulToFirstLastNameString,
} from 'utils/converters';

const CONF = {
  PAGE_TITLE: 'Teams',
  TITLE: 'Teams',
  SUBTITLE: `Mentor DAOs consist of a mentor and mentees that work on bounties
  together, as a team.`,
  ROUTE: 'daos',
};

const getCardContent = (item: any) => {
  let ret = {
    id: item.id,
    imgSrc: item.uriImage,
    title: item.name,
    metadata: hexStringToJson(item.uriData),
    label: '',
  };
  ret.label = ret?.metadata?.description;
  // ret.title = ret?.metadata?.name;
  return ret;
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
      Create DAOs
    </Button>
  );

  const daosListProps = {
    variables: {
      type: 'GAME',
    },
    getCardContent,
    baseRoute: CONF.ROUTE,
    renderActions,
    subtitle: CONF.SUBTITLE,
    title: CONF.TITLE,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      SOUL OF A GAME
      <SoulListGQ {...daosListProps} />
    </Layout>
  );
}
