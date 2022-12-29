import { Box, Typography } from '@mui/material';
import { getChainData } from 'components/web3/chains/ChainsData';
import useWeb3NativeBalance from 'hooks/useWeb3NativeBalance';
import { taskStageToString } from 'utils/converters';

/**
 * Task Card - Additional Details
 * TODO: Add Whitelisted ERC20 Tokens
 */
export default function TaskCardDetails({ task }: { task: any }): JSX.Element {
  const { balance: fund } = useWeb3NativeBalance(task?.id);
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textTransform: 'capitalize' }}
      >
        {task && taskStageToString(task)}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ whiteSpace: 'nowrap' }}
      >
        {fund} {getChainData()?.native}
      </Typography>
    </Box>
  );
}
