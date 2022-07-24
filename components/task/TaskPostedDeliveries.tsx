import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  Link as MuiLink,
  List,
  ListItem,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material';
import Dao from 'classes/Dao';
import {
  CLAIM_POST_ENTITY_TYPE,
  CLAIM_ROLE,
  CLAIM_STAGE,
} from 'constants/contracts';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useTask from 'hooks/useTask';
import useToast from 'hooks/useToast';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import TaskPostDeliveryDialog from './TaskPostDeliveryDialog';

export default function TaskPostedDeliveries({ task, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { getSoulsByRole } = useTask();
  const [applicantPosts, setApplicantPosts] = useState([]);

  useEffect(() => {
    if (task) {
      console.log('Task Posts', task?.posts);
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
        <Divider sx={{ mb: 1 }} />
        <Typography variant="h5">Posted Deliveries: </Typography>
        <List
          subheader={
            <ListSubheader>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ py: 2 }}
              >
                {task.stage !== CLAIM_STAGE.closed && accountSoul && (
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
          {task.stage !== CLAIM_STAGE.closed &&
            accountSoul &&
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
