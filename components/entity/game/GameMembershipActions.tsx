import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, SxProps } from '@mui/material';
import { Box } from '@mui/system';
import { DataContext } from 'contexts/data';
import useContract from 'hooks/useContract';
import { isSoulHasRole } from 'hooks/utils';
import useError from 'hooks/useError';
import useToast from 'hooks/useToast';
import { useContext, useEffect, useState } from 'react';
import { nameEntity } from 'helpers/utils';
import TooltipButton from 'components/layout/TooltipButton';

/**
 *
 */
export default function GameMembershipActions({
  game,
  sx,
}: {
  game: any;
  sx?: SxProps;
}) {
  const { accountSoul } = useContext(DataContext);
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { getContractGame } = useContract();
  const [isSoulMember, setIsSoulMember] = useState(false);
  const [isSoulSentApplication, setIsSoulSentApplication] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  const submit = async (): Promise<void> => {
    try {
      setIsProcessing(true);
      if (isSoulMember) await getContractGame(game.id).leave();
      else await getContractGame(game.id).nominate(accountSoul.id, '');
      showToastSuccess('Success! Data will be updated soon');
      setIsProcessed(true);
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    setIsSoulMember(false);
    setIsSoulSentApplication(false);
    if (accountSoul && game) {
      setIsSoulMember(isSoulHasRole(game, accountSoul.id, 'member'));
      const nominatedSouls = game.nominations.map(
        (nomination: any) => nomination.nominated.id,
      );
      setIsSoulSentApplication(nominatedSouls.includes(accountSoul.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountSoul, game]);

  return (
    <Box sx={{ ...sx }}>
      {isProcessed ? (
        <></>
      ) : isProcessing ? (
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<Save />}
          size="small"
          variant="outlined"
        >
          Processing
        </LoadingButton>
      ) : isSoulMember ? (
        <TooltipButton
          size="small"
          variant="outlined"
          onClick={submit}
          tooltip={`Leave ${nameEntity('project').toLowerCase()}`}
        >
          Leave
        </TooltipButton>
      ) : isSoulSentApplication ? (
        <TooltipButton
          size="small"
          variant="outlined"
          disabled={true}
          tooltip="Waiting for your application to be accepted"
        >
          Application Pending
        </TooltipButton>
      ) : (
        <TooltipButton
          size="small"
          variant="outlined"
          onClick={submit}
          tooltip={
            !accountSoul
              ? 'Connect wallet & mint your soul to interact with the verse'
              : `Requeste to join the  ${nameEntity(game?.role).toLowerCase()}`
          }
          disabled={!accountSoul}
        >
          Apply to Join
        </TooltipButton>
      )}
    </Box>
  );
}
