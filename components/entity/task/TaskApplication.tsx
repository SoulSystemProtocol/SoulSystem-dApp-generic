import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Typography, Button, Stack } from '@mui/material';
import { SOUL_TYPE, PROC_STAGE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useSubgraph from 'hooks/useSubgraph';
import useTask from 'hooks/useTask';
import useToast from 'hooks/useToast';
import { isSoulHasRole } from 'hooks/utils';
import { useContext, useState, useEffect } from 'react';
import { loadJsonFromIPFS, resolveLink } from 'helpers/IPFS';
import { soulCardContent } from 'utils/cardContents';
import GridCard from 'components/GridCard';

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
  const { getDaoById } = useDao();
  const { getSoulById } = useSubgraph();
  const { acceptSoulForTask } = useTask();
  const [nominatedDao, setNominatedDao] = useState<any | null>(null);
  const [nominatedSoul, setNominatedSoul] = useState<any | null>(null);
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
    console.log('TaskApplication: nomination', nomination);
    // Load nominated DAO if type is game
    if (nomination.nominated.type === SOUL_TYPE.game) {
      getDaoById(nomination.nominated.owner)
        .then((dao) => setNominatedDao(dao))
        .catch((error: any) => handleError(error, true));
    }

    getSoulById(nomination.nominated.id).then((soul) => setNominatedSoul(soul));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nomination]);

  if (!nominatedSoul) return <></>;
  if (isSoulHasRole(task, nomination.nominated.id, 'applicant')) return <></>;

  return (
    <GridCard {...soulCardContent(nominatedSoul)}>
      <Stack
        direction="column"
        sx={{ textAlign: 'center', flex: 1, alignSelf: 'flex-start' }}
      >
        <TaskApplicationUriDisplay nomination={nomination} />
      </Stack>

      <Stack direction="column">
        {/* Application actions */}
        {task.stage !== PROC_STAGE.closed &&
          accountSoul &&
          isSoulHasRole(task, accountSoul.id, 'admin') && (
            <Stack direction="column" justifyContent="center">
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
