import { Box, Button, Stack, Typography } from '@mui/material';
import useError from 'hooks/useError';
import useContract from 'hooks/useContract';
import { taskStageToString, nameSoul } from 'utils/converters';
import EntityImage from '../EntityImage';
import { PROC_STAGE } from 'constants/contracts';
import AddressHash from 'components/web3/AddressHash';
import { DataContext } from 'contexts/data';
import { useContext, useEffect, useState } from 'react';
import FundDialogButton from 'components/web3/FundDialogButton';
import { isSoulHasRole, nameEntity } from 'hooks/utils';
import useWeb3NativeBalance from 'hooks/useWeb3NativeBalance';
import ConditionalButton from 'components/layout/ConditionalButton';
import { SelectedSoulContext } from 'contexts/SelectedSoul';
import useContainerImage from 'hooks/useContainerImage';
import { getChainData } from 'components/web3/chains/ChainsData';

/**
 * Component: project details.
 */
export default function TaskDetail({ item, sx }: any) {
  const { soul } = useContext(SelectedSoulContext);
  const containerImageSrc = useContainerImage(soul.id);
  const { getContractTask } = useContract();
  const { handleError } = useError();
  const { accountSoul } = useContext(DataContext);
  const [isSoulAdmin, setIsSoulAdmin] = useState(false);
  const [isSoulAuthority, setIsSoulAuthority] = useState(false);
  const tokens: string[] = []; //Supported ERC20 Tokens
  const { balance: fund } = useWeb3NativeBalance(item?.id);
  const loadData = () => {
    if (accountSoul && item) {
      try {
        setIsSoulAdmin(isSoulHasRole(item, accountSoul.id, 'admin'));
        setIsSoulAuthority(isSoulHasRole(item, accountSoul.id, 'authority'));
        return;
      } catch (error: any) {
        handleError(error, true);
      }
    }
    setIsSoulAdmin(false);
    setIsSoulAuthority(false);
  };

  useEffect(() => {
    loadData();
  }, [item, accountSoul]);

  if (!soul || !item) return <></>;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        mb: { xs: 1, md: 2 },
        ...sx,
      }}
    >
      <Box
        sx={{
          margin: '0 auto',
          flexGrow: 0,
        }}
      >
        <EntityImage imgSrc={containerImageSrc} title={item?.game?.name} />
        {/* <Typography sx={{ mx: '16px' }}>
          {item?.game?.name ? `By: ${item.game.name}` : ''}
        </Typography> */}
        {/* {isOwned && ( */}
        {/* //TODO: Support editing other souls */}
        {/* <Link href={`/soul/edit`}>
          <Button size="small" variant="outlined" sx={{ mt: 2, width: 164 }}>
            Edit
          </Button>
        </Link> */}
        {/* )} */}
      </Box>

      <Stack
        direction="column"
        spacing={1}
        sx={{ flexGrow: 1, mt: { xs: 2, md: 0 }, ml: { md: 4 } }}
      >
        <Typography variant="h1">{nameSoul(soul)}</Typography>
        <AddressHash address={item.id} sx={{ float: 'right' }} />
        <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
          {taskStageToString(item)}{' '}
          {fund ? ` | ${fund} ${getChainData()?.native}` : ''}
        </Typography>
        <Typography sx={{ mt: 1 }}>{item.metadata?.description}</Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          {(item.stage === null || item.stage >= PROC_STAGE.pending) && (
            <FundDialogButton
              text={`Fund ${nameEntity('task')}`}
              address={item.id}
            />
          )}

          {/* //TODO: Add reason for cancellation in URI */}
          <ConditionalButton
            disabled={
              !(
                (isSoulAdmin || isSoulAuthority) &&
                item.stage > PROC_STAGE.decision &&
                item.stage < PROC_STAGE.closed
              )
            }
            size="small"
            variant="outlined"
            onClick={() => getContractTask(item.id).cancel('TEST_URI', tokens)}
          >
            Cancel Bounty
          </ConditionalButton>

          <ConditionalButton
            disabled={!isSoulAdmin || item.stage != PROC_STAGE.execute}
            size="small"
            variant="outlined"
            onClick={() => getContractTask(item.id).stageExecusion(tokens)}
          >
            Disburse Prize
          </ConditionalButton>

          <ConditionalButton
            disabled={!(item.stage > PROC_STAGE.execute)}
            size="small"
            variant="outlined"
            onClick={() => getContractTask(item.id).disburse(tokens)}
          >
            Disburse Funds
          </ConditionalButton>

          <ConditionalButton
            disabled={!(item.stage > PROC_STAGE.cancelled)}
            size="small"
            variant="outlined"
            onClick={() => getContractTask(item.id).refund(tokens)}
          >
            Refund
          </ConditionalButton>
        </Stack>
      </Stack>
    </Box>
  );
}
