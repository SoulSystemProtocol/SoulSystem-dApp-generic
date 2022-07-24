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
import TaskPostedDeliveries from './TaskPostedDeliveries';
import TaskApprovedDeliveries from './TaskApprovedDeliveries';

/**
 * A component with a card with task.
 */
export default function TaskCard({ task }: any) {
  if (task) {
    return (
      <Card variant="outlined">
        <CardContent sx={{ p: '16px !important' }}>
          <TaskHeader task={task} />
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
