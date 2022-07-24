import { CheckOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Grid,
  Divider,
  Link as MuiLink,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from '@mui/material';
import Dao from 'classes/Dao';
import Soul from 'classes/Soul';
import { CLAIM_ROLE, SOUL_TYPE } from 'constants/contracts';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSoul';
import useTask from 'hooks/useTask';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TaskAcceptedApplications({ task, sx }: any) {
  const { handleError } = useError();
  const { getSoulsByRole } = useTask();
  const { getSouls } = useSoul();
  const [acceptedSouls, setAcceptedSouls] = useState<Array<Soul>>([]);

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
      </Box >
    );
  }
  return <></>;
}

function TaskAcceptedApplication({ soul }: any) {
  const { handleError } = useError();
  const { getDaoById } = useDao();
  const [soulDao, setSoulDao] = useState<Dao | null>(null);

  useEffect(() => {
    // Load soul DAO if type is game
    if (soul.type === SOUL_TYPE.game) {
      getDaoById(soul.owner)
        .then((dao) => setSoulDao(dao))
        .catch((error: any) => handleError(error, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soul]);

  return (
    <ListItem sx={{ flex: '1 0', minWidth: '200px' }}>
      <ListItemAvatar>
        <Avatar>
          <CheckOutlined />
        </Avatar>
      </ListItemAvatar>
      {soulDao ? (
        <Link href={`/daos/${soulDao.id}`} passHref>
          <MuiLink underline="none">
            <Typography>{soulDao.name}</Typography>
          </MuiLink>
        </Link>
      ) : (
        <Typography>...</Typography>
      )}
    </ListItem>
  );
}
