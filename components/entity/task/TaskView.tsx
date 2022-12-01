import { useContext } from 'react';
import Loading from 'components/layout/Loading';
import useError from 'hooks/useError';
import { Box } from '@mui/material';
import EntityComments from '../EntityComments';
import TaskAcceptedApplications from './TaskAcceptedApplications';
import TaskApplications from './TaskApplications';
import TaskApprovedDeliveries from './TaskApprovedDeliveries';
import TaskDetail from './TaskDetail';
import TaskPostedDeliveries from './TaskPostedDeliveries';
import { SelectedProcContext } from 'contexts/SelectedProc';

/**
 * Single Process View
 */
export default function TaskView({ sx }: { sx?: any }): JSX.Element {
  const { handleError } = useError();
  const { proc: task, loading, error } = useContext(SelectedProcContext);
  if (error) {
    handleError({ message: '404: Failed to load Task', task, error }, true);
    return <>Failed to Load Entity</>;
  }
  if (loading) return <Loading />;
  // if (!game) return <>Failed to Load Entity</>;
  return (
    <Box sx={sx}>
      <TaskDetail item={task} />
      {task && <EntityComments item={task} />}
      {task && <TaskApplications task={task} sx={{ mt: 2 }} />}
      {task && <TaskAcceptedApplications task={task} sx={{ mt: 2 }} />}
      {task && <TaskPostedDeliveries task={task} sx={{ mt: 2 }} />}
      {task && <TaskApprovedDeliveries task={task} sx={{ mt: 2 }} />}
    </Box>
  );
}
