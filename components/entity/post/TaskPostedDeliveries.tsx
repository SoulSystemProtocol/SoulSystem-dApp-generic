import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'components/utils/Link';
import { CLAIM_POST_ENTITY_TYPE, PROC_STAGE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import { normalizeGraphEntity } from 'helpers/metadata';
import useError from 'hooks/useError';
import useTask from 'hooks/useTask';
import useToast from 'hooks/useToast';
import { getSoulsByRole, isSoulHasRole } from 'hooks/utils';
import { useContext, useEffect, useState } from 'react';
import PostSingleDisplay from './PostSingleDisplay';
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
        <Typography variant="h5" sx={{ mb: 1 }}>
          Posted Deliveries:
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
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
        </Grid>
        {task.stage !== PROC_STAGE.closed && accountSoul && (
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              showDialog?.(
                <TaskPostDeliveryDialog task={task} onClose={closeDialog} />,
              )
            }
          >
            Post Delivery
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
  const { approveSoulDelivery } = useTask();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [canAdmin, setCanAdmin] = useState<boolean>(false);

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
    console.warn('Post:', post);
  }, [post]);

  useEffect(() => {
    setCanAdmin(
      task.stage !== PROC_STAGE.closed &&
        accountSoul &&
        isSoulHasRole(task, accountSoul.id, 'admin'),
    );
  }, [accountSoul, task]);

  //Process Entity
  post = normalizeGraphEntity(post);
  if (post?.metadata?.type !== 'application') return <></>;
  return (
    <PostSingleDisplay post={post}>
      <Box>
        {isProcessed ? (
          <>Accepted</>
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
            disabled={!canAdmin}
            onClick={() => approveDelivery(post.author.id)}
          >
            Approve
          </Button>
        )}
      </Box>
    </PostSingleDisplay>
  );
}
