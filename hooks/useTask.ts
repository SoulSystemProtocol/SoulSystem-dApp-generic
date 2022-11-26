import Task from 'classes/Task';
import { Web3Context } from 'contexts/Web3Context';
import { ethers } from 'ethers';
import { useContext } from 'react';
import { hexStringToJson } from 'utils/converters';
import useDaoExtContract from './contracts/useDaoExtContract';
import useTaskContract from './contracts/useTaskContract';
import useSubgraph from './useSubgraph';

/**
 * Hook for work with task.
 */
export default function useTask() {
  const { defaultProvider } = useContext(Web3Context);
  const { applyToTask } = useDaoExtContract();
  const { acceptApplicant, deliveryApprove, stageExecusion } =
    useTaskContract();
  const { findClaims } = useSubgraph();

  let getTaskById = async function (id: string): Promise<Task | null> {
    const items = await getTasks([id], undefined);
    return items.length > 0 ? items[0] : null;
  };

  let getTasks = async function (
    ids?: Array<string>,
    type?: string,
    projectId?: string,
    first = 10,
    skip = 0,
  ): Promise<Array<Task>> {
    const subgraphTasks = await findClaims(ids, type, projectId, first, skip);
    return subgraphTasks.map((subgraphTask: any) =>
      convertSubgraphTaskToTask(subgraphTask),
    );
  };

  const isSoulHasRole = function (
    task: Task,
    soul: string,
    roleId: string,
  ): boolean {
    return getSoulsByRole(task, roleId).includes(soul);
  };

  const getSoulsByRole = function (task: Task, roleId: string): Array<string> {
    const taskRole = task.roles?.find(
      (element: any) => element?.roleId === roleId,
    );
    // console.log('[DEBUG] Souls for Role', {souls:taskRole?.souls, taskRoles:task?.roles, roleId, })
    return taskRole?.souls || [];
  };

  const applyForTaskAsDao = async function (taskId: string, daoId: string) {
    return applyToTask(daoId, taskId, '');
  };

  const acceptSoulForTask = async function (taskId: string, soulId: string) {
    return acceptApplicant(taskId, soulId);
  };

  const approveSoulDelivery = async function (taskId: string, soulId: string) {
    return deliveryApprove(taskId, soulId);
  };

  const disburseFundsToWinners = async function (taskId: string) {
    return stageExecusion(taskId, []);
  };

  const getFund = async function (taskId: string) {
    const balance = await defaultProvider.getBalance(taskId);
    return ethers.utils.formatEther(balance);
  };

  return {
    getTaskById,
    getTasks,
    isSoulHasRole,
    getSoulsByRole,
    applyForTaskAsDao,
    acceptSoulForTask,
    approveSoulDelivery,
    disburseFundsToWinners,
    getFund,
  };
}

function convertSubgraphTaskToTask(subgraphTask: any) {
  return new Task(
    subgraphTask.id,
    subgraphTask.name,
    subgraphTask.stage,
    subgraphTask.uri,
    hexStringToJson(subgraphTask.metadata),
    {
      id: subgraphTask.game.id,
      name: subgraphTask.game.name,
      ...hexStringToJson(subgraphTask.game.metadata),
    },
    subgraphTask.roles,
    subgraphTask.nominations,
    subgraphTask.posts,
  );
}
