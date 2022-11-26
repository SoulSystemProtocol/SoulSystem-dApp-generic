import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import Soul from 'classes/Soul';
import { SoulDetails, SoulImage } from 'components/entity/soul/SoulCard';
import { GAME_ROLE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
import useDao from 'hooks/useDao';
import useContract from 'hooks/useContract';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSoul';
import useToast from 'hooks/useToast';
import { useContext, useEffect, useState } from 'react';

/**
 * Component: a list of dao applications.
 */
export default function DaoApplications({ dao, sx }: any) {
  return (
    <Grid container spacing={2} sx={{ ...sx }}>
      {!dao.nominations && (
        <Grid item xs={12}>
          <Typography>Loading...</Typography>
        </Grid>
      )}
      {dao.nominations?.length === 0 && (
        <Grid item xs={12}>
          <Typography>No Results</Typography>
        </Grid>
      )}
      {dao.nominations?.length > 0 && (
        <>
          {dao.nominations.map((nomination: any, index: number) => (
            <DaoApplicationGridItem
              key={index}
              dao={dao}
              nomination={nomination}
            />
          ))}
        </>
      )}
    </Grid>
  );
}

function DaoApplicationGridItem({ dao, nomination }: any) {
  const { accountSoul } = useContext(DataContext);
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getSoulById } = useSoul();

  const { isSoulHasRole } = useDao();
  const { getContractGame } = useContract();

  const [isSoulAdmin, setIsSoulAdmin] = useState(false);
  const [nominatedSoul, setNominatedSoul] = useState<Soul | null>(null);
  const [isNominatedSoulMember, setIsNominatedSoulMember] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  async function loadData() {
    try {
      setIsSoulAdmin(
        dao && accountSoul
          ? isSoulHasRole(dao, accountSoul.id, GAME_ROLE.admin.id)
          : false,
      );
      const soul = await getSoulById(nomination.nominated.id);
      if (soul) {
        setNominatedSoul(soul);
        setIsNominatedSoulMember(
          isSoulHasRole(dao, soul.id, GAME_ROLE.member.id),
        );
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
    // setIsNominatedSoulMember(false); //Seems Redundant
    if (dao && nomination) loadData();
  }, [accountSoul, dao, nomination]);

  if (nominatedSoul && !isNominatedSoulMember) {
    return (
      <Grid item xs={12}>
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
              {isSoulAdmin && (
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
                    <Button onClick={() => addToDao()}>Accept Applicant</Button>
                  )}
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return <></>;
}
