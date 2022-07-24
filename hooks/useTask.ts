import Task from 'classes/Task';
import { hexStringToJson } from 'utils/converters';
import useDaoExtContract from './contracts/useDaoExtContract';
import useProjectExtContract from './contracts/useProjectExtContract';
import useSubgraph from './useSubgraph';

/**
 * Hook for work with task.
 */
export default function useTask() {
  const { taskMake } = useProjectExtContract();
  const { applyToTask } = useDaoExtContract();
  const { findClaims } = useSubgraph();

  let createTask = function (
    projectId: string,
    name: string,
    metadataUrl: string,
  ): Promise<any> {
    return taskMake(projectId, name, metadataUrl);
  };

  let getTaskById = async function (id: string): Promise<Task | null> {
    const items = await getTasks([id], undefined);
    return items.length > 0 ? items[0] : null;
  };

  let getTasks = async function (
    ids?: Array<string>,
    projectId?: string,
    first = 10,
    skip = 0,
  ): Promise<Array<Task>> {
    const subgraphTasks = await findClaims(ids, projectId, first, skip);
    return subgraphTasks.map((subgraphTask: any) =>
      convertSubgraphTaskToTask(subgraphTask),
    );
  };

  let applyForTaskAsDao = async function (taskId: string, daoId: string) {
    return applyToTask(daoId, taskId, '');
  };

  return {
    createTask,
    getTaskById,
    getTasks,
    applyForTaskAsDao,
  };
}

function convertSubgraphTaskToTask(subgraphTask: any) {
  return new Task(
    subgraphTask.id,
    subgraphTask.name,
    subgraphTask.uri,
    hexStringToJson(subgraphTask.uriData),
    hexStringToJson(subgraphTask.game.uriData),
    subgraphTask.nominations,
  );
}
