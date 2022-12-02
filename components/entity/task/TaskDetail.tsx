import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useError from 'hooks/useError';
import useContract from 'hooks/useContract';
import { taskStageToString } from 'utils/converters';
import EntityImage from '../EntityImage';
import { CLAIM_STAGE } from 'constants/contracts';
import AddressHash from 'components/web3/AddressHash';
import { DataContext } from 'contexts/data';
import { useContext, useEffect, useState } from 'react';
import FundDialogButton from 'components/web3/FundDialogButton';
import Link from 'components/utils/Link';
import { isSoulHasRole, nameEntity } from 'hooks/utils';
import useWeb3NativeBalance from 'hooks/useWeb3NativeBalance';
import { SelectedSoulContext } from 'contexts/SelectedSoul';
import useContainerImage from 'hooks/useContainerImage';

/**
 * Component: project details.
 *
 * TODO: cancel() Should generate and send a cancelation URI
 *
 */
export default function TaskDetail({ item, sx }: any) {
  const { getContractTask } = useContract();
  const { handleError } = useError();
  const { accountSoul } = useContext(DataContext);
  const [isSoulAdmin, setIsSoulAdmin] = useState(false);
  const [isSoulAuthority, setIsSoulAuthority] = useState(false);
  const tokens: [] = []; //Supported ERC20 Tokens
  const { balance: fund } = useWeb3NativeBalance(item?.id);
  const { soul } = useContext(SelectedSoulContext);
  const containerImageSrc = useContainerImage(soul.id);

  useEffect(() => {
    if (item) loadData();
    console.log('TaskDetail() Item', { item, soul });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  async function loadData() {
    if (accountSoul) {
      try {
        setIsSoulAdmin(isSoulHasRole(item, accountSoul.id, 'admin'));
        setIsSoulAuthority(isSoulHasRole(item, accountSoul.id, 'authority'));
      } catch (error: any) {
        handleError(error, true);
      }
    }
  }

  if (item) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          ...sx,
        }}
      >
        <Box>
          <EntityImage imgSrc={containerImageSrc} />
          <Link href={`/soul/${soul.owner}`} sx={{ color: '#f8f8f8' }}>
            <Typography
              sx={{
                textAlign: 'center',
              }}
            >
              By: {item.game.name}
            </Typography>
          </Link>
        </Box>
        <Box sx={{ flexGrow: 1, mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          <AddressHash address={item.id} sx={{ float: 'right' }} />
          <Typography variant="h1" sx={{ mt: 1 }}>
            {item.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {taskStageToString(item)}{' '}
            {fund
              ? ` | ${fund} ${process.env.NEXT_PUBLIC_NETWORK_CURRENCY_NAME}`
              : ''}
          </Typography>
          <Typography sx={{ mt: 1 }}>{item.metadata?.description}</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {(item.stage === null || item.stage >= CLAIM_STAGE.pending) && (
              <FundDialogButton
                text={`Fund ${nameEntity('task')}`}
                address={item.id}
              />
            )}
            {(isSoulAdmin || isSoulAuthority) &&
              item.stage > CLAIM_STAGE.decision &&
              item.stage < CLAIM_STAGE.closed && (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    getContractTask(item.id).cancel('TEST_URI', tokens)
                  }
                >
                  Cancel Bounty
                </Button>
              )}
            {isSoulAdmin && item.stage == CLAIM_STAGE.execute && (
              <Button
                size="small"
                variant="outlined"
                onClick={() => getContractTask(item.id).stageExecusion(tokens)}
              >
                Disburse Prize
              </Button>
            )}
            {item.stage > CLAIM_STAGE.execute && (
              <Button
                size="small"
                variant="outlined"
                onClick={() => getContractTask(item.id).disburse(tokens)}
              >
                Disburse Funds
              </Button>
            )}
            {item.stage > CLAIM_STAGE.cancelled && (
              <Button
                size="small"
                variant="outlined"
                onClick={() => getContractTask(item.id).refund(tokens)}
              >
                Refund
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
    );
  }

  return <></>;
}
