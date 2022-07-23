import { WorkOutlineOutlined } from '@mui/icons-material';
import { Avatar, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GAME_ROLE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import useProject from 'hooks/useProject';
import { useContext, useEffect, useState } from 'react';
import ProjectManageDialog from './ProjectManageDialog';

import GameAdminActions from '../game/GameAdminActions';

/**
 * A component with project details.
 */
export default function ProjectDetail({ project, sx }: any) {
  if (project) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          ...sx,
        }}
      >
        <Box>
          <ProjectImage project={project} />
          <GameAdminActions game={project} sx={{ mt: 2, width: 164 }} />
          {/* <ProjectEditButton project={project} sx={{ mt: 2, width: 164 }} /> */}
        </Box>
        <Box sx={{ mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          <Typography variant="h4">{project.name}</Typography>
          <Typography sx={{ mt: 1 }}>{project.uriData?.description}</Typography>
        </Box>
      </Box>
    );
  }

  return <></>;
}

function ProjectImage({ project, sx }: any) {
  return (
    <Box sx={{ ...sx }}>
      <Avatar
        sx={{
          width: 164,
          height: 164,
          borderRadius: '24px',
        }}
        src={project?.uriData?.image}
      >
        <WorkOutlineOutlined />
      </Avatar>
    </Box>
  );
}

/* DEPRECATED
function ProjectEditButton({ project, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { isSoulHasRole } = useProject();
  const [isSoulAdmin, setIsSoulAdmin] = useState(false);

  useEffect(() => {
    setIsSoulAdmin(false);
    if (accountSoul && project) {
      setIsSoulAdmin(
        isSoulHasRole(project, accountSoul.id, GAME_ROLE.admin.id),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountSoul, project]);

  if (isSoulAdmin) {
    return (
      <Button
        size="small"
        variant="outlined"
        sx={{ ...sx }}
        onClick={() =>
          showDialog?.(
            <ProjectManageDialog project={project} onClose={closeDialog} />,
          )
        }
      >
        Edit
      </Button>
    );
  } else {
    return <></>;
  }
}
*/
