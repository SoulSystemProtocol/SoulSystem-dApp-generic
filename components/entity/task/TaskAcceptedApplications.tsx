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
import { CLAIM_ROLE, SOUL_TYPE } from 'constants/contracts';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSoul';
import useTask from 'hooks/useTask';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { soulImage } from 'utils/converters';

export default function TaskAcceptedApplications({ task, sx }: any) {
  const { handleError } = useError();
  const { getSoulsByRole } = useTask();
  const { getSouls } = useSoul();
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

  // console.log('stuff img:', { img: soulImage(soulDao), soul, soulDao });
  return (
    <ListItem sx={{ flex: '1 0', minWidth: '200px' }}>
      {soulDao ? (
        <>
          <ListItemAvatar>
            <Avatar src={soulImage(soulDao)}>
              <CheckOutlined />
            </Avatar>
          </ListItemAvatar>
          <Link href={`/soul/${soulDao.id}`} passHref>
            <MuiLink underline="none">
              <Typography>{soulDao.name}</Typography>
            </MuiLink>
          </Link>
        </>
      ) : (
        <>
          <Avatar>
            <CheckOutlined />
          </Avatar>
          <Typography>...</Typography>
        </>
      )}
    </ListItem>
  );
}
