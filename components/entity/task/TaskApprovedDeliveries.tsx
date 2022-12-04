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
import { CLAIM_ROLE, PROC_STAGE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useTask from 'hooks/useTask';
import useToast from 'hooks/useToast';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { soulImage } from 'utils/converters';
import useSoulById from 'hooks/useSoulById';
import useSubgraph from 'hooks/useSubgraph';

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
        <Typography variant="h5">Winners:</Typography>
        <List>
          {subjectSouls.map((soul: any, index: number) => (
            <TaskApprovedDelivery key={index} task={task} soulId={soul} />
          ))}
        </List>
        {/* Button to disburse funds */}
        {task.stage === PROC_STAGE.execution && accountSoul && (
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
      </Box>
    );
  }
  return <></>;
}

function TaskApprovedDelivery({ soulId }: any) {
  const { handleError } = useError();
  // const { getSoulById } = useSoul();
  const { getSoulById } = useSubgraph();
  // const { soul, loading, error } = useSoulById(soulId as string);
  const { getDaoById } = useDao();
  const [soulDao, setSoulDao] = useState<any | null>(null);

  useEffect(() => {
    // Try load post DAO
    if (soulId) {
      getSoulById(soulId)
        //TODO: Maybe get GameBySoulId
        .then((soul) => (soul ? getDaoById(soul.owner) : null))
        .then((dao) => setSoulDao(dao))
        .catch((error: any) => handleError(error, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soulId]);

  console.error('TODO: Enable and Test New Soul Hook!');
  // useEffect(() => {  //TODO: Enable and Test This!
  //   // Try load post DAO
  //   if (soul) {
  //     getDaoById(soul.owner)
  //       .then((dao) => setSoulDao(dao))
  //       .catch((error: any) => handleError(error, true));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [soul]);

  return (
    <ListItem>
      {soulDao ? (
        <>
          <ListItemAvatar>
            <Avatar src={soulImage(soulDao)}>
              <StarBorderOutlined />
            </Avatar>
          </ListItemAvatar>
          <Stack direction="row" spacing={1}>
            <Typography>Delivery posted by</Typography>
            <Link href={`/soul/${soulDao.id}`} passHref>
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
