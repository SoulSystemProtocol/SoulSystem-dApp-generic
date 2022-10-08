import { useContext } from 'react';
import { Button } from '@mui/material';
import { DialogContext, IDialogParams } from 'contexts/dialog';
import { DataContext } from 'contexts/data';
import { getPageTitle } from '../../utils';
import ProjectManageDialog from 'components/project/ProjectManageDialog';
import Layout from 'components/layout/Layout';
import DAOListGQ from 'components/soul/DAOListGQ';
import { hexStringToJson } from 'utils/converters';
import { resolveLink } from 'utils/metadata';

const CONF = {
  PAGE_TITLE: 'Project Pods',
  TITLE: 'Project Pods',
  SUBTITLE: `Project Pods are companies and organizations that need some work done.`,
};

// Item Processing Function
const getCardContent = (item: any) => {
  let metadata = hexStringToJson(item.uriData);
  let ret = {
    id: item.id,
    imgSrc: resolveLink(metadata.image),
    label: metadata?.description,
    title: metadata?.name,
    metadata: metadata,
    link: `/game/${item.owner}`,
  };
  return ret;
};

/**
 * Page for a list of projects
 */
export default function ProjectsPage({}: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const renderActions = accountSoul && (
    <Button
      onClick={() =>
        showDialog?.(<ProjectManageDialog onClose={closeDialog} />)
      }
      variant="outlined"
    >
      Create Project
    </Button>
  );

  const listProps = {
    variables: {
      type: 'GAME',
      role: 'PROJECT',
    },
    getCardContent,
    renderActions,
    subtitle: CONF.SUBTITLE,
    title: CONF.TITLE,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <DAOListGQ {...listProps} />
    </Layout>
  );
}
