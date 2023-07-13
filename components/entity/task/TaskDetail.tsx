import { Box, Stack, Typography, Tooltip } from '@mui/material';
import useError from 'hooks/useError';
import useContract from 'hooks/useContract';
import { taskStageToString } from 'utils/converters';
import EntityImage from '../EntityImage';
import { PROC_STAGE_REV } from 'constants/contracts';
import AddressHash from 'components/web3/AddressHash';
import { DataContext } from 'contexts/data';
import { useContext, useEffect, useState } from 'react';
import FundDialogButton from 'components/web3/FundDialogButton';
import { isSoulHasRole } from 'hooks/utils';
import { SelectedSoulContext } from 'contexts/SelectedSoul';
import useContainerEntity from 'hooks/useContainerEntity';
import { nameEntity } from 'helpers/utils';
import TokenBalance from 'components/web3/TokenBalance';
import TooltipButton from 'components/layout/TooltipButton';
import SoulDescription from '../soul/SoulDescription';
import { Web3Context } from 'contexts/Web3Context';
import ProcStageBar from '../proc/ProcStageBar';
import { soulName } from 'utils/soul';
import NativeBalanceDisplay from 'components/web3/NativeBalanceDisplay';
import { TokenBalanceSingle } from '../../web3/TokenBalance';

/**
 * Component: project details.
 */
export default function TaskDetail({ item, sx }: any) {
  const { soul } = useContext(SelectedSoulContext);
  const { containerName, containerImageSrc } = useContainerEntity(soul.id);
  const { getContractTask } = useContract();
  const { handleError } = useError();
  const { accountSoul } = useContext(DataContext);
  const [isSoulAdmin, setIsSoulAdmin] = useState(false);
  const [isSoulAuthority, setIsSoulAuthority] = useState(false);
  const { curChainData } = useContext(Web3Context);
  const tokens: string[] = curChainData?.ERC20
    ? curChainData.ERC20.map((token: any) => token.address)
    : []; //Supported ERC20 Tokens

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

  useEffect(() => loadData(), [item, accountSoul]);

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
        <EntityImage imgSrc={containerImageSrc} title={containerName} />
        {/* <Typography sx={{ mx: '16px' }}>
          {containerName ? `By: ${containerName}` : ''}
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
        <Typography variant="h1">{soulName(soul)}</Typography>
        <AddressHash
          address={item.id}
          sx={{ color: 'text.secondary', float: 'right' }}
        />
        {containerName && (
          <Typography color="text.secondary" variant="body2">
            By: <span>{containerName}</span>
          </Typography>
        )}
        <Typography
          component="div"
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, fontSize: '0.75em' }}
        >
          Reward:{' '}
          <Box
            component="span"
            sx={{
              textTransform: 'capitalize',
              display: { xs: 'inline', sm: 'none' },
            }}
          >
            <Tooltip title="Current stage">
              <span>{taskStageToString(item)}</span>
            </Tooltip>
            {' | '}
          </Box>
          <Stack
            direction="row"
            sx={{ display: 'inline' }}
            divider={<span> | </span>}
          >
            {item?.id && <NativeBalanceDisplay address={item.id} />}
            {/* <TokenBalance account={item.id} /> */}
            {curChainData?.ERC20?.map((token: any) => {
              return (
                <Stack
                  direction="row"
                  key={token.address}
                  spacing={1}
                  sx={{ display: 'inline' }}
                >
                  <Box sx={{ display: 'inline' }}>
                    <TokenBalanceSingle
                      account={item.id}
                      token={token.address}
                      symbol={token.label}
                    />
                  </Box>
                </Stack>
              );
            })}
          </Stack>
        </Typography>

        <ProcStageBar
          stage={item.stage}
          sx={{ display: { xs: 'none', sm: 'block' } }}
        />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          {(item.stage === null || item.stage >= PROC_STAGE_REV.pending) && (
            <Tooltip title={`Anyone can fund this ${nameEntity('task')}`}>
              <span>
                <FundDialogButton
                  text={`Fund ${nameEntity('task')}`}
                  address={item.id}
                />
              </span>
            </Tooltip>
          )}
          <TooltipButton
            disabled={!isSoulAdmin || item.stage != PROC_STAGE_REV.execution}
            tooltip={
              !isSoulAdmin
                ? 'Requires permissions'
                : item.stage != PROC_STAGE_REV.execution
                ? 'Wrong stage'
                : `Close bounty and distribute funds`
            }
            size="small"
            variant="outlined"
            onClick={() => getContractTask(item.id).stageExecusion(tokens)}
          >
            Close & Distribute
          </TooltipButton>

          <TooltipButton
            disabled={item.stage <= PROC_STAGE_REV.execution}
            tooltip={
              item.stage <= PROC_STAGE_REV.execution
                ? 'Only after execution'
                : `Late Distribution option`
            }
            size="small"
            variant="outlined"
            onClick={() => getContractTask(item.id).disburse(tokens)}
          >
            Distribute Funds
          </TooltipButton>

          {/* //TODO: Add reason for cancellation in URI */}
          <TooltipButton
            disabled={
              !(
                (isSoulAdmin || isSoulAuthority) &&
                item.stage <= PROC_STAGE_REV.decision
              )
            }
            tooltip={
              !isSoulAdmin && !isSoulAuthority
                ? 'Requires permissions'
                : item.stage > PROC_STAGE_REV.decision
                ? "Can't cancel after a decision was made"
                : null
            }
            size="small"
            variant="outlined"
            onClick={() => {
              try {
                getContractTask(item.id).cancel('TEST_URI', tokens);
              } catch (error: any) {
                handleError(error, true);
              }
            }}
          >
            Cancel {nameEntity('task')}
          </TooltipButton>
          <TooltipButton
            disabled={!(item.stage > PROC_STAGE_REV.cancelled)}
            tooltip={
              item.stage <= PROC_STAGE_REV.cancelled
                ? 'Available after cancelation'
                : null
            }
            size="small"
            variant="outlined"
            onClick={() => getContractTask(item.id).refund(tokens)}
          >
            Refund
          </TooltipButton>
        </Stack>
        <SoulDescription soul={soul} sx={{ mt: 1 }} />
      </Stack>
    </Box>
  );
}
