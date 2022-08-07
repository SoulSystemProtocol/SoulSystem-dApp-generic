import { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import useError from 'hooks/useError';
import useProject from 'hooks/useProject';
import Project from 'classes/Project';
import ProjectManageDialog from 'components/project/ProjectManageDialog';
import PaginatedList from 'components/PaginatedList';
import Layout from '../../components/layout/Layout';
import { APP_CONFIGS } from '../../constants';
import { getPageTitle, getPagination } from '../../utils';
import { WorkOutlineOutlined } from '@mui/icons-material';

const CONF = {
  PAGE_TITLE: 'Projects',
  TITLE: 'Projects',
  SUBTITLE: `Projects are companies and organizations that need some work done.`,
  ROUTE: 'projects',
};

const getCardContent: {} = (item: any) => ({
  id: item.id,
  imgSrc: item.uriData?.image,
  avatarIcon: <WorkOutlineOutlined />,
  label: item.uriData?.description,
  title: item.name,
  link: `/${CONF.ROUTE}/${item.id}`,
});

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

      console.log('Projects', projects);
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
    data: projects,
    loadData,
    renderActions,
    subtitle: CONF.SUBTITLE,
    title: CONF.TITLE,
    // card config
    getCardContent,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <PaginatedList {...projectsListProps} />
    </Layout>
  );
}
