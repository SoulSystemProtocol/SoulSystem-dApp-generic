import Task from 'classes/Task';
import TaskDetail from 'components/task/TaskDetail';
// import TaskTabs from 'components/task/TaskTabs';
import Layout from 'components/layout/Layout';
import useTask from 'hooks/useTask';
import useError from 'hooks/useError';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// eslint-disable-next-line prettier/prettier
interface TaskProps { }

/**
 * Page with Task details.
 */
// eslint-disable-next-line prettier/prettier
export default function TaskDetailPage({ }: TaskProps) {
  const router = useRouter();
  const { slug } = router.query;
  const { handleError } = useError();
  const { getTaskById } = useTask();
  const [task, setTask] = useState<Task | null>(null);

  async function loadData() {
    try {
      setTask(await getTaskById(slug as string));
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

  return (
    <Layout title="MentorDAO — Bountiy">
      <TaskDetail task={task} />
    </Layout>
  );
}
