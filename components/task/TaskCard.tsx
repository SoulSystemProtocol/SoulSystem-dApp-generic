import { AccessTimeOutlined, CheckOutlined, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link as MuiLink,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  Typography,
} from '@mui/material';
import Dao from 'classes/Dao';
import Soul from 'classes/Soul';
import { CLAIM_ROLE, SOUL_TYPE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSoul';
import useTask from 'hooks/useTask';
import useToast from 'hooks/useToast';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import TaskApplyDialog from './TaskApplyDialog';

/**
 * A component with a card with task.
 */
export default function TaskCard({ task }: any) {
  if (task) {
    return (
      <Card variant="outlined">
        <CardContent sx={{ p: '16px !important' }}>
          <TaskHeader task={task} />
          <TaskApplications task={task} sx={{ mt: 2 }} />
          <TaskAcceptedApplications task={task} sx={{ mt: 2 }} />
        </CardContent>
      </Card>
    );
  }
  return <></>;
}

function TaskHeader({ task, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...sx,
      }}
    >
      {/* Task data */}
      <Box>
        <Link href={`/tasks/${task.id}`} passHref>
          <MuiLink underline="none">
            <Typography>{task.name}</Typography>
          </MuiLink>
        </Link>
        {task.uriData.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {task.uriData.description}
          </Typography>
        )}
      </Box>
      {/* Task actions */}
      {accountSoul && (
        <Box>
          <Button
            onClick={() =>
              showDialog?.(
                <TaskApplyDialog task={task} onClose={closeDialog} />,
              )
            }
          >
            Apply as DAO
          </Button>
        </Box>
      )}
    </Box>
  );
}

function TaskApplications({ task, sx }: any) {
  if (task.nominations.length > 0) {
    return (
      <Box sx={{ ...sx }}>
        <Divider sx={{ mb: 2 }} />
        <List subheader={<ListSubheader>Applications:</ListSubheader>}>
          {task.nominations.map((nomination: any, index: number) => (
            <TaskApplication key={index} task={task} nomination={nomination} />
          ))}
        </List>
      </Box>
    );
  }
  return <></>;
}

function TaskApplication({ task, nomination }: any) {
  const { accountSoul } = useContext(DataContext);
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getDaoById } = useDao();
  const { isSoulHasRole, acceptSoulForTask } = useTask();
  const [nominatedDao, setNominatedDao] = useState<Dao | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  async function acceptAplicant(soulId: string) {
    try {
      setIsProcessing(true);
      await acceptSoulForTask(task.id, soulId);
      showToastSuccess('Success! Data will be updated soon');
      setIsProcessed(true);
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    // Load nominated DAO if type is game
    if (nomination.nominated.type === SOUL_TYPE.game) {
      getDaoById(nomination.nominated.owner)
        .then((dao) => setNominatedDao(dao))
        .catch((error: any) => handleError(error, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nomination]);

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <AccessTimeOutlined />
        </Avatar>
      </ListItemAvatar>
      {nominatedDao ? (
        <Box>
          {/* Application data */}
          <Link href={`/daos/${nominatedDao.id}`} passHref>
            <MuiLink underline="none">
              <Typography gutterBottom>{nominatedDao.name}</Typography>
            </MuiLink>
          </Link>
          {/* Application actions */}
          {accountSoul &&
            isSoulHasRole(task, accountSoul.id, CLAIM_ROLE.admin.id) && (
              <Box>
                {isProcessed ? (
                  <></>
                ) : isProcessing ? (
                  <LoadingButton
                    size="small"
                    loading
                    loadingPosition="start"
                    startIcon={<Save />}
                  >
                    Processing
                  </LoadingButton>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      acceptAplicant(nomination.nominated.id);
                    }}
                  >
                    Accept as Applicant
                  </Button>
                )}
              </Box>
            )}
        </Box>
      ) : (
        <Typography>...</Typography>
      )}
    </ListItem>
  );
}

function TaskAcceptedApplications({ task, sx }: any) {
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
        <Divider sx={{ mb: 2 }} />
        <List subheader={<ListSubheader>Accepted applications:</ListSubheader>}>
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

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <CheckOutlined />
        </Avatar>
      </ListItemAvatar>
      {soulDao ? (
        <Box>
          {/* Application data */}
          <Link href={`/daos/${soulDao.id}`} passHref>
            <MuiLink underline="none">
              <Typography gutterBottom>{soulDao.name}</Typography>
            </MuiLink>
          </Link>
        </Box>
      ) : (
        <Typography>...</Typography>
      )}
    </ListItem>
  );
}
