import { useContext } from 'react';
import { Button } from '@mui/material';
import { DialogContext } from 'contexts/dialog';
import { DataContext } from 'contexts/data';
import { getPageTitle } from '../../utils';
import ProjectManageDialog from 'components/project/ProjectManageDialog';
import Layout from 'components/layout/Layout';
import SoulListGQ from 'components/soul/SoulListGQ';
import { processCardContent } from 'utils/cardContents';
import { GAME_DESC } from 'constants/contracts';
import { nameEntity } from 'hooks/utils';

const CONF = {
  PAGE_TITLE: nameEntity('task', true),
  TITLE: nameEntity('task', true),
  SUBTITLE: GAME_DESC.task,
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
      role: 'bounty',
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
