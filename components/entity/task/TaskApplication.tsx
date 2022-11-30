import { AccessTimeOutlined, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  Button,
} from '@mui/material';
import Link from 'components/utils/Link';
import { SOUL_TYPE, CLAIM_STAGE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useTask from 'hooks/useTask';
import useToast from 'hooks/useToast';
import { isSoulHasRole } from 'hooks/utils';
import { useContext, useState, useEffect } from 'react';

/**
 * Task Application
 */
export default function TaskApplication({ task, nomination }: any) {
  const { accountSoul } = useContext(DataContext);
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getDaoById } = useDao();
  const { acceptSoulForTask } = useTask();
  const [nominatedDao, setNominatedDao] = useState<any | null>(null);
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

  if (isSoulHasRole(task, nomination.nominated.id, 'applicant')) return <></>;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <AccessTimeOutlined />
          {/* TODO: Add Image nominatedDao?.uriData.image */}
        </Avatar>
      </ListItemAvatar>
      {nominatedDao ? (
        <Box>
          {/* Application data */}
          <Link href={`/soul/${nominatedDao.id}`} underline="none">
            <Typography>{nominatedDao.name}</Typography>
          </Link>
          {/* Application actions */}
          {task.stage !== CLAIM_STAGE.closed &&
            accountSoul &&
            isSoulHasRole(task, accountSoul.id, 'admin') && (
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
                    Accept Application
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
