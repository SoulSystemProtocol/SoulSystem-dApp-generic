import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Typography, Button, Stack, Chip } from '@mui/material';
import { PROC_STAGE_REV } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import useError from 'hooks/useError';
import useSubgraph from 'hooks/useSubgraph';
import useToast from 'hooks/useToast';
import { isSoulHasRole } from 'hooks/utils';
import { useContext, useState, useEffect } from 'react';
import { loadJsonFromIPFS, resolveLink } from 'helpers/IPFS';
import { soulCardContent } from 'utils/cardContents';
import GridCard from 'components/GridCard';
import useContract from 'hooks/useContract';

/**
 * Task Application
 */
export default function TaskApplication({
  task,
  nomination,
}: any): JSX.Element {
  const { accountSoul } = useContext(DataContext);
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getSoulById } = useSubgraph();
  const { getContractTask } = useContract();
  const [nominatedSoul, setNominatedSoul] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [canAdmin, setCanAdmin] = useState<boolean>(false);

  /**
   * Accept Application
   */
  async function acceptNomination(soulId: string) {
    try {
      setIsProcessing(true);
      await getContractTask(task.id).acceptApplicant(soulId);
      showToastSuccess('Success! Data will be updated soon');
      setIsProcessed(true);
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    setIsProcessed(isSoulHasRole(task, nomination.nominated.id, 'applicant'));
  }, [nomination, task]);

  useEffect(() => {
    setCanAdmin(
      task.stage !== PROC_STAGE_REV.closed &&
        accountSoul &&
        isSoulHasRole(task, accountSoul.id, 'admin'),
    );
  }, [accountSoul, task]);

  useEffect(() => {
    console.log('TaskApplication: nomination', nomination);
    getSoulById(nomination.nominated.id).then((soul) => setNominatedSoul(soul));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nomination]);

  if (!nominatedSoul) return <></>;
  // if (isSoulHasRole(task, nomination.nominated.id, 'applicant')) return <></>;

  return (
    <GridCard {...soulCardContent(nominatedSoul)}>
      <Stack
        direction="column"
        sx={{ ml: 2, flex: 1, alignSelf: 'flex-start' }}
      >
        <TaskApplicationUriDisplay nomination={nomination} />
      </Stack>

      <Stack direction="column">
        {/* Application actions */}
        {canAdmin && (
          <Stack direction="column" justifyContent="center">
            {isProcessed ? (
              <Chip label="Winner" size="small" sx={{ mr: 2 }} />
            ) : isProcessing ? (
              <LoadingButton
                size="small"
                loading={isProcessing}
                loadingPosition="start"
                startIcon={<Save />}
              >
                Processing
              </LoadingButton>
            ) : (
              <Button
                variant="outlined"
                size="small"
                disabled={isProcessed}
                sx={{ whiteSpace: 'nowrap' }}
                onClick={() => {
                  acceptNomination(nomination.nominated.id);
                }}
              >
                Accept Application
              </Button>
            )}
          </Stack>
        )}
      </Stack>
    </GridCard>
  );
}

/**
 * Display Task Application Content
 */
function TaskApplicationUriDisplay({
  nomination,
}: {
  nomination: any;
}): JSX.Element {
  const [data, setData] = useState<any | null>(null);
  const [nominator, setNominator] = useState<any | null>(null);

  useEffect(() => {
    for (let i = 0; i < nomination.uri.length; i++) {
      console.log('nomination.uri[i]', nomination.uri[i]);
      setNominator(nomination.nominator[i]);
      loadJsonFromIPFS(resolveLink(nomination.uri[i])).then((data) => {
        setData(data);
      });
    }
  }, [nomination]);

  return (
    <Typography variant="subtitle2">&quot;{data?.description}&quot;</Typography>
  );
}
