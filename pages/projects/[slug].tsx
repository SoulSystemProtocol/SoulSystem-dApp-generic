import Project from 'classes/Project';
import Layout from 'components/layout/Layout';
import ProjectDetail from 'components/project/ProjectDetail';
import ProjectTabs from 'components/project/ProjectTabs';
import useError from 'hooks/useError';
import useProject from 'hooks/useProject';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// eslint-disable-next-line prettier/prettier
interface ProjectProps { }

/**
 * Page for a project detail.
 */
// eslint-disable-next-line prettier/prettier
export default function ProjectDetailPage({ }: ProjectProps) {
  const router = useRouter();
  const { slug } = router.query;
  const { handleError } = useError();
  const { getProjectById } = useProject();
  const [project, setProject] = useState<Project | null>(null);

  async function loadData() {
    try {
      setProject(await getProjectById(slug as string));
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    if (slug) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  let title = process.env.NEXT_PUBLIC_APP_NAME;
  if (project) title += ' | ' + project.name;
  return (
    <Layout title={title}>
      <ProjectDetail project={project} />
      <ProjectTabs project={project} sx={{ mt: 4 }} />
    </Layout>
  );
}
