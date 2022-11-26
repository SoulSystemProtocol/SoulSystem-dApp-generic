import Task from 'classes/Task';
import TaskList from 'components/entity/task/TaskList';
import useError from 'hooks/useError';
import useTask from 'hooks/useTask';
import { useEffect, useState } from 'react';

/**
 * Component: a list of project tasks.
 */
export default function ProjectTaskList({ project, sx }: any) {
  const { handleError } = useError();
  const { getTasks } = useTask();
  const [tasks, setTasks] = useState<Array<Task> | null>(null);

  async function loadData() {
    try {
      // Update states
      setTasks(null);
      // Load tasks
      const tasks = await getTasks(undefined, undefined, project.id);
      setTasks(tasks);
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    if (project) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return <TaskList tasks={tasks} sx={{ ...sx }} />;
}
