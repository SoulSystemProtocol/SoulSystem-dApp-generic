import {
  AccessTimeOutlined,
  CheckOutlined,
  Save,
  StarBorderOutlined,
} from '@mui/icons-material';
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
  Stack,
  Typography,
} from '@mui/material';
import Dao from 'classes/Dao';
import Soul from 'classes/Soul';
import {
  CLAIM_POST_ENTITY_TYPE,
  CLAIM_ROLE,
  CLAIM_STAGE,
  SOUL_TYPE,
} from 'constants/contracts';
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
import TaskPostDeliveryDialog from './TaskPostDeliveryDialog';

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
          <TaskPostedDeliveries task={task} sx={{ mt: 2 }} />
          <TaskApprovedDeliveries task={task} sx={{ mt: 2 }} />
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
              <Typography>{nominatedDao.name}</Typography>
            </MuiLink>
          </Link>
          {/* Application actions */}
          {accountSoul &&
            isSoulHasRole(task, accountSoul.id, CLAIM_ROLE.admin.id) && (
              <Box sx={{ mt: 0.5 }}>
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
              <Typography>{soulDao.name}</Typography>
            </MuiLink>
          </Link>
        </Box>
      ) : (
        <Typography>...</Typography>
      )}
    </ListItem>
  );
}

function TaskPostedDeliveries({ task, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { getSoulsByRole } = useTask();
  const [applicantPosts, setApplicantPosts] = useState([]);

  useEffect(() => {
    if (task) {
      setApplicantPosts(
        task.posts.filter(
          (post: any) => post.entityRole == CLAIM_POST_ENTITY_TYPE.applicant,
        ),
      );
    }
  }, [task]);

  if (getSoulsByRole(task, CLAIM_ROLE.applicant.id).length > 0) {
    return (
      <Box sx={{ ...sx }}>
        <Divider sx={{ mb: 2 }} />
        <List
          subheader={
            <ListSubheader>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2">Posted Deliveries: </Typography>
                {accountSoul && (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      showDialog?.(
                        <TaskPostDeliveryDialog
                          task={task}
                          onClose={closeDialog}
                        />,
                      )
                    }
                  >
                    Post Delivery as DAO
                  </Button>
                )}
              </Stack>
            </ListSubheader>
          }
        >
          {applicantPosts.length > 0 ? (
            <>
              {task.posts.map((post: any, index: number) => (
                <TaskPostedDelivery key={index} task={task} post={post} />
              ))}
            </>
          ) : (
            <ListItem>
              <Typography variant="body2">No deliveries</Typography>
            </ListItem>
          )}
        </List>
      </Box>
    );
  }
  return <></>;
}

function TaskPostedDelivery({ task, post }: any) {
  const { accountSoul } = useContext(DataContext);
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getDaoById } = useDao();
  const { isSoulHasRole, approveSoulDelivery } = useTask();
  const [postDao, setPostDao] = useState<Dao | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  async function approveDelivery(soulId: string) {
    try {
      setIsProcessing(true);
      await approveSoulDelivery(task.id, soulId);
      showToastSuccess('Success! Data will be updated soon');
      setIsProcessed(true);
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    // Try load post DAO
    if (post) {
      getDaoById(post.author.owner)
        .then((dao) => setPostDao(dao))
        .catch((error: any) => handleError(error, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  return (
    <ListItem>
      {postDao ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Applicant</Typography>
          <Link href={`/daos/${postDao.id}`} passHref>
            <MuiLink underline="none">
              <Typography>{postDao.name}</Typography>
            </MuiLink>
          </Link>
          <Typography>posted</Typography>
          <MuiLink href={post.uri} underline="none" target="_blank">
            Delivery
          </MuiLink>
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
                    size="small"
                    variant="outlined"
                    onClick={() => approveDelivery(post.author.id)}
                  >
                    Approve
                  </Button>
                )}
              </Box>
            )}
        </Stack>
      ) : (
        <Typography>...</Typography>
      )}
    </ListItem>
  );
}

function TaskApprovedDeliveries({ task, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getSoulsByRole, disburseFundsToWinners } = useTask();
  const subjectSouls = getSoulsByRole(task, CLAIM_ROLE.subject.id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  async function disburseFunds() {
    try {
      setIsProcessing(true);
      await disburseFundsToWinners(task.id);
      showToastSuccess('Success! Data will be updated soon');
      setIsProcessed(true);
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsProcessing(false);
    }
  }

  if (subjectSouls.length > 0) {
    return (
      <Box sx={{ ...sx }}>
        <Divider sx={{ mb: 2 }} />
        <List
          subheader={
            <ListSubheader>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2">Approved Deliveries:</Typography>
                {/* Button to disburse funds */}
                {task.stage === CLAIM_STAGE.execution && accountSoul && (
                  <>
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
                        size="small"
                        variant="outlined"
                        onClick={() => disburseFunds()}
                      >
                        Disburse Funds To Winners
                      </Button>
                    )}
                  </>
                )}
              </Stack>
            </ListSubheader>
          }
        >
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
