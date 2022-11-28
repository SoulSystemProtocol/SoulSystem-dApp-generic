import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import Soul from 'classes/Soul';
import { SoulDetails, SoulImage } from 'components/entity/soul/SoulCard';
import { DataContext } from 'contexts/data';
import useContract from 'hooks/useContract';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSoul';
import useToast from 'hooks/useToast';
import { useContext, useEffect, useState } from 'react';
import { getSoulsByRole, isSoulHasRole } from 'hooks/utils';
import ConditionalButton from 'components/layout/ConditionalButton';
import { SelectedGameContext } from 'contexts/SelectedGame';

/**
 * Component: a list of game applications
 * @todo: Maybe filter approved applications before presenting them and show a message if none are pending
 */
export default function DaoApplications({ sx }: any) {
  const { game, loading, error } = useContext(SelectedGameContext);
  if (!game) return <></>;

  //All Current Members
  const members = getSoulsByRole(game, 'member');
  //Applications that aren't members
  let applications = game?.nominations?.filter((nomination: any) => {
    return !members.includes(nomination?.nominated?.id?.toString());
  });

  return (
    <Grid container spacing={2} sx={{ ...sx }}>
      {/* {game.nominations?.length} Applications */}
      {!game.nominations && (
        <Grid item xs={12}>
          <Typography>Loading...</Typography>
        </Grid>
      )}
      {applications?.length === 0 ? (
        <Grid item xs={12}>
          <Typography>No Pending Applications</Typography>
        </Grid>
      ) : (
        <Grid item xs={12}>
          {applications.map((nomination: any, index: number) => (
            <DaoApplicationGridItem
              key={index}
              game={game}
              nomination={nomination}
            />
          ))}
        </Grid>
      )}
    </Grid>
  );
}

function DaoApplicationGridItem({ game, nomination }: any) {
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getSoulById } = useSoul();
  const { getContractGame } = useContract();
  const { accountSoul } = useContext(DataContext);
  const [isSoulAdmin, setIsSoulAdmin] = useState(false);
  const [nominatedSoul, setNominatedSoul] = useState<Soul | null>(null);
  // const [isNominatedSoulMember, setIsNominatedSoulMember] =
  //   useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  async function loadData() {
    try {
      setIsSoulAdmin(
        game && accountSoul
          ? isSoulHasRole(game, accountSoul.id, 'admin')
          : false,
      );
      const soul = await getSoulById(nomination.nominated.id);
      if (soul) {
        setNominatedSoul(soul);
        // setIsNominatedSoulMember(isSoulHasRole(game, soul.id, 'member'));
      }
    } catch (error: any) {
      handleError(error, true);
    }
  }

  /// Add Member
  async function assignAsMember() {
    try {
      setIsProcessing(true);
      if (nominatedSoul) {
        await getContractGame(game.id).roleAssignToToken(
          nominatedSoul.id,
          'member',
        );
        setIsProcessed(true);
      }
      showToastSuccess('Success! Data will be updated soon');
      //Trigger Data Reload
      loadData();
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    setIsSoulAdmin(false);
    setNominatedSoul(null);
    if (game && nomination) loadData();
  }, [accountSoul, game, nomination]);

  /* Filtered Beforehand
  if (!nominatedSoul || isNominatedSoulMember) return <></>;
  */

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: '10px !important' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Soul data */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <SoulImage soul={nominatedSoul} sx={{ mr: 2 }} />
            <SoulDetails soul={nominatedSoul} />
          </Box>
          {/* Soul actions */}
          {/* {isSoulAdmin && ( */}
          <Box>
            {isProcessed ? (
              <></>
            ) : isProcessing ? (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<Save />}
              >
                Processing
              </LoadingButton>
            ) : (
              <ConditionalButton
                disabled={!isSoulAdmin}
                onClick={() => assignAsMember()}
              >
                Accept Applicant
              </ConditionalButton>
            )}
          </Box>
          {/* )} */}
        </Box>
      </CardContent>
    </Card>
  );
}
