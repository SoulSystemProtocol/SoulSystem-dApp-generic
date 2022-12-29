import useProcByAddr from 'hooks/useProcByAddr';
import TaskCardDetails from './TaskCardDetails';

/**
 * Task Card Details By Address
 */
export default function TaskSoulCardDetails({ address }: any): JSX.Element {
  const { proc: task } = useProcByAddr(address);
  return <TaskCardDetails task={task} />;
}
