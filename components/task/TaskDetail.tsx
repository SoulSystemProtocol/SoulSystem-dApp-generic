import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useError from 'hooks/useError';
import useTask from 'hooks/useTask';
// import useSoul from 'hooks/useSoul';
import useDao from 'hooks/useDao';
import { taskStageToString } from 'utils/converters';
import EntityImage from '../entity/EntityImage';
import { CLAIM_STAGE, GAME_ROLE } from 'constants/contracts';
import AddressHash from 'components/web3/AddressHash';
// import AccountBalance from 'components/web3/AccountBalance';
// import { DialogContext } from 'contexts/dialog';
import { DataContext } from 'contexts/data';
import { useContext, useEffect, useState } from 'react';
import FundDialogButton from 'components/web3/FundDialogButton';

/**
 * A component with project details.
 */
export default function TaskDetail({ item, sx }: any) {
  const { getFund } = useTask();
  const { handleError } = useError();
  const [fund, setFund] = useState<string | null>(null);
  const { accountSoul } = useContext(DataContext);
  const [isSoulAdmin, setIsSoulAdmin] = useState(false);
  const [isSoulAuthority, setIsSoulAuthority] = useState(false);
  const { isSoulHasRole } = useDao();

  useEffect(() => {
    if (item) {
      getFund(item.id)
        .then((fund) => setFund(fund))
        .catch((error) => handleError(error, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    if (item) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  async function loadData() {
    if (accountSoul) {
      try {
        setIsSoulAdmin(isSoulHasRole(item, accountSoul.id, GAME_ROLE.admin.id));
        setIsSoulAuthority(
          isSoulHasRole(item, accountSoul.id, GAME_ROLE.authority.id),
        );
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
          <EntityImage item={item.game} />
          <Typography
            sx={{
              textAlign: 'center',
            }}
          >
            By: {item.game.name}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          <AddressHash address={item.id} sx={{ float: 'right' }} />
          <Typography variant="h4" sx={{ mt: 1 }}>
            {item.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {taskStageToString(item)} {fund ? ` | ${fund} ETH` : ''}
          </Typography>
          <Typography sx={{ mt: 1 }}>{item.uriData?.description}</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {(item.stage === null || item.stage >= CLAIM_STAGE.pending) && (
              <FundDialogButton address={item.id} />
            )}
            {(isSoulAdmin || isSoulAuthority) &&
              item.stage > CLAIM_STAGE.decision && (
                <Button size="small" variant="outlined">
                  Cancel Case [cancel()]
                </Button>
              )}
            {isSoulAdmin && item.stage == CLAIM_STAGE.execute && (
              <Button size="small" variant="outlined">
                Disburse Prize [stageExecusion()]
              </Button>
            )}
            {item.stage > CLAIM_STAGE.execute && (
              <Button size="small" variant="outlined">
                Disburse Funds [disburse()]
              </Button>
            )}
            {item.stage > CLAIM_STAGE.cancelled && (
              <Button size="small" variant="outlined">
                Refund [refund()]
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
    );
  }

  return <></>;
}
