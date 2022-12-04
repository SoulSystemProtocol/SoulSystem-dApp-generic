import { DataContext } from 'contexts/data';
import useContract from 'hooks/useContract';
import useError from 'hooks/useError';
import useToast from 'hooks/useToast';
import { useContext, useEffect, useState } from 'react';
import { isSoulHasRole } from 'hooks/utils';
import ConditionalButton from 'components/layout/ConditionalButton';
import { SoulCardDetails } from 'components/entity/soul/SoulCardDetails';
import useSubgraph from 'hooks/useSubgraph';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Card, CardContent, Box, Stack } from '@mui/material';
import SoulCardImage from 'components/entity/soul/SoulCardImage';

/**
 * Game Application Card
 */
export default function GameApplicationGridCard({
  game,
  nomination,
}: any): JSX.Element {
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getSoulById } = useSubgraph();
  const { getContractGame } = useContract();
  const { accountSoul } = useContext(DataContext);
  const [isSoulAdmin, setIsSoulAdmin] = useState(false);
  const [nominatedSoul, setNominatedSoul] = useState<any | null>(null);
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

  /* Should be Filtered Beforehand
  if (!nominatedSoul || isNominatedSoulMember) return <></>;
  */

  return (
    <Card>
      <CardContent>
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
            <SoulCardImage soul={nominatedSoul} sx={{ mr: 2 }} />
            <SoulCardDetails soul={nominatedSoul} />
          </Box>
          {/* Soul actions */}
          <Stack direction="column" justifyContent="center">
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
                variant="outlined"
                size="small"
                disabled={!isSoulAdmin}
                onClick={() => assignAsMember()}
              >
                Accept Applicant
              </ConditionalButton>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
