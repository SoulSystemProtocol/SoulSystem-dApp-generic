import { AccessTimeOutlined, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
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
import { CLAIM_ROLE, CLAIM_STAGE, SOUL_TYPE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useTask from 'hooks/useTask';
import useToast from 'hooks/useToast';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import TaskApplyDialog from './TaskApplyDialog';

export default function TaskApplications({ task, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);

  return (
    <Box sx={{ ...sx }}>
      <Divider sx={{ mb: 1 }} />
      <Typography variant="h5">Applications:</Typography>
      <List
        subheader={
          <ListSubheader>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
              sx={{ py: 2, float: 'left' }}
            >
              {/* Button to apply as DAO */}
              {accountSoul &&
                (task.stage === null ||
                  (task.stage >= CLAIM_STAGE.open &&
                    task.stage < CLAIM_STAGE.closed)) && (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      showDialog?.(
                        <TaskApplyDialog task={task} onClose={closeDialog} />,
                      )
                    }
                  >
                    Apply as DAO
                  </Button>
                )}
              {(task.stage === null || task.stage >= CLAIM_STAGE.open) && (
                <Button size="small" variant="outlined">
                  [Fund Task]
                </Button>
              )}
            </Stack>
          </ListSubheader>
        }
      >
        {task.nominations.length > 0 ? (
          <>
            {task.nominations.map((nomination: any, index: number) => (
              <TaskApplication
                key={index}
                task={task}
                nomination={nomination}
              />
            ))}
          </>
        ) : (
          <ListItem>
            <Typography variant="body2">No applications</Typography>
          </ListItem>
        )}
      </List>
    </Box>
  );
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
          {task.stage !== CLAIM_STAGE.closed &&
            accountSoul &&
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
