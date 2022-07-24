import Task from 'classes/Task';
import Layout from 'components/layout/Layout';
import TaskDetail from 'components/task/TaskDetail';
import useError from 'hooks/useError';
import useTask from 'hooks/useTask';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface TaskProps {}

/**
 * Page with Task details.
 */
export default function TaskDetailPage({}: TaskProps) {
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
      <TaskDetail item={task} />
    </Layout>
  );
}
