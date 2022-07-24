import { Save, StarBorderOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
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
import { CLAIM_ROLE, CLAIM_STAGE } from 'constants/contracts';
import Dao from 'classes/Dao';
import { DataContext } from 'contexts/data';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSoul';
import useTask from 'hooks/useTask';
import useToast from 'hooks/useToast';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

export default function TaskApprovedDeliveries({ task, sx }: any) {
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
        <Divider sx={{ mb: 1 }} />
        <List
          subheader={
            <ListSubheader>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ py: 2 }}
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
