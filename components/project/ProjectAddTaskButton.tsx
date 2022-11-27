import { Box } from '@mui/system';
import TaskManageDialog from 'components/entity/task/TaskManageDialog';
import ConditionalButton from 'components/layout/ConditionalButton';
import { GAME_ROLE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import useDao from 'hooks/useDao';
import { useContext, useEffect, useState } from 'react';

/**
 * Button to add a project task.
 */
export default function ProjectAddTaskButton({ project, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { isSoulHasRole } = useDao();
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setDisabled(
      !(
        accountSoul &&
        isSoulHasRole(project, accountSoul.id, GAME_ROLE.admin.id)
      ),
    );
  }, [accountSoul, project, isSoulHasRole]);

  return (
    <Box sx={{ ...sx }}>
      <ConditionalButton
        variant="outlined"
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
