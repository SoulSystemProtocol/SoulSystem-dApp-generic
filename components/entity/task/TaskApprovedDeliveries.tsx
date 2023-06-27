import { Save, StarBorderOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from '@mui/material';
import { CLAIM_ROLE, PROC_STAGE_REV } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import useError from 'hooks/useError';
import useToast from 'hooks/useToast';
import { useContext, useEffect, useState } from 'react';
import useSubgraph from 'hooks/useSubgraph';
// import { SelectedSoulContext } from 'contexts/SelectedSoul';
// import useContainerEntity from 'hooks/useContainerEntity';
import Loading from 'components/layout/Loading';
import TooltipButton from 'components/layout/TooltipButton';
import { NO_SOUL_MSG } from 'constants/texts';
import useContract from 'hooks/useContract';
import Link from 'components/utils/Link';
import { nameEntity } from 'helpers/utils';
import { soulImage } from 'utils/soul';
import { getSoulsByRole } from 'hooks/utils';

/**
 * Approved Deliveries Display
 */
export default function TaskApprovedDeliveries({ task, sx }: any): JSX.Element {
  const { accountSoul } = useContext(DataContext);
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getContractTask } = useContract();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const approvedSouls = getSoulsByRole(task, CLAIM_ROLE.subject.id);

  async function disburseFunds() {
    try {
      setIsProcessing(true);

      const tokens: string[] = [];
      await getContractTask(task.id).stageExecusion(tokens);
      showToastSuccess('Success! Data will be updated soon');
      setIsProcessed(true);
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsProcessing(false);
    }
  }

  if (approvedSouls.length > 0) {
    return (
      <Box sx={{ ...sx }}>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h4">Winners</Typography>
        <List>
          {approvedSouls.map((soulId: string, index: number) => (
            <TaskApprovedDelivery key={index} soulId={soulId} />
          ))}
        </List>
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
          <TooltipButton
            size="small"
            variant="contained"
            disabled={!accountSoul || task.stage != PROC_STAGE_REV.execution}
            tooltip={
              !accountSoul
                ? NO_SOUL_MSG
                : task.stage < PROC_STAGE_REV.execution
                ? `Waiting for execution stage`
                : task.stage > PROC_STAGE_REV.execution
                ? `${nameEntity('task')} closed`
                : `Close bounty and distribute funds`
            }
            onClick={() => disburseFunds()}
          >
            Distribute Funds To Winners
          </TooltipButton>
        )}
      </Box>
    );
  }
  return <></>;
}

/**
 * Single Approved Delivery Item
 */
function TaskApprovedDelivery({ soulId }: any) {
  const { handleError } = useError();
  const { getSoulById } = useSubgraph();
  const [soul, setSoul] = useState<any | null>(null);

  useEffect(() => {
    if (soulId) {
      getSoulById(soulId)
        .then((soul) => setSoul(soul))
        .catch((error: any) => handleError(error, true));
    } else setSoul(null);
  }, [soulId]);

  return (
    <ListItem>
      {soul ? (
        <>
          <ListItemAvatar>
            <Avatar src={soulImage(soul)}>
              <StarBorderOutlined />
            </Avatar>
          </ListItemAvatar>
          <Stack direction="row" spacing={1}>
            <Link href={`/soul/${soul?.owner}`}>
              <Typography>{soul?.name}</Typography>
            </Link>
          </Stack>
        </>
      ) : (
        <Loading />
      )}
    </ListItem>
  );
}
