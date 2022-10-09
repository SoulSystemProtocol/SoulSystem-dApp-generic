import { useContext } from 'react';
import { Button } from '@mui/material';
import { DialogContext, IDialogParams } from 'contexts/dialog';
import { DataContext } from 'contexts/data';
import { getPageTitle } from '../../utils';
import ProjectManageDialog from 'components/project/ProjectManageDialog';
import Layout from 'components/layout/Layout';
// import SoulListGQ from 'components/soul/ProcessListGQ';
// import SoulListGQ from 'components/soul/DAOListGQ';
import SoulListGQ from 'components/soul/SoulListGQ';
import { processCardContent } from 'utils/cardContents';

const CONF = {
  PAGE_TITLE: 'Quests',
  TITLE: 'Quests',
  SUBTITLE: `Quests are tasks that need to be explored.`,
};

/**
 * Page for a list of projects
 */
export default function TaskPage({}: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const renderActions = accountSoul && (
    <Button
      onClick={() =>
        showDialog?.(<ProjectManageDialog onClose={closeDialog} />)
      }
      variant="outlined"
    >
      Create Task
    </Button>
  );

  const listProps = {
    variables: {
      type: 'TASK',
      role: 'BOUNTY',
    },
    getCardContent: processCardContent,
    renderActions,
    subtitle: CONF.SUBTITLE,
    title: CONF.TITLE,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <SoulListGQ {...listProps} />
    </Layout>
  );
}
