import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  Grid,
  ListItem,
  Typography,
} from '@mui/material';
import TooltipButton from 'components/layout/TooltipButton';
import { PROC_STAGE_REV } from 'constants/contracts';
import { NO_SOUL_MSG } from 'constants/texts';
import { DataContext } from 'contexts/data';
import { DialogContext } from 'contexts/dialog';
import { normalizeGraphEntity } from 'helpers/metadata';
import { nameEntity } from 'helpers/utils';
import useContract from 'hooks/useContract';
import useError from 'hooks/useError';
import useToast from 'hooks/useToast';
import { getSoulsByRole, isSoulHasRole } from 'hooks/utils';
import { useContext, useEffect, useState } from 'react';
import PostSingleDisplay from './PostSingleDisplay';
import TaskPostDeliveryDialog from './TaskPostDeliveryDialog';
import { SxProps } from '@mui/material';

/**
 * Task Posted Deliveries Display
 */
export default function TaskPostedDeliveries({
  task,
  sx,
}: {
  task: any;
  sx?: SxProps;
}): JSX.Element {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const [applicantPosts, setApplicantPosts] = useState([]);

  useEffect(() => {
    setApplicantPosts(
      task
        ? task.posts.filter((post: any) => post.entityRole == 'applicant')
        : [],
    );
  }, [task]);

  if (getSoulsByRole(task, 'applicant').length > 0) {
    return (
      <Box sx={{ ...sx }}>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h4" sx={{ mb: 1 }}>
          Deliveries
        </Typography>
        {/* <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Posted deliveries
        </Typography> */}

        <Grid container spacing={2} sx={{ my: 2 }}>
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
        <TooltipButton
          disabled={!accountSoul || task.stage >= PROC_STAGE_REV.closed}
          tooltip={
            !accountSoul
              ? NO_SOUL_MSG
              : task.stage >= PROC_STAGE_REV.closed
              ? `${nameEntity('task', false)} closed`
              : null
          }
          size="small"
          variant="outlined"
          onClick={() =>
            showDialog?.(
              <TaskPostDeliveryDialog task={task} onClose={closeDialog} />,
            )
          }
        >
          Post Delivery
        </TooltipButton>
      </Box>
    );
  }
  return <></>;
}

function TaskPostedDelivery({ task, post }: any) {
  const { accountSoul } = useContext(DataContext);
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [canAdmin, setCanAdmin] = useState<boolean>(false);
  const { getContractTask } = useContract();

  async function approveDelivery(soulId: string) {
    try {
      setIsProcessing(true);
      await getContractTask(task.id).deliveryApprove(soulId, 1);
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
      task.stage !== PROC_STAGE_REV.closed &&
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
          <>Approved</>
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
            sx={{ whiteSpace: 'nowrap' }}
          >
            Approve Delivery
          </Button>
        )}
      </Box>
    </PostSingleDisplay>
  );
}
