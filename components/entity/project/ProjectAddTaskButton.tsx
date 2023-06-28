import { Box } from '@mui/system';
import TaskManageDialog from 'components/entity/task/TaskManageDialog';
import ConditionalButton from 'components/layout/ConditionalButton';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import { isSoulHasRole } from 'hooks/utils';
import { useContext, useEffect, useState } from 'react';

/**
 * Button to add a project task.
 */
export default function ProjectAddTaskButton({
  project,
  sx,
}: any): JSX.Element {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setDisabled(
      !(accountSoul && isSoulHasRole(project, accountSoul.id, 'admin')),
    );
  }, [accountSoul, project]);

  return (
    <Box sx={{ ...sx }}>
      <ConditionalButton
        variant="outlined"
        size="small"
        disabled={disabled}
        onClick={() =>
          showDialog?.(
            <TaskManageDialog project={project} onClose={closeDialog} />,
          )
        }
      >
        Add Task
      </ConditionalButton>
    </Box>
  );
}
