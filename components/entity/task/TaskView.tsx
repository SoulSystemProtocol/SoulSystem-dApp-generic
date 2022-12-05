import { useContext } from 'react';
import Loading from 'components/layout/Loading';
import useError from 'hooks/useError';
import { Box, SxProps } from '@mui/material';
import { SelectedProcContext } from 'contexts/SelectedProc';
import TaskDetail from './TaskDetail';
import TaskTabs from './TaskTabs';

/**
 * Single Process View
 */
export default function TaskView({ sx }: { sx?: SxProps }): JSX.Element {
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
      <TaskTabs item={task} />
    </Box>
  );
}
