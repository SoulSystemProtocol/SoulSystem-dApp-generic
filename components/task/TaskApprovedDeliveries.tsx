import { StarBorderOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  Link as MuiLink,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material';
import Dao from 'classes/Dao';
import { CLAIM_ROLE } from 'constants/contracts';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSoul';
import useTask from 'hooks/useTask';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TaskApprovedDeliveries({ task, sx }: any) {
  const { getSoulsByRole } = useTask();
  const subjectSouls = getSoulsByRole(task, CLAIM_ROLE.subject.id);

  if (subjectSouls.length > 0) {
    return (
      <Box sx={{ ...sx }}>
        <Divider sx={{ mb: 2 }} />
        <List subheader={<ListSubheader>Approved Deliveries:</ListSubheader>}>
          {subjectSouls.map((soul: any, index: number) => (
            <TaskApprovedDelivery key={index} task={task} soulId={soul} />
          ))}
        </List>
      </Box>
    );
  }
  return <></>;
}

function TaskApprovedDelivery({ soulId }: any) {
  const { handleError } = useError();
  const { getSoulById } = useSoul();
  const { getDaoById } = useDao();
  const [soulDao, setSoulDao] = useState<Dao | null>(null);

  useEffect(() => {
    // Try load post DAO
    if (soulId) {
      getSoulById(soulId)
        .then((soul) => (soul ? getDaoById(soul.owner) : null))
        .then((dao) => setSoulDao(dao))
        .catch((error: any) => handleError(error, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soulId]);

  return (
    <ListItem>
      {soulDao ? (
        <>
          <ListItemAvatar>
            <Avatar>
              <StarBorderOutlined />
            </Avatar>
          </ListItemAvatar>
          <Stack direction="row" spacing={1}>
            <Typography>Delivery posted by</Typography>
            <Link href={`/daos/${soulDao.id}`} passHref>
              <MuiLink underline="none">
                <Typography>{soulDao.name}</Typography>
              </MuiLink>
            </Link>
          </Stack>
        </>
      ) : (
        <Typography>...</Typography>
      )}
    </ListItem>
  );
}
