import { Button } from '@mui/material';
import { Box } from '@mui/system';
import TaskManageDialog from 'components/task/TaskManageDialog';
import { GAME_ROLE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import { DialogContext, IDialogParams } from 'contexts/dialog';
import useDao from 'hooks/useDao';
import { useContext } from 'react';

/**
 * A component with button to add a project task.
 */
export default function ProjectAddTaskButton({ project, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { isSoulHasRole } = useDao();

  if (
    accountSoul &&
    isSoulHasRole(project, accountSoul.id, GAME_ROLE.admin.id)
  ) {
    return (
      <Box sx={{ ...sx }}>
        <Button
          variant="outlined"
          onClick={() =>
            showDialog?.(
              <TaskManageDialog project={project} onClose={closeDialog} />,
            )
          }
        >
          Add Task
        </Button>
      </Box>
    );
  }
  return <></>;
}
