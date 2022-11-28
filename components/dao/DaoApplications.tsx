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
import { isSoulHasRole } from 'hooks/utils';
import ConditionalButton from 'components/layout/ConditionalButton';

/**
 * Component: a list of dao applications
 * @todo: Maybe filter approved applications before presenting them and show a message if none are pending
 */
export default function DaoApplications({ dao, sx }: any) {
  return (
    <Grid container spacing={2} sx={{ ...sx }}>
      {/* {dao.nominations?.length} Applications */}
      {!dao.nominations && (
        <Grid item xs={12}>
          <Typography>Loading...</Typography>
        </Grid>
      )}
      {dao.nominations?.length === 0 ? (
        <Grid item xs={12}>
          <Typography>No Pending Applications</Typography>
        </Grid>
      ) : (
        <Grid item xs={12}>
          {dao.nominations.map((nomination: any, index: number) => (
            <DaoApplicationGridItem
              key={index}
              dao={dao}
              nomination={nomination}
            />
          ))}
        </Grid>
      )}
    </Grid>
  );
}

function DaoApplicationGridItem({ dao, nomination }: any) {
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getSoulById } = useSoul();
  const { getContractGame } = useContract();
  const { accountSoul } = useContext(DataContext);
  const [isSoulAdmin, setIsSoulAdmin] = useState(false);
  const [nominatedSoul, setNominatedSoul] = useState<Soul | null>(null);
  const [isNominatedSoulMember, setIsNominatedSoulMember] =
    useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  async function loadData() {
    try {
      setIsSoulAdmin(
        dao && accountSoul
          ? isSoulHasRole(dao, accountSoul.id, 'admin')
          : false,
      );
      const soul = await getSoulById(nomination.nominated.id);
      if (soul) {
        setNominatedSoul(soul);
        setIsNominatedSoulMember(isSoulHasRole(dao, soul.id, 'member'));
      }
    } catch (error: any) {
      handleError(error, true);
    }
  }

  async function addToDao() {
    try {
      setIsProcessing(true);
      if (nominatedSoul) {
        // await assignRoleToSoul(dao.id, nominatedSoul.id, GAME_ROLE.member.name);
        await getContractGame(dao.id).roleAssignToToken(
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
    if (dao && nomination) loadData();
  }, [accountSoul, dao, nomination]);

  if (!nominatedSoul || isNominatedSoulMember) return <></>;

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
                onClick={() => addToDao()}
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
