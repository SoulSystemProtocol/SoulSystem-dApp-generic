import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'components/utils/Link';
import { CLAIM_POST_ENTITY_TYPE, CLAIM_STAGE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useTask from 'hooks/useTask';
import useToast from 'hooks/useToast';
import { getSoulsByRole, isSoulHasRole, nameEntity } from 'hooks/utils';
import { useContext, useEffect, useState } from 'react';
import TaskPostDeliveryDialog from './TaskPostDeliveryDialog';

export default function TaskPostedDeliveries({ task, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
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

  if (getSoulsByRole(task, 'applicant').length > 0) {
    return (
      <Box sx={{ ...sx }}>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="h5">Posted Deliveries: </Typography>
        <List>
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
        {task.stage !== CLAIM_STAGE.closed && accountSoul && (
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              showDialog?.(
                <TaskPostDeliveryDialog item={task} onClose={closeDialog} />,
              )
            }
          >
            Post Delivery as a {nameEntity('mdao')}
          </Button>
        )}
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
  const { approveSoulDelivery } = useTask();
  const [postDao, setPostDao] = useState<any | null>(null);
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
  }, [post]);

  return (
    <ListItem>
      {postDao ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Applicant</Typography>
          <Link href={`/soul/${postDao.id}`}>
            <Typography>{postDao.name}</Typography>
          </Link>
          <Typography>posted</Typography>
          <Link href={post.uri} underline="none" target="_blank">
            Delivery
          </Link>
          {task.stage !== CLAIM_STAGE.closed &&
            accountSoul &&
            isSoulHasRole(task, accountSoul.id, 'admin') && (
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
