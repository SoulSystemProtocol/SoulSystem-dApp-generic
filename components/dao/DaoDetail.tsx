import { ethers } from 'ethers';
import { Save, SchoolOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GAME_ROLE } from 'constants/contracts';
import { DataContext } from 'contexts/data';
// import { Web3Context } from 'contexts/web3';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useToast from 'hooks/useToast';
import { useContext, useEffect, useState } from 'react';
import GameAdminActions from '../game/GameAdminActions';
import EntityImage from '../entity/EntityImage';
import AddressHash from 'components/web3/AddressHash';
import AccountBalance from 'components/web3/AccountBalance';
import FundDialogButton from 'components/web3/FundDialogButton';

/**
 * A component with DAO details.
 */
export default function DaoDetail({ dao, sx }: any) {
  if (dao) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          ...sx,
        }}
      >
        <Box>
          <EntityImage item={dao} />
          <GameAdminActions game={dao} sx={{ mt: 2, width: 164 }} />
        </Box>
        <Box sx={{ flexGrow: 1, mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          <Typography variant="body2" sx={{ float: 'right' }}>
            <AddressHash address={dao.id} />
          </Typography>
          <Typography variant="h4">{dao.name}</Typography>
          <Typography color="text.secondary" variant="body2">
            Balance: <AccountBalance address={dao.id} />{' '}
            {process.env.NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL}
          </Typography>
          <Typography sx={{ mt: 1 }}>{dao.uriData?.description}</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <DaoMembershipActions dao={dao} />
            <FundDialogButton address={dao.id} />
          </Stack>
        </Box>
      </Box>
    );
  }
  return <></>;
}

function DaoMembershipActions({ dao, sx }: any) {
  const { accountSoul } = useContext(DataContext);
  const { handleError } = useError();
  const { showToastSuccess } = useToast();
  const { leave, applyToJoin, isSoulHasRole } = useDao();
  const [isSoulMember, setIsSoulMember] = useState(false);
  const [isSoulSentApplication, setIsSoulSentApplication] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  async function submit() {
    try {
      setIsProcessing(true);
      if (isSoulMember) {
        await leave(dao);
      } else {
        await applyToJoin(dao, accountSoul.id);
      }
      showToastSuccess('Success! Data will be updated soon');
      setIsProcessed(true);
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    setIsSoulMember(false);
    setIsSoulSentApplication(false);
    if (accountSoul && dao) {
      setIsSoulMember(isSoulHasRole(dao, accountSoul.id, GAME_ROLE.member.id));
      const nominatedSouls = dao.nominations.map(
        (nomination: any) => nomination.nominated.id,
      );
      setIsSoulSentApplication(nominatedSouls.includes(accountSoul.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountSoul, dao]);

  return (
    <Box sx={{ ...sx }}>
      {!accountSoul || isProcessed ? (
        <></>
      ) : isProcessing ? (
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<Save />}
          variant="outlined"
        >
          Processing
        </LoadingButton>
      ) : isSoulMember ? (
        <Button variant="outlined" onClick={() => submit()}>
          Leave
        </Button>
      ) : isSoulSentApplication ? (
        <Button variant="outlined" disabled>
          Application is pending
        </Button>
      ) : (
        <Button variant="outlined" onClick={() => submit()}>
          Apply to Join
        </Button>
      )}
    </Box>
  );
}
