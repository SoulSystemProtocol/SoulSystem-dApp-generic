import useProcByAddr from 'hooks/useProcByAddr';
import TaskCardDetails from './TaskCardDetails';

/**
 * Task Card Details By Address
 */
export default function TaskSoulCardDetails({ address, sx }: any): JSX.Element {
  const { proc: task } = useProcByAddr(address);
  return <TaskCardDetails task={task} sx={sx} />;
}
