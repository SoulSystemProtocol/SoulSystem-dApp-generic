import Task from 'classes/Task';
import Layout from 'components/layout/Layout';
import TaskDetail from 'components/task/TaskDetail';
import useError from 'hooks/useError';
import useTask from 'hooks/useTask';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import TaskApplications from 'components/task/TaskApplications';
import TaskAcceptedApplications from 'components/task/TaskAcceptedApplications';
import TaskPostedDeliveries from 'components/task/TaskPostedDeliveries';
import TaskApprovedDeliveries from 'components/task/TaskApprovedDeliveries';
import GameComments from 'components/entity/game/GameComments';
import { getPageTitle } from 'utils';
import { GAME_NAME } from 'constants/contracts';
import { nameEntity } from 'hooks/utils';

/**
 * Page with Task details.
 */
// eslint-disable-next-line prettier/prettier
export default function TaskDetailPage() {
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

  console.log('Loaded task: ', task);

  return (
    <Layout title={getPageTitle(nameEntity('task', true))}>
      <TaskDetail item={task} />
      {task && <GameComments item={task} />}
      {task && <TaskApplications task={task} sx={{ mt: 2 }} />}
      {task && <TaskAcceptedApplications task={task} sx={{ mt: 2 }} />}
      {task && <TaskPostedDeliveries task={task} sx={{ mt: 2 }} />}
      {task && <TaskApprovedDeliveries task={task} sx={{ mt: 2 }} />}
    </Layout>
  );
}
