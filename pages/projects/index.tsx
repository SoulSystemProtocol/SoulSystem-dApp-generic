import { Box, Button, Pagination, Typography } from '@mui/material';
import Project from 'classes/Project';
import ProjectList from 'components/project/ProjectList';
import ProjectManageDialog from 'components/project/ProjectManageDialog';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import useError from 'hooks/useError';
import useProject from 'hooks/useProject';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';

/**
 * Page for a list of projects
 */
// eslint-disable-next-line prettier/prettier
export default function ProjectsPage({ }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { handleError } = useError();
  const { getProjects } = useProject();
  const [projects, setProjects] = useState<Array<Project> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCount, setCurrentPageCount] = useState(1);
  const pageSize = 16;

  async function loadData(page = currentPage, pageCount = currentPageCount) {
    try {
      // Update states
      setCurrentPage(page);
      setCurrentPageCount(pageCount);
      setProjects(null);
      // Load projects by page params
      const projects = await getProjects(
        undefined,
        pageSize,
        (page - 1) * pageSize,
      );
      setProjects(projects);
      // Add next page to pagination if possible
      if (page == pageCount && projects.length === pageSize) {
        setCurrentPageCount(pageCount + 1);
      }
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    loadData(1, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let title = process.env.NEXT_PUBLIC_APP_NAME + ' — Projects';
  return (
    <Layout title={title}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5">Projects</Typography>
          <Typography variant="subtitle1">
            Projects are companies and organizations that need some work done.
          </Typography>
        </Box>
        {accountSoul && (
          <Button
            onClick={() =>
              showDialog?.(<ProjectManageDialog onClose={closeDialog} />)
            }
            variant="outlined"
          >
            Create Project
          </Button>
        )}
      </Box>
      <ProjectList projects={projects} sx={{ mt: 1 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { md: 'space-between' },
          alignItems: { md: 'center' },
          mt: 3,
        }}
      >
        <Pagination
          color="primary"
          sx={{ mt: { xs: 2, md: 0 } }}
          count={currentPageCount}
          page={currentPage}
          onChange={(_, page) => loadData(page)}
        />
      </Box>
    </Layout>
  );
}
