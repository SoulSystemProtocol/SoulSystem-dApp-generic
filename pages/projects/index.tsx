import { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';

import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import useError from 'hooks/useError';
import useProject from 'hooks/useProject';

import ProjectManageDialog from 'components/project/ProjectManageDialog';
import PaginatedList from 'components/PaginatedList';
import Layout from '../../components/layout/Layout';
import { APP_CONFIGS } from '../../constants';
import { getPageTitle, getPagination } from '../../utils';
import { PROJECT_CONF, getCardContent } from './constants';

import Project from 'classes/Project';

/**
 * Page for a list of projects
 */
export default function ProjectsPage({}: any) {
  const [projects, setProjects] = useState<Array<Project> | null>(null);
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { handleError } = useError();
  const { getProjects } = useProject();

  async function loadData(page: any) {
    try {
      // Update states
      setProjects(null);
      // Load projects by page params
      const projects = await getProjects(
        undefined,
        APP_CONFIGS.PAGE_SIZE,
        getPagination(page),
      );

      setProjects(projects);
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    loadData(1);
  }, []);

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

  // Props
  const projectsListProps = {
    baseRoute: PROJECT_CONF.ROUTE,
    data: projects,
    loadData,
    renderActions,
    subtitle: PROJECT_CONF.SUBTITLE,
    title: PROJECT_CONF.TITLE,
    // card config
    getCardContent,
  };

  return (
    <Layout title={getPageTitle(PROJECT_CONF.PAGE_TITLE)}>
      <PaginatedList {...projectsListProps} />
    </Layout>
  );
}
