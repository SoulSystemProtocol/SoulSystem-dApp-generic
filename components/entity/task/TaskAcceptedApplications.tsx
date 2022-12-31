import { CheckOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  Link as MuiLink,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from '@mui/material';
import { CLAIM_ROLE } from 'constants/contracts';
import useError from 'hooks/useError';
import useSouls from 'hooks/useSouls';
import useTask from 'hooks/useTask';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { soulImage } from 'utils/converters';

/** [DEPRECATE?] What is this even for?!
 *
 */
export default function TaskAcceptedApplications({ task, sx }: any) {
  const { handleError } = useError();
  const { getSoulsByRole } = useTask();
  const { getSouls } = useSouls();
  const [acceptedSouls, setAcceptedSouls] = useState<Array<any>>([]);

  useEffect(() => {
    if (task) {
      getSouls(getSoulsByRole(task, CLAIM_ROLE.applicant.id))
        .then((souls) => setAcceptedSouls(souls))
        .catch((error: any) => handleError(error, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  if (acceptedSouls.length > 0) {
    return (
      <Box sx={{ ...sx }}>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="h5">Accepted Applicants:</Typography>
        <List sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {acceptedSouls.map((soul: any, index: number) => (
            <TaskAcceptedApplication key={index} task={task} soul={soul} />
          ))}
        </List>
      </Box>
    );
  }
  return <></>;
}

function TaskAcceptedApplication({ soul }: any) {
  const { handleError } = useError();

  return (
    <ListItem sx={{ flex: '1 0', minWidth: '200px' }}>
      <>
        <ListItemAvatar>
          <Avatar src={soulImage(soul)}>
            <CheckOutlined />
          </Avatar>
        </ListItemAvatar>
        <Link href={`/soul/${soul.owner}`} passHref>
          <MuiLink underline="none">
            <Typography>{soul.name || '...'}</Typography>
          </MuiLink>
        </Link>
      </>
    </ListItem>
  );
}
